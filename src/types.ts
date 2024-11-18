export type MoodEntry = {
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  note: string;
};

export type JournalEntry = {
  id: string;
  date: string;
  prompt: string;
  content: string;
};

export type DashboardTool = {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  tags: string[];
  content: string;
  category: string;
};

export type ResourceCategory = {
  category: string;
  icon: any;
  articles: Article[];
};