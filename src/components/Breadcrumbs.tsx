import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted mb-6 flex-wrap">
      <Link to="/" className="hover:text-primary transition-colors">Home</Link>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
          ) : (
            <span className="text-dark">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
