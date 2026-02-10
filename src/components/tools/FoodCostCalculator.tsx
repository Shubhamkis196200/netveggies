import { useState } from 'react';

interface CostItem { name: string; qty: number; unit: string; price: number; }

const FoodCostCalculator = () => {
  const [items, setItems] = useState<CostItem[]>([]);
  const [servings, setServings] = useState(4);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('g');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (name && qty && price) {
      setItems([...items, { name, qty: +qty, unit, price: +price }]);
      setName(''); setQty(''); setPrice('');
    }
  };

  const total = items.reduce((s, i) => s + i.price, 0);
  const perServing = servings > 0 ? total / servings : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Number of Servings</label>
        <input type="number" value={servings} onChange={e => setServings(+e.target.value)} min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
      </div>
      <div className="grid grid-cols-5 gap-2">
        <input placeholder="Ingredient" value={name} onChange={e => setName(e.target.value)} className="col-span-2 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Qty" type="number" value={qty} onChange={e => setQty(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-2 text-sm" />
        <select value={unit} onChange={e => setUnit(e.target.value)} className="border border-gray-300 rounded-lg px-1 py-2 text-sm">
          {['g', 'kg', 'oz', 'lb', 'ml', 'L', 'cup', 'tbsp', 'pcs'].map(u => <option key={u}>{u}</option>)}
        </select>
        <input placeholder="$" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-2 text-sm" />
      </div>
      <button onClick={addItem} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition-colors">Add Ingredient</button>
      {items.length > 0 && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50"><th className="text-left p-3">Ingredient</th><th className="text-right p-3">Qty</th><th className="text-right p-3">Cost</th><th className="p-3 w-8" /></tr></thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-right text-gray-500">{item.qty} {item.unit}</td>
                  <td className="p-3 text-right font-medium">${item.price.toFixed(2)}</td>
                  <td className="p-3"><button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {items.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-200">
            <p className="text-sm text-yellow-600">Total Cost</p>
            <p className="text-3xl font-bold text-yellow-700">${total.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-500">
            <p className="text-sm text-green-600">Cost per Serving</p>
            <p className="text-3xl font-bold text-green-700">${perServing.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCostCalculator;
