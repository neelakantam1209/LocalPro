import React from 'react';
import { Worker } from '../types';
import { HeartIcon, StarIcon, CartIcon } from './icons';

export const WorkerCard: React.FC<{
  worker: Worker;
  onSelect: (worker: Worker) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBookNow: (worker: Worker) => void;
  onAddToCart?: (worker: Worker) => void;
}> = ({ worker, onSelect, isFavorite, onToggleFavorite, onBookNow, onAddToCart }) => {
  
  return (
    <div
      onClick={() => onSelect(worker)}
      className="bg-surface rounded-2xl shadow-lg hover-lift cursor-pointer border border-border flex flex-col group"
    >
      <div className="p-4 flex-grow relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-background/50 hover:bg-background transition-colors z-10"
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
            <h3 className="text-lg font-bold font-display text-text-primary truncate group-hover:text-primary transition-colors">
              {worker.name}
            </h3>
            <p className="text-sm font-semibold text-primary">
              {worker.categoryName}
            </p>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <StarIcon className="w-4 h-4 text-accent" />
              <span className="font-bold text-text-primary">
                {worker.rating.toFixed(1)}
              </span>
              <span className="text-text-secondary text-xs">
                ({worker.reviewCount} reviews)
              </span>
            </div>
            <p className="text-xs text-text-tertiary mt-1">{worker.city}</p>
             {worker.hourlyRate && <p className="text-sm font-semibold text-text-primary mt-1">₹{worker.hourlyRate}/hr</p>}
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-3 line-clamp-2">{worker.bio}</p>
      </div>
      <div className="mt-auto px-4 pb-4 pt-3 border-t border-border/50 flex gap-2">
         {onAddToCart && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(worker);
                }}
                className="flex-1 bg-white text-primary border border-primary font-semibold text-sm py-2 px-3 rounded-md shadow-sm hover:bg-primary-subtle transition-colors flex items-center justify-center gap-1"
            >
                <CartIcon className="w-4 h-4"/> Add
            </button>
         )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookNow(worker);
          }}
          className="flex-1 bg-secondary text-white font-semibold text-sm py-2 px-3 rounded-md shadow-md hover:bg-black transition-colors"
          aria-label={`Book ${worker.name}`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};