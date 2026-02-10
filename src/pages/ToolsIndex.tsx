import { Link } from 'react-router-dom';
import { tools, toolCategories, getToolsByCategory } from '@/data/tools';
import SEO from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useState } from 'react';
import { Search } from 'lucide-react';

const ToolsIndex = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = search
    ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.keywords.some(k => k.toLowerCase().includes(search.toLowerCase())))
    : activeCategory
      ? tools.filter(t => t.category === activeCategory)
      : null;

  return (
    <>
      <SEO
        title="25 Free Nutrition & Cooking Tools"
        description="Free online nutrition calculators, cooking tools, and meal planning helpers. Calorie calculator, macro calculator, recipe scaler, and more — no signup required."
        url="/tools"
      />
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Nutrition & Cooking Tools</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            25 free tools for meal planning, nutrition tracking, and cooking. No signup required.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-300" size={20} />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCategory(null); }}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Tools' }]} />

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => { setActiveCategory(null); setSearch(''); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeCategory && !search ? 'bg-primary text-white' : 'bg-gray-100 text-dark hover:bg-gray-200'}`}
          >
            All ({tools.length})
          </button>
          {toolCategories.map(cat => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setSearch(''); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.name ? 'bg-primary text-white' : 'bg-gray-100 text-dark hover:bg-gray-200'}`}
            >
              {cat.icon} {cat.name} ({getToolsByCategory(cat.name).length})
            </button>
          ))}
        </div>

        {filtered ? (
          <div>
            <p className="text-sm text-muted mb-4">{filtered.length} tool{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </div>
        ) : (
          toolCategories.map(cat => {
            const catTools = getToolsByCategory(cat.name);
            return (
              <section key={cat.name} className="mt-12 first:mt-0">
                <h2 className="text-2xl font-bold text-dark mb-2 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.name}
                </h2>
                <p className="text-muted mb-6">{catTools.length} tools</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                </div>
              </section>
            );
          })
        )}
      </div>
    </>
  );
};

const ToolCard = ({ tool }: { tool: typeof tools[0] }) => (
  <Link
    to={`/tools/${tool.slug}`}
    className="group block p-5 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-200 bg-white"
  >
    <div className="flex items-start gap-3">
      <span className={`text-3xl flex-shrink-0 w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
        {tool.icon}
      </span>
      <div>
        <h3 className="font-semibold text-dark group-hover:text-primary transition-colors">{tool.name}</h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">{tool.description}</p>
      </div>
    </div>
  </Link>
);

export default ToolsIndex;
