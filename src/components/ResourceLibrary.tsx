import React, { useState } from 'react';
import { Book, Brain, Heart, Coffee, Moon, Users, Sparkles, Search, X } from 'lucide-react';

const resources = [
  {
    category: 'Mindfulness',
    icon: Brain,
    articles: [
      {
        title: 'Getting Started with Meditation',
        description: 'A beginner\'s guide to establishing a daily meditation practice.',
        readTime: '5 min',
        tags: ['Beginner', 'Meditation'],
        content: `Meditation is a powerful practice that can transform your mental well-being. Start with these simple steps:

1. Find a quiet space
2. Set a timer for 5 minutes
3. Focus on your breath
4. When your mind wanders, gently bring it back
5. Practice daily, gradually increasing duration`
      },
      {
        title: 'The Science of Mindfulness',
        description: 'Research-backed benefits of mindfulness on brain structure and mental health.',
        readTime: '8 min',
        tags: ['Science', 'Research'],
        content: `Recent studies have shown that regular mindfulness practice can:

- Reduce stress and anxiety
- Improve focus and concentration
- Enhance emotional regulation
- Boost immune system function
- Promote better sleep quality`
      },
      {
        title: 'Mindful Walking Practice',
        description: 'Transform your daily walk into a powerful mindfulness exercise.',
        readTime: '6 min',
        tags: ['Exercise', 'Outdoors'],
        content: `Turn your regular walk into a mindful experience:

1. Start with awareness of your feet touching the ground
2. Notice the rhythm of your steps
3. Observe your surroundings without judgment
4. Feel the air on your skin
5. Listen to the sounds around you`
      }
    ]
  },
  {
    category: 'Self-Care',
    icon: Heart,
    articles: [
      {
        title: 'Building a Self-Care Routine',
        description: 'Design a personalized self-care practice that fits your lifestyle.',
        readTime: '7 min',
        tags: ['Lifestyle', 'Routine'],
        content: `Create a sustainable self-care routine:

1. Start small with 5-10 minutes daily
2. Choose activities you genuinely enjoy
3. Schedule specific times for self-care
4. Include both physical and mental activities
5. Adjust your routine as needed`
      },
      {
        title: 'Digital Wellness Guide',
        description: 'Managing screen time and creating healthy digital boundaries.',
        readTime: '6 min',
        tags: ['Technology', 'Balance'],
        content: `Maintain digital wellness with these strategies:

- Set specific times for checking emails
- Use screen time tracking apps
- Create device-free zones at home
- Practice regular digital detoxes
- Use blue light filters in the evening`
      },
      {
        title: 'The Art of Saying No',
        description: 'Setting boundaries and prioritizing your mental well-being.',
        readTime: '5 min',
        tags: ['Boundaries', 'Growth'],
        content: `Learn to set healthy boundaries:

1. Recognize your limits
2. Use clear, direct language
3. Don't over-explain
4. Practice self-compassion
5. Remember it's okay to prioritize yourself`
      }
    ]
  }
  // ... rest of the resources remain the same
];

export default function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const allTags = Array.from(
    new Set(
      resources.flatMap(category =>
        category.articles.flatMap(article => article.tags)
      )
    )
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredResources = resources
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
    .filter(category => category.articles.length > 0);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary-800">Resource Library</h3>
        <Book className="w-5 h-5 text-primary-600" />
      </div>

      {selectedArticle ? (
        <div className="animate-fadeIn">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <X className="w-4 h-4" /> Back to Library
          </button>
          <h4 className="text-xl font-semibold text-primary-800 mb-2">
            {selectedArticle.title}
          </h4>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-accent-600">{selectedArticle.readTime}</span>
            <div className="flex gap-2">
              {selectedArticle.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-6">{selectedArticle.description}</p>
          <div className="prose prose-primary max-w-none">
            {selectedArticle.content.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${!selectedCategory
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                All
              </button>
              {resources.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
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

            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
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
          </div>

          <div className="space-y-8">
            {filteredResources.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-2 mb-4">
                  <category.icon className="w-5 h-5 text-primary-600" />
                  <h4 className="font-medium text-primary-700">{category.category}</h4>
                </div>
                
                <div className="grid gap-4">
                  {category.articles.map((article) => (
                    <button
                      key={article.title}
                      onClick={() => setSelectedArticle(article)}
                      className="p-4 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50
                        hover:from-primary-100 hover:to-accent-100 transition-all duration-300
                        transform hover:scale-[1.02] text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-primary-800">{article.title}</h5>
                        <span className="text-sm text-accent-600">{article.readTime}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                      <div className="flex gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-white/50 text-primary-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
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