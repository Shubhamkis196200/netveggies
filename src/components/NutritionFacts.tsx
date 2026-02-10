export default function NutritionFacts({ nutrition }: { nutrition: { calories: number; protein: number; carbs: number; fat: number; fiber: number } }) {
  const items = [
    { label: 'Calories', value: nutrition.calories, unit: 'kcal', color: 'bg-accent' },
    { label: 'Protein', value: nutrition.protein, unit: 'g', color: 'bg-primary' },
    { label: 'Carbs', value: nutrition.carbs, unit: 'g', color: 'bg-yellow-400' },
    { label: 'Fat', value: nutrition.fat, unit: 'g', color: 'bg-red-400' },
    { label: 'Fiber', value: nutrition.fiber, unit: 'g', color: 'bg-green-600' },
  ];

  return (
    <div className="bg-cream rounded-2xl p-6">
      <h3 className="font-heading text-xl font-semibold mb-4">Nutrition Facts</h3>
      <p className="text-xs text-muted mb-4">Per serving</p>
      <div className="grid grid-cols-5 gap-3">
        {items.map(item => (
          <div key={item.label} className="text-center">
            <div className={`${item.color} text-white rounded-xl py-3 px-2 mb-2`}>
              <div className="text-lg font-bold">{item.value}</div>
              <div className="text-[10px] uppercase opacity-80">{item.unit}</div>
            </div>
            <div className="text-xs font-medium text-muted">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
