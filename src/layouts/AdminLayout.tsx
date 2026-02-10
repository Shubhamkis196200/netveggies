import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, FileText, FolderOpen, Image, Users, Settings, ArrowLeft } from 'lucide-react';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Recipes', href: '/admin/recipes', icon: UtensilsCrossed },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Categories', href: '/admin/categories', icon: FolderOpen },
  { label: 'Media', href: '/admin/media', icon: Image },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-cream">
      <aside className="w-64 bg-dark text-white flex-shrink-0 hidden md:block">
        <div className="p-6 border-b border-gray-700">
          <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
          <h2 className="font-heading text-xl font-bold">NetVeggies <span className="text-primary">Admin</span></h2>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {sidebarLinks.map(l => {
            const active = location.pathname === l.href;
            return (
              <Link key={l.href} to={l.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                <l.icon className="w-5 h-5" />
                {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1 min-h-screen">
        <header className="bg-white border-b border-border px-6 py-4">
          <h1 className="font-heading text-xl">Admin Panel</h1>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
