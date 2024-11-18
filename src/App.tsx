import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useAuthStore } from './store/authStore';
import LandingPage from './components/LandingPage';
import BreathingExercise from './components/BreathingExercise';
import MoodTracker from './components/MoodTracker';
import JournalPrompt from './components/JournalPrompt';
import ResourceLibrary from './components/ResourceLibrary';
import type { DashboardTool } from './types';

const defaultTools: DashboardTool[] = [
  { id: 'breathing', name: 'Breathing Exercise', icon: 'breathing', enabled: true },
  { id: 'mood', name: 'Mood Tracker', icon: 'mood', enabled: true },
  { id: 'journal', name: 'Journal', icon: 'journal', enabled: true },
  { id: 'resources', name: 'Resources', icon: 'resources', enabled: true },
];

function Dashboard() {
  const [tools, setTools] = React.useState(defaultTools);
  const [showSettings, setShowSettings] = React.useState(false);
  const { user, logout } = useAuthStore();

  const toggleTool = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mental Wellness Hub</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </header>

        {showSettings && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Settings</h2>
            <div className="grid gap-3">
              {tools.map(tool => (
                <div key={tool.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{tool.name}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tool.enabled}
                      onChange={() => toggleTool(tool.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.find(t => t.id === 'breathing')?.enabled && <BreathingExercise />}
          {tools.find(t => t.id === 'mood')?.enabled && <MoodTracker />}
          {tools.find(t => t.id === 'journal')?.enabled && <JournalPrompt />}
          {tools.find(t => t.id === 'resources')?.enabled && <ResourceLibrary />}
        </div>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}