import { categories } from '@/data/recipes';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Categories</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> New Category</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(c => (
          <div key={c.slug} className="bg-white rounded-2xl border border-border p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-xs text-muted">{c.description}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 hover:text-primary"><Edit className="w-4 h-4" /></button>
              <button className="p-1.5 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
