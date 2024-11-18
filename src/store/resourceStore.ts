import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article } from '../types';

type ResourceStore = {
  bookmarks: string[];
  readProgress: { [key: string]: number };
  toggleBookmark: (articleId: string) => void;
  updateReadProgress: (articleId: string, progress: number) => void;
};

export const useResourceStore = create<ResourceStore>()(
  persist(
    (set) => ({
      bookmarks: [],
      readProgress: {},

      toggleBookmark: (articleId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(articleId)
            ? state.bookmarks.filter((id) => id !== articleId)
            : [...state.bookmarks, articleId],
        })),

      updateReadProgress: (articleId, progress) =>
        set((state) => ({
          readProgress: {
            ...state.readProgress,
            [articleId]: progress,
          },
        })),
    }),
    {
      name: 'resource-store',
    }
  )
);