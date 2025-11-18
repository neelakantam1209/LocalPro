import React from 'react';
import { Worker } from '../types';
import { StarIcon, PhoneIcon, CalendarIcon } from './icons';

interface RecommendedWorkerCardProps {
  worker: Worker;
  onSelect: (worker: Worker) => void;
  onBookNow: (worker: Worker) => void;
}

const RecommendedWorkerCard: React.FC<RecommendedWorkerCardProps> = ({ worker, onSelect, onBookNow }) => {
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookNow(worker);
  };
  
  return (
    <div
      onClick={() => onSelect(worker)}
      className="glassmorphism rounded-2xl shadow-lg hover-lift cursor-pointer flex-shrink-0 w-72 border border-goldAccent/20 flex flex-col"
    >
      <div className="p-4 flex items-center gap-4">
        <img src={worker.photo} alt={worker.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" />
        <div className="flex-1 overflow-hidden">
          <h3 className="text-lg font-bold font-display text-charcoalBlack truncate">{worker.name}</h3>
          <p className="text-sm text-slateGray">{worker.categoryName}</p>
          <div className="flex items-center gap-1 mt-1 text-sm">
            <StarIcon className="w-4 h-4 text-goldAccent" />
            <span className="font-bold text-charcoalBlack">{worker.rating.toFixed(1)}</span>
            <span className="text-slateGray text-xs">({worker.reviewCount})</span>
          </div>
        </div>
      </div>
      <div className="mt-auto px-4 pb-4 pt-3 border-t border-goldAccent/10">
          <div className="flex gap-2">
            <a 
                href={`tel:${worker.phone}`}
                onClick={handleActionClick}
                className="flex-1 flex justify-center items-center gap-2 bg-emeraldGreen text-white font-semibold text-sm py-2 px-3 rounded-md shadow-md hover:bg-emeraldGreen/90 transition-colors btn-green-glow"
                aria-label={`Call ${worker.name}`}
            >
                <PhoneIcon className="w-4 h-4" />
                <span>Call Now</span>
            </a>
            <button 
                onClick={handleBookClick}
                className="flex-1 flex justify-center items-center gap-2 bg-luxuryGold text-charcoalBlack font-semibold text-sm py-2 px-3 rounded-md shadow-md hover:bg-goldAccent transition-colors btn-gold-glow"
                aria-label={`Book ${worker.name}`}
            >
                <CalendarIcon className="w-4 h-4" />
                <span>Book Now</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedWorkerCard;