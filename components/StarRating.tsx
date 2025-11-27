import React from 'react';
import { StarIcon } from './icons';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, count, size = 'sm', showCount = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSizeClass = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  const textSizeClass = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className={`${starSizeClass} text-yellow-400`} />
        ))}
        {hasHalfStar && (
           // Half star visual approximation using clip-path or simple opacity overlay
           <div className="relative">
             <StarIcon className={`${starSizeClass} text-gray-300`} />
             <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                <StarIcon className={`${starSizeClass} text-yellow-400`} />
             </div>
           </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className={`${starSizeClass} text-gray-300`} />
        ))}
      </div>
      <span className={`${textSizeClass} font-bold text-text-primary ml-1`}>{rating.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className={`${textSizeClass} text-text-secondary`}>({count} reviews)</span>
      )}
    </div>
  );
};

export default StarRating;