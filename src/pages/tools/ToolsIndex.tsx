import { Link } from 'react-router-dom';
import { Calculator, Scale, Ruler, ChefHat, CupSoda, Repeat, ShoppingCart, ListChecks, Timer, DollarSign, Drumstick, Droplets, Calendar, Snowflake, Thermometer, Leaf, ArrowLeftRight, Croissant, Pizza, Blend, Coffee, Wine, Clock, Flame, Percent } from 'lucide-react';

const tools = [
  { slug: 'calorie-calculator', name: 'Calorie Calculator', desc: 'Calculate daily calorie needs using the Mifflin-St Jeor equation', icon: Calculator },
  { slug: 'macro-calculator', name: 'Macro Calculator', desc: 'Get protein, carb, and fat targets based on your goals', icon: Scale },
  { slug: 'bmi-calculator', name: 'BMI Calculator', desc: 'Calculate BMI and find your healthy weight range', icon: Ruler },
  { slug: 'recipe-scaler', name: 'Recipe Scaler', desc: 'Scale recipe ingredients to any serving size', icon: ChefHat },
  { slug: 'measurement-converter', name: 'Cooking Measurement Converter', desc: 'Convert between cups, tablespoons, ml, oz, and more', icon: CupSoda },
  { slug: 'baking-substitutions', name: 'Baking Substitution Finder', desc: 'Find ingredient substitutions with proper ratios', icon: Repeat },
  { slug: 'meal-prep-calculator', name: 'Meal Prep Portion Calculator', desc: 'Calculate quantities for meal prep shopping', icon: ShoppingCart },
  { slug: 'grocery-list', name: 'Grocery List Generator', desc: 'Build a combined shopping list organized by category', icon: ListChecks },
  { slug: 'cooking-timer', name: 'Cooking Timer', desc: 'Run multiple named countdown timers at once', icon: Timer },
  { slug: 'food-cost-calculator', name: 'Food Cost Calculator', desc: 'Calculate the cost per serving of any recipe', icon: DollarSign },
  { slug: 'protein-calculator', name: 'Protein Intake Calculator', desc: 'Find your optimal daily protein intake', icon: Drumstick },
  { slug: 'water-calculator', name: 'Water Intake Calculator', desc: 'Calculate daily water needs based on your lifestyle', icon: Droplets },
  { slug: 'seasonality-calendar', name: 'Vegetable Seasonality Calendar', desc: "See what's in season each month", icon: Calendar },
  { slug: 'freezer-guide', name: 'Freezer Storage Guide', desc: 'Look up safe freezer storage times for any food', icon: Snowflake },
  { slug: 'cooking-temperatures', name: 'Cooking Temperature Chart', desc: 'Safe internal temperatures for meats and proteins', icon: Thermometer },
  { slug: 'spice-pairing', name: 'Spice Pairing Guide', desc: 'Find the best spice pairings for any ingredient', icon: Leaf },
  { slug: 'unit-converter', name: 'Kitchen Unit Converter', desc: 'Convert weight, volume, and temperature units', icon: ArrowLeftRight },
  { slug: 'sourdough-calculator', name: 'Sourdough Calculator', desc: 'Calculate sourdough ingredients by hydration and starter %', icon: Croissant },
  { slug: 'pizza-dough-calculator', name: 'Pizza Dough Calculator', desc: 'Get exact dough amounts for any number of pizzas', icon: Pizza },
  { slug: 'smoothie-builder', name: 'Smoothie Builder', desc: 'Build a smoothie and see estimated nutrition', icon: Blend },
  { slug: 'caffeine-calculator', name: 'Caffeine Calculator', desc: 'Track daily caffeine intake vs safe limits', icon: Coffee },
  { slug: 'alcohol-calculator', name: 'Alcohol Unit Calculator', desc: 'Calculate alcohol units and calories from drinks', icon: Wine },
  { slug: 'fasting-timer', name: 'Intermittent Fasting Timer', desc: 'Track your fasting and eating windows', icon: Clock },
  { slug: 'tdee-calculator', name: 'TDEE Calculator', desc: 'Calculate Total Daily Energy Expenditure in detail', icon: Flame },
  { slug: 'body-fat-calculator', name: 'Body Fat % Estimator', desc: 'Estimate body fat using the Navy method', icon: Percent },
];

export { tools as toolsList };

export default function ToolsIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-4">Free Cooking & Nutrition Tools</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">25 practical calculators and guides to help you eat better, cook smarter, and save time in the kitchen.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(t => {
          const Icon = t.icon;
          return (
            <Link key={t.slug} to={`/tools/${t.slug}`} className="group border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-dark mb-2">{t.name}</h3>
              <p className="text-sm text-muted">{t.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
