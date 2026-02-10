import { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    let bmi: number;
    if (unit === 'metric') {
      bmi = weight / ((height / 100) ** 2);
    } else {
      bmi = (weight * 703) / (height ** 2);
    }
    bmi = Math.round(bmi * 10) / 10;
    let category: string, color: string;
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-600'; }
    else if (bmi < 25) { category = 'Normal weight'; color = 'text-green-600'; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-yellow-600'; }
    else { category = 'Obese'; color = 'text-red-600'; }
    setResult({ bmi, category, color });
  };

  const ranges = [
    { label: 'Underweight', range: '< 18.5', color: 'bg-blue-100 text-blue-700' },
    { label: 'Normal', range: '18.5 – 24.9', color: 'bg-green-100 text-green-700' },
    { label: 'Overweight', range: '25 – 29.9', color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Obese', range: '≥ 30', color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        {(['metric', 'imperial'] as const).map(u => (
          <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unit === u ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
            {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lbs/in)'}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
          <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
          <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">Calculate BMI</button>
      {result && (
        <div className="text-center bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Your BMI</p>
          <p className={`text-5xl font-bold ${result.color}`}>{result.bmi}</p>
          <p className={`text-lg font-semibold ${result.color} mt-1`}>{result.category}</p>
          {/* Visual scale */}
          <div className="mt-6 flex rounded-full overflow-hidden h-4">
            <div className="bg-blue-400 flex-1" />
            <div className="bg-green-400 flex-1" />
            <div className="bg-yellow-400 flex-1" />
            <div className="bg-red-400 flex-1" />
          </div>
          <div className="relative h-6 mt-1">
            <div className="absolute top-0" style={{ left: `${Math.min(Math.max((result.bmi - 12) / 30 * 100, 0), 100)}%`, transform: 'translateX(-50%)' }}>
              <span className="text-lg">▼</span>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        {ranges.map(r => (
          <div key={r.label} className={`${r.color} rounded-lg p-2 text-center text-xs font-medium`}>
            <p className="font-bold">{r.label}</p>
            <p>{r.range}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BMICalculator;
