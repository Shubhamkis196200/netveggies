import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/data/recipes';

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold">Blog & Guides</h1>
        <p className="text-muted mt-2">Tips, guides, and everything plant-based living</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-sm text-muted mt-2 line-clamp-2">{post.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.datePublished}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
