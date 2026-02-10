import { useState } from 'react';

const foods = [
  { name: 'Bread (sliced)', months: 3, tips: 'Double-wrap to prevent freezer burn' },
  { name: 'Ground Beef', months: 4, tips: 'Flatten in bag for faster thawing' },
  { name: 'Chicken Breast', months: 9, tips: 'Remove air from bag before freezing' },
  { name: 'Cooked Rice', months: 6, tips: 'Freeze in portion-sized containers' },
  { name: 'Cooked Pasta', months: 3, tips: 'Slightly undercook before freezing' },
  { name: 'Bananas (peeled)', months: 6, tips: 'Great for smoothies and baking' },
  { name: 'Berries', months: 12, tips: 'Flash-freeze on tray first, then bag' },
  { name: 'Butter', months: 9, tips: 'Keeps well in original packaging + foil' },
  { name: 'Cheese (hard)', months: 6, tips: 'Grate before freezing for easier use' },
  { name: 'Soup/Stew', months: 4, tips: 'Leave headspace for expansion' },
  { name: 'Tofu', months: 5, tips: 'Freeze changes texture (chewier — great for stir-fry)' },
  { name: 'Pizza Dough', months: 3, tips: 'Oil ball, wrap in plastic, then foil' },
  { name: 'Cooked Beans', months: 6, tips: 'Freeze with cooking liquid in portions' },
  { name: 'Muffins', months: 3, tips: 'Wrap individually for easy grab-and-go' },
  { name: 'Cookie Dough', months: 3, tips: 'Pre-scoop into balls before freezing' },
  { name: 'Shrimp (raw)', months: 12, tips: 'Keep in original packaging if vacuum sealed' },
  { name: 'Fish Fillets', months: 6, tips: 'Wrap tightly in plastic then foil' },
  { name: 'Pork Chops', months: 6, tips: 'Separate with parchment paper' },
  { name: 'Broccoli (blanched)', months: 12, tips: 'Blanch 3 min, ice bath, dry, then freeze' },
  { name: 'Corn (blanched)', months: 12, tips: 'Cut off cob or freeze whole ears' },
  { name: 'Spinach (blanched)', months: 12, tips: 'Squeeze out water, freeze in balls' },
  { name: 'Avocado (mashed)', months: 4, tips: 'Add lemon juice to prevent browning' },
  { name: 'Herbs (in oil)', months: 6, tips: 'Chop and freeze in ice cube trays with olive oil' },
  { name: 'Pie Crust', months: 3, tips: 'Roll flat, stack with parchment between' },
  { name: 'Pancakes/Waffles', months: 3, tips: 'Cool completely, stack with parchment' },
  { name: 'Veggie Burgers', months: 3, tips: 'Separate with parchment paper' },
  { name: 'Hummus', months: 4, tips: 'Drizzle oil on top before sealing' },
  { name: 'Nut Butter', months: 6, tips: 'Freeze in ice cube trays for portions' },
  { name: 'Egg Whites', months: 12, tips: 'Freeze in ice cube trays (1 per cube)' },
  { name: 'Coconut Milk', months: 3, tips: 'Freeze in ice cube trays for cooking' },
  { name: 'Tempeh', months: 12, tips: 'Keeps exceptionally well frozen' },
  { name: 'Pesto', months: 6, tips: 'Freeze in ice cube trays' },
];

const FreezerStorageGuide = () => {
  const [search, setSearch] = useState('');
  const filtered = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <input type="text" placeholder="Search foods..." value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
      <p className="text-sm text-gray-500">{filtered.length} foods found. Times show maximum recommended storage at 0°F (-18°C).</p>
      <div className="space-y-2">
        {filtered.map(f => (
          <div key={f.name} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-4">
            <div className="flex-shrink-0 w-16 text-center">
              <span className="text-2xl font-bold text-cyan-600">{f.months}</span>
              <p className="text-xs text-gray-400">months</p>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{f.name}</h3>
              <p className="text-xs text-gray-500">💡 {f.tips}</p>
            </div>
            <div className="flex-shrink-0 w-20">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${f.months >= 9 ? 'bg-green-500' : f.months >= 6 ? 'bg-yellow-500' : 'bg-orange-500'}`} style={{ width: `${(f.months / 12) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreezerStorageGuide;
