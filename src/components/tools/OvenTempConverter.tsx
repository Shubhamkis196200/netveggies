import { useState } from 'react';

const OvenTempConverter = () => {
  const [value, setValue] = useState(350);
  const [from, setFrom] = useState<'F' | 'C' | 'Gas'>('F');

  const convert = (v: number, f: typeof from) => {
    let fah: number, cel: number, gas: number;
    if (f === 'F') { fah = v; cel = (v - 32) * 5 / 9; }
    else if (f === 'C') { cel = v; fah = v * 9 / 5 + 32; }
    else { const gasToF: Record<number, number> = { 1: 275, 2: 300, 3: 325, 4: 350, 5: 375, 6: 400, 7: 425, 8: 450, 9: 475, 10: 500 }; fah = gasToF[v] || 350; cel = (fah - 32) * 5 / 9; }
    // Gas mark approximation
    if (fah <= 275) gas = 1;
    else if (fah <= 300) gas = 2;
    else if (fah <= 325) gas = 3;
    else if (fah <= 350) gas = 4;
    else if (fah <= 375) gas = 5;
    else if (fah <= 400) gas = 6;
    else if (fah <= 425) gas = 7;
    else if (fah <= 450) gas = 8;
    else if (fah <= 475) gas = 9;
    else gas = 10;
    return { f: Math.round(fah), c: Math.round(cel), gas };
  };

  const r = convert(value, from);

  const presets = [
    { name: 'Low & Slow Roast', f: 275 }, { name: 'Cookies', f: 350 }, { name: 'Bread', f: 375 },
    { name: 'Roast Vegetables', f: 425 }, { name: 'Pizza', f: 475 }, { name: 'Broil', f: 500 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Temperature</label>
          <input type="number" value={value} onChange={e => setValue(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <select value={from} onChange={e => setFrom(e.target.value as typeof from)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option value="F">°F (Fahrenheit)</option>
            <option value="C">°C (Celsius)</option>
            <option value="Gas">Gas Mark</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
          <p className="text-sm text-red-600">Fahrenheit</p>
          <p className="text-3xl font-bold text-red-700">{r.f}°F</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
          <p className="text-sm text-blue-600">Celsius</p>
          <p className="text-3xl font-bold text-blue-700">{r.c}°C</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
          <p className="text-sm text-amber-600">Gas Mark</p>
          <p className="text-3xl font-bold text-amber-700">{r.gas}</p>
        </div>
      </div>
      <h3 className="font-semibold text-gray-900">Common Presets</h3>
      <div className="grid sm:grid-cols-3 gap-2">
        {presets.map(p => (
          <button key={p.name} onClick={() => { setValue(p.f); setFrom('F'); }} className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-green-400 transition-colors">
            <p className="text-sm font-medium">{p.name}</p>
            <p className="text-xs text-gray-500">{p.f}°F / {Math.round((p.f - 32) * 5 / 9)}°C</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OvenTempConverter;
