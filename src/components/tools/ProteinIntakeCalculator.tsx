import { useState } from 'react';

const ProteinIntakeCalculator = () => {
  const [weight, setWeight] = useState(70);
  const [goal, setGoal] = useState<'sedentary' | 'active' | 'muscle' | 'athlete'>('active');
  const [result, setResult] = useState<number | null>(null);

  const multipliers = { sedentary: 0.8, active: 1.2, muscle: 1.6, athlete: 2.0 };
  const labels = { sedentary: '🪑 Sedentary', active: '🚶 Active', muscle: '💪 Build Muscle', athlete: '🏋️ Athlete' };

  const plantSources = [
    { name: 'Lentils (1 cup cooked)', protein: 18 },
    { name: 'Chickpeas (1 cup cooked)', protein: 15 },
    { name: 'Tofu firm (100g)', protein: 17 },
    { name: 'Tempeh (100g)', protein: 20 },
    { name: 'Black beans (1 cup)', protein: 15 },
    { name: 'Edamame (1 cup)', protein: 17 },
    { name: 'Peanut butter (2 tbsp)', protein: 8 },
    { name: 'Quinoa (1 cup cooked)', protein: 8 },
    { name: 'Hemp seeds (3 tbsp)', protein: 10 },
    { name: 'Seitan (100g)', protein: 25 },
  ];

  const calculate = () => {
    setResult(Math.round(weight * multipliers[goal]));
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Body Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value as typeof goal)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            {(Object.keys(multipliers) as (typeof goal)[]).map(k => <option key={k} value={k}>{labels[k]}</option>)}
          </select>
        </div>
      </div>
      <p className="text-sm text-gray-500">Multiplier: {multipliers[goal]}g per kg body weight</p>
      <button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">Calculate Protein</button>
      {result && (
        <>
          <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-500">
            <p className="text-sm text-green-700">Daily Protein Target</p>
            <p className="text-4xl font-bold text-green-700">{result}g</p>
            <p className="text-xs text-green-600">{Math.round(result * 4)} calories from protein</p>
          </div>
          <h3 className="font-semibold text-gray-900">🌱 Plant-Based Protein Sources</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {plantSources.map(s => (
              <div key={s.name} className="flex justify-between bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-sm">{s.name}</span>
                <span className="text-sm font-bold text-green-600">{s.protein}g</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProteinIntakeCalculator;
