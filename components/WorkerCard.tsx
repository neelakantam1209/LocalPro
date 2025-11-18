import React from 'react';
import { Worker } from '../types';
import { HeartIcon, StarIcon } from './icons';

export const WorkerCard: React.FC<{
  worker: Worker;
  onSelect: (worker: Worker) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBookNow: (worker: Worker) => void;
}> = ({ worker, onSelect, isFavorite, onToggleFavorite, onBookNow }) => {
  return (
    <div
      onClick={() => onSelect(worker)}
      className="glassmorphism rounded-2xl shadow-lg hover-lift cursor-pointer border border-goldAccent/20 flex flex-col group"
    >
      <div className="p-4 flex-grow relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-colors z-10"
          aria-label="Toggle Favorite"
        >
          <HeartIcon isFilled={isFavorite} />
        </button>
        <div className="flex items-start gap-4">
          <img
            src={worker.photo}
            alt={worker.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white shadow-md"
          />
          <div className="flex-1 overflow-hidden">
            <h3 className="text-lg font-bold font-display text-charcoalBlack truncate group-hover:text-royalBlue transition-colors">
              {worker.name}
            </h3>
            <p className="text-sm font-semibold text-royalBlue">
              {worker.categoryName}
            </p>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <StarIcon className="w-4 h-4 text-goldAccent" />
              <span className="font-bold text-charcoalBlack">
                {worker.rating.toFixed(1)}
              </span>
              <span className="text-slateGray text-xs">
                ({worker.reviewCount} reviews)
              </span>
            </div>
            <p className="text-xs text-silverGray mt-1">{worker.city}</p>
          </div>
        </div>
        <p className="text-sm text-slateGray mt-3 line-clamp-2">{worker.bio}</p>
      </div>
      <div className="mt-auto px-4 pb-4 pt-3 border-t border-goldAccent/10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookNow(worker);
          }}
          className="w-full bg-luxuryGold text-charcoalBlack font-semibold text-sm py-2 px-3 rounded-md shadow-md hover:bg-goldAccent transition-colors btn-gold-glow"
          aria-label={`Book ${worker.name}`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};