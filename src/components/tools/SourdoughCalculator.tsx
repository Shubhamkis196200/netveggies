import { useState } from 'react';

const SourdoughCalculator = () => {
  const [totalFlour, setTotalFlour] = useState(500);
  const [hydration, setHydration] = useState(75);
  const [starterPct, setStarterPct] = useState(20);
  const [salt, setSalt] = useState(2);

  const starterFlour = totalFlour * (starterPct / 100);
  const starterWeight = starterFlour * 2; // 100% hydration starter
  const totalWater = totalFlour * (hydration / 100);
  const waterFromStarter = starterFlour; // 100% hydration
  const addedWater = totalWater - waterFromStarter;
  const addedFlour = totalFlour - starterFlour;
  const saltWeight = totalFlour * (salt / 100);
  const totalDough = totalFlour + totalWater + saltWeight;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Assumes 100% hydration starter (equal parts flour and water).</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Total Flour (g)</label>
          <input type="number" value={totalFlour} onChange={e => setTotalFlour(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hydration (%)</label>
          <input type="range" min={50} max={100} value={hydration} onChange={e => setHydration(+e.target.value)} className="w-full" />
          <span className="text-sm text-green-600 font-bold">{hydration}%</span>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Starter (%)</label>
          <input type="range" min={5} max={40} value={starterPct} onChange={e => setStarterPct(+e.target.value)} className="w-full" />
          <span className="text-sm text-green-600 font-bold">{starterPct}%</span>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Salt (%)</label>
          <input type="range" min={1} max={3} step={0.1} value={salt} onChange={e => setSalt(+e.target.value)} className="w-full" />
          <span className="text-sm text-green-600 font-bold">{salt}%</span>
        </div>
      </div>
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-4">🍞 Your Recipe</h3>
        <div className="space-y-2">
          {[
            { label: 'Bread Flour', value: `${Math.round(addedFlour)}g` },
            { label: 'Water', value: `${Math.round(addedWater)}g` },
            { label: 'Starter (100% hydration)', value: `${Math.round(starterWeight)}g` },
            { label: 'Salt', value: `${Math.round(saltWeight * 10) / 10}g` },
          ].map(item => (
            <div key={item.label} className="flex justify-between py-1 border-b border-amber-100 last:border-0">
              <span className="text-sm text-amber-700">{item.label}</span>
              <span className="text-sm font-bold text-amber-900">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t-2 border-amber-300 flex justify-between">
          <span className="font-bold text-amber-800">Total Dough</span>
          <span className="font-bold text-amber-900">{Math.round(totalDough)}g</span>
        </div>
      </div>
    </div>
  );
};

export default SourdoughCalculator;
