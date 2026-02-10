import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, Leaf } from 'lucide-react';

const navLinks = [
  { label: 'Recipes', href: '/category/dinner' },
  { label: 'Tools', href: '/tools' },
  { label: 'Meal Prep', href: '/meal-prep' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-primary" />
            <span className="font-heading text-2xl font-bold text-dark">Net<span className="text-primary">Veggies</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.href} to={l.href} className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith(l.href) ? 'text-primary' : 'text-dark-light'}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/search" className="p-2 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </Link>
          </nav>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <nav className="flex flex-col p-4 gap-3">
              {navLinks.map(l => (
                <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)} className="text-base font-medium py-2 hover:text-primary">
                  {l.label}
                </Link>
              ))}
              <Link to="/search" onClick={() => setMenuOpen(false)} className="text-base font-medium py-2 hover:text-primary flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white no-print">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-heading text-xl font-bold">NetVeggies</span>
            </div>
            <p className="text-sm text-gray-400">Plant-based recipes for real life. Easy, affordable, and delicious.</p>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Explore</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link to="/category/dinner" className="hover:text-primary transition-colors">Recipes</Link>
              <Link to="/meal-prep" className="hover:text-primary transition-colors">Meal Prep</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/tools" className="hover:text-primary transition-colors">Tools</Link>
              <Link to="/search" className="hover:text-primary transition-colors">Search</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Categories</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link to="/category/breakfast" className="hover:text-primary transition-colors">Breakfast</Link>
              <Link to="/category/dinner" className="hover:text-primary transition-colors">Dinner</Link>
              <Link to="/category/desserts" className="hover:text-primary transition-colors">Desserts</Link>
              <Link to="/category/budget" className="hover:text-primary transition-colors">Budget</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">About</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link to="/about" className="hover:text-primary transition-colors">Our Story</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NetVeggies. All rights reserved. Made with 🌱
        </div>
      </footer>
    </div>
  );
}
