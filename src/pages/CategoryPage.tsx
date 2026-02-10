import { useParams } from 'react-router-dom';
import { recipes, categories } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const filtered = recipes.filter(r => r.categories.includes(slug || ''));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <span className="text-5xl mb-4 block">{category?.icon || '🍽️'}</span>
        <h1 className="font-heading text-4xl font-bold">{category?.name || slug}</h1>
        <p className="text-muted mt-2">{category?.description || `Recipes in ${slug}`}</p>
        <p className="text-sm text-muted mt-1">{filtered.length} recipe{filtered.length !== 1 ? 's' : ''}</p>
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-muted py-12">No recipes in this category yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </div>
  );
}
