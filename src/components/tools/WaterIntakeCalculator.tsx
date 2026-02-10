import { useState } from 'react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [climate, setClimate] = useState<'cool' | 'moderate' | 'hot'>('moderate');
  const [result, setResult] = useState<{ liters: number; cups: number; bottles: number } | null>(null);

  const calculate = () => {
    let base = weight * 0.033; // base: 33ml per kg
    if (activity === 'moderate') base += 0.5;
    if (activity === 'high') base += 1.0;
    if (climate === 'moderate') base += 0.2;
    if (climate === 'hot') base += 0.5;
    const liters = Math.round(base * 10) / 10;
    setResult({ liters, cups: Math.round(liters * 4.227), bottles: Math.round(liters * 2) });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Body Weight (kg)</label>
        <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Activity Level</label>
        <div className="flex gap-2">
          {(['low', 'moderate', 'high'] as const).map(a => (
            <button key={a} onClick={() => setActivity(a)} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activity === a ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {a === 'low' ? '🪑 Low' : a === 'moderate' ? '🚶 Moderate' : '🏃 High'}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Climate</label>
        <div className="flex gap-2">
          {(['cool', 'moderate', 'hot'] as const).map(c => (
            <button key={c} onClick={() => setClimate(c)} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${climate === c ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {c === 'cool' ? '❄️ Cool' : c === 'moderate' ? '🌤️ Moderate' : '☀️ Hot'}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors">Calculate Water Intake</button>
      {result && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
            <p className="text-3xl">💧</p>
            <p className="text-2xl font-bold text-blue-700">{result.liters}L</p>
            <p className="text-xs text-blue-500">liters per day</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
            <p className="text-3xl">🥤</p>
            <p className="text-2xl font-bold text-blue-700">{result.cups}</p>
            <p className="text-xs text-blue-500">cups (250ml)</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
            <p className="text-3xl">🍶</p>
            <p className="text-2xl font-bold text-blue-700">{result.bottles}</p>
            <p className="text-xs text-blue-500">bottles (500ml)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeCalculator;
