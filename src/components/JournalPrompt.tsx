import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { JournalEntry } from '../types';

const prompts = [
  "What made you smile today?",
  "What's one thing you're grateful for right now?",
  "What's a challenge you're facing, and how can you overcome it?",
  "Describe your ideal peaceful moment.",
  "What's one thing you'd like to improve about yourself?",
];

export default function JournalPrompt() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [content, setContent] = useState('');

  const newPrompt = () => {
    const index = Math.floor(Math.random() * prompts.length);
    setCurrentPrompt(prompts[index]);
  };

  const saveEntry = () => {
    if (!content.trim()) return;
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      prompt: currentPrompt,
      content,
    };
    
    setEntries([...entries, newEntry]);
    setContent('');
    newPrompt();
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary-800">Journal</h3>
        <BookOpen className="w-5 h-5 text-primary-600" />
      </div>

      <div className="mb-6">
        <p className="text-lg text-primary-700 mb-3 font-medium">{currentPrompt}</p>
        <button
          onClick={newPrompt}
          className="text-sm text-accent-600 hover:text-accent-700 font-medium"
        >
          Get another prompt →
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here..."
        className="input-field mb-4"
        rows={5}
      />

      <button onClick={saveEntry} className="btn btn-primary w-full">
        Save Entry
      </button>

      {entries.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-primary-800 mb-3">Previous Entries</h4>
          <div className="space-y-3">
            {entries.slice(-2).reverse().map((entry) => (
              <div key={entry.id} className="p-4 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-primary-600">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-primary-700 italic mb-2">{entry.prompt}</p>
                <p className="text-sm text-gray-700">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}