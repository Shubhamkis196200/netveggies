import { useState } from 'react';

const drinkTypes = [
  { name: 'Beer (pint, 5%)', mlDefault: 568, abvDefault: 5 },
  { name: 'Wine (glass, 12%)', mlDefault: 175, abvDefault: 12 },
  { name: 'Spirit (shot, 40%)', mlDefault: 25, abvDefault: 40 },
  { name: 'Cocktail (mixed)', mlDefault: 200, abvDefault: 15 },
  { name: 'Cider (pint, 4.5%)', mlDefault: 568, abvDefault: 4.5 },
  { name: 'Custom', mlDefault: 0, abvDefault: 0 },
];

const AlcoholUnitCalculator = () => {
  const [drinks, setDrinks] = useState<{ type: string; ml: number; abv: number; count: number }[]>([]);
  const [selType, setSelType] = useState(drinkTypes[0].name);

  const addDrink = () => {
    const dt = drinkTypes.find(d => d.name === selType)!;
    setDrinks([...drinks, { type: dt.name, ml: dt.mlDefault, abv: dt.abvDefault, count: 1 }]);
  };

  const totalUnits = drinks.reduce((s, d) => s + (d.ml * d.abv * d.count) / 1000, 0);
  const totalCals = drinks.reduce((s, d) => s + d.ml * d.abv * 0.0789 * 7 * d.count / 100, 0); // rough cal estimate

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <select value={selType} onChange={e => setSelType(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm">
          {drinkTypes.map(d => <option key={d.name}>{d.name}</option>)}
        </select>
        <button onClick={addDrink} className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600">+ Add Drink</button>
      </div>
      {drinks.map((d, i) => (
        <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">{d.type}</span>
            <button onClick={() => setDrinks(drinks.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">×</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-500">Volume (ml)</label>
              <input type="number" value={d.ml} onChange={e => setDrinks(drinks.map((dd, idx) => idx === i ? { ...dd, ml: +e.target.value } : dd))} className="w-full border border-gray-200 rounded px-2 py-1 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500">ABV %</label>
              <input type="number" value={d.abv} step={0.1} onChange={e => setDrinks(drinks.map((dd, idx) => idx === i ? { ...dd, abv: +e.target.value } : dd))} className="w-full border border-gray-200 rounded px-2 py-1 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Count</label>
              <input type="number" value={d.count} min={1} onChange={e => setDrinks(drinks.map((dd, idx) => idx === i ? { ...dd, count: +e.target.value } : dd))} className="w-full border border-gray-200 rounded px-2 py-1 text-sm" />
            </div>
          </div>
          <p className="text-xs text-gray-400">= {((d.ml * d.abv * d.count) / 1000).toFixed(1)} units</p>
        </div>
      ))}
      {drinks.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className={`rounded-xl p-4 text-center border-2 ${totalUnits > 14 ? 'bg-red-50 border-red-400' : 'bg-rose-50 border-rose-300'}`}>
            <p className="text-sm text-rose-600">Total Units</p>
            <p className="text-3xl font-bold text-rose-700">{totalUnits.toFixed(1)}</p>
            <p className="text-xs text-rose-400">Weekly limit: 14 units</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
            <p className="text-sm text-amber-600">Est. Calories</p>
            <p className="text-3xl font-bold text-amber-700">{Math.round(totalCals)}</p>
            <p className="text-xs text-amber-400">empty calories</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlcoholUnitCalculator;
