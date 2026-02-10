import { useParams, Link } from 'react-router-dom';
import { getToolBySlug, getToolById } from '@/data/tools';
import SEO from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { lazy, Suspense } from 'react';
import { Printer } from 'lucide-react';

const toolComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'calorie-calculator': lazy(() => import('@/components/tools/CalorieCalculator')),
  'macro-calculator': lazy(() => import('@/components/tools/MacroCalculator')),
  'bmi-calculator': lazy(() => import('@/components/tools/BMICalculator')),
  'tdee-calculator': lazy(() => import('@/components/tools/TDEECalculator')),
  'protein-intake-calculator': lazy(() => import('@/components/tools/ProteinIntakeCalculator')),
  'water-intake-calculator': lazy(() => import('@/components/tools/WaterIntakeCalculator')),
  'body-fat-estimator': lazy(() => import('@/components/tools/BodyFatEstimator')),
  'caffeine-calculator': lazy(() => import('@/components/tools/CaffeineCalculator')),
  'recipe-scaler': lazy(() => import('@/components/tools/RecipeScaler')),
  'measurement-converter': lazy(() => import('@/components/tools/MeasurementConverter')),
  'baking-substitutions': lazy(() => import('@/components/tools/BakingSubstitutions')),
  'oven-temp-converter': lazy(() => import('@/components/tools/OvenTempConverter')),
  'cooking-timer': lazy(() => import('@/components/tools/CookingTimer')),
  'sourdough-calculator': lazy(() => import('@/components/tools/SourdoughCalculator')),
  'pizza-dough-calculator': lazy(() => import('@/components/tools/PizzaDoughCalculator')),
  'meat-temp-guide': lazy(() => import('@/components/tools/MeatTempGuide')),
  'meal-prep-calculator': lazy(() => import('@/components/tools/MealPrepCalculator')),
  'grocery-list-generator': lazy(() => import('@/components/tools/GroceryListGenerator')),
  'food-cost-calculator': lazy(() => import('@/components/tools/FoodCostCalculator')),
  'seasonal-produce-guide': lazy(() => import('@/components/tools/SeasonalProduceGuide')),
  'freezer-storage-guide': lazy(() => import('@/components/tools/FreezerStorageGuide')),
  'intermittent-fasting-timer': lazy(() => import('@/components/tools/IntermittentFastingTimer')),
  'alcohol-unit-calculator': lazy(() => import('@/components/tools/AlcoholUnitCalculator')),
  'fiber-intake-calculator': lazy(() => import('@/components/tools/FiberIntakeCalculator')),
  'smoothie-builder': lazy(() => import('@/components/tools/SmoothieBuilder')),
};

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-muted mb-6">The tool you're looking for doesn't exist.</p>
        <Link to="/tools" className="text-primary hover:underline">Browse all tools →</Link>
      </div>
    );
  }

  const ToolComponent = slug ? toolComponents[slug] : undefined;
  const relatedTools = tool.relatedTools.map(id => getToolById(id)).filter(Boolean);

  return (
    <>
      <SEO
        title={`${tool.name} — Free Online Tool`}
        description={tool.description}
        url={`/tools/${slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: tool.name,
            description: tool.description,
            url: `https://netveggies.com/tools/${slug}`,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: { '@type': 'Organization', name: 'NetVeggies', url: 'https://netveggies.com' },
          }),
        }}
      />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: tool.name }]} />
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className={`text-4xl w-16 h-16 ${tool.color} rounded-xl flex items-center justify-center text-white shadow-md`}>{tool.icon}</span>
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{tool.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-dark">{tool.name}</h1>
            </div>
          </div>
          <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-muted" aria-label="Print">
            <Printer size={16} />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
        <p className="text-lg text-muted mb-8">{tool.description}</p>
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-border mb-12">
          {ToolComponent ? (
            <Suspense fallback={<div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" /></div>}>
              <ToolComponent />
            </Suspense>
          ) : (
            <p className="text-muted text-center py-8">This tool is coming soon!</p>
          )}
        </div>
        {relatedTools.length > 0 && (
          <div className="no-print">
            <h2 className="text-xl font-bold text-dark mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedTools.map(rt => rt && (
                <Link key={rt.id} to={`/tools/${rt.slug}`} className="p-4 rounded-xl border border-border hover:border-primary hover:shadow-md transition-all bg-white group">
                  <span className="text-2xl">{rt.icon}</span>
                  <h3 className="font-semibold text-sm mt-2 group-hover:text-primary transition-colors">{rt.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolPage;
