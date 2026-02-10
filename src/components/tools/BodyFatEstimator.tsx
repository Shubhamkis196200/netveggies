import { useState } from 'react';

const BodyFatEstimator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [waist, setWaist] = useState(85);
  const [neck, setNeck] = useState(38);
  const [hip, setHip] = useState(95);
  const [height, setHeight] = useState(175);
  const [result, setResult] = useState<{ bf: number; category: string; color: string } | null>(null);

  const calculate = () => {
    let bf: number;
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    bf = Math.round(bf * 10) / 10;
    let category: string, color: string;
    if (gender === 'male') {
      if (bf < 6) { category = 'Essential Fat'; color = 'text-red-600'; }
      else if (bf < 14) { category = 'Athletic'; color = 'text-blue-600'; }
      else if (bf < 18) { category = 'Fitness'; color = 'text-green-600'; }
      else if (bf < 25) { category = 'Average'; color = 'text-yellow-600'; }
      else { category = 'Above Average'; color = 'text-orange-600'; }
    } else {
      if (bf < 14) { category = 'Essential Fat'; color = 'text-red-600'; }
      else if (bf < 21) { category = 'Athletic'; color = 'text-blue-600'; }
      else if (bf < 25) { category = 'Fitness'; color = 'text-green-600'; }
      else if (bf < 32) { category = 'Average'; color = 'text-yellow-600'; }
      else { category = 'Above Average'; color = 'text-orange-600'; }
    }
    setResult({ bf, category, color });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Uses the U.S. Navy body fat estimation method. All measurements in cm.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </div>
        <div><label className="block text-sm font-medium mb-1">Height (cm)</label><input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Waist (cm)</label><input type="number" value={waist} onChange={e => setWaist(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Neck (cm)</label><input type="number" value={neck} onChange={e => setNeck(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
        {gender === 'female' && (
          <div><label className="block text-sm font-medium mb-1">Hip (cm)</label><input type="number" value={hip} onChange={e => setHip(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
        )}
      </div>
      <button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">Estimate Body Fat</button>
      {result && (
        <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
          <p className="text-sm text-gray-500">Estimated Body Fat</p>
          <p className={`text-5xl font-bold ${result.color}`}>{result.bf}%</p>
          <p className={`text-lg font-semibold ${result.color}`}>{result.category}</p>
        </div>
      )}
    </div>
  );
};

export default BodyFatEstimator;
