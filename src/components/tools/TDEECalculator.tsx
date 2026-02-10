import { useState } from 'react';

const TDEECalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activity, setActivity] = useState(1.55);
  const [result, setResult] = useState<{ bmr: number; tef: number; neat: number; tdee: number } | null>(null);

  const activities = [
    { value: 1.2, label: 'Sedentary' },
    { value: 1.375, label: 'Light (1-3 days)' },
    { value: 1.55, label: 'Moderate (3-5 days)' },
    { value: 1.725, label: 'Active (6-7 days)' },
    { value: 1.9, label: 'Very Active (2x/day)' },
  ];

  const calculate = () => {
    const bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = bmr * activity;
    const tef = tdee * 0.1; // thermic effect of food ~10%
    const neat = tdee - bmr - tef;
    setResult({ bmr: Math.round(bmr), tef: Math.round(tef), neat: Math.round(neat), tdee: Math.round(tdee) });
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </div>
        <div><label className="block text-sm font-medium mb-1">Age</label><input type="number" value={age} onChange={e => setAge(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Weight (kg)</label><input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Height (cm)</label><input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Activity Level</label>
        <select value={activity} onChange={e => setActivity(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
          {activities.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
      </div>
      <button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">Calculate TDEE</button>
      {result && (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-500">
            <p className="text-sm text-green-700">Total Daily Energy Expenditure</p>
            <p className="text-4xl font-bold text-green-700">{result.tdee} cal/day</p>
          </div>
          <h3 className="font-semibold text-gray-900">Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Basal Metabolic Rate (BMR)', value: result.bmr, pct: Math.round(result.bmr / result.tdee * 100), color: 'bg-blue-500' },
              { label: 'Activity & NEAT', value: result.neat, pct: Math.round(result.neat / result.tdee * 100), color: 'bg-amber-500' },
              { label: 'Thermic Effect of Food (TEF)', value: result.tef, pct: Math.round(result.tef / result.tdee * 100), color: 'bg-purple-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value} cal ({item.pct}%)</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TDEECalculator;
