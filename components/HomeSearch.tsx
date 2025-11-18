import React, { useState, useEffect } from 'react';
import { SearchIcon, LocationPinIcon, GpsIcon } from './icons';

interface HomeSearchProps {
    initialLocation: string;
    onSearch: (service: string, location: string) => void;
    onDetectLocation: () => void;
    locations: string[];
}

const HomeSearch: React.FC<HomeSearchProps> = ({ initialLocation, onSearch, onDetectLocation, locations }) => {
    const [service, setService] = useState('');
    const [location, setLocation] = useState(initialLocation);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        setLocation(initialLocation);
    }, [initialLocation]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(service, location);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);

        if (value.trim().length > 1) {
            const filtered = locations.filter(loc =>
                loc.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setLocation(suggestion);
        setSuggestions([]);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="glassmorphism p-3 rounded-2xl flex flex-col md:flex-row items-center gap-2 border-goldAccent/20 shadow-xl"
        >
            <div className="relative flex-grow w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="text-slateGray" />
                </div>
                <input
                    type="text"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="🔧 What service do you need?"
                    className="w-full pl-11 pr-4 py-3 bg-transparent focus:outline-none text-charcoalBlack font-medium placeholder-slateGray"
                />
            </div>
            <div className="w-full md:w-px h-px md:h-8 bg-coolGray/30"></div>
            <div className="relative flex-grow w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LocationPinIcon className="w-5 h-5 text-slateGray" />
                </div>
                <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    onBlur={() => setTimeout(() => setSuggestions([]), 200)}
                    placeholder="📍 Where in Hyderabad?"
                    className="w-full pl-11 pr-10 py-3 bg-transparent focus:outline-none text-charcoalBlack font-medium placeholder-slateGray"
                    autoComplete="off"
                />
                <button 
                    type="button" 
                    onClick={onDetectLocation} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slateGray hover:text-royalBlue transition-colors"
                    aria-label="Use my location"
                >
                    <GpsIcon />
                </button>
                {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-softWhite rounded-xl shadow-lg border border-coolGray">
                        <ul className="max-h-60 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onMouseDown={() => handleSuggestionClick(suggestion)}
                                    className="px-4 py-3 cursor-pointer hover:bg-coolGray/50 transition-colors text-charcoalBlack"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="bg-luxuryGold hover:bg-goldAccent text-charcoalBlack font-bold font-sans py-3 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto hover:-translate-y-px"
                aria-label="Search"
            >
                Search
            </button>
        </form>
    );
};

export default HomeSearch;