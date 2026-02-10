import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import type { Recipe } from '@/data/recipes';
import CostBadge from './CostBadge';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipe/${recipe.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute top-3 right-3">
          <CostBadge cost={recipe.costPerServing} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-dark group-hover:text-primary transition-colors line-clamp-2">{recipe.title}</h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.prepTime + recipe.cookTime} min</span>
          <span className="flex items-center gap-1"><ChefHat className="w-3.5 h-3.5" /> {recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}
