import React, { useEffect, useRef } from 'react';
import { X, Bookmark } from 'lucide-react';
import type { Article } from '../../types';
import { useResourceStore } from '../../store/resourceStore';

type ArticleViewProps = {
  article: Article;
  onClose: () => void;
  relatedArticles: Article[];
  onArticleSelect: (article: Article) => void;
};

export default function ArticleView({ article, onClose, relatedArticles, onArticleSelect }: ArticleViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { bookmarks, toggleBookmark, updateReadProgress } = useResourceStore();
  const isBookmarked = bookmarks.includes(article.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = Math.round((entry.intersectionRatio * 100));
            updateReadProgress(article.id, progress);
          }
        });
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [article.id, updateReadProgress]);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <X className="w-4 h-4" /> Back to Library
        </button>
        <button
          onClick={() => toggleBookmark(article.id)}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary-600' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>

      <h4 className="text-xl font-semibold text-primary-800 mb-2">
        {article.title}
      </h4>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-accent-600">{article.readTime}</span>
        <div className="flex gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="text-gray-600 mb-6">{article.description}</p>

      <div ref={contentRef} className="prose prose-primary max-w-none mb-8">
        {article.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      {relatedArticles.length > 0 && (
        <div className="border-t pt-6">
          <h5 className="font-medium text-primary-800 mb-4">Related Articles</h5>
          <div className="grid gap-4">
            {relatedArticles.map((relatedArticle) => (
              <button
                key={relatedArticle.id}
                onClick={() => onArticleSelect(relatedArticle)}
                className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <h6 className="font-medium text-primary-700 mb-1">{relatedArticle.title}</h6>
                <p className="text-sm text-gray-600">{relatedArticle.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}