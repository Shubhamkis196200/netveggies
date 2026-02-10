import { useState } from 'react';

interface Drink { name: string; mg: number; }

const CaffeineCalculator = () => {
  const [drinks, setDrinks] = useState<{ drink: string; count: number }[]>([]);
  const [selected, setSelected] = useState('espresso');
  const LIMIT = 400;

  const drinkOptions: Drink[] = [
    { name: 'espresso', mg: 63 },
    { name: 'drip coffee (8oz)', mg: 95 },
    { name: 'cold brew (8oz)', mg: 200 },
    { name: 'black tea (8oz)', mg: 47 },
    { name: 'green tea (8oz)', mg: 28 },
    { name: 'matcha latte', mg: 70 },
    { name: 'energy drink (8oz)', mg: 80 },
    { name: 'cola (12oz)', mg: 34 },
    { name: 'dark chocolate (1oz)', mg: 12 },
    { name: 'decaf coffee (8oz)', mg: 7 },
  ];

  const addDrink = () => {
    setDrinks([...drinks, { drink: selected, count: 1 }]);
  };

  const removeDrink = (i: number) => setDrinks(drinks.filter((_, idx) => idx !== i));

  const total = drinks.reduce((sum, d) => {
    const info = drinkOptions.find(o => o.name === d.drink);
    return sum + (info ? info.mg * d.count : 0);
  }, 0);

  const pct = Math.min((total / LIMIT) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <select value={selected} onChange={e => setSelected(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2">
          {drinkOptions.map(d => <option key={d.name} value={d.name}>{d.name} ({d.mg}mg)</option>)}
        </select>
        <button onClick={addDrink} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">+ Add</button>
      </div>
      {drinks.length > 0 && (
        <div className="space-y-2">
          {drinks.map((d, i) => {
            const info = drinkOptions.find(o => o.name === d.drink);
            return (
              <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-sm">{d.drink}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setDrinks(drinks.map((dd, idx) => idx === i ? { ...dd, count: Math.max(1, dd.count - 1) } : dd))} className="w-7 h-7 rounded bg-gray-100 text-sm font-bold">−</button>
                    <span className="w-6 text-center text-sm font-medium">{d.count}</span>
                    <button onClick={() => setDrinks(drinks.map((dd, idx) => idx === i ? { ...dd, count: dd.count + 1 } : dd))} className="w-7 h-7 rounded bg-gray-100 text-sm font-bold">+</button>
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-14 text-right">{(info?.mg ?? 0) * d.count}mg</span>
                  <button onClick={() => removeDrink(i)} className="text-red-400 hover:text-red-600 text-lg">×</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Total Caffeine</span>
          <span className={`font-bold ${total > LIMIT ? 'text-red-600' : 'text-green-600'}`}>{total}mg / {LIMIT}mg</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${total > LIMIT ? 'bg-red-500' : total > LIMIT * 0.75 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
        </div>
        {total > LIMIT && <p className="text-sm text-red-600 mt-2">⚠️ You've exceeded the recommended daily limit of {LIMIT}mg!</p>}
      </div>
    </div>
  );
};

export default CaffeineCalculator;
