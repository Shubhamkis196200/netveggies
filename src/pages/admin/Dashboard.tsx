import { Link } from 'react-router-dom';
import { UtensilsCrossed, FileText, FolderOpen, TrendingUp } from 'lucide-react';
import { recipes, blogPosts, categories } from '@/data/recipes';

export default function Dashboard() {
  const stats = [
    { label: 'Total Recipes', value: recipes.length, icon: UtensilsCrossed, link: '/admin/recipes' },
    { label: 'Blog Posts', value: blogPosts.length, icon: FileText, link: '/admin/blog' },
    { label: 'Categories', value: categories.length, icon: FolderOpen, link: '/admin/categories' },
    { label: 'Featured', value: recipes.filter(r => r.featured).length, icon: TrendingUp, link: '/admin/recipes' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => (
          <Link key={s.label} to={s.link} className="bg-white rounded-2xl p-6 border border-border hover:border-primary transition-colors group">
            <s.icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors mb-4" />
            <div className="font-heading text-4xl font-bold">{s.value}</div>
            <div className="text-sm text-muted mt-1">{s.label}</div>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-border">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Recent Recipes</h2>
          <Link to="/admin/recipes" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="divide-y divide-border">
          {recipes.slice(0, 5).map(r => (
            <div key={r.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={r.image} alt={r.title} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-sm">{r.title}</p>
                  <p className="text-xs text-muted">{r.categories.join(', ')}</p>
                </div>
              </div>
              <span className="text-xs text-muted">{r.datePublished}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
