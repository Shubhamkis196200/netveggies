import { useState } from 'react';

const CalorieCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [result, setResult] = useState<{ bmr: number; tdee: number; target: number } | null>(null);

  const activityLevels = [
    { value: 1.2, label: 'Sedentary (little or no exercise)' },
    { value: 1.375, label: 'Lightly active (1-3 days/week)' },
    { value: 1.55, label: 'Moderately active (3-5 days/week)' },
    { value: 1.725, label: 'Very active (6-7 days/week)' },
    { value: 1.9, label: 'Extra active (very hard exercise + physical job)' },
  ];

  const calculate = () => {
    // Mifflin-St Jeor equation
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = bmr * activity;
    const goalAdjust = goal === 'lose' ? -500 : goal === 'gain' ? 400 : 0;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(tdee + goalAdjust) });
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={age} onChange={e => setAge(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Activity Level</label>
        <select value={activity} onChange={e => setActivity(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
          {activityLevels.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Goal</label>
        <div className="flex gap-3">
          {(['lose', 'maintain', 'gain'] as const).map(g => (
            <button key={g} onClick={() => setGoal(g)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${goal === g ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {g === 'lose' ? '🔻 Lose Weight' : g === 'gain' ? '🔺 Gain Weight' : '⚖️ Maintain'}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">Calculate Calories</button>
      {result && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <p className="text-sm text-gray-500">BMR</p>
            <p className="text-2xl font-bold text-gray-900">{result.bmr}</p>
            <p className="text-xs text-gray-400">cal/day</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <p className="text-sm text-gray-500">TDEE</p>
            <p className="text-2xl font-bold text-gray-900">{result.tdee}</p>
            <p className="text-xs text-gray-400">cal/day</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-500">
            <p className="text-sm text-green-700 font-medium">Target</p>
            <p className="text-2xl font-bold text-green-700">{result.target}</p>
            <p className="text-xs text-green-600">cal/day to {goal} weight</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
