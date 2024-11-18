import React from 'react';
import type { ResourceCategory } from '../../types';

type CategoryFilterProps = {
  categories: ResourceCategory[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1 rounded-full text-sm transition-colors
          ${!selectedCategory
            ? 'bg-primary-100 text-primary-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.category}
          onClick={() => onSelectCategory(category.category)}
          className={`px-3 py-1 rounded-full text-sm transition-colors
            ${selectedCategory === category.category
              ? 'bg-primary-100 text-primary-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {category.category}
        </button>
      ))}
    </div>
  );
}