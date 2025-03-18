<script lang="ts">
  import { onMount } from 'svelte';
  import { favorites } from './lib/stores';
  import { searchRecipes, getAIRecipeSuggestion } from './lib/api';
  import type { Recipe, DietFilter } from './lib/types';

  let ingredients: string[] = [];
  let inputValue = '';
  let recipes: Recipe[] = [];
  let loading = false;
  let aiSuggestion: string | null = null;
  let selectedDiet: string = '';

  const dietFilters: DietFilter[] = [
    { id: 'vegetarian', name: 'Végétarien' },
    { id: 'vegan', name: 'Végan' },
    { id: 'glutenFree', name: 'Sans Gluten' },
    { id: 'dairyFree', name: 'Sans Lactose' }
  ];

  async function handleSearch() {
    if (ingredients.length === 0) return;
    
    loading = true;
    try {
      recipes = await searchRecipes(ingredients, selectedDiet);
      aiSuggestion = await getAIRecipeSuggestion(ingredients);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      loading = false;
    }
  }

  function addIngredient() {
    if (inputValue.trim()) {
      ingredients = [...ingredients, inputValue.trim()];
      inputValue = '';
    }
  }

  function removeIngredient(index: number) {
    ingredients = ingredients.filter((_, i) => i !== index);
  }

  function toggleFavorite(recipe: Recipe) {
    const isFavorite = $favorites.some(f => f.id === recipe.id);
    if (isFavorite) {
      favorites.removeFavorite(recipe.id);
    } else {
      favorites.addFavorite(recipe);
    }
  }
</script>

<main class="min-h-screen bg-black text-gray-100 p-4 pb-20">
  <div class="max-w-6xl mx-auto">
    <header class="py-20 text-center">
      <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        AI-Powered Recipe Finder
      </h1>
      <p class="text-xl text-gray-400">Découvrez des recettes uniques avec l'aide de l'IA</p>
    </header>

    <div class="glass-effect rounded-2xl p-8 mb-12">
      <div class="flex gap-4 mb-6">
        <input
          type="text"
          bind:value={inputValue}
          placeholder="Entrez un ingrédient"
          class="flex-1 input-dark rounded-xl px-4 py-3"
          on:keydown={e => e.key === 'Enter' && addIngredient()}
        />
        <button
          on:click={addIngredient}
          class="apple-button px-6 py-3 rounded-xl text-white font-semibold"
        >
          Ajouter
        </button>
      </div>

      <div class="flex flex-wrap gap-2 mb-6">
        {#each ingredients as ingredient, i}
          <span class="bg-gray-800 px-4 py-2 rounded-full flex items-center">
            {ingredient}
            <button
              on:click={() => removeIngredient(i)}
              class="ml-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              ×
            </button>
          </span>
        {/each}
      </div>

      <select
        bind:value={selectedDiet}
        class="w-full input-dark rounded-xl px-4 py-3 mb-6"
      >
        <option value="">Tous les régimes</option>
        {#each dietFilters as filter}
          <option value={filter.id}>{filter.name}</option>
        {/each}
      </select>

      <button
        on:click={handleSearch}
        disabled={ingredients.length === 0 || loading}
        class="w-full apple-button py-4 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Recherche en cours...' : 'Rechercher des recettes'}
      </button>
    </div>

    {#if loading}
      <div class="text-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-apple-accent mx-auto"></div>
      </div>
    {:else}
      {#if aiSuggestion}
        <div class="glass-effect rounded-2xl p-8 mb-12">
          <h2 class="text-2xl font-bold mb-6 text-apple-accent">Suggestion de l'IA</h2>
          <div class="whitespace-pre-line text-gray-300">{aiSuggestion}</div>
        </div>
      {/if}

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each recipes as recipe}
          <div class="recipe-card glass-effect rounded-2xl overflow-hidden">
            <div class="relative h-64">
              <img
                src={recipe.image}
                alt={recipe.title}
                class="w-full h-full object-cover"
              />
              <button
                on:click={() => toggleFavorite(recipe)}
                class="absolute top-4 right-4 text-2xl text-white hover:text-red-500 transition-colors"
              >
                {$favorites.some(f => f.id === recipe.id) ? '♥' : '♡'}
              </button>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{recipe.title}</h3>
              <div class="text-sm text-gray-400">
                <p class="mb-2">Ingrédients utilisés: {recipe.usedIngredients.length}</p>
                <p>Ingrédients manquants: {recipe.missedIngredients.length}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
  }
</style>