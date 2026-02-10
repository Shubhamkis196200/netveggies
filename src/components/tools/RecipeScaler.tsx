import { useState } from 'react';

interface Ingredient { name: string; amount: number; unit: string; }

const RecipeScaler = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: 'Flour', amount: 2, unit: 'cups' }]);
  const [originalServings, setOriginalServings] = useState(4);
  const [targetServings, setTargetServings] = useState(8);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newUnit, setNewUnit] = useState('cups');

  const ratio = targetServings / originalServings;

  const addIngredient = () => {
    if (newName && newAmount) {
      setIngredients([...ingredients, { name: newName, amount: +newAmount, unit: newUnit }]);
      setNewName(''); setNewAmount('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium mb-1">Original Servings</label><input type="number" value={originalServings} onChange={e => setOriginalServings(+e.target.value)} min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Target Servings</label><input type="number" value={targetServings} onChange={e => setTargetServings(+e.target.value)} min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2" /></div>
      </div>
      <div className="bg-green-50 rounded-lg p-3 text-center text-sm font-medium text-green-700">Scale factor: {ratio.toFixed(2)}x</div>
      <div className="flex gap-2">
        <input placeholder="Ingredient" value={newName} onChange={e => setNewName(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Amount" type="number" value={newAmount} onChange={e => setNewAmount(e.target.value)} className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <select value={newUnit} onChange={e => setNewUnit(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-2 text-sm">
          {['cups', 'tbsp', 'tsp', 'oz', 'g', 'ml', 'lbs', 'kg', 'pieces'].map(u => <option key={u}>{u}</option>)}
        </select>
        <button onClick={addIngredient} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Add</button>
      </div>
      {ingredients.length > 0 && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50"><th className="text-left p-3">Ingredient</th><th className="text-right p-3">Original</th><th className="text-right p-3 text-green-700 font-bold">Scaled</th><th className="p-3 w-10" /></tr></thead>
            <tbody>
              {ingredients.map((ing, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-3">{ing.name}</td>
                  <td className="p-3 text-right text-gray-500">{ing.amount} {ing.unit}</td>
                  <td className="p-3 text-right font-bold text-green-700">{(ing.amount * ratio).toFixed(2)} {ing.unit}</td>
                  <td className="p-3"><button onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecipeScaler;
