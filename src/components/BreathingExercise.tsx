import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export default function BreathingExercise() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          switch (phase) {
            case 'inhale':
              setPhase('hold');
              return 7;
            case 'hold':
              setPhase('exhale');
              return 8;
            case 'exhale':
              setPhase('inhale');
              return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary-800">Breathing Exercise</h3>
        <Timer className="w-5 h-5 text-primary-600" />
      </div>
      
      <div className="flex flex-col items-center">
        <div 
          className={`w-40 h-40 rounded-full flex items-center justify-center mb-6
            transition-all duration-1000 breathe-animation
            ${isActive ? 'bg-gradient-to-r from-primary-100 to-accent-100' : 'bg-gray-100'}
            ${phase === 'inhale' ? 'scale-110' : phase === 'hold' ? 'scale-100' : 'scale-90'}`}
        >
          <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 
            text-transparent bg-clip-text">{counter}</span>
        </div>
        
        <p className="text-lg font-medium text-primary-700 mb-6">
          {phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out'}
        </p>
        
        <button
          onClick={() => setIsActive(!isActive)}
          className={`btn ${isActive ? 'btn-secondary' : 'btn-primary'}`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}