import { useState } from 'react';

const meats = [
  { category: 'Beef', items: [
    { cut: 'Ground Beef', rare: null, medRare: null, medium: null, medWell: null, wellDone: 160, safe: 160 },
    { cut: 'Steak', rare: 125, medRare: 135, medium: 145, medWell: 150, wellDone: 160, safe: 145 },
    { cut: 'Roast', rare: 125, medRare: 135, medium: 145, medWell: 150, wellDone: 160, safe: 145 },
  ]},
  { category: 'Poultry', items: [
    { cut: 'Chicken Breast', rare: null, medRare: null, medium: null, medWell: null, wellDone: 165, safe: 165 },
    { cut: 'Chicken Thigh', rare: null, medRare: null, medium: null, medWell: null, wellDone: 175, safe: 165 },
    { cut: 'Turkey', rare: null, medRare: null, medium: null, medWell: null, wellDone: 165, safe: 165 },
    { cut: 'Duck Breast', rare: null, medRare: 135, medium: 145, medWell: 155, wellDone: 165, safe: 165 },
  ]},
  { category: 'Pork', items: [
    { cut: 'Pork Chop', rare: null, medRare: null, medium: 145, medWell: 150, wellDone: 160, safe: 145 },
    { cut: 'Pork Tenderloin', rare: null, medRare: null, medium: 145, medWell: 150, wellDone: 160, safe: 145 },
    { cut: 'Ground Pork', rare: null, medRare: null, medium: null, medWell: null, wellDone: 160, safe: 160 },
  ]},
  { category: 'Seafood', items: [
    { cut: 'Salmon', rare: 110, medRare: 120, medium: 130, medWell: 140, wellDone: 145, safe: 145 },
    { cut: 'Shrimp', rare: null, medRare: null, medium: null, medWell: null, wellDone: 145, safe: 145 },
    { cut: 'Tuna Steak', rare: 110, medRare: 120, medium: 130, medWell: null, wellDone: 145, safe: 145 },
  ]},
];

const MeatTempGuide = () => {
  const [search, setSearch] = useState('');
  const filtered = meats.map(m => ({
    ...m,
    items: m.items.filter(i => i.cut.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase())),
  })).filter(m => m.items.length > 0);

  const renderTemp = (t: number | null) => t ? <span className="font-medium">{t}°F</span> : <span className="text-gray-300">—</span>;

  return (
    <div className="space-y-6">
      <input type="text" placeholder="Search proteins..." value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
      <p className="text-xs text-gray-500">🔴 Temperatures in °F. USDA minimum safe temps highlighted in green. Rest meat 3+ minutes after cooking.</p>
      {filtered.map(cat => (
        <div key={cat.category}>
          <h3 className="font-bold text-gray-900 mb-2">{cat.category}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead><tr className="bg-gray-50">
                <th className="text-left p-2">Cut</th>
                <th className="p-2">Rare</th><th className="p-2">Med-Rare</th><th className="p-2">Medium</th><th className="p-2">Med-Well</th><th className="p-2">Well Done</th><th className="p-2 bg-green-50">Safe Min</th>
              </tr></thead>
              <tbody>
                {cat.items.map(item => (
                  <tr key={item.cut} className="border-t border-gray-100 text-center">
                    <td className="text-left p-2 font-medium">{item.cut}</td>
                    <td className="p-2">{renderTemp(item.rare)}</td>
                    <td className="p-2">{renderTemp(item.medRare)}</td>
                    <td className="p-2">{renderTemp(item.medium)}</td>
                    <td className="p-2">{renderTemp(item.medWell)}</td>
                    <td className="p-2">{renderTemp(item.wellDone)}</td>
                    <td className="p-2 bg-green-50 font-bold text-green-700">{item.safe}°F</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeatTempGuide;
