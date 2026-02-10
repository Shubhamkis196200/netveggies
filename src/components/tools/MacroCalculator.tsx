import { useState } from 'react';

const MacroCalculator = () => {
  const [calories, setCalories] = useState(2000);
  const [diet, setDiet] = useState<'balanced' | 'keto' | 'high-protein' | 'plant-based'>('balanced');
  const [result, setResult] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  const diets = {
    balanced: { protein: 0.30, carbs: 0.40, fat: 0.30, label: '⚖️ Balanced (30/40/30)' },
    keto: { protein: 0.25, carbs: 0.05, fat: 0.70, label: '🥑 Keto (25/5/70)' },
    'high-protein': { protein: 0.40, carbs: 0.35, fat: 0.25, label: '💪 High Protein (40/35/25)' },
    'plant-based': { protein: 0.20, carbs: 0.55, fat: 0.25, label: '🌱 Plant-Based (20/55/25)' },
  };

  const calculate = () => {
    const d = diets[diet];
    setResult({
      protein: Math.round((calories * d.protein) / 4),
      carbs: Math.round((calories * d.carbs) / 4),
      fat: Math.round((calories * d.fat) / 9),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Daily Calories</label>
        <input type="number" value={calories} onChange={e => setCalories(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Diet Type</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {(Object.entries(diets) as [typeof diet, typeof diets['balanced']][]).map(([key, val]) => (
            <button key={key} onClick={() => setDiet(key)} className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${diet === key ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {val.label}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">Calculate Macros</button>
      {result && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
            <p className="text-sm text-blue-600">Protein</p>
            <p className="text-3xl font-bold text-blue-700">{result.protein}g</p>
            <p className="text-xs text-blue-400">{Math.round(result.protein * 4)} cal</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
            <p className="text-sm text-amber-600">Carbs</p>
            <p className="text-3xl font-bold text-amber-700">{result.carbs}g</p>
            <p className="text-xs text-amber-400">{Math.round(result.carbs * 4)} cal</p>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 text-center border border-rose-200">
            <p className="text-sm text-rose-600">Fat</p>
            <p className="text-3xl font-bold text-rose-700">{result.fat}g</p>
            <p className="text-xs text-rose-400">{Math.round(result.fat * 9)} cal</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacroCalculator;
