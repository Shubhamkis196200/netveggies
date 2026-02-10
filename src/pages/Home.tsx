import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChefHat, Calculator, Scale, Ruler, Repeat, Timer, Leaf } from 'lucide-react';
import { recipes, categories } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import NewsletterSignup from '@/components/NewsletterSignup';

const featuredTools = [
  { slug: 'calorie-calculator', name: 'Calorie Calculator', desc: 'Calculate daily calorie needs', icon: Calculator },
  { slug: 'recipe-scaler', name: 'Recipe Scaler', desc: 'Scale any recipe up or down', icon: Scale },
  { slug: 'bmi-calculator', name: 'BMI Calculator', desc: 'Check your BMI instantly', icon: Ruler },
  { slug: 'baking-substitutions', name: 'Baking Substitutions', desc: 'Find vegan ingredient swaps', icon: Repeat },
  { slug: 'cooking-timer', name: 'Cooking Timer', desc: 'Multiple named timers', icon: Timer },
  { slug: 'spice-pairing', name: 'Spice Pairing Guide', desc: 'Perfect spice combos', icon: Leaf },
];

export default function Home() {
  const featured = recipes.find(r => r.featured) || recipes[0];
  const latest = recipes.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-cream">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1 rounded-full mb-4">Plant-Based Made Simple</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-dark leading-tight mb-4">Delicious Vegan Recipes for <span className="text-primary">Real Life</span></h1>
            <p className="text-lg text-muted mb-8 max-w-lg">Easy, budget-friendly recipes that taste incredible. Every dish is beginner-approved and costs less than takeout.</p>
            <div className="flex flex-wrap gap-3">
              <Link to={`/recipe/${featured.slug}`} className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
                Today's Featured <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/category/30-minute" className="bg-white text-dark px-6 py-3 rounded-full font-semibold hover:bg-cream transition-colors border border-border">
                30-Minute Meals
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 max-w-[200px]">
              <p className="font-heading font-semibold text-sm">{featured.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.prepTime + featured.cookTime}min</span>
                <span className="flex items-center gap-1"><ChefHat className="w-3 h-3" /> {featured.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link key={cat.slug} to={`/category/${cat.slug}`} className="group bg-white rounded-2xl p-6 text-center border border-border hover:border-primary hover:shadow-md transition-all">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Recipes */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-3xl font-bold">Latest Recipes</h2>
          <Link to="/search" className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </section>

      {/* Free Tools */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold">Free Cooking & Nutrition Tools</h2>
              <p className="text-muted mt-2">25 calculators and guides to help you cook smarter</p>
            </div>
            <Link to="/tools" className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
              All 25 Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredTools.map(t => {
              const Icon = t.icon;
              return (
                <Link key={t.slug} to={`/tools/${t.slug}`} className="group bg-white rounded-xl p-4 text-center border border-border hover:border-primary hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-xs text-muted mt-1">{t.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">About the Kitchen 🌿</h2>
          <p className="text-muted max-w-2xl mx-auto text-lg mb-6">
            NetVeggies is on a mission to make plant-based eating easy, affordable, and absolutely delicious.
            Every recipe is tested, tasted, and approved — with cost per serving so you always know what you're spending.
          </p>
          <Link to="/about" className="text-primary font-semibold hover:underline">Read our full story →</Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <NewsletterSignup />
      </section>
    </div>
  );
}
