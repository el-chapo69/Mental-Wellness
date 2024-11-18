import React from 'react';
import { Brain, Heart, Smile, Shield } from 'lucide-react';
import AuthForm from './AuthForm';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Mental Wellness Hub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal space for mental well-being. Track your mood, practice mindfulness,
            and nurture your mental health journey.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Take control of your mental wellness journey
            </h2>

            <div className="grid gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Mindfulness Exercises',
                  description: 'Guided breathing exercises to help you stay centered and calm.',
                },
                {
                  icon: Heart,
                  title: 'Mood Tracking',
                  description: 'Monitor your emotional well-being with our intuitive mood tracker.',
                },
                {
                  icon: Smile,
                  title: 'Guided Journaling',
                  description: 'Express yourself with thought-provoking prompts and personal reflection.',
                },
                {
                  icon: Shield,
                  title: 'Resource Library',
                  description: 'Access curated mental wellness resources and articles.',
                },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <AuthForm />
          </div>
        </div>

        <footer className="text-center text-gray-600 mt-16">
          <p>© {new Date().getFullYear()} Mental Wellness Hub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}