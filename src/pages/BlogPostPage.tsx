import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/data/recipes';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><h1 className="font-heading text-3xl">Post not found</h1><Link to="/blog" className="text-primary mt-4 inline-block">← Back to blog</Link></div>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    author: { "@type": "Person", name: "NetVeggies Kitchen" },
    publisher: { "@type": "Organization", name: "NetVeggies" },
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) return <h2 key={i} className="font-heading text-2xl font-bold mt-8 mb-4">{block.replace('## ', '')}</h2>;
      if (block.startsWith('### ')) return <h3 key={i} className="font-heading text-xl font-semibold mt-6 mb-3">{block.replace('### ', '')}</h3>;
      if (block.startsWith('|')) {
        const rows = block.split('\n').filter(r => !r.match(/^\|[-\s|]+\|$/));
        return (
          <div key={i} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className={ri === 0 ? 'bg-cream font-semibold' : 'border-b border-border'}>
                    {row.split('|').filter(Boolean).map((cell, ci) => (
                      <td key={ci} className="px-4 py-2">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (block.startsWith('- ')) {
        return <ul key={i} className="list-disc list-inside space-y-1 my-3 text-dark-light">{block.split('\n').map((item, j) => <li key={j}>{item.replace(/^- /, '')}</li>)}</ul>;
      }
      if (block.startsWith('1. ')) {
        return <ol key={i} className="list-decimal list-inside space-y-1 my-3 text-dark-light">{block.split('\n').map((item, j) => <li key={j}>{item.replace(/^\d+\.\s/, '')}</li>)}</ol>;
      }
      return <p key={i} className="text-dark-light leading-relaxed my-3">{block}</p>;
    });
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative h-[40vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">{post.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.datePublished}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/blog" className="text-primary text-sm font-semibold inline-flex items-center gap-1 mb-6 hover:underline"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
        <article className="prose-lg">
          {renderContent(post.content)}
        </article>
        <div className="flex flex-wrap gap-2 mt-8">
          {post.tags.map(tag => <span key={tag} className="bg-cream text-muted text-xs px-3 py-1 rounded-full">#{tag}</span>)}
        </div>
      </div>
    </div>
  );
}
