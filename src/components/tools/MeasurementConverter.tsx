import { useState } from 'react';

const conversions: Record<string, Record<string, number>> = {
  cup: { tbsp: 16, tsp: 48, ml: 236.588, 'fl oz': 8, l: 0.236588 },
  tbsp: { cup: 1/16, tsp: 3, ml: 14.787, 'fl oz': 0.5, l: 0.014787 },
  tsp: { cup: 1/48, tbsp: 1/3, ml: 4.929, 'fl oz': 1/6, l: 0.004929 },
  ml: { cup: 1/236.588, tbsp: 1/14.787, tsp: 1/4.929, 'fl oz': 1/29.574, l: 0.001 },
  'fl oz': { cup: 0.125, tbsp: 2, tsp: 6, ml: 29.574, l: 0.029574 },
  l: { cup: 4.227, tbsp: 67.628, tsp: 202.884, ml: 1000, 'fl oz': 33.814 },
  g: { oz: 1/28.3495, kg: 0.001, lb: 1/453.592 },
  oz: { g: 28.3495, kg: 0.0283495, lb: 1/16 },
  kg: { g: 1000, oz: 35.274, lb: 2.20462 },
  lb: { g: 453.592, oz: 16, kg: 0.453592 },
};

const units = Object.keys(conversions);

const MeasurementConverter = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState('cup');
  const [to, setTo] = useState('ml');
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    if (from === to) { setResult(value); return; }
    const rate = conversions[from]?.[to];
    setResult(rate ? Math.round(value * rate * 1000) / 1000 : null);
  };

  const getCompatible = (unit: string) => {
    return conversions[unit] ? [unit, ...Object.keys(conversions[unit])] : units;
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input type="number" value={value} onChange={e => setValue(+e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select value={from} onChange={e => { setFrom(e.target.value); setResult(null); }} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select value={to} onChange={e => { setTo(e.target.value); setResult(null); }} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            {getCompatible(from).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <button onClick={convert} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">Convert</button>
      {result !== null && (
        <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-500">
          <p className="text-lg">{value} {from} =</p>
          <p className="text-3xl font-bold text-green-700">{result} {to}</p>
        </div>
      )}
      {result === null && from !== to && !conversions[from]?.[to] && (
        <p className="text-sm text-red-500 text-center">Cannot convert between {from} and {to} (different measurement types).</p>
      )}
    </div>
  );
};

export default MeasurementConverter;
