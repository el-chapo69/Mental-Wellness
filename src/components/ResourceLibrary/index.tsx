import React, { useState, useMemo } from 'react';
import { Book } from 'lucide-react';
import type { Article, ResourceCategory } from '../../types';
import { useResourceStore } from '../../store/resourceStore';
import SearchBar from './SearchBar';
import FilterTags from './FilterTags';
import CategoryFilter from './CategoryFilter';
import ArticleCard from './ArticleCard';
import ArticleView from './ArticleView';
import resourceData from './resourceData';

export default function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { bookmarks } = useResourceStore();

  const allTags = useMemo(() => 
    Array.from(
      new Set(
        resourceData.flatMap(category =>
          category.articles.flatMap(article => article.tags)
        )
      )
    ),
    []
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredResources = useMemo(() => 
    resourceData
      .map(category => ({
        ...category,
        articles: category.articles.filter(article => {
          const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = !selectedCategory || category.category === selectedCategory;
          const matchesTags = selectedTags.length === 0 ||
            selectedTags.every(tag => article.tags.includes(tag));
          return matchesSearch && matchesCategory && matchesTags;
        })
      }))
      .filter(category => category.articles.length > 0),
    [searchTerm, selectedCategory, selectedTags]
  );

  const getRelatedArticles = (article: Article): Article[] => {
    const sameCategory = resourceData
      .find(cat => cat.category === article.category)
      ?.articles.filter(a => a.id !== article.id) || [];
    
    const sameTags = resourceData
      .flatMap(cat => cat.articles)
      .filter(a => 
        a.id !== article.id &&
        a.category !== article.category &&
        a.tags.some(tag => article.tags.includes(tag))
      );

    return [...sameCategory, ...sameTags]
      .slice(0, 3);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary-800">Resource Library</h3>
        <Book className="w-5 h-5 text-primary-600" />
      </div>

      {selectedArticle ? (
        <ArticleView
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          relatedArticles={getRelatedArticles(selectedArticle)}
          onArticleSelect={setSelectedArticle}
        />
      ) : (
        <>
          <div className="mb-6 space-y-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />

            <CategoryFilter
              categories={resourceData}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <FilterTags
              allTags={allTags}
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
            />
          </div>

          {bookmarks.length > 0 && (
            <div className="mb-8">
              <h4 className="font-medium text-primary-700 mb-4">Bookmarked Articles</h4>
              <div className="grid gap-4">
                {resourceData
                  .flatMap(cat => cat.articles)
                  .filter(article => bookmarks.includes(article.id))
                  .map(article => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => setSelectedArticle(article)}
                    />
                  ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {filteredResources.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-2 mb-4">
                  <category.icon className="w-5 h-5 text-primary-600" />
                  <h4 className="font-medium text-primary-700">{category.category}</h4>
                </div>
                
                <div className="grid gap-4">
                  {category.articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => setSelectedArticle(article)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredResources.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No resources found matching your criteria.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}