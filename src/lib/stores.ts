import { writable } from 'svelte/store';
import type { Recipe, FavoriteRecipe } from './types';

// Charger les favoris depuis localStorage
const loadFavorites = (): FavoriteRecipe[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

// Créer le store pour les favoris
const createFavoritesStore = () => {
  const { subscribe, set, update } = writable<FavoriteRecipe[]>(loadFavorites());

  return {
    subscribe,
    addFavorite: (recipe: Recipe) => {
      update(favorites => {
        const newFavorite: FavoriteRecipe = {
          ...recipe,
          savedAt: Date.now()
        };
        const newFavorites = [...favorites, newFavorite];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      });
    },
    removeFavorite: (id: number) => {
      update(favorites => {
        const newFavorites = favorites.filter(f => f.id !== id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      });
    }
  };
};

export const favorites = createFavoritesStore();