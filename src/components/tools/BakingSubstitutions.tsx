import { useState } from 'react';

const subs = [
  { ingredient: 'Eggs (1 egg)', options: ['1 tbsp ground flaxseed + 3 tbsp water (flax egg)', '¼ cup unsweetened applesauce', '¼ cup mashed banana', '3 tbsp aquafaba (chickpea water)', '¼ cup silken tofu (blended)'] },
  { ingredient: 'Butter (1 cup)', options: ['1 cup coconut oil', '1 cup vegan butter (Earth Balance)', '¾ cup vegetable oil', '1 cup unsweetened applesauce (low-fat baking)'] },
  { ingredient: 'Milk (1 cup)', options: ['1 cup oat milk', '1 cup almond milk', '1 cup soy milk', '1 cup coconut milk'] },
  { ingredient: 'Buttermilk (1 cup)', options: ['1 cup plant milk + 1 tbsp lemon juice (let sit 5 min)', '1 cup plant milk + 1 tbsp apple cider vinegar'] },
  { ingredient: 'Heavy Cream (1 cup)', options: ['1 cup full-fat coconut cream (chilled)', '1 cup cashew cream (blended soaked cashews)'] },
  { ingredient: 'Honey (1 cup)', options: ['1 cup maple syrup', '1 cup agave nectar', '¾ cup date syrup'] },
  { ingredient: 'Gelatin (1 tbsp)', options: ['1 tbsp agar-agar powder (dissolve in liquid, boil)', '2 tsp carrageenan'] },
  { ingredient: 'White Sugar (1 cup)', options: ['1 cup coconut sugar', '¾ cup maple syrup (reduce liquid by 3 tbsp)', '1 cup date sugar'] },
  { ingredient: 'All-Purpose Flour (1 cup)', options: ['1 cup whole wheat flour', '1 cup almond flour (reduce liquid slightly)', '1 cup oat flour', '¾ cup coconut flour + increase eggs/liquid'] },
  { ingredient: 'Baking Powder (1 tsp)', options: ['¼ tsp baking soda + ½ tsp cream of tartar', '¼ tsp baking soda + ½ cup buttermilk (replace liquid)'] },
  { ingredient: 'Cornstarch (1 tbsp)', options: ['2 tbsp all-purpose flour', '1 tbsp arrowroot powder', '1 tbsp tapioca starch'] },
  { ingredient: 'Sour Cream (1 cup)', options: ['1 cup plain coconut yogurt', '1 cup cashew cream + 1 tsp lemon juice'] },
  { ingredient: 'Cream Cheese', options: ['Equal amount vegan cream cheese (Kite Hill, Miyoko\'s)', 'Blended soaked cashews + lemon juice + salt'] },
  { ingredient: 'Chocolate (1 oz)', options: ['3 tbsp cocoa powder + 1 tbsp oil', '3 tbsp carob powder + 1 tbsp oil'] },
  { ingredient: 'Yogurt (1 cup)', options: ['1 cup coconut yogurt', '1 cup soy yogurt', '1 cup cashew yogurt'] },
  { ingredient: 'Mayonnaise (1 cup)', options: ['1 cup vegan mayo (vegenaise)', '1 cup blended silken tofu + lemon + mustard'] },
  { ingredient: 'Parmesan Cheese', options: ['Nutritional yeast (equal amount)', 'Cashew parmesan (cashews + nooch + garlic + salt)'] },
  { ingredient: 'Worcestershire Sauce', options: ['Equal amount soy sauce + dash of vinegar', 'Coconut aminos + rice vinegar'] },
  { ingredient: 'Fish Sauce (1 tbsp)', options: ['1 tbsp soy sauce + ½ tsp seaweed flakes', '1 tbsp mushroom sauce'] },
  { ingredient: 'Beef/Chicken Broth (1 cup)', options: ['1 cup vegetable broth', '1 cup mushroom broth', '1 cup miso dissolved in water'] },
];

const BakingSubstitutions = () => {
  const [search, setSearch] = useState('');
  const filtered = subs.filter(s => s.ingredient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search ingredients..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <p className="text-sm text-gray-500">{filtered.length} substitutions found</p>
      <div className="space-y-3">
        {filtered.map(s => (
          <div key={s.ingredient} className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">🔄 {s.ingredient}</h3>
            <ul className="space-y-1">
              {s.options.map((opt, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{opt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BakingSubstitutions;
