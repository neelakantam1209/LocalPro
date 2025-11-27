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
      className="bg-surface p-4 rounded-2xl shadow-md hover-lift cursor-pointer flex flex-col items-center justify-center text-center aspect-square group"
    >
      <div className="bg-background rounded-full p-3 sm:p-4 mb-3 shadow-inner transition-all duration-300 group-hover:bg-accent-subtle">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-colors duration-300 group-hover:text-accent" />
      </div>
      <span className="font-semibold text-text-primary text-center text-sm">{category.name}</span>
    </div>
  );
};

export default CategoryCard;