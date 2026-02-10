import { useState } from 'react';

const MealPrepCalculator = () => {
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [days, setDays] = useState(5);
  const [servingsPerMeal, setServingsPerMeal] = useState(1);
  const [recipes, setRecipes] = useState(3);

  const totalMeals = mealsPerDay * days;
  const totalServings = totalMeals * servingsPerMeal;
  const servingsPerRecipe = Math.ceil(totalServings / recipes);
  const containers = totalMeals;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Meals per Day</label>
          <input type="number" value={mealsPerDay} onChange={e => setMealsPerDay(+e.target.value)} min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Days</label>
          <input type="number" value={days} onChange={e => setDays(+e.target.value)} min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Servings per Meal</label>
          <input type="number" value={servingsPerMeal} onChange={e => setServingsPerMeal(+e.target.value)} min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Recipes</label>
          <input type="number" value={recipes} onChange={e => setRecipes(+e.target.value)} min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
          <p className="text-3xl">📦</p>
          <p className="text-2xl font-bold text-blue-700">{containers}</p>
          <p className="text-xs text-blue-500">containers needed</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
          <p className="text-3xl">🍽️</p>
          <p className="text-2xl font-bold text-green-700">{totalMeals}</p>
          <p className="text-xs text-green-500">total meals</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
          <p className="text-3xl">🥘</p>
          <p className="text-2xl font-bold text-amber-700">{totalServings}</p>
          <p className="text-xs text-amber-500">total servings</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
          <p className="text-3xl">📖</p>
          <p className="text-2xl font-bold text-purple-700">{servingsPerRecipe}</p>
          <p className="text-xs text-purple-500">servings per recipe</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">💡 Meal Prep Tips</h3>
        <ul className="space-y-1 list-disc pl-4">
          <li>Cook grains and proteins in large batches on Sunday</li>
          <li>Use glass containers for microwave reheating</li>
          <li>Freeze meals for days 4-5 to keep them fresh</li>
          <li>Label containers with the day and meal type</li>
        </ul>
      </div>
    </div>
  );
};

export default MealPrepCalculator;
