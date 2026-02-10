import { useState } from 'react';

const fiberFoods = [
  { name: 'Lentils (1 cup cooked)', fiber: 15.6 },
  { name: 'Black Beans (1 cup)', fiber: 15 },
  { name: 'Chickpeas (1 cup)', fiber: 12.5 },
  { name: 'Oatmeal (1 cup cooked)', fiber: 4 },
  { name: 'Broccoli (1 cup)', fiber: 5.1 },
  { name: 'Avocado (1 whole)', fiber: 10 },
  { name: 'Raspberries (1 cup)', fiber: 8 },
  { name: 'Pear (1 medium)', fiber: 5.5 },
  { name: 'Apple (1 medium)', fiber: 4.4 },
  { name: 'Chia Seeds (2 tbsp)', fiber: 10 },
  { name: 'Almonds (1 oz)', fiber: 3.5 },
  { name: 'Whole Wheat Bread (2 slices)', fiber: 4 },
  { name: 'Brown Rice (1 cup)', fiber: 3.5 },
  { name: 'Sweet Potato (1 medium)', fiber: 3.8 },
  { name: 'Green Peas (1 cup)', fiber: 8.8 },
  { name: 'Quinoa (1 cup cooked)', fiber: 5.2 },
];

const FiberIntakeCalculator = () => {
  const [entries, setEntries] = useState<{ name: string; fiber: number }[]>([]);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const target = gender === 'male' ? 38 : 25;

  const total = entries.reduce((s, e) => s + e.fiber, 0);
  const pct = Math.min((total / target) * 100, 100);

  const addFood = (food: typeof fiberFoods[0]) => {
    setEntries([...entries, food]);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['male', 'female'] as const).map(g => (
          <button key={g} onClick={() => setGender(g)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${gender === g ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {g === 'male' ? '♂ Male (38g)' : '♀ Female (25g)'}
          </button>
        ))}
      </div>
      {/* Progress */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
        <p className="text-sm text-gray-500 mb-2">Daily Fiber</p>
        <p className={`text-4xl font-bold ${total >= target ? 'text-green-600' : 'text-amber-600'}`}>{total.toFixed(1)}g <span className="text-lg text-gray-400">/ {target}g</span></p>
        <div className="h-4 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div className={`h-full rounded-full transition-all ${total >= target ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${pct}%` }} />
        </div>
        {total >= target && <p className="text-sm text-green-600 mt-2">🎉 You've reached your daily fiber goal!</p>}
      </div>
      {/* Entries */}
      {entries.length > 0 && (
        <div className="space-y-1">
          {entries.map((e, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-2 text-sm">
              <span>{e.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-600">{e.fiber}g</span>
                <button onClick={() => setEntries(entries.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500">×</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Quick add */}
      <h3 className="font-semibold text-gray-900 text-sm">Quick Add Foods</h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {fiberFoods.map(f => (
          <button key={f.name} onClick={() => addFood(f)} className="flex justify-between p-2 bg-white rounded-lg border border-gray-200 hover:border-amber-300 text-sm text-left transition-colors">
            <span>{f.name}</span>
            <span className="font-bold text-amber-600">{f.fiber}g</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiberIntakeCalculator;
