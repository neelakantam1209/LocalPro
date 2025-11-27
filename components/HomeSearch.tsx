import React, { useState, useEffect } from 'react';
import { SearchIcon, LocationPinIcon, GpsIcon } from './icons';
import { ALL_CATEGORIES } from '../data/mockData';

interface HomeSearchProps {
    initialLocation: string;
    onSearch: (service: string, location: string) => void;
    onDetectLocation: () => void;
    locations: string[];
}

const HomeSearch: React.FC<HomeSearchProps> = ({ initialLocation, onSearch, onDetectLocation, locations }) => {
    const [service, setService] = useState('');
    const [location, setLocation] = useState(initialLocation);

    useEffect(() => {
        setLocation(initialLocation);
    }, [initialLocation]);

    // FIX: Removed the useEffect that triggered onSearch automatically on state change.
    // This prevents the app from auto-redirecting to the worker list view when the default location is loaded.

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(service, location);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-surface p-3 rounded-2xl flex flex-col md:flex-row items-center gap-2 border border-border shadow-xl"
        >
            <div className="relative flex-grow w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="text-text-secondary" />
                </div>
                {/* Replaced Text Input with Select for Categories */}
                <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-transparent focus:outline-none text-text-primary font-medium appearance-none cursor-pointer"
                >
                    <option value="">All Services</option>
                    {ALL_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="w-full md:w-px h-px md:h-8 bg-border"></div>
            
            <div className="relative flex-grow w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LocationPinIcon className="w-5 h-5 text-text-secondary" />
                </div>
                 {/* Replaced Text Input with Select for Location */}
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-transparent focus:outline-none text-text-primary font-medium appearance-none cursor-pointer"
                >
                     <option value="">All Locations</option>
                     <option value="Your Current Location">Your Current Location</option>
                     {locations.map(loc => (
                         <option key={loc} value={loc}>{loc}</option>
                     ))}
                </select>
                <button 
                    type="button" 
                    onClick={onDetectLocation} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary transition-colors"
                    aria-label="Use my location"
                >
                    <GpsIcon />
                </button>
            </div>
            
            <button
                type="submit"
                className="bg-secondary hover:bg-black text-white font-bold font-sans py-3 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto hover:-translate-y-px"
                aria-label="Search"
            >
                Search
            </button>
        </form>
    );
};

export default HomeSearch;