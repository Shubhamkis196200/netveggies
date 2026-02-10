import { Link } from 'react-router-dom';

export default function CategoryPill({ name, slug, active }: { name: string; slug: string; active?: boolean }) {
  return (
    <Link to={`/category/${slug}`} className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'bg-cream text-dark hover:bg-primary/10'}`}>
      {name}
    </Link>
  );
}
