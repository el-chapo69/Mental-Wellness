import { Brain, Heart, Coffee, Moon, Users, Sparkles } from 'lucide-react';
import type { ResourceCategory } from '../../types';

const resourceData: ResourceCategory[] = [
  {
    category: 'Mindfulness',
    icon: Brain,
    articles: [
      {
        id: 'meditation-101',
        title: 'Getting Started with Meditation',
        description: 'A beginner\'s guide to establishing a daily meditation practice.',
        readTime: '5 min',
        tags: ['Beginner', 'Meditation'],
        content: `Meditation is a powerful practice that can transform your mental well-being. Start with these simple steps:

1. Find a quiet space
2. Set a timer for 5 minutes
3. Focus on your breath
4. When your mind wanders, gently bring it back
5. Practice daily, gradually increasing duration`,
        category: 'Mindfulness'
      },
      {
        id: 'mindfulness-science',
        title: 'The Science of Mindfulness',
        description: 'Research-backed benefits of mindfulness on brain structure and mental health.',
        readTime: '8 min',
        tags: ['Science', 'Research'],
        content: `Recent studies have shown that regular mindfulness practice can:

- Reduce stress and anxiety
- Improve focus and concentration
- Enhance emotional regulation
- Boost immune system function
- Promote better sleep quality`,
        category: 'Mindfulness'
      },
      {
        id: 'mindful-walking',
        title: 'Mindful Walking Practice',
        description: 'Transform your daily walk into a powerful mindfulness exercise.',
        readTime: '6 min',
        tags: ['Exercise', 'Outdoors'],
        content: `Turn your regular walk into a mindful experience:

1. Start with awareness of your feet touching the ground
2. Notice the rhythm of your steps
3. Observe your surroundings without judgment
4. Feel the air on your skin
5. Listen to the sounds around you`,
        category: 'Mindfulness'
      }
    ]
  },
  {
    category: 'Self-Care',
    icon: Heart,
    articles: [
      {
        id: 'self-care-routine',
        title: 'Building a Self-Care Routine',
        description: 'Design a personalized self-care practice that fits your lifestyle.',
        readTime: '7 min',
        tags: ['Lifestyle', 'Routine'],
        content: `Create a sustainable self-care routine:

1. Start small with 5-10 minutes daily
2. Choose activities you genuinely enjoy
3. Schedule specific times for self-care
4. Include both physical and mental activities
5. Adjust your routine as needed`,
        category: 'Self-Care'
      },
      {
        id: 'digital-wellness',
        title: 'Digital Wellness Guide',
        description: 'Managing screen time and creating healthy digital boundaries.',
        readTime: '6 min',
        tags: ['Technology', 'Balance'],
        content: `Maintain digital wellness with these strategies:

- Set specific times for checking emails
- Use screen time tracking apps
- Create device-free zones at home
- Practice regular digital detoxes
- Use blue light filters in the evening`,
        category: 'Self-Care'
      },
      {
        id: 'boundaries',
        title: 'The Art of Saying No',
        description: 'Setting boundaries and prioritizing your mental well-being.',
        readTime: '5 min',
        tags: ['Boundaries', 'Growth'],
        content: `Learn to set healthy boundaries:

1. Recognize your limits
2. Use clear, direct language
3. Don't over-explain
4. Practice self-compassion
5. Remember it's okay to prioritize yourself`,
        category: 'Self-Care'
      }
    ]
  }
];

export default resourceData;