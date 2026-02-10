import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import AdminLayout from './layouts/AdminLayout';
import './index.css';

const Home = lazy(() => import('./pages/Home'));
const RecipePage = lazy(() => import('./pages/RecipePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPostPage'));
const MealPrep = lazy(() => import('./pages/MealPrep'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Search = lazy(() => import('./pages/Search'));
const ToolsIndex = lazy(() => import('./pages/tools/ToolsIndex'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminRecipes = lazy(() => import('./pages/admin/Recipes'));
const AdminBlogPosts = lazy(() => import('./pages/admin/BlogPosts'));
const AdminCategories = lazy(() => import('./pages/admin/Categories'));
const AdminMedia = lazy(() => import('./pages/admin/Media'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

// Tool imports
// Tool imports
import { CalorieCalculator, MacroCalculator, BMICalculator, RecipeScaler, MeasurementConverter, BakingSubstitutions, MealPrepCalculator, GroceryList, CookingTimer, FoodCostCalculator, ProteinCalculator, WaterCalculator, SeasonalityCalendar, FreezerGuide, CookingTemperatures, SpicePairing, UnitConverter, SourdoughCalculator, PizzaDoughCalculator, SmoothieBuilder, CaffeineCalculator, AlcoholCalculator, FastingTimer, TDEECalculator, BodyFatCalculator } from './pages/tools/AllTools';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted font-body">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:slug" element={<RecipePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/meal-prep" element={<MealPrep />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/calorie-calculator" element={<CalorieCalculator />} />
            <Route path="/tools/macro-calculator" element={<MacroCalculator />} />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/recipe-scaler" element={<RecipeScaler />} />
            <Route path="/tools/measurement-converter" element={<MeasurementConverter />} />
            <Route path="/tools/baking-substitutions" element={<BakingSubstitutions />} />
            <Route path="/tools/meal-prep-calculator" element={<MealPrepCalculator />} />
            <Route path="/tools/grocery-list" element={<GroceryList />} />
            <Route path="/tools/cooking-timer" element={<CookingTimer />} />
            <Route path="/tools/food-cost-calculator" element={<FoodCostCalculator />} />
            <Route path="/tools/protein-calculator" element={<ProteinCalculator />} />
            <Route path="/tools/water-calculator" element={<WaterCalculator />} />
            <Route path="/tools/seasonality-calendar" element={<SeasonalityCalendar />} />
            <Route path="/tools/freezer-guide" element={<FreezerGuide />} />
            <Route path="/tools/cooking-temperatures" element={<CookingTemperatures />} />
            <Route path="/tools/spice-pairing" element={<SpicePairing />} />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/sourdough-calculator" element={<SourdoughCalculator />} />
            <Route path="/tools/pizza-dough-calculator" element={<PizzaDoughCalculator />} />
            <Route path="/tools/smoothie-builder" element={<SmoothieBuilder />} />
            <Route path="/tools/caffeine-calculator" element={<CaffeineCalculator />} />
            <Route path="/tools/alcohol-calculator" element={<AlcoholCalculator />} />
            <Route path="/tools/fasting-timer" element={<FastingTimer />} />
            <Route path="/tools/tdee-calculator" element={<TDEECalculator />} />
            <Route path="/tools/body-fat-calculator" element={<BodyFatCalculator />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="recipes" element={<AdminRecipes />} />
            <Route path="blog" element={<AdminBlogPosts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
