import React from 'react';
import { Bookmark } from 'lucide-react';
import type { Article } from '../../types';
import { useResourceStore } from '../../store/resourceStore';

type ArticleCardProps = {
  article: Article;
  onClick: () => void;
};

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const { bookmarks, toggleBookmark, readProgress } = useResourceStore();
  const isBookmarked = bookmarks.includes(article.id);
  const progress = readProgress[article.id] || 0;

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  return (
    <button
      onClick={onClick}
      className="p-4 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50
        hover:from-primary-100 hover:to-accent-100 transition-all duration-300
        transform hover:scale-[1.02] text-left relative group"
    >
      <div className="flex items-center justify-between mb-2">
        <h5 className="font-medium text-primary-800">{article.title}</h5>
        <div className="flex items-center gap-2">
          <span className="text-sm text-accent-600">{article.readTime}</span>
          <button
            onClick={handleBookmark}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-primary-600 text-primary-600' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{article.description}</p>
      <div className="flex gap-2 mb-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-white/50 text-primary-600"
          >
            {tag}
          </span>
        ))}
      </div>
      {progress > 0 && (
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </button>
  );
}