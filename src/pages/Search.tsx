import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { recipes, categories } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import CategoryPill from '@/components/CategoryPill';

export default function Search() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const filtered = recipes.filter(r => {
    const matchesQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase()) || r.tags.some(t => t.includes(query.toLowerCase()));
    const matchesCategory = !activeCategory || r.categories.includes(activeCategory);
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold mb-6">Search Recipes</h1>
        <div className="max-w-xl mx-auto relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, ingredient, or tag..." className="w-full pl-12 pr-4 py-4 rounded-full border border-border focus:border-primary focus:outline-none text-lg" autoFocus />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button onClick={() => setActiveCategory('')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!activeCategory ? 'bg-primary text-white' : 'bg-cream text-dark hover:bg-primary/10'}`}>All</button>
        {categories.map(cat => (
          <button key={cat.slug} onClick={() => setActiveCategory(activeCategory === cat.slug ? '' : cat.slug)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.slug ? 'bg-primary text-white' : 'bg-cream text-dark hover:bg-primary/10'}`}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted mb-6">{filtered.length} recipe{filtered.length !== 1 ? 's' : ''} found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🥬</p>
          <p className="text-muted text-lg">No recipes found. Try a different search!</p>
        </div>
      )}
    </div>
  );
}
