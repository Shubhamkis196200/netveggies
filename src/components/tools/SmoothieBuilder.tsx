import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Ingredient {
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

const ingredients: Ingredient[] = [
  // Fruits
  { name: 'Banana', category: 'Fruit', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
  { name: 'Strawberries (1 cup)', category: 'Fruit', calories: 49, protein: 1, carbs: 12, fat: 0.5, fiber: 3 },
  { name: 'Blueberries (1 cup)', category: 'Fruit', calories: 85, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6 },
  { name: 'Mango (1 cup)', category: 'Fruit', calories: 99, protein: 1.4, carbs: 25, fat: 0.6, fiber: 2.6 },
  { name: 'Pineapple (1 cup)', category: 'Fruit', calories: 82, protein: 0.9, carbs: 22, fat: 0.2, fiber: 2.3 },
  // Greens
  { name: 'Spinach (1 cup)', category: 'Greens', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7 },
  { name: 'Kale (1 cup)', category: 'Greens', calories: 33, protein: 2.9, carbs: 6, fat: 0.6, fiber: 1.3 },
  // Protein
  { name: 'Peanut Butter (2 tbsp)', category: 'Protein', calories: 188, protein: 8, carbs: 6, fat: 16, fiber: 2 },
  { name: 'Hemp Seeds (3 tbsp)', category: 'Protein', calories: 166, protein: 10, carbs: 2.6, fat: 14.6, fiber: 1.2 },
  { name: 'Protein Powder (1 scoop)', category: 'Protein', calories: 120, protein: 24, carbs: 3, fat: 1, fiber: 0 },
  { name: 'Chia Seeds (2 tbsp)', category: 'Protein', calories: 140, protein: 5, carbs: 12, fat: 9, fiber: 10 },
  // Liquid
  { name: 'Oat Milk (1 cup)', category: 'Liquid', calories: 120, protein: 3, carbs: 16, fat: 5, fiber: 2 },
  { name: 'Almond Milk (1 cup)', category: 'Liquid', calories: 30, protein: 1, carbs: 1, fat: 2.5, fiber: 0 },
  { name: 'Coconut Water (1 cup)', category: 'Liquid', calories: 46, protein: 1.7, carbs: 9, fat: 0.5, fiber: 2.6 },
  { name: 'Water (1 cup)', category: 'Liquid', calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
];

const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#22c55e'];
const categories = ['Fruit', 'Greens', 'Protein', 'Liquid'];

const SmoothieBuilder = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const totals = selected.reduce(
    (acc, name) => {
      const ing = ingredients.find(i => i.name === name);
      if (!ing) return acc;
      return { calories: acc.calories + ing.calories, protein: acc.protein + ing.protein, carbs: acc.carbs + ing.carbs, fat: acc.fat + ing.fat, fiber: acc.fiber + ing.fiber };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const pieData = [
    { name: 'Protein', value: totals.protein * 4 },
    { name: 'Carbs', value: totals.carbs * 4 },
    { name: 'Fat', value: totals.fat * 9 },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      {categories.map(cat => (
        <div key={cat}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2">{cat === 'Fruit' ? '🍓' : cat === 'Greens' ? '🥬' : cat === 'Protein' ? '💪' : '🥛'} {cat}</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.filter(i => i.category === cat).map(ing => (
              <button key={ing.name} onClick={() => toggle(ing.name)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selected.includes(ing.name) ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                {ing.name}
              </button>
            ))}
          </div>
        </div>
      ))}
      {selected.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Nutrition Breakdown</h3>
            {[
              { label: 'Calories', value: `${totals.calories} kcal`, color: 'text-gray-900' },
              { label: 'Protein', value: `${totals.protein.toFixed(1)}g`, color: 'text-blue-600' },
              { label: 'Carbs', value: `${totals.carbs.toFixed(1)}g`, color: 'text-amber-600' },
              { label: 'Fat', value: `${totals.fat.toFixed(1)}g`, color: 'text-red-600' },
              { label: 'Fiber', value: `${totals.fiber.toFixed(1)}g`, color: 'text-green-600' },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
          {pieData.length > 0 && (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmoothieBuilder;
