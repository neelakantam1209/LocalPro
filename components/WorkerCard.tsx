import React from 'react';
import { Worker } from '../types';
import { HeartIcon, CartIcon, BriefcaseIcon } from './icons';
import StarRating from './StarRating';

export const WorkerCard: React.FC<{
  worker: Worker;
  onSelect: (worker: Worker) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBookNow: (worker: Worker) => void;
  onAddToCart?: (worker: Worker) => void;
}> = ({ worker, onSelect, isFavorite, onToggleFavorite, onBookNow, onAddToCart }) => {
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(worker);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookNow(worker);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set data for drop
    e.dataTransfer.setData("workerId", worker.id.toString());
    e.dataTransfer.setData("workerName", worker.name);
    e.dataTransfer.setData("categoryName", worker.categoryName);
    e.dataTransfer.setData("price", (worker.hourlyRate || 500).toString());
    e.dataTransfer.setData("image", worker.photo);
    
    // Create a ghost effect
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onSelect(worker)}
      className="bg-surface rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-grab active:cursor-grabbing border border-border flex flex-col group h-full relative"
    >
      <div className="p-4 flex-grow relative">
         <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-surface/80 hover:bg-surface text-text-secondary hover:text-error transition-colors z-10 shadow-sm backdrop-blur-sm"
          aria-label="Toggle Favorite"
        >
          <HeartIcon isFilled={isFavorite} className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <img
            src={worker.photo}
            alt={worker.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white shadow-md flex-shrink-0 pointer-events-none"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold font-display text-text-primary truncate group-hover:text-primary transition-colors">
              {worker.name}
            </h3>
            <p className="text-sm font-semibold text-primary mb-1">
              {worker.categoryName}
            </p>
            
            <StarRating rating={worker.rating} count={worker.reviewCount} size="sm" />
            
            <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                 <span>{worker.city}</span>
                 <span className="w-1 h-1 bg-text-tertiary rounded-full"></span>
                 <div className="flex items-center gap-1">
                    <BriefcaseIcon className="w-3 h-3"/>
                    <span>{worker.jobsCompleted} jobs</span>
                 </div>
            </div>
             {worker.hourlyRate && <p className="text-sm font-semibold text-text-primary mt-2">₹{worker.hourlyRate}/hr</p>}
          </div>
        </div>
        
        <p className="text-sm text-text-secondary mt-3 line-clamp-2">{worker.bio}</p>
        
        {/* Badges Preview */}
        {worker.badges && worker.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
                {worker.badges.slice(0, 2).map((badge, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-primary-subtle text-primary text-[10px] uppercase font-bold tracking-wide rounded-md">
                        {badge}
                    </span>
                ))}
            </div>
        )}
      </div>

      <div className="mt-auto px-4 pb-4 pt-3 border-t border-border/50 flex gap-2">
         {onAddToCart && (
            <button
                onClick={handleAddToCart}
                className="flex-1 bg-surface text-primary border border-primary font-semibold text-sm py-2 px-3 rounded-xl shadow-sm hover:bg-primary-subtle transition-colors flex items-center justify-center gap-1"
            >
                <CartIcon className="w-4 h-4"/> Add
            </button>
         )}
        <button
          onClick={handleBookNow}
          className="flex-1 bg-secondary text-white font-semibold text-sm py-2 px-3 rounded-xl shadow-md hover:bg-black transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};
