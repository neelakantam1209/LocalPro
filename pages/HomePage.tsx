import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Category, Worker, Review, Booking } from '../types';
import { CATEGORY_SECTIONS } from '../data/mockData';
import { getCategoryTip } from '../services/geminiService';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import { WorkerCard } from '../components/WorkerCard';
import WorkerProfileModal from '../components/WorkerProfileModal';
import RecommendedWorkerCard from '../components/RecommendedWorkerCard';
import HomeSearch from '../components/HomeSearch';
import Footer from '../components/Footer';
import { BackArrowIcon, LoadingIcon, SparklesIcon, UserGroupIcon, CloseIcon, TrashIcon } from '../components/icons';
import { WorkerContext } from '../context/WorkerContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const HYDERABAD_CENTER = { lat: 17.3850, lon: 78.4867 };

// --- Quick Booking Modal ---
const QuickBookingModal: React.FC<{ worker: Worker; onClose: () => void; }> = ({ worker, onClose }) => {
  const workerContext = useContext(WorkerContext);
  const { addBooking } = workerContext!;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const service = (form.elements.namedItem('service') as HTMLInputElement).value;
    
    addBooking({
        workerId: worker.id,
        workerName: worker.name,
        service: service,
        date: new Date().toISOString(),
        customerName: name
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-text-primary/75 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-surface rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative flex flex-col border border-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-display font-bold text-text-primary">Quick Book</h2>
                <p className="text-text-secondary mt-1">Request a job with {worker.name}</p>
              </div>
              <button onClick={onClose} className="p-1 rounded-full bg-background/50 hover:bg-background text-text-secondary hover:text-text-primary transition-colors">
                  <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Your Name</label>
                        <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent"/>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-text-secondary">Your Phone</label>
                        <input type="tel" id="phone" name="phone" required className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent"/>
                    </div>
                     <div>
                        <label htmlFor="service" className="block text-sm font-medium text-text-secondary">Required Service</label>
                        <input type="text" id="service" name="service" defaultValue={worker.serviceAreas?.[0] || 'General Inquiry'} required className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent"/>
                    </div>
                </div>
                <div className="mt-8">
                    <button type="submit" className="w-full text-white bg-secondary hover:bg-black font-bold font-sans py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:shadow-inner active:translate-y-px transition-all duration-200">
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

// --- Cart Drawer ---
const CartDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
    const { offers } = useContext(WorkerContext)!;
    const { showToast } = useToast();
    
    // Simple Offer Logic
    const sortedOffers = [...offers].sort((a,b) => b.value - a.value);
    const applicableOffer = sortedOffers.find(o => new Date(o.validTill) > new Date());
    
    let discount = 0;
    if (applicableOffer) {
        if (applicableOffer.type === 'flat') discount = applicableOffer.value;
        else discount = (cartTotal * applicableOffer.value) / 100;
    }
    const finalTotal = Math.max(0, cartTotal - discount);

    const handleCheckout = () => {
        showToast('Order placed successfully!', 'success');
        clearCart();
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={onClose}>
            <div className="bg-surface w-full max-w-md h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold font-display">Your Cart</h2>
                    <button onClick={onClose}><CloseIcon/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-text-secondary py-10">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item, idx) => (
                            <div key={idx} className="flex gap-4 border-b border-border pb-4">
                                <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.serviceName}</h3>
                                    <p className="text-sm text-text-secondary">by {item.workerName}</p>
                                    <p className="font-bold text-primary mt-1">₹{item.price}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.workerId)} className="text-error"><TrashIcon/></button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                     <div className="p-4 border-t border-border bg-background">
                        {applicableOffer && (
                            <div className="mb-2 text-success text-sm font-semibold flex justify-between">
                                <span>Offer Applied: {applicableOffer.title}</span>
                                <span>-₹{discount.toFixed(0)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Total</span>
                            <span>₹{finalTotal.toFixed(0)}</span>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-secondary text-white py-3 rounded-xl font-bold hover:bg-black transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Bookings Modal ---
const BookingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { bookings, cancelBooking } = useContext(WorkerContext)!;
    const [cancellationId, setCancellationId] = useState<number | null>(null);

    const handleCancel = (id: number) => {
        if(window.confirm("Are you sure you want to cancel?")) {
            cancelBooking(id);
            setCancellationId(null);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
             <div className="bg-surface w-full max-w-lg rounded-2xl shadow-xl p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-display">My Bookings</h2>
                    <button onClick={onClose}><CloseIcon/></button>
                </div>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {bookings.length === 0 ? (
                         <p className="text-center text-text-secondary">No bookings found.</p>
                    ) : (
                        bookings.map(booking => (
                            <div key={booking.id} className="border border-border rounded-xl p-4 flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{booking.service}</h3>
                                    <p className="text-sm text-text-secondary">Provider: {booking.workerName}</p>
                                    <p className="text-xs text-text-tertiary mt-1">{new Date(booking.date).toLocaleDateString()}</p>
                                    <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded-full ${
                                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </div>
                                {booking.status !== 'cancelled' && (
                                    <button 
                                        onClick={() => handleCancel(booking.id)}
                                        className="text-error hover:bg-red-50 px-3 py-1 rounded-md text-sm font-semibold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
             </div>
        </div>
    );
}

const HomePage: React.FC = () => {
  const workerContext = useContext(WorkerContext);
  const cartContext = useCart();
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

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

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
    // Enhanced filtering logic (Categories + Location)
    const service = serviceQuery.trim().toLowerCase();
    const locationStr = locationQuery.trim().toLowerCase();
    
    if (!service && !locationStr) {
        setDisplayedWorkers(null); // Reset if empty
        return;
    }

    let results = workers.filter(worker => {
        const serviceMatch = service === '' || 
                             worker.categoryName.toLowerCase().includes(service); // Match category name

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
    setListContext({ title: service ? `${service} in ${locationQuery || 'Hyderabad'}` : `Workers in ${locationQuery}` });
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

  const handleAddToCart = (worker: Worker) => {
      cartContext.addToCart({
          workerId: worker.id,
          workerName: worker.name,
          serviceName: worker.categoryName,
          price: worker.hourlyRate || 500, // Default price fallback
          image: worker.photo
      });
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
    <div className="min-h-screen bg-background text-text-secondary flex flex-col">
      <Header 
        location={location || 'Hyderabad'} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBookings={() => setIsBookingsOpen(true)}
      />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {listContext === null ? (
          // Home View
          <>
            <div 
              className="relative bg-cover bg-center pt-16 pb-20 md:pt-24 md:pb-28 mb-16 rounded-b-2xl overflow-hidden shadow-xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60"></div>
              <div className="relative container mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
                  Home Services, On Demand.
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                  Cleaning, Maintenance, Repairs, and more. Trusted professionals at your doorstep.
                </p>
                <div className="max-w-4xl mx-auto mt-8 text-left">
                  <HomeSearch 
                    initialLocation={location} 
                    onSearch={handleSearch} 
                    onDetectLocation={handleDetectLocation} 
                    locations={hyderabadLocations} 
                  />
                </div>
              </div>
            </div>

            {featuredWorkers.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-6 px-1">⭐ Featured Professionals</h2>
                <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                  {featuredWorkers.map(worker => (
                    <RecommendedWorkerCard key={worker.id} worker={worker} onSelect={setSelectedWorker} onBookNow={handleOpenQuickBook} />
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8 px-1">Browse by Category</h2>
            <div className="space-y-12 mb-12">
              {CATEGORY_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary/90 mb-6 px-1">{section.title}</h3>
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
          </>
        ) : (
          // Worker List View
          <div>
            <button onClick={handleBack} className="flex items-center gap-2 mb-4 text-primary hover:text-accent font-semibold transition-colors">
              <BackArrowIcon />
              Back
            </button>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-text-primary">{listContext.title}</h2>
            <p className="text-text-secondary mb-6">Showing professionals sorted by proximity.</p>
            
            { listContext.fromCategory && (isLoadingTip || aiTip) &&
              <div className="bg-surface border-l-4 border-accent p-4 rounded-r-lg mb-6 flex items-start gap-4 shadow-lg">
                <SparklesIcon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold font-display text-primary">Pro Tip</h3>
                  {isLoadingTip ? (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <LoadingIcon />
                      <span>Generating a helpful tip...</span>
                    </div>
                  ) : (
                    <p className="text-text-secondary">{aiTip}</p>
                  )}
                </div>
              </div>
            }

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder={`Filter by name or specific skill...`} />
            
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
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-text-secondary mt-10 py-16 border-2 border-dashed border-border/60 rounded-lg">
                <UserGroupIcon className="mx-auto h-16 w-16 text-border" />
                <h3 className="mt-4 text-xl font-display font-medium text-text-primary">No professionals found</h3>
                <p className="mt-2 text-base text-text-secondary">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />

      {/* Modals & Drawers */}
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
      
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
      {isBookingsOpen && <BookingsModal onClose={() => setIsBookingsOpen(false)} />}
    </div>
  );
};

export default HomePage;