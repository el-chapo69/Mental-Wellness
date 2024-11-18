import React from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="input-field pl-10"
      />
    </div>
  );
}