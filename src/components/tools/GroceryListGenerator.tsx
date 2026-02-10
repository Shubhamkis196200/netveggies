import { useState, useEffect } from 'react';

interface GroceryItem { id: number; name: string; category: string; checked: boolean; }

const categories = ['Produce', 'Grains & Bread', 'Protein', 'Dairy & Alternatives', 'Canned & Dry', 'Frozen', 'Spices & Condiments', 'Snacks', 'Beverages', 'Other'];

const STORAGE_KEY = 'netveggies-grocery-list';

const GroceryListGenerator = () => {
  const [items, setItems] = useState<GroceryItem[]>(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('Produce');

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now(), name: newItem.trim(), category: newCategory, checked: false }]);
    setNewItem('');
  };

  const toggleItem = (id: number) => setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));
  const clearChecked = () => setItems(items.filter(i => !i.checked));
  const clearAll = () => setItems([]);

  const grouped = categories.map(cat => ({ cat, items: items.filter(i => i.category === cat) })).filter(g => g.items.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input placeholder="Add item..." value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-2 text-sm">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <button onClick={addItem} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Add</button>
      </div>
      <div className="flex gap-2 text-sm">
        <span className="text-gray-500">{items.length} items • {items.filter(i => i.checked).length} checked</span>
        <button onClick={clearChecked} className="text-yellow-600 hover:underline ml-auto">Clear checked</button>
        <button onClick={clearAll} className="text-red-600 hover:underline">Clear all</button>
      </div>
      {items.length === 0 && <p className="text-center text-gray-400 py-8">Your grocery list is empty 🛒</p>}
      {grouped.map(g => (
        <div key={g.cat}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2">{g.cat}</h3>
          <div className="space-y-1">
            {g.items.map(item => (
              <div key={item.id} className={`flex items-center gap-3 p-2 rounded-lg ${item.checked ? 'bg-green-50' : 'bg-white'} border border-gray-100`}>
                <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} className="w-4 h-4 rounded accent-green-600" />
                <span className={`flex-1 text-sm ${item.checked ? 'line-through text-gray-400' : ''}`}>{item.name}</span>
                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 text-sm">×</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroceryListGenerator;
