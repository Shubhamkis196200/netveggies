import { useParams, Link } from 'react-router-dom';
import { Clock, ChefHat, Users, ArrowDown, Lightbulb } from 'lucide-react';
import { recipes } from '@/data/recipes';
import IngredientsList from '@/components/IngredientsList';
import NutritionFacts from '@/components/NutritionFacts';
import CostBadge from '@/components/CostBadge';
import PinItButton from '@/components/PinItButton';
import PrintButton from '@/components/PrintButton';
import CategoryPill from '@/components/CategoryPill';
import RecipeCard from '@/components/RecipeCard';

export default function RecipePage() {
  const { slug } = useParams();
  const recipe = recipes.find(r => r.slug === slug);
  if (!recipe) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><h1 className="font-heading text-3xl">Recipe not found</h1><Link to="/" className="text-primary mt-4 inline-block">← Back to recipes</Link></div>;

  const related = recipes.filter(r => r.id !== recipe.id && r.categories.some(c => recipe.categories.includes(c))).slice(0, 4);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.image,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.categories[0],
    recipeCuisine: "Vegan",
    keywords: recipe.tags.join(', '),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein}g`,
      carbohydrateContent: `${recipe.nutrition.carbs}g`,
      fatContent: `${recipe.nutrition.fat}g`,
      fiberContent: `${recipe.nutrition.fiber}g`,
    },
    recipeIngredient: recipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`.trim()),
    recipeInstructions: recipe.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s.instruction })),
    datePublished: recipe.datePublished,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.categories.map(c => (
              <CategoryPill key={c} name={c.charAt(0).toUpperCase() + c.slice(1)} slug={c} />
            ))}
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-3">{recipe.title}</h1>
          <p className="text-white/80 text-lg max-w-xl">{recipe.description}</p>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-cream border-b border-border no-print">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm text-dark">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" /> Prep: {recipe.prepTime}min</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Cook: {recipe.cookTime}min</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-muted" /> {recipe.servings} servings</span>
            <span className="flex items-center gap-1.5"><ChefHat className="w-4 h-4 text-muted" /> {recipe.difficulty}</span>
            <CostBadge cost={recipe.costPerServing} />
          </div>
          <a href="#recipe-card" className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent/90 transition-colors flex items-center gap-1">
            <ArrowDown className="w-4 h-4" /> Jump to Recipe
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10" id="recipe-card">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            {/* Ingredients */}
            <IngredientsList ingredients={recipe.ingredients} baseServings={recipe.servings} />

            {/* Steps */}
            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">Instructions</h3>
              <ol className="space-y-6">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-dark leading-relaxed">{step.instruction}</p>
                      {step.tip && (
                        <div className="mt-2 bg-accent/10 border-l-4 border-accent rounded-r-lg p-3 flex gap-2">
                          <Lightbulb className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-dark-light"><strong>Tip:</strong> {step.tip}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map(tag => (
                <span key={tag} className="bg-cream text-muted text-xs px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 no-print">
              <PrintButton />
              <PinItButton url={url} image={recipe.image} description={recipe.title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NutritionFacts nutrition={recipe.nutrition} />
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream no-print">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="font-heading text-2xl font-bold mb-8">You Might Also Love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
