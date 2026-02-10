import { useState } from 'react';

const styles = {
  neapolitan: { hydration: 60, salt: 3, oil: 0, sugar: 0, label: '🇮🇹 Neapolitan', ballWeight: 250 },
  newyork: { hydration: 63, salt: 2, oil: 3, sugar: 2, label: '🗽 New York', ballWeight: 300 },
  pan: { hydration: 70, salt: 2, oil: 5, sugar: 3, label: '🍳 Pan/Detroit', ballWeight: 400 },
};

type Style = keyof typeof styles;

const PizzaDoughCalculator = () => {
  const [style, setStyle] = useState<Style>('neapolitan');
  const [count, setCount] = useState(4);

  const s = styles[style];
  const totalDough = s.ballWeight * count;
  const flour = totalDough / (1 + s.hydration / 100 + s.salt / 100 + s.oil / 100 + s.sugar / 100);
  const water = flour * s.hydration / 100;
  const salt = flour * s.salt / 100;
  const oil = flour * s.oil / 100;
  const sugar = flour * s.sugar / 100;
  const yeast = flour * 0.3 / 100; // ~0.3% instant dry yeast

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Pizza Style</label>
        <div className="grid sm:grid-cols-3 gap-2">
          {(Object.entries(styles) as [Style, typeof styles['neapolitan']][]).map(([key, val]) => (
            <button key={key} onClick={() => setStyle(key)} className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${style === key ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <span className="text-lg">{val.label}</span>
              <p className="text-xs mt-1 opacity-75">{val.hydration}% hydration, {val.ballWeight}g balls</p>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Number of Pizza Balls</label>
        <div className="flex items-center gap-3">
          <button onClick={() => setCount(Math.max(1, count - 1))} className="w-10 h-10 rounded-lg bg-gray-100 font-bold text-lg">−</button>
          <span className="text-2xl font-bold w-10 text-center">{count}</span>
          <button onClick={() => setCount(count + 1)} className="w-10 h-10 rounded-lg bg-gray-100 font-bold text-lg">+</button>
          <span className="text-sm text-gray-500">× {s.ballWeight}g each</span>
        </div>
      </div>
      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <h3 className="font-bold text-red-800 mb-4">🍕 Your Dough Recipe</h3>
        <div className="space-y-2">
          {[
            { label: 'Bread Flour (00 or high-gluten)', value: `${Math.round(flour)}g` },
            { label: 'Water', value: `${Math.round(water)}g` },
            { label: 'Salt', value: `${Math.round(salt * 10) / 10}g` },
            { label: 'Instant Dry Yeast', value: `${Math.round(yeast * 10) / 10}g` },
            ...(oil > 0 ? [{ label: 'Olive Oil', value: `${Math.round(oil)}g` }] : []),
            ...(sugar > 0 ? [{ label: 'Sugar', value: `${Math.round(sugar)}g` }] : []),
          ].map(item => (
            <div key={item.label} className="flex justify-between py-1 border-b border-red-100 last:border-0">
              <span className="text-sm text-red-700">{item.label}</span>
              <span className="text-sm font-bold text-red-900">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t-2 border-red-300 flex justify-between">
          <span className="font-bold text-red-800">Total Dough</span>
          <span className="font-bold text-red-900">{Math.round(totalDough)}g ({count} balls)</span>
        </div>
      </div>
    </div>
  );
};

export default PizzaDoughCalculator;
