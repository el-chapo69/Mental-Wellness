import { create } from 'zustand';
import type { AuthStore, User } from '../types';

// In a real app, this would be handled by a backend service
const mockUsers: { [key: string]: { password: string; user: User } } = {};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email: string, password: string) => {
    const userAccount = mockUsers[email];
    if (userAccount && userAccount.password === password) {
      set({ user: userAccount.user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  signup: (email: string, password: string, name: string) => {
    if (mockUsers[email]) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };

    mockUsers[email] = { password, user: newUser };
    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));