import { mealPrepPlans } from '@/data/recipes';
import { Calendar, DollarSign, ShoppingCart } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function MealPrep() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <span className="text-5xl mb-4 block">📦</span>
        <h1 className="font-heading text-4xl font-bold">Meal Prep Planner</h1>
        <p className="text-muted mt-2 max-w-lg mx-auto">Cook once, eat all week. Our weekly meal prep plans make plant-based eating effortless and affordable.</p>
      </div>

      <div className="space-y-12">
        {mealPrepPlans.map((plan, pi) => (
          <div key={pi} className="bg-white rounded-3xl border border-border overflow-hidden">
            <div className="bg-primary/5 p-6 md:p-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="font-heading text-2xl font-bold">{plan.week}</h2>
                  <p className="text-muted mt-1">{plan.description}</p>
                </div>
                <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">
                  <DollarSign className="w-4 h-4" /> ~${plan.estimatedCost}/week
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 font-semibold text-muted"><Calendar className="w-4 h-4 inline mr-1" /> Day</th>
                    <th className="text-left px-6 py-3 font-semibold text-muted">🌅 Breakfast</th>
                    <th className="text-left px-6 py-3 font-semibold text-muted">🥗 Lunch</th>
                    <th className="text-left px-6 py-3 font-semibold text-muted">🍽️ Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.days.map((d, di) => (
                    <tr key={di} className="border-b border-border/50 hover:bg-cream/50 transition-colors">
                      <td className="px-6 py-3 font-semibold">{d.day}</td>
                      <td className="px-6 py-3">{d.breakfast}</td>
                      <td className="px-6 py-3">{d.lunch}</td>
                      <td className="px-6 py-3">{d.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Shopping List */}
            <div className="p-6 md:p-8 bg-cream/50">
              <h3 className="font-heading text-lg font-semibold flex items-center gap-2 mb-3">
                <ShoppingCart className="w-5 h-5 text-primary" /> Shopping List
              </h3>
              <div className="flex flex-wrap gap-2">
                {plan.shoppingList.map((item, i) => (
                  <span key={i} className="bg-white px-3 py-1 rounded-full text-sm border border-border">{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  );
}
