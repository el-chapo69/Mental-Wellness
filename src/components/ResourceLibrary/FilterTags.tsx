import React from 'react';

type FilterTagsProps = {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

export default function FilterTags({ allTags, selectedTags, onToggleTag }: FilterTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onToggleTag(tag)}
          className={`px-3 py-1 rounded-full text-sm transition-colors
            ${selectedTags.includes(tag)
              ? 'bg-accent-100 text-accent-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}