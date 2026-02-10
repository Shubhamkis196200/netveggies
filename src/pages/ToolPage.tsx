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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
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

      {/* Gradient Banner Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 md:pb-16">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: tool.name }]} />
          <div className="flex items-center gap-5 mt-6">
            <span className={`text-4xl w-18 h-18 ${tool.color} rounded-2xl flex items-center justify-center text-white shadow-lg ring-4 ring-white/20`} style={{width: '4.5rem', height: '4.5rem', fontSize: '2rem'}}>
              {tool.icon}
            </span>
            <div>
              <span className="text-xs font-semibold text-green-200 uppercase tracking-wider">{tool.category}</span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{tool.name}</h1>
            </div>
          </div>
          <p className="text-lg text-green-100 mt-4 max-w-2xl">{tool.description}</p>
          <button onClick={() => window.print()} className="no-print mt-4 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium text-white" aria-label="Print">
            <Printer size={16} />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Tool Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
          {ToolComponent ? (
            <Suspense fallback={<div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" /></div>}>
              <ToolComponent />
            </Suspense>
          ) : (
            <p className="text-muted text-center py-8">This tool is coming soon!</p>
          )}
        </div>

        {relatedTools.length > 0 && (
          <div className="no-print mt-12">
            <h2 className="text-2xl font-bold text-dark mb-6">Related Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.map(rt => rt && (
                <Link key={rt.id} to={`/tools/${rt.slug}`} className="p-5 rounded-2xl border border-gray-100 hover:border-primary shadow-md hover:shadow-lg transition-all bg-white group flex items-start gap-4">
                  <span className={`text-2xl flex-shrink-0 w-12 h-12 ${rt.color} rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>{rt.icon}</span>
                  <div>
                    <h3 className="font-semibold text-dark group-hover:text-primary transition-colors">{rt.name}</h3>
                    <p className="text-sm text-muted mt-1">{rt.description}</p>
                  </div>
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
