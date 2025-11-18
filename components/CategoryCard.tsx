import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const Icon = category.icon;
  return (
    <div
      onClick={() => onSelect(category)}
      className="bg-softWhite p-4 rounded-2xl soft-shadow hover-lift cursor-pointer flex flex-col items-center justify-center text-center aspect-square group"
    >
      <div className="bg-ivoryWhite rounded-full p-3 sm:p-4 mb-3 soft-shadow-inset transition-all duration-300 group-hover:bg-goldAccent/10">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-royalBlue transition-colors duration-300 group-hover:text-goldAccent" />
      </div>
      <span className="font-semibold text-charcoalBlack text-center text-sm">{category.name}</span>
    </div>
  );
};

export default CategoryCard;