export interface Tool {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  keywords: string[];
  relatedTools: number[];
}

export const toolCategories = [
  { name: 'Nutrition Calculators', icon: '🥗', color: 'green' },
  { name: 'Cooking Tools', icon: '🍳', color: 'orange' },
  { name: 'Meal Planning', icon: '📅', color: 'blue' },
  { name: 'Health & Wellness', icon: '💚', color: 'emerald' },
];

export const tools: Tool[] = [
  // Nutrition Calculators (1-8)
  { id: 1, slug: 'calorie-calculator', name: 'Calorie Calculator', description: 'Calculate your daily calorie needs using the Mifflin-St Jeor equation with activity levels and goal-based adjustments.', category: 'Nutrition Calculators', icon: '🔥', color: 'bg-green-500', keywords: ['calories', 'diet', 'TDEE', 'weight loss'], relatedTools: [2, 4, 5] },
  { id: 2, slug: 'macro-calculator', name: 'Macro Calculator', description: 'Get your ideal protein, carb, and fat splits for keto, balanced, high-protein, and plant-based diets.', category: 'Nutrition Calculators', icon: '🎯', color: 'bg-emerald-500', keywords: ['macros', 'protein', 'carbs', 'fat', 'keto'], relatedTools: [1, 4, 5] },
  { id: 3, slug: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index with a visual scale showing underweight, normal, overweight, and obese ranges.', category: 'Nutrition Calculators', icon: '📊', color: 'bg-teal-500', keywords: ['BMI', 'weight', 'health', 'body mass'], relatedTools: [1, 7, 4] },
  { id: 4, slug: 'tdee-calculator', name: 'TDEE Calculator', description: 'Total Daily Energy Expenditure calculator with detailed breakdown of BMR, activity, and thermic effect of food.', category: 'Nutrition Calculators', icon: '⚡', color: 'bg-lime-500', keywords: ['TDEE', 'energy', 'metabolism', 'BMR'], relatedTools: [1, 2, 5] },
  { id: 5, slug: 'protein-intake-calculator', name: 'Protein Intake Calculator', description: 'Find your optimal daily protein based on weight, activity, and goals with plant-based protein source suggestions.', category: 'Nutrition Calculators', icon: '💪', color: 'bg-green-600', keywords: ['protein', 'muscle', 'vegan protein'], relatedTools: [2, 1, 4] },
  { id: 6, slug: 'water-intake-calculator', name: 'Water Intake Calculator', description: 'Calculate your recommended daily water intake based on weight, activity level, and climate conditions.', category: 'Nutrition Calculators', icon: '💧', color: 'bg-blue-400', keywords: ['water', 'hydration', 'drinking'], relatedTools: [1, 8, 24] },
  { id: 7, slug: 'body-fat-estimator', name: 'Body Fat Estimator', description: 'Estimate your body fat percentage using the Navy method with neck, waist, and hip measurements.', category: 'Nutrition Calculators', icon: '📏', color: 'bg-indigo-500', keywords: ['body fat', 'Navy method', 'composition'], relatedTools: [3, 4, 1] },
  { id: 8, slug: 'caffeine-calculator', name: 'Caffeine Calculator', description: 'Track your daily caffeine intake from coffee, tea, and energy drinks against the 400mg recommended limit.', category: 'Nutrition Calculators', icon: '☕', color: 'bg-amber-600', keywords: ['caffeine', 'coffee', 'tea', 'energy'], relatedTools: [6, 23, 24] },

  // Cooking Tools (9-16)
  { id: 9, slug: 'recipe-scaler', name: 'Recipe Scaler', description: 'Add ingredients with amounts, change target servings, and get perfectly scaled quantities for any recipe.', category: 'Cooking Tools', icon: '📐', color: 'bg-orange-500', keywords: ['recipe', 'scale', 'servings', 'portions'], relatedTools: [10, 14, 15] },
  { id: 10, slug: 'measurement-converter', name: 'Measurement Converter', description: 'Instantly convert between cups, tablespoons, teaspoons, milliliters, fluid ounces, and grams.', category: 'Cooking Tools', icon: '⚖️', color: 'bg-yellow-500', keywords: ['convert', 'cups', 'ml', 'grams', 'tbsp'], relatedTools: [9, 12, 14] },
  { id: 11, slug: 'baking-substitutions', name: 'Baking Substitutions', description: 'Find vegan and allergy-friendly substitutions for 20+ common baking ingredients with exact ratios and tips.', category: 'Cooking Tools', icon: '🔄', color: 'bg-pink-500', keywords: ['substitute', 'vegan baking', 'egg replacement'], relatedTools: [10, 14, 9] },
  { id: 12, slug: 'oven-temp-converter', name: 'Oven Temperature Converter', description: 'Convert between Fahrenheit, Celsius, and Gas Mark with common baking and roasting temperature presets.', category: 'Cooking Tools', icon: '🌡️', color: 'bg-red-400', keywords: ['oven', 'temperature', 'fahrenheit', 'celsius', 'gas mark'], relatedTools: [16, 10, 13] },
  { id: 13, slug: 'cooking-timer', name: 'Cooking Timer', description: 'Run multiple named countdown timers simultaneously with audio alerts — perfect for multi-dish cooking.', category: 'Cooking Tools', icon: '⏱️', color: 'bg-violet-500', keywords: ['timer', 'countdown', 'kitchen timer'], relatedTools: [16, 12, 9] },
  { id: 14, slug: 'sourdough-calculator', name: 'Sourdough Calculator', description: "Calculate baker's percentages, hydration levels, and starter amounts for perfect sourdough bread every time.", category: 'Cooking Tools', icon: '🍞', color: 'bg-amber-500', keywords: ['sourdough', 'bread', 'hydration', 'baker percentage'], relatedTools: [15, 9, 10] },
  { id: 15, slug: 'pizza-dough-calculator', name: 'Pizza Dough Calculator', description: 'Get exact dough recipes for Neapolitan, New York, and pan-style pizzas based on ball count and size.', category: 'Cooking Tools', icon: '🍕', color: 'bg-red-500', keywords: ['pizza', 'dough', 'Neapolitan', 'New York'], relatedTools: [14, 9, 10] },
  { id: 16, slug: 'meat-temp-guide', name: 'Safe Cooking Temperature Guide', description: 'USDA-recommended safe internal temperatures for all proteins with doneness levels from rare to well-done.', category: 'Cooking Tools', icon: '🔥', color: 'bg-red-600', keywords: ['temperature', 'meat', 'doneness', 'food safety'], relatedTools: [12, 13, 21] },

  // Meal Planning (17-21)
  { id: 17, slug: 'meal-prep-calculator', name: 'Meal Prep Calculator', description: 'Plan your weekly meal prep: enter servings per meal, meals per day, and days to get exact container counts and portions.', category: 'Meal Planning', icon: '📦', color: 'bg-blue-500', keywords: ['meal prep', 'containers', 'batch cooking'], relatedTools: [18, 19, 20] },
  { id: 18, slug: 'grocery-list-generator', name: 'Grocery List Generator', description: 'Build a category-sorted grocery checklist that saves to your browser. Check off items as you shop.', category: 'Meal Planning', icon: '🛒', color: 'bg-green-400', keywords: ['grocery', 'shopping list', 'checklist'], relatedTools: [17, 19, 20] },
  { id: 19, slug: 'food-cost-calculator', name: 'Food Cost Calculator', description: 'Add ingredients with quantities and prices to calculate the total recipe cost and cost per serving.', category: 'Meal Planning', icon: '💰', color: 'bg-yellow-600', keywords: ['cost', 'budget', 'price per serving'], relatedTools: [17, 18, 9] },
  { id: 20, slug: 'seasonal-produce-guide', name: 'Seasonal Produce Guide', description: 'Pick any month to see what fruits and vegetables are in season — eat fresher, cheaper, and more sustainably.', category: 'Meal Planning', icon: '🌿', color: 'bg-emerald-400', keywords: ['seasonal', 'produce', 'fruits', 'vegetables'], relatedTools: [18, 21, 17] },
  { id: 21, slug: 'freezer-storage-guide', name: 'Freezer Storage Guide', description: 'Searchable guide showing maximum freezer storage times for 30+ common foods with tips for best quality.', category: 'Meal Planning', icon: '🧊', color: 'bg-cyan-500', keywords: ['freezer', 'storage', 'shelf life', 'frozen'], relatedTools: [20, 17, 18] },

  // Health & Wellness (22-25)
  { id: 22, slug: 'intermittent-fasting-timer', name: 'Intermittent Fasting Timer', description: 'Track your fasting window with 16:8, 18:6, 20:4, and OMAD protocols. Visual countdown with progress ring.', category: 'Health & Wellness', icon: '⏰', color: 'bg-purple-500', keywords: ['fasting', 'intermittent fasting', '16:8', 'OMAD'], relatedTools: [1, 4, 24] },
  { id: 23, slug: 'alcohol-unit-calculator', name: 'Alcohol Unit Calculator', description: 'Calculate alcohol units and calories from any drink by type, volume, and ABV percentage.', category: 'Health & Wellness', icon: '🍷', color: 'bg-rose-500', keywords: ['alcohol', 'units', 'calories', 'ABV'], relatedTools: [8, 1, 24] },
  { id: 24, slug: 'fiber-intake-calculator', name: 'Fiber Intake Calculator', description: 'Track your daily fiber intake from meals and snacks against the recommended 25-38g target with a visual progress bar.', category: 'Health & Wellness', icon: '🌾', color: 'bg-amber-400', keywords: ['fiber', 'digestive', 'daily intake'], relatedTools: [2, 5, 25] },
  { id: 25, slug: 'smoothie-builder', name: 'Smoothie Builder', description: 'Pick fruits, greens, proteins, and liquids to build a custom smoothie with a full nutrition breakdown and pie chart.', category: 'Health & Wellness', icon: '🥤', color: 'bg-pink-400', keywords: ['smoothie', 'blender', 'nutrition', 'recipe builder'], relatedTools: [2, 5, 24] },
];

export const getToolBySlug = (slug: string) => tools.find(t => t.slug === slug);
export const getToolById = (id: number) => tools.find(t => t.id === id);
export const getToolsByCategory = (cat: string) => tools.filter(t => t.category === cat);
