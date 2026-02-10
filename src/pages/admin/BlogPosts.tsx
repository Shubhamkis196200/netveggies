import { blogPosts } from '@/data/recipes';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function BlogPosts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Blog Posts</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition-colors"><Plus className="w-4 h-4" /> New Post</button>
      </div>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-cream border-b border-border">
            <th className="text-left px-4 py-3 font-semibold">Title</th>
            <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Read Time</th>
            <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Date</th>
            <th className="text-right px-4 py-3 font-semibold">Actions</th>
          </tr></thead>
          <tbody>
            {blogPosts.map(p => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-cream/30">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted hidden md:table-cell">{p.readTime} min</td>
                <td className="px-4 py-3 text-muted hidden md:table-cell">{p.datePublished}</td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 hover:text-primary"><Edit className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
