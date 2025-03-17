const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function searchRecipes(ingredients: string[], diet?: string) {
  try {
    if (!SPOONACULAR_API_KEY) {
      throw new Error('Clé API Spoonacular non configurée');
    }

    const ingredientsStr = ingredients.join(',');
    const dietParam = diet ? `&diet=${diet}` : '';
    
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${ingredientsStr}&number=10${dietParam}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la recherche de recettes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    return [];
  }
}

export async function getAIRecipeSuggestion(ingredients: string[]) {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('Clé API OpenAI non configurée');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Suggère une recette utilisant les ingrédients suivants: ${ingredients.join(', ')}. Format: Titre de la recette, liste des ingrédients, étapes de préparation.`
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la génération de suggestion');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erreur API GPT:', error);
    return null;
  }
}