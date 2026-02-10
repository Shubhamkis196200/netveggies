import { useState } from 'react';

const produce: Record<string, { fruits: string[]; vegetables: string[] }> = {
  January: { fruits: ['Oranges', 'Grapefruit', 'Lemons', 'Tangerines', 'Kiwi', 'Pomegranate'], vegetables: ['Kale', 'Brussels Sprouts', 'Cabbage', 'Turnips', 'Parsnips', 'Sweet Potatoes', 'Winter Squash'] },
  February: { fruits: ['Oranges', 'Grapefruit', 'Lemons', 'Tangerines', 'Blood Oranges'], vegetables: ['Kale', 'Brussels Sprouts', 'Cabbage', 'Turnips', 'Broccoli', 'Cauliflower'] },
  March: { fruits: ['Pineapple', 'Mangoes', 'Oranges', 'Strawberries'], vegetables: ['Artichokes', 'Asparagus', 'Broccoli', 'Lettuce', 'Mushrooms', 'Peas', 'Radishes'] },
  April: { fruits: ['Strawberries', 'Pineapple', 'Mangoes', 'Apricots'], vegetables: ['Artichokes', 'Asparagus', 'Peas', 'Spring Onions', 'Fava Beans', 'Rhubarb', 'Spinach'] },
  May: { fruits: ['Strawberries', 'Cherries', 'Apricots', 'Lychee'], vegetables: ['Asparagus', 'Corn', 'Zucchini', 'Snap Peas', 'Radishes', 'Green Beans'] },
  June: { fruits: ['Blueberries', 'Cherries', 'Peaches', 'Watermelon', 'Strawberries', 'Plums'], vegetables: ['Corn', 'Tomatoes', 'Zucchini', 'Cucumbers', 'Green Beans', 'Bell Peppers'] },
  July: { fruits: ['Blueberries', 'Blackberries', 'Peaches', 'Watermelon', 'Raspberries', 'Figs'], vegetables: ['Corn', 'Tomatoes', 'Eggplant', 'Cucumbers', 'Summer Squash', 'Okra'] },
  August: { fruits: ['Peaches', 'Plums', 'Figs', 'Grapes', 'Melons', 'Blackberries'], vegetables: ['Tomatoes', 'Corn', 'Eggplant', 'Peppers', 'Lima Beans', 'Tomatillos'] },
  September: { fruits: ['Apples', 'Grapes', 'Pears', 'Figs', 'Plums'], vegetables: ['Sweet Potatoes', 'Pumpkin', 'Beets', 'Broccoli', 'Cauliflower', 'Eggplant'] },
  October: { fruits: ['Apples', 'Pears', 'Cranberries', 'Grapes', 'Persimmons'], vegetables: ['Pumpkin', 'Sweet Potatoes', 'Winter Squash', 'Brussels Sprouts', 'Turnips', 'Kale'] },
  November: { fruits: ['Apples', 'Pears', 'Cranberries', 'Pomegranate', 'Persimmons'], vegetables: ['Sweet Potatoes', 'Pumpkin', 'Winter Squash', 'Kale', 'Turnips', 'Parsnips'] },
  December: { fruits: ['Oranges', 'Grapefruit', 'Tangerines', 'Pomegranate', 'Pears', 'Cranberries'], vegetables: ['Kale', 'Sweet Potatoes', 'Winter Squash', 'Brussels Sprouts', 'Cabbage', 'Parsnips'] },
};

const months = Object.keys(produce);

const SeasonalProduceGuide = () => {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const data = produce[month];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Select Month</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {months.map(m => (
            <button key={m} onClick={() => setMonth(m)} className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${month === m ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {m.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-900">What's in Season: {month}</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">🍎 Fruits</h3>
          <div className="flex flex-wrap gap-2">
            {data.fruits.map(f => (
              <span key={f} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">{f}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">🥦 Vegetables</h3>
          <div className="flex flex-wrap gap-2">
            {data.vegetables.map(v => (
              <span key={v} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalProduceGuide;
