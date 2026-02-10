import { recipes } from '@/data/recipes';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Recipes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Recipes</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition-colors">
          <Plus className="w-4 h-4" /> Add Recipe
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-cream border-b border-border">
            <th className="text-left px-4 py-3 font-semibold">Recipe</th>
            <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Categories</th>
            <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Cost/Serving</th>
            <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Date</th>
            <th className="text-right px-4 py-3 font-semibold">Actions</th>
          </tr></thead>
          <tbody>
            {recipes.map(r => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-cream/30">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={r.image} alt={r.title} className="w-10 h-10 rounded-lg object-cover" />
                  <span className="font-medium">{r.title}</span>
                </td>
                <td className="px-4 py-3 text-muted hidden md:table-cell">{r.categories.join(', ')}</td>
                <td className="px-4 py-3 hidden md:table-cell"><span className="text-primary font-semibold">${r.costPerServing.toFixed(2)}</span></td>
                <td className="px-4 py-3 text-muted hidden md:table-cell">{r.datePublished}</td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
