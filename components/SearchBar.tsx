import React from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder }) => {
  const isControlled = searchTerm !== undefined && setSearchTerm !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <SearchIcon className="text-slateGray"/>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        {...(isControlled && { value: searchTerm, onChange: handleChange })}
        className="w-full pl-12 pr-4 py-3 border border-coolGray/30 rounded-full focus:ring-2 focus:ring-goldAccent/80 focus:border-goldAccent transition-shadow bg-softWhite soft-shadow-inset text-charcoalBlack placeholder-slateGray"
      />
    </div>
  );
};

export default SearchBar;