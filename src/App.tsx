import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
const ToolsIndex = lazy(() => import('./pages/ToolsIndex'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminRecipes = lazy(() => import('./pages/admin/Recipes'));
const AdminBlogPosts = lazy(() => import('./pages/admin/BlogPosts'));
const AdminCategories = lazy(() => import('./pages/admin/Categories'));
const AdminMedia = lazy(() => import('./pages/admin/Media'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

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
    <HelmetProvider>
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
              <Route path="/tools/:slug" element={<ToolPage />} />
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
    </HelmetProvider>
  );
}
