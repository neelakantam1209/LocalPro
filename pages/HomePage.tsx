import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Category, Worker, Review } from '../types';
import { CATEGORY_SECTIONS } from '../data/mockData';
import { getCategoryTip } from '../services/geminiService';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import { WorkerCard } from '../components/WorkerCard';
import WorkerProfileModal from '../components/WorkerProfileModal';
import RecommendedWorkerCard from '../components/RecommendedWorkerCard';
import HomeSearch from '../components/HomeSearch';
import { BackArrowIcon, LoadingIcon, SparklesIcon, UserGroupIcon, CloseIcon } from '../components/icons';
import { WorkerContext } from '../context/WorkerContext';

// Haversine formula to calculate distance
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const HYDERABAD_CENTER = { lat: 17.3850, lon: 78.4867 };

const QuickBookingModal: React.FC<{ worker: Worker; onClose: () => void; }> = ({ worker, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking request sent to ${worker.name}! They will contact you shortly.`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-deepNavy/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="glassmorphism rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative flex flex-col border border-goldAccent/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-display font-bold text-charcoalBlack">Quick Book</h2>
                <p className="text-slateGray mt-1">Request a job with {worker.name}</p>
              </div>
              <button onClick={onClose} className="p-1 rounded-full bg-white/30 hover:bg-white/50 text-slateGray hover:text-charcoalBlack transition-colors">
                  <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slateGray">Your Name</label>
                        <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 bg-white/50 border border-coolGray/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-goldAccent/80"/>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slateGray">Your Phone</label>
                        <input type="tel" id="phone" required className="mt-1 block w-full px-3 py-2 bg-white/50 border border-coolGray/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-goldAccent/80"/>
                    </div>
                     <div>
                        <label htmlFor="service" className="block text-sm font-medium text-slateGray">Required Service</label>
                        <input type="text" id="service" placeholder={`e.g., ${worker.serviceAreas[0]}`} required className="mt-1 block w-full px-3 py-2 bg-white/50 border border-coolGray/50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-goldAccent/80"/>
                    </div>
                </div>
                <div className="mt-8">
                    <button type="submit" className="w-full text-charcoalBlack bg-luxuryGold font-bold font-sans py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:shadow-inner active:translate-y-px transition-all duration-200 btn-gold-glow">
                        Send Booking Request
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const workerContext = useContext(WorkerContext);
  if (!workerContext) throw new Error("WorkerContext not found");
  const { workers, favorites, toggleFavorite, addReview } = workerContext;

  const [listContext, setListContext] = useState<{title: string, fromCategory?: Category} | null>(null);
  const [displayedWorkers, setDisplayedWorkers] = useState<Worker[] | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [workerForQuickBooking, setWorkerForQuickBooking] = useState<Worker | null>(null);
  const [aiTip, setAiTip] = useState<string>('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [userCoords, setUserCoords] = useState<{ lat: number, lon: number }>(HYDERABAD_CENTER);

  const handleDetectLocation = (showAlert = true) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lon: longitude });
        setLocation('Your Current Location');
      },
      () => {
        if (showAlert) alert("Could not get your location.");
        setUserCoords(HYDERABAD_CENTER);
        setLocation('Hyderabad');
      }
    );
  };
  
  useEffect(() => {
    handleDetectLocation(false);
  }, []);

  const featuredWorkers = useMemo(() => {
    return [...workers]
      .filter(worker => worker.featured)
      .map(worker => ({
        ...worker,
        distance: calculateDistance(userCoords.lat, userCoords.lon, worker.latitude, worker.longitude)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [workers, userCoords]);
  
  const hyderabadLocations = useMemo(() => {
    const locations = workers.map(w => w.city);
    return [...new Set(locations)];
  }, [workers]);

  const handleSelectCategory = async (category: Category) => {
    setSearchTerm('');
    
    const results = workers
      .filter(w => w.categoryId === category.id)
      .map(worker => ({
        ...worker,
        distance: calculateDistance(userCoords.lat, userCoords.lon, worker.latitude, worker.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    setDisplayedWorkers(results);
    setListContext({ title: `Available ${category.name}`, fromCategory: category });

    setIsLoadingTip(true);
    setAiTip('');
    try {
      const tip = await getCategoryTip(category.name);
      setAiTip(tip);
    } catch (error) {
      console.error("Failed to get AI tip:", error);
    } finally {
      setIsLoadingTip(false);
    }
  };

  const handleSearch = (serviceQuery: string, locationQuery: string) => {
    setSearchTerm('');
    const service = serviceQuery.trim().toLowerCase();
    const locationStr = locationQuery.trim().toLowerCase();
    
    if (!service && !locationStr) return;

    let results = workers.filter(worker => {
        const serviceMatch = service === '' || 
                             worker.name.toLowerCase().includes(service) ||
                             worker.categoryName.toLowerCase().includes(service) ||
                             worker.serviceAreas.some(area => area.toLowerCase().includes(service));

        const locationMatch = locationStr === '' ||
                              locationQuery === 'Your Current Location' ||
                              worker.city.toLowerCase().includes(locationStr);

        return serviceMatch && locationMatch;
    });
    
    results = results.map(worker => ({
        ...worker,
        distance: calculateDistance(userCoords.lat, userCoords.lon, worker.latitude, worker.longitude)
    }));
    
    results.sort((a, b) => a.distance - b.distance);
    
    setDisplayedWorkers(results);
    setListContext({ title: `Search Results` });
  };


  const handleBack = () => {
    setListContext(null);
    setDisplayedWorkers(null);
    setSearchTerm('');
    setAiTip('');
  };

  const handleOpenQuickBook = (worker: Worker) => {
    setWorkerForQuickBooking(worker);
  };

  const finalWorkersToList = useMemo(() => {
    if (!displayedWorkers) return [];
    const refinedSearchTerm = searchTerm.trim().toLowerCase();
    if (!refinedSearchTerm) return displayedWorkers;
    return displayedWorkers.filter(worker => 
        worker.name.toLowerCase().includes(refinedSearchTerm) ||
        worker.serviceAreas.some(area => area.toLowerCase().includes(refinedSearchTerm))
    );
  }, [displayedWorkers, searchTerm]);

  return (
    <div className="min-h-screen bg-ivoryWhite text-slateGray transition-colors duration-300">
      <Header location={location || 'Hyderabad'} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {listContext === null ? (
          // Home View
          <div>
            <div className="text-center pt-12 pb-16">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoalBlack">Find a Pro, Get it Done.</h1>
              <p className="mt-4 text-lg text-slateGray">Connect with trusted local professionals for any job in Hyderabad.</p>
            </div>

            <div className="max-w-4xl mx-auto mb-16 -mt-8 relative z-10">
               <HomeSearch initialLocation={location} onSearch={handleSearch} onDetectLocation={handleDetectLocation} locations={hyderabadLocations} />
            </div>

            {featuredWorkers.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-deepNavy mb-6 px-1">⭐ Featured Workers</h2>
                <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4">
                  {featuredWorkers.map(worker => (
                    <RecommendedWorkerCard key={worker.id} worker={worker} onSelect={setSelectedWorker} onBookNow={handleOpenQuickBook} />
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-display font-bold text-deepNavy mb-8 px-1">Browse by Category</h2>
            <div className="space-y-12">
              {CATEGORY_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-deepNavy/90 mb-6 px-1">{section.title}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
                    {section.categories.map((category) => (
                       <div key={category.id}>
                         <CategoryCard category={category} onSelect={handleSelectCategory} />
                       </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Worker List View
          <div>
            <button onClick={handleBack} className="flex items-center gap-2 mb-4 text-royalBlue hover:text-goldAccent font-semibold transition-colors">
              <BackArrowIcon />
              Back
            </button>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-charcoalBlack">{listContext.title}</h2>
            <p className="text-slateGray mb-6">Showing professionals sorted by proximity to {location || 'your location'}.</p>
            
            { listContext.fromCategory && (isLoadingTip || aiTip) &&
              <div className="glassmorphism border-l-4 border-goldAccent p-4 rounded-r-lg mb-6 flex items-start gap-4 shadow-lg">
                <SparklesIcon className="w-8 h-8 text-goldAccent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold font-display text-royalBlue">Pro Tip</h3>
                  {isLoadingTip ? (
                    <div className="flex items-center gap-2 text-slateGray">
                      <LoadingIcon />
                      <span>Generating a helpful tip...</span>
                    </div>
                  ) : (
                    <p className="text-slateGray">{aiTip}</p>
                  )}
                </div>
              </div>
            }

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={`Refine results...`} />
            
            {finalWorkersToList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {finalWorkersToList.map(worker => (
                  <WorkerCard 
                    key={worker.id} 
                    worker={worker} 
                    onSelect={setSelectedWorker}
                    isFavorite={favorites.includes(worker.id)}
                    onToggleFavorite={() => toggleFavorite(worker.id)}
                    onBookNow={handleOpenQuickBook}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-slateGray mt-10 py-16 border-2 border-dashed border-coolGray/60 rounded-lg">
                <UserGroupIcon className="mx-auto h-16 w-16 text-coolGray" />
                <h3 className="mt-4 text-xl font-display font-medium text-charcoalBlack">No professionals found</h3>
                <p className="mt-2 text-base text-slateGray">Try adjusting your search or location.</p>
              </div>
            )}
          </div>
        )}
      </main>
      {selectedWorker && 
        <WorkerProfileModal 
          worker={selectedWorker} 
          onClose={() => setSelectedWorker(null)}
          isFavorite={favorites.includes(selectedWorker.id)}
          onToggleFavorite={() => toggleFavorite(selectedWorker.id)}
          onAddReview={addReview}
        />}
      {workerForQuickBooking && 
        <QuickBookingModal 
          worker={workerForQuickBooking} 
          onClose={() => setWorkerForQuickBooking(null)} 
        />}
    </div>
  );
};

export default HomePage;