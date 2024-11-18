import React, { useState } from 'react';
import { Calendar, Frown, Meh, Smile } from 'lucide-react';
import type { MoodEntry } from '../types';

export default function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [note, setNote] = useState('');

  const addMoodEntry = () => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString(),
      mood: selectedMood,
      note,
    };
    setMoodEntries([...moodEntries, newEntry]);
    setNote('');
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary-800">Mood Tracker</h3>
        <Calendar className="w-5 h-5 text-primary-600" />
      </div>

      <div className="flex justify-center gap-6 mb-6">
        {[1, 2, 3, 4, 5].map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood as 1 | 2 | 3 | 4 | 5)}
            className={`p-4 rounded-full transition-all duration-300 transform
              ${selectedMood === mood 
                ? 'bg-gradient-to-r from-primary-100 to-accent-100 scale-110 shadow-glow' 
                : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'}`}
          >
            {mood <= 2 ? (
              <Frown className={`w-6 h-6 ${selectedMood === mood ? 'text-primary-600' : 'text-gray-600'}`} />
            ) : mood === 3 ? (
              <Meh className={`w-6 h-6 ${selectedMood === mood ? 'text-primary-600' : 'text-gray-600'}`} />
            ) : (
              <Smile className={`w-6 h-6 ${selectedMood === mood ? 'text-primary-600' : 'text-gray-600'}`} />
            )}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="How are you feeling today?"
        className="input-field mb-4"
        rows={3}
      />

      <button onClick={addMoodEntry} className="btn btn-primary w-full">
        Save Mood
      </button>

      {moodEntries.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-primary-800 mb-3">Recent Entries</h4>
          <div className="space-y-3">
            {moodEntries.slice(-3).reverse().map((entry, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-primary-600">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  {entry.mood <= 2 ? (
                    <Frown className="w-4 h-4 text-primary-600" />
                  ) : entry.mood === 3 ? (
                    <Meh className="w-4 h-4 text-primary-600" />
                  ) : (
                    <Smile className="w-4 h-4 text-primary-600" />
                  )}
                </div>
                <p className="text-sm text-gray-700">{entry.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}