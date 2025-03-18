export interface Recipe {
  id: number;
  title: string;
  image: string;
  missedIngredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
  usedIngredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
}

export interface DietFilter {
  id: string;
  name: string;
}

export interface FavoriteRecipe extends Recipe {
  savedAt: number;
}