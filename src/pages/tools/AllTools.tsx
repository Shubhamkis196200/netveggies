import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ToolPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Tools
      </Link>
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-8">{title}</h1>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type = 'number', ...props }: any) {
  return (
    <label className="block mb-4">
      <span className="text-sm font-medium text-dark-light mb-1 block">{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full border border-border rounded-lg px-4 py-2.5 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" {...props} />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <label className="block mb-4">
      <span className="text-sm font-medium text-dark-light mb-1 block">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full border border-border rounded-lg px-4 py-2.5 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-white">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

function Result({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-cream rounded-lg p-4 mb-3">
      <div className="text-sm text-muted">{label}</div>
      <div className="text-2xl font-bold text-dark">{value}</div>
    </div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-colors mb-6">
      {children}
    </button>
  );
}

// 1. Calorie Calculator
export function CalorieCalculator() {
  const [age, setAge] = useState('30'); const [weight, setWeight] = useState('70'); const [height, setHeight] = useState('170');
  const [sex, setSex] = useState('male'); const [activity, setActivity] = useState('1.55'); const [result, setResult] = useState<number | null>(null);
  const calc = () => {
    const w = +weight, h = +height, a = +age, act = +activity;
    const bmr = sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    setResult(Math.round(bmr * act));
  };
  return (
    <ToolPage title="Calorie Calculator">
      <p className="text-muted mb-6">Calculate your daily calorie needs using the Mifflin-St Jeor equation.</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Age" value={age} onChange={setAge} />
        <Select label="Sex" value={sex} onChange={setSex} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
        <Input label="Weight (kg)" value={weight} onChange={setWeight} />
        <Input label="Height (cm)" value={height} onChange={setHeight} />
      </div>
      <Select label="Activity Level" value={activity} onChange={setActivity} options={[
        { value: '1.2', label: 'Sedentary (little/no exercise)' },
        { value: '1.375', label: 'Lightly active (1-3 days/week)' },
        { value: '1.55', label: 'Moderately active (3-5 days/week)' },
        { value: '1.725', label: 'Very active (6-7 days/week)' },
        { value: '1.9', label: 'Extra active (physical job + exercise)' },
      ]} />
      <Btn onClick={calc}>Calculate Calories</Btn>
      {result && <Result label="Daily Calorie Needs" value={`${result} kcal`} />}
    </ToolPage>
  );
}

// 2. Macro Calculator
export function MacroCalculator() {
  const [calories, setCalories] = useState('2000'); const [goal, setGoal] = useState('maintain'); const [result, setResult] = useState<any>(null);
  const calc = () => {
    let c = +calories;
    if (goal === 'lose') c -= 500; else if (goal === 'gain') c += 300;
    const protein = Math.round(c * 0.3 / 4), carbs = Math.round(c * 0.4 / 4), fat = Math.round(c * 0.3 / 9);
    setResult({ calories: c, protein, carbs, fat });
  };
  return (
    <ToolPage title="Macro Calculator">
      <p className="text-muted mb-6">Get your ideal protein, carb, and fat targets based on your calorie intake and goals.</p>
      <Input label="Daily Calories (kcal)" value={calories} onChange={setCalories} />
      <Select label="Goal" value={goal} onChange={setGoal} options={[
        { value: 'lose', label: 'Lose Weight (-500 kcal)' }, { value: 'maintain', label: 'Maintain Weight' }, { value: 'gain', label: 'Gain Weight (+300 kcal)' },
      ]} />
      <Btn onClick={calc}>Calculate Macros</Btn>
      {result && <>
        <Result label="Adjusted Calories" value={`${result.calories} kcal`} />
        <div className="grid grid-cols-3 gap-3">
          <Result label="Protein" value={`${result.protein}g`} />
          <Result label="Carbs" value={`${result.carbs}g`} />
          <Result label="Fat" value={`${result.fat}g`} />
        </div>
      </>}
    </ToolPage>
  );
}

// 3. BMI Calculator
export function BMICalculator() {
  const [weight, setWeight] = useState('70'); const [height, setHeight] = useState('170'); const [result, setResult] = useState<any>(null);
  const calc = () => {
    const h = +height / 100, bmi = +weight / (h * h);
    const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese';
    const low = Math.round(18.5 * h * h * 10) / 10, high = Math.round(24.9 * h * h * 10) / 10;
    setResult({ bmi: bmi.toFixed(1), cat, low, high });
  };
  return (
    <ToolPage title="BMI Calculator">
      <p className="text-muted mb-6">Calculate your Body Mass Index and healthy weight range.</p>
      <Input label="Weight (kg)" value={weight} onChange={setWeight} />
      <Input label="Height (cm)" value={height} onChange={setHeight} />
      <Btn onClick={calc}>Calculate BMI</Btn>
      {result && <>
        <Result label="Your BMI" value={result.bmi} />
        <Result label="Category" value={result.cat} />
        <Result label="Healthy Weight Range" value={`${result.low} – ${result.high} kg`} />
      </>}
    </ToolPage>
  );
}

// 4. Recipe Scaler
export function RecipeScaler() {
  const [original, setOriginal] = useState('4'); const [desired, setDesired] = useState('6');
  const [ingredients, setIngredients] = useState('2 cups flour\n1 cup sugar\n3 eggs\n0.5 cup butter');
  const [result, setResult] = useState<string[]>([]);
  const calc = () => {
    const ratio = +desired / +original;
    const lines = ingredients.split('\n').filter(l => l.trim()).map(line => {
      return line.replace(/[\d.\/]+/, match => {
        if (match.includes('/')) { const [a, b] = match.split('/'); return (+(a) / +(b) * ratio).toFixed(2); }
        return (parseFloat(match) * ratio).toFixed(2).replace(/\.?0+$/, '');
      });
    });
    setResult(lines);
  };
  return (
    <ToolPage title="Recipe Scaler">
      <p className="text-muted mb-6">Scale any recipe's ingredients up or down.</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Original Servings" value={original} onChange={setOriginal} />
        <Input label="Desired Servings" value={desired} onChange={setDesired} />
      </div>
      <label className="block mb-4">
        <span className="text-sm font-medium text-dark-light mb-1 block">Ingredients (one per line, start with amount)</span>
        <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} rows={6} className="w-full border border-border rounded-lg px-4 py-2.5 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
      </label>
      <Btn onClick={calc}>Scale Recipe</Btn>
      {result.length > 0 && <div className="bg-cream rounded-lg p-6">{result.map((l, i) => <div key={i} className="py-1 font-medium">{l}</div>)}</div>}
    </ToolPage>
  );
}

// 5. Cooking Measurement Converter
export function MeasurementConverter() {
  const [amount, setAmount] = useState('1'); const [from, setFrom] = useState('cup'); const [result, setResult] = useState<any>(null);
  const toMl: Record<string, number> = { cup: 236.588, tbsp: 14.787, tsp: 4.929, ml: 1, liter: 1000, 'fl oz': 29.574, pint: 473.176, quart: 946.353, gallon: 3785.41 };
  const calc = () => {
    const ml = +amount * toMl[from];
    const r: Record<string, string> = {};
    for (const [k, v] of Object.entries(toMl)) if (k !== from) r[k] = (ml / v).toFixed(3).replace(/\.?0+$/, '');
    setResult(r);
  };
  const opts = Object.keys(toMl).map(k => ({ value: k, label: k }));
  return (
    <ToolPage title="Cooking Measurement Converter">
      <p className="text-muted mb-6">Convert between common cooking measurements instantly.</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Amount" value={amount} onChange={setAmount} />
        <Select label="Unit" value={from} onChange={setFrom} options={opts} />
      </div>
      <Btn onClick={calc}>Convert</Btn>
      {result && <div className="grid grid-cols-2 gap-3">{Object.entries(result).map(([k, v]) => <Result key={k} label={k} value={v as string} />)}</div>}
    </ToolPage>
  );
}

// 6. Baking Substitution Finder
export function BakingSubstitutions() {
  const [ingredient, setIngredient] = useState('');
  const subs: Record<string, { sub: string; ratio: string; note: string }[]> = {
    'butter': [{ sub: 'Coconut oil', ratio: '1:1', note: 'Works in most baking' }, { sub: 'Applesauce', ratio: '1:0.5', note: 'Use half the amount, reduces fat' }, { sub: 'Avocado', ratio: '1:1', note: 'Adds moisture' }, { sub: 'Greek yogurt', ratio: '1:0.5', note: 'Use half the amount' }],
    'egg': [{ sub: 'Flax egg (1 tbsp ground flax + 3 tbsp water)', ratio: '1 egg = 1 flax egg', note: 'Let sit 5 min' }, { sub: 'Chia egg (1 tbsp chia + 3 tbsp water)', ratio: '1 egg = 1 chia egg', note: 'Let sit 5 min' }, { sub: 'Mashed banana', ratio: '1 egg = ¼ cup', note: 'Adds sweetness' }, { sub: 'Aquafaba', ratio: '1 egg = 3 tbsp', note: 'Liquid from canned chickpeas' }],
    'milk': [{ sub: 'Oat milk', ratio: '1:1', note: 'Creamy, great for baking' }, { sub: 'Almond milk', ratio: '1:1', note: 'Lighter flavor' }, { sub: 'Coconut milk', ratio: '1:1', note: 'Adds richness' }, { sub: 'Soy milk', ratio: '1:1', note: 'Most similar to dairy' }],
    'flour': [{ sub: 'Almond flour', ratio: '1:1', note: 'Adds moisture, gluten-free' }, { sub: 'Oat flour', ratio: '1:1', note: 'Blend oats, slightly denser' }, { sub: 'Coconut flour', ratio: '1:0.25', note: 'Very absorbent, use ¼ amount' }, { sub: 'Whole wheat flour', ratio: '1:1', note: 'Denser, nuttier flavor' }],
    'sugar': [{ sub: 'Maple syrup', ratio: '1 cup = ¾ cup', note: 'Reduce other liquids slightly' }, { sub: 'Honey', ratio: '1 cup = ¾ cup', note: 'Reduce oven temp by 25°F' }, { sub: 'Coconut sugar', ratio: '1:1', note: 'Lower glycemic index' }, { sub: 'Stevia', ratio: '1 cup = 1 tsp', note: 'Much sweeter, adjust to taste' }],
    'cream': [{ sub: 'Coconut cream', ratio: '1:1', note: 'Refrigerate can, use thick part' }, { sub: 'Cashew cream', ratio: '1:1', note: 'Blend soaked cashews' }, { sub: 'Silken tofu', ratio: '1:1', note: 'Blend until smooth' }],
    'oil': [{ sub: 'Applesauce', ratio: '1:1', note: 'Reduces fat, adds moisture' }, { sub: 'Mashed banana', ratio: '1:1', note: 'Adds sweetness' }, { sub: 'Greek yogurt', ratio: '1:0.75', note: 'Use ¾ amount' }],
  };
  const match = Object.entries(subs).find(([k]) => ingredient.toLowerCase().includes(k));
  return (
    <ToolPage title="Baking Substitution Finder">
      <p className="text-muted mb-6">Find substitutions for common baking ingredients.</p>
      <Input label="Ingredient to substitute" value={ingredient} onChange={setIngredient} type="text" placeholder="e.g., butter, egg, milk, flour, sugar" />
      {match ? (
        <div className="space-y-3 mt-4">
          <h3 className="font-heading text-xl font-semibold">Substitutions for {match[0]}</h3>
          {match[1].map((s, i) => (
            <div key={i} className="bg-cream rounded-lg p-4">
              <div className="font-semibold text-dark">{s.sub}</div>
              <div className="text-sm text-primary font-medium">{s.ratio}</div>
              <div className="text-sm text-muted mt-1">{s.note}</div>
            </div>
          ))}
        </div>
      ) : ingredient.length > 1 ? <p className="text-muted">No substitutions found. Try: butter, egg, milk, flour, sugar, cream, oil</p> : null}
    </ToolPage>
  );
}

// 7. Meal Prep Portion Calculator
export function MealPrepCalculator() {
  const [servings, setServings] = useState('1'); const [meals, setMeals] = useState('3'); const [days, setDays] = useState('5');
  const [ingredients, setIngredients] = useState('200g chicken breast\n100g rice\n150g broccoli\n1 tbsp olive oil');
  const [result, setResult] = useState<string[]>([]);
  const calc = () => {
    const mult = +meals * +days / +servings;
    const lines = ingredients.split('\n').filter(l => l.trim()).map(line => {
      return line.replace(/[\d.]+/, m => (parseFloat(m) * mult).toFixed(1).replace(/\.0$/, ''));
    });
    setResult(lines);
  };
  return (
    <ToolPage title="Meal Prep Portion Calculator">
      <p className="text-muted mb-6">Calculate shopping quantities for your meal prep.</p>
      <div className="grid grid-cols-3 gap-4">
        <Input label="Recipe Servings" value={servings} onChange={setServings} />
        <Input label="Meals/Day" value={meals} onChange={setMeals} />
        <Input label="Days" value={days} onChange={setDays} />
      </div>
      <label className="block mb-4">
        <span className="text-sm font-medium text-dark-light mb-1 block">Ingredients (one per line)</span>
        <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} rows={5} className="w-full border border-border rounded-lg px-4 py-2.5 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
      </label>
      <Btn onClick={calc}>Calculate Prep Quantities</Btn>
      {result.length > 0 && <div className="bg-cream rounded-lg p-6"><h3 className="font-heading text-lg mb-3">Shopping List ({+meals * +days} total servings)</h3>{result.map((l, i) => <div key={i} className="py-1">{l}</div>)}</div>}
    </ToolPage>
  );
}

// 8. Grocery List Generator
export function GroceryList() {
  const [items, setItems] = useState<{ name: string; category: string }[]>([]);
  const [name, setName] = useState(''); const [category, setCategory] = useState('produce');
  const cats = ['produce', 'protein', 'dairy', 'grains', 'canned', 'spices', 'frozen', 'other'];
  const add = () => { if (name.trim()) { setItems([...items, { name: name.trim(), category }]); setName(''); } };
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const grouped = cats.reduce((acc, c) => { const f = items.filter(i => i.category === c); if (f.length) acc[c] = f; return acc; }, {} as Record<string, typeof items>);
  return (
    <ToolPage title="Grocery List Generator">
      <p className="text-muted mb-6">Build an organized shopping list by category.</p>
      <div className="flex gap-2 mb-4">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Item name" onKeyDown={e => e.key === 'Enter' && add()} className="flex-1 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border border-border rounded-lg px-3 py-2.5 bg-white">{cats.map(c => <option key={c} value={c}>{c}</option>)}</select>
        <button onClick={add} className="bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-dark">Add</button>
      </div>
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="mb-4">
          <h3 className="font-heading text-lg font-semibold capitalize mb-2">{cat}</h3>
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-cream rounded-lg px-4 py-2 mb-1">
              <span>{item.name}</span>
              <button onClick={() => remove(items.indexOf(item))} className="text-red-500 text-sm hover:underline">remove</button>
            </div>
          ))}
        </div>
      ))}
      {items.length === 0 && <p className="text-muted text-center py-8">Add items to build your grocery list</p>}
    </ToolPage>
  );
}

// 9. Cooking Timer
export function CookingTimer() {
  const [timers, setTimers] = useState<{ name: string; seconds: number; remaining: number; active: boolean; interval?: any }[]>([]);
  const [name, setName] = useState(''); const [minutes, setMinutes] = useState('10');
  const add = () => { if (name.trim()) { setTimers([...timers, { name: name.trim(), seconds: +minutes * 60, remaining: +minutes * 60, active: false }]); setName(''); } };
  const toggle = (i: number) => {
    setTimers(prev => prev.map((t, idx) => {
      if (idx !== i) return t;
      if (t.active) { clearInterval(t.interval); return { ...t, active: false, interval: undefined }; }
      const interval = setInterval(() => {
        setTimers(p => p.map((tt, ii) => {
          if (ii !== i) return tt;
          if (tt.remaining <= 1) { clearInterval(tt.interval); alert(`⏰ "${tt.name}" timer is done!`); return { ...tt, remaining: 0, active: false, interval: undefined }; }
          return { ...tt, remaining: tt.remaining - 1 };
        }));
      }, 1000);
      return { ...t, active: true, interval };
    }));
  };
  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  return (
    <ToolPage title="Cooking Timer">
      <p className="text-muted mb-6">Run multiple named timers simultaneously.</p>
      <div className="flex gap-2 mb-6">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Timer name" className="flex-1 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} className="w-24 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="min" />
        <button onClick={add} className="bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-dark">Add</button>
      </div>
      {timers.map((t, i) => (
        <div key={i} className="flex justify-between items-center bg-cream rounded-lg px-6 py-4 mb-3">
          <div><div className="font-semibold">{t.name}</div><div className="text-3xl font-bold text-dark font-mono">{fmt(t.remaining)}</div></div>
          <button onClick={() => toggle(i)} className={`px-4 py-2 rounded-lg font-medium ${t.active ? 'bg-red-500 text-white' : 'bg-primary text-white'}`}>{t.active ? 'Pause' : t.remaining === 0 ? 'Done' : 'Start'}</button>
        </div>
      ))}
      {timers.length === 0 && <p className="text-muted text-center py-8">Add a timer to get started</p>}
    </ToolPage>
  );
}

// 10. Food Cost Calculator
export function FoodCostCalculator() {
  const [items, setItems] = useState<{ name: string; cost: number; }[]>([{ name: 'Flour (2 cups)', cost: 0.5 }, { name: 'Sugar (1 cup)', cost: 0.3 }, { name: 'Butter (1 stick)', cost: 1.5 }]);
  const [servings, setServings] = useState('8'); const [name, setName] = useState(''); const [cost, setCost] = useState('');
  const add = () => { if (name && cost) { setItems([...items, { name, cost: +cost }]); setName(''); setCost(''); } };
  const total = items.reduce((s, i) => s + i.cost, 0);
  return (
    <ToolPage title="Food Cost Calculator">
      <p className="text-muted mb-6">Calculate the cost per serving of any recipe.</p>
      <Input label="Number of Servings" value={servings} onChange={setServings} />
      <div className="flex gap-2 mb-4">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ingredient" className="flex-1 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="Cost ($)" step="0.01" className="w-28 border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/40" />
        <button onClick={add} className="bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-dark">Add</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex justify-between bg-cream rounded-lg px-4 py-2 mb-1">
          <span>{item.name}</span><span className="font-medium">${item.cost.toFixed(2)}</span>
        </div>
      ))}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Result label="Total Cost" value={`$${total.toFixed(2)}`} />
        <Result label="Cost Per Serving" value={`$${(total / (+servings || 1)).toFixed(2)}`} />
      </div>
    </ToolPage>
  );
}

// 11. Protein Intake Calculator
export function ProteinCalculator() {
  const [weight, setWeight] = useState('70'); const [goal, setGoal] = useState('maintain'); const [unit, setUnit] = useState('kg'); const [result, setResult] = useState<any>(null);
  const calc = () => {
    const w = unit === 'lbs' ? +weight * 0.4536 : +weight;
    const mult = goal === 'lose' ? 1.6 : goal === 'gain' ? 2.2 : 1.2;
    setResult({ low: Math.round(w * (mult - 0.4)), high: Math.round(w * mult), rec: Math.round(w * (mult - 0.2)) });
  };
  return (
    <ToolPage title="Protein Intake Calculator">
      <p className="text-muted mb-6">Find your optimal daily protein intake based on weight and goals.</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Body Weight" value={weight} onChange={setWeight} />
        <Select label="Unit" value={unit} onChange={setUnit} options={[{ value: 'kg', label: 'kg' }, { value: 'lbs', label: 'lbs' }]} />
      </div>
      <Select label="Goal" value={goal} onChange={setGoal} options={[
        { value: 'lose', label: 'Lose fat, preserve muscle' }, { value: 'maintain', label: 'Maintain weight' }, { value: 'gain', label: 'Build muscle' },
      ]} />
      <Btn onClick={calc}>Calculate Protein</Btn>
      {result && <>
        <Result label="Recommended" value={`${result.rec}g / day`} />
        <Result label="Range" value={`${result.low}g – ${result.high}g / day`} />
      </>}
    </ToolPage>
  );
}

// 12. Water Intake Calculator
export function WaterCalculator() {
  const [weight, setWeight] = useState('70'); const [activity, setActivity] = useState('moderate'); const [climate, setClimate] = useState('temperate');
  const [result, setResult] = useState<any>(null);
  const calc = () => {
    let base = +weight * 35; // ml
    if (activity === 'light') base *= 1; else if (activity === 'moderate') base *= 1.2; else base *= 1.4;
    if (climate === 'hot') base *= 1.2; else if (climate === 'cold') base *= 0.9;
    setResult({ ml: Math.round(base), liters: (base / 1000).toFixed(1), cups: Math.round(base / 236.6) });
  };
  return (
    <ToolPage title="Water Intake Calculator">
      <p className="text-muted mb-6">Calculate how much water you should drink daily.</p>
      <Input label="Weight (kg)" value={weight} onChange={setWeight} />
      <Select label="Activity Level" value={activity} onChange={setActivity} options={[
        { value: 'light', label: 'Light / Sedentary' }, { value: 'moderate', label: 'Moderate Activity' }, { value: 'heavy', label: 'Heavy / Athletic' },
      ]} />
      <Select label="Climate" value={climate} onChange={setClimate} options={[
        { value: 'cold', label: 'Cold' }, { value: 'temperate', label: 'Temperate' }, { value: 'hot', label: 'Hot / Humid' },
      ]} />
      <Btn onClick={calc}>Calculate</Btn>
      {result && <div className="grid grid-cols-3 gap-3"><Result label="Liters" value={result.liters} /><Result label="mL" value={result.ml} /><Result label="Cups" value={result.cups} /></div>}
    </ToolPage>
  );
}

// 13. Vegetable Seasonality Calendar
export function SeasonalityCalendar() {
  const [month, setMonth] = useState(new Date().getMonth().toString());
  const data: Record<number, string[]> = {
    0: ['Kale', 'Leeks', 'Turnips', 'Brussels Sprouts', 'Cabbage', 'Parsnips', 'Sweet Potatoes'],
    1: ['Kale', 'Leeks', 'Turnips', 'Cabbage', 'Parsnips', 'Beets', 'Carrots'],
    2: ['Artichokes', 'Asparagus', 'Peas', 'Spinach', 'Radishes', 'Lettuce'],
    3: ['Asparagus', 'Peas', 'Spinach', 'Artichokes', 'Rhubarb', 'Watercress', 'Spring Onions'],
    4: ['Asparagus', 'Zucchini', 'Cucumbers', 'Green Beans', 'Radishes', 'Strawberries'],
    5: ['Tomatoes', 'Corn', 'Zucchini', 'Peppers', 'Cucumbers', 'Berries', 'Peaches'],
    6: ['Tomatoes', 'Corn', 'Peppers', 'Eggplant', 'Green Beans', 'Okra', 'Watermelon'],
    7: ['Tomatoes', 'Corn', 'Peppers', 'Eggplant', 'Squash', 'Melons', 'Figs'],
    8: ['Butternut Squash', 'Sweet Potatoes', 'Apples', 'Grapes', 'Pears', 'Broccoli'],
    9: ['Pumpkin', 'Sweet Potatoes', 'Apples', 'Cauliflower', 'Brussels Sprouts', 'Cranberries'],
    10: ['Kale', 'Sweet Potatoes', 'Pumpkin', 'Turnips', 'Beets', 'Parsnips'],
    11: ['Kale', 'Leeks', 'Sweet Potatoes', 'Turnips', 'Cabbage', 'Citrus Fruits'],
  };
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return (
    <ToolPage title="Vegetable Seasonality Calendar">
      <p className="text-muted mb-6">Discover what fruits and vegetables are in season each month (US/Northern Hemisphere).</p>
      <Select label="Month" value={month} onChange={setMonth} options={months.map((m, i) => ({ value: i.toString(), label: m }))} />
      <div className="mt-4">
        <h3 className="font-heading text-xl font-semibold mb-4">In Season: {months[+month]}</h3>
        <div className="flex flex-wrap gap-2">{data[+month].map(v => <span key={v} className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm">{v}</span>)}</div>
      </div>
    </ToolPage>
  );
}

// 14. Freezer Storage Guide
export function FreezerGuide() {
  const [search, setSearch] = useState('');
  const items = [
    { name: 'Raw chicken', months: 9, tip: 'Remove from store packaging, wrap tightly in freezer paper' },
    { name: 'Raw beef/steak', months: 12, tip: 'Vacuum seal for best results' },
    { name: 'Ground meat', months: 4, tip: 'Flatten in bags for faster thawing' },
    { name: 'Raw fish', months: 6, tip: 'Wrap in plastic then foil' },
    { name: 'Cooked chicken', months: 4, tip: 'Cool completely before freezing' },
    { name: 'Cooked rice', months: 6, tip: 'Freeze in portion-sized containers' },
    { name: 'Bread', months: 3, tip: 'Slice before freezing for easy portions' },
    { name: 'Soup/Stew', months: 3, tip: 'Leave headspace in container for expansion' },
    { name: 'Berries', months: 12, tip: 'Freeze on sheet pan first, then bag' },
    { name: 'Bananas', months: 6, tip: 'Peel before freezing' },
    { name: 'Vegetables (blanched)', months: 12, tip: 'Blanch before freezing to preserve color and texture' },
    { name: 'Butter', months: 9, tip: 'Keep in original wrapper, add foil' },
    { name: 'Cheese (hard)', months: 6, tip: 'May become crumbly; best for cooking' },
    { name: 'Milk', months: 3, tip: 'Leave room for expansion; shake after thawing' },
    { name: 'Cooked pasta', months: 3, tip: 'Slightly undercook before freezing' },
    { name: 'Pizza dough', months: 3, tip: 'Oil surface, wrap in plastic' },
    { name: 'Herbs', months: 12, tip: 'Freeze in olive oil in ice cube trays' },
    { name: 'Nuts', months: 12, tip: 'Airtight container or bag' },
    { name: 'Eggs (raw, beaten)', months: 12, tip: 'Beat and freeze in ice cube trays' },
    { name: 'Cake', months: 4, tip: 'Wrap unfrosted layers individually' },
  ];
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <ToolPage title="Freezer Storage Guide">
      <p className="text-muted mb-6">Look up safe freezer storage times and tips for common foods.</p>
      <Input label="Search food" value={search} onChange={setSearch} type="text" placeholder="e.g., chicken, bread, berries..." />
      <div className="space-y-2 mt-4">
        {filtered.map(item => (
          <div key={item.name} className="bg-cream rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-dark">{item.name}</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{item.months} months</span>
            </div>
            <p className="text-sm text-muted mt-1">💡 {item.tip}</p>
          </div>
        ))}
      </div>
    </ToolPage>
  );
}

// 15. Cooking Temperature Chart
export function CookingTemperatures() {
  const temps = [
    { food: 'Beef (rare)', f: 125, c: 52 }, { food: 'Beef (medium-rare)', f: 135, c: 57 }, { food: 'Beef (medium)', f: 145, c: 63 },
    { food: 'Beef (well-done)', f: 160, c: 71 }, { food: 'Chicken (whole)', f: 165, c: 74 }, { food: 'Chicken (breast)', f: 165, c: 74 },
    { food: 'Chicken (thigh)', f: 175, c: 79 }, { food: 'Turkey', f: 165, c: 74 }, { food: 'Pork chops', f: 145, c: 63 },
    { food: 'Pork (ground)', f: 160, c: 71 }, { food: 'Lamb', f: 145, c: 63 }, { food: 'Fish', f: 145, c: 63 },
    { food: 'Shrimp', f: 145, c: 63 }, { food: 'Ground beef', f: 160, c: 71 }, { food: 'Ham (fresh)', f: 145, c: 63 },
    { food: 'Eggs', f: 160, c: 71 },
  ];
  return (
    <ToolPage title="Cooking Temperature Chart">
      <p className="text-muted mb-6">Safe minimum internal temperatures for meats and proteins.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b-2 border-primary"><th className="py-3 px-4 font-heading">Food</th><th className="py-3 px-4 font-heading">°F</th><th className="py-3 px-4 font-heading">°C</th></tr></thead>
          <tbody>{temps.map(t => <tr key={t.food} className="border-b border-border hover:bg-cream"><td className="py-3 px-4">{t.food}</td><td className="py-3 px-4 font-bold text-primary">{t.f}°F</td><td className="py-3 px-4 font-bold">{t.c}°C</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-6 bg-cream rounded-lg p-4 text-sm text-muted">⚠️ Let meat rest 3 minutes after reaching temperature. Use a food thermometer for accuracy.</div>
    </ToolPage>
  );
}

// 16. Spice Pairing Guide
export function SpicePairing() {
  const [ingredient, setIngredient] = useState('');
  const pairs: Record<string, string[]> = {
    'chicken': ['Thyme', 'Rosemary', 'Paprika', 'Garlic', 'Cumin', 'Oregano', 'Sage', 'Lemon pepper'],
    'beef': ['Black pepper', 'Garlic', 'Rosemary', 'Thyme', 'Cumin', 'Chili powder', 'Smoked paprika'],
    'fish': ['Dill', 'Lemon', 'Garlic', 'Old Bay', 'Paprika', 'Tarragon', 'Parsley'],
    'tofu': ['Ginger', 'Garlic', 'Sesame', 'Soy', 'Turmeric', 'Cumin', 'Chili flakes', 'Lemongrass'],
    'potato': ['Rosemary', 'Garlic', 'Paprika', 'Dill', 'Chives', 'Cumin', 'Black pepper'],
    'tomato': ['Basil', 'Oregano', 'Garlic', 'Thyme', 'Red pepper flakes', 'Bay leaf'],
    'rice': ['Turmeric', 'Cumin', 'Saffron', 'Cardamom', 'Bay leaf', 'Garlic', 'Cilantro'],
    'egg': ['Chives', 'Dill', 'Paprika', 'Turmeric', 'Black pepper', 'Cumin', 'Tarragon'],
    'mushroom': ['Thyme', 'Garlic', 'Rosemary', 'Sage', 'Truffle oil', 'Black pepper', 'Parsley'],
    'carrot': ['Cumin', 'Ginger', 'Cinnamon', 'Coriander', 'Dill', 'Thyme', 'Honey'],
    'broccoli': ['Garlic', 'Lemon', 'Red pepper flakes', 'Sesame', 'Ginger', 'Mustard'],
    'cauliflower': ['Turmeric', 'Cumin', 'Garlic', 'Garam masala', 'Paprika', 'Chili powder'],
    'beans': ['Cumin', 'Chili powder', 'Oregano', 'Garlic', 'Smoked paprika', 'Cilantro', 'Bay leaf'],
    'pasta': ['Basil', 'Oregano', 'Garlic', 'Red pepper flakes', 'Parsley', 'Thyme', 'Nutmeg'],
    'pumpkin': ['Cinnamon', 'Nutmeg', 'Ginger', 'Clove', 'Allspice', 'Sage'],
  };
  const match = Object.entries(pairs).find(([k]) => ingredient.toLowerCase().includes(k));
  return (
    <ToolPage title="Spice Pairing Guide">
      <p className="text-muted mb-6">Find the best spice pairings for any ingredient.</p>
      <Input label="Enter an ingredient" value={ingredient} onChange={setIngredient} type="text" placeholder="e.g., chicken, tofu, potato, tomato..." />
      {match ? (
        <div className="mt-4">
          <h3 className="font-heading text-xl font-semibold mb-4">Best spices for {match[0]}</h3>
          <div className="flex flex-wrap gap-2">{match[1].map(s => <span key={s} className="bg-accent-light text-accent px-4 py-2 rounded-full font-medium text-sm">{s}</span>)}</div>
        </div>
      ) : ingredient.length > 1 ? <p className="text-muted mt-4">Try: chicken, beef, fish, tofu, potato, tomato, rice, mushroom, beans, pasta</p> : null}
    </ToolPage>
  );
}

// 17. Kitchen Unit Converter
export function UnitConverter() {
  const [amount, setAmount] = useState('1'); const [type, setType] = useState('weight'); const [from, setFrom] = useState('kg');
  const [result, setResult] = useState<any>(null);
  const conversions: Record<string, Record<string, number>> = {
    weight: { kg: 1, g: 0.001, lb: 0.4536, oz: 0.02835, mg: 0.000001 },
    volume: { liter: 1, ml: 0.001, cup: 0.2366, tbsp: 0.01479, tsp: 0.004929, 'fl oz': 0.02957, gallon: 3.785 },
    temperature: {},
  };
  const calc = () => {
    if (type === 'temperature') {
      const v = +amount;
      if (from === 'F') setResult({ 'Celsius': ((v - 32) * 5 / 9).toFixed(1) + '°C', 'Kelvin': ((v - 32) * 5 / 9 + 273.15).toFixed(1) + 'K' });
      else if (from === 'C') setResult({ 'Fahrenheit': (v * 9 / 5 + 32).toFixed(1) + '°F', 'Kelvin': (v + 273.15).toFixed(1) + 'K' });
      else setResult({ 'Celsius': (v - 273.15).toFixed(1) + '°C', 'Fahrenheit': ((v - 273.15) * 9 / 5 + 32).toFixed(1) + '°F' });
    } else {
      const c = conversions[type]; const base = +amount * c[from];
      const r: Record<string, string> = {};
      for (const [k, v] of Object.entries(c)) if (k !== from) r[k] = (base / v).toFixed(4).replace(/\.?0+$/, '');
      setResult(r);
    }
  };
  const units = type === 'temperature' ? ['C', 'F', 'K'] : Object.keys(conversions[type] || {});
  return (
    <ToolPage title="Kitchen Unit Converter">
      <p className="text-muted mb-6">Convert weight, volume, and temperature between metric and imperial.</p>
      <Select label="Type" value={type} onChange={v => { setType(v); setFrom(v === 'temperature' ? 'C' : v === 'weight' ? 'kg' : 'liter'); setResult(null); }} options={[
        { value: 'weight', label: 'Weight' }, { value: 'volume', label: 'Volume' }, { value: 'temperature', label: 'Temperature' },
      ]} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Amount" value={amount} onChange={setAmount} />
        <Select label="From" value={from} onChange={setFrom} options={units.map(u => ({ value: u, label: u }))} />
      </div>
      <Btn onClick={calc}>Convert</Btn>
      {result && <div className="grid grid-cols-2 gap-3">{Object.entries(result).map(([k, v]) => <Result key={k} label={k} value={v as string} />)}</div>}
    </ToolPage>
  );
}

// 18. Sourdough Calculator
export function SourdoughCalculator() {
  const [flour, setFlour] = useState('500'); const [hydration, setHydration] = useState('75'); const [starter, setStarter] = useState('20'); const [salt, setSalt] = useState('2');
  const [result, setResult] = useState<any>(null);
  const calc = () => {
    const f = +flour; const starterAmt = Math.round(f * +starter / 100); const waterAmt = Math.round(f * +hydration / 100 - starterAmt / 2);
    const saltAmt = (f * +salt / 100).toFixed(1);
    setResult({ flour: f, water: waterAmt, starter: starterAmt, salt: saltAmt, total: Math.round(f + waterAmt + starterAmt + +saltAmt) });
  };
  return (
    <ToolPage title="Sourdough Calculator">
      <p className="text-muted mb-6">Calculate sourdough bread ingredients by flour weight, hydration %, and starter %.</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Flour (g)" value={flour} onChange={setFlour} />
        <Input label="Hydration %" value={hydration} onChange={setHydration} />
        <Input label="Starter %" value={starter} onChange={setStarter} />
        <Input label="Salt %" value={salt} onChange={setSalt} />
      </div>
      <Btn onClick={calc}>Calculate</Btn>
      {result && <div className="bg-cream rounded-lg p-6 space-y-2">
        <div className="flex justify-between"><span>Flour</span><strong>{result.flour}g</strong></div>
        <div className="flex justify-between"><span>Water</span><strong>{result.water}g</strong></div>
        <div className="flex justify-between"><span>Starter</span><strong>{result.starter}g</strong></div>
        <div className="flex justify-between"><span>Salt</span><strong>{result.salt}g</strong></div>
        <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-semibold">Total Dough</span><strong>{result.total}g</strong></div>
      </div>}
    </ToolPage>
  );
}

// 19. Pizza Dough Calculator
export function PizzaDoughCalculator() {
  const [count, setCount] = useState('4'); const [size, setSize] = useState('12'); const [style, setStyle] = useState('neapolitan');
  const [result, setResult] = useState<any>(null);
  const calc = () => {
    const n = +count; const s = +size;
    const ballWeight = style === 'neapolitan' ? s * 17 : style === 'ny' ? s * 19 : s * 14;
    const totalFlour = Math.round(n * ballWeight * 0.57); const totalWater = Math.round(n * ballWeight * (style === 'neapolitan' ? 0.37 : 0.34));
    const totalSalt = Math.round(n * ballWeight * 0.02); const totalYeast = (n * ballWeight * 0.003).toFixed(1); const totalOil = style === 'ny' ? Math.round(n * ballWeight * 0.03) : 0;
    setResult({ balls: n, weight: ballWeight, flour: totalFlour, water: totalWater, salt: totalSalt, yeast: totalYeast, oil: totalOil });
  };
  return (
    <ToolPage title="Pizza Dough Calculator">
      <p className="text-muted mb-6">Get exact dough amounts for any number of pizzas.</p>
      <div className="grid grid-cols-3 gap-4">
        <Input label="Number of Pizzas" value={count} onChange={setCount} />
        <Input label='Size (inches)' value={size} onChange={setSize} />
        <Select label="Style" value={style} onChange={setStyle} options={[
          { value: 'neapolitan', label: 'Neapolitan' }, { value: 'ny', label: 'New York' }, { value: 'thin', label: 'Thin Crust' },
        ]} />
      </div>
      <Btn onClick={calc}>Calculate</Btn>
      {result && <div className="bg-cream rounded-lg p-6 space-y-2">
        <p className="text-sm text-muted mb-3">{result.balls} dough balls × {result.weight}g each</p>
        <div className="flex justify-between"><span>Flour</span><strong>{result.flour}g</strong></div>
        <div className="flex justify-between"><span>Water</span><strong>{result.water}g</strong></div>
        <div className="flex justify-between"><span>Salt</span><strong>{result.salt}g</strong></div>
        <div className="flex justify-between"><span>Yeast (instant)</span><strong>{result.yeast}g</strong></div>
        {result.oil > 0 && <div className="flex justify-between"><span>Olive Oil</span><strong>{result.oil}g</strong></div>}
      </div>}
    </ToolPage>
  );
}

// 20. Smoothie Builder
export function SmoothieBuilder() {
  const items: Record<string, { cal: number; protein: number; carbs: number; fat: number }> = {
    'Banana': { cal: 105, protein: 1, carbs: 27, fat: 0 }, 'Strawberries (1 cup)': { cal: 49, protein: 1, carbs: 12, fat: 0 },
    'Blueberries (1 cup)': { cal: 85, protein: 1, carbs: 21, fat: 0 }, 'Mango (1 cup)': { cal: 99, protein: 1, carbs: 25, fat: 1 },
    'Spinach (1 cup)': { cal: 7, protein: 1, carbs: 1, fat: 0 }, 'Oat milk (1 cup)': { cal: 120, protein: 3, carbs: 16, fat: 5 },
    'Almond milk (1 cup)': { cal: 30, protein: 1, carbs: 1, fat: 3 }, 'Greek yogurt (1/2 cup)': { cal: 65, protein: 9, carbs: 4, fat: 2 },
    'Protein powder (1 scoop)': { cal: 120, protein: 24, carbs: 3, fat: 1 }, 'Peanut butter (1 tbsp)': { cal: 94, protein: 4, carbs: 3, fat: 8 },
    'Chia seeds (1 tbsp)': { cal: 58, protein: 2, carbs: 5, fat: 4 }, 'Honey (1 tbsp)': { cal: 64, protein: 0, carbs: 17, fat: 0 },
    'Avocado (1/2)': { cal: 120, protein: 1, carbs: 6, fat: 11 }, 'Cocoa powder (1 tbsp)': { cal: 12, protein: 1, carbs: 3, fat: 1 },
  };
  const [selected, setSelected] = useState<string[]>(['Banana', 'Almond milk (1 cup)', 'Protein powder (1 scoop)']);
  const toggle = (name: string) => setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  const totals = selected.reduce((acc, name) => {
    const item = items[name]; return { cal: acc.cal + item.cal, protein: acc.protein + item.protein, carbs: acc.carbs + item.carbs, fat: acc.fat + item.fat };
  }, { cal: 0, protein: 0, carbs: 0, fat: 0 });
  return (
    <ToolPage title="Smoothie Builder">
      <p className="text-muted mb-6">Build a smoothie and see the estimated nutrition info.</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.keys(items).map(name => (
          <button key={name} onClick={() => toggle(name)} className={`text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${selected.includes(name) ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}>{selected.includes(name) ? '✓ ' : ''}{name}</button>
        ))}
      </div>
      {selected.length > 0 && <div className="grid grid-cols-4 gap-3">
        <Result label="Calories" value={totals.cal} /><Result label="Protein" value={`${totals.protein}g`} /><Result label="Carbs" value={`${totals.carbs}g`} /><Result label="Fat" value={`${totals.fat}g`} />
      </div>}
    </ToolPage>
  );
}

// 21. Caffeine Calculator
export function CaffeineCalculator() {
  const drinks: Record<string, number> = { 'Coffee (8oz)': 95, 'Espresso (1 shot)': 63, 'Black tea (8oz)': 47, 'Green tea (8oz)': 28, 'Cola (12oz)': 34, 'Energy drink (8oz)': 80, 'Decaf coffee (8oz)': 3, 'Matcha (8oz)': 70 };
  const [items, setItems] = useState<{ name: string; qty: number }[]>([]);
  const [drink, setDrink] = useState(Object.keys(drinks)[0]);
  const add = () => setItems([...items, { name: drink, qty: 1 }]);
  const total = items.reduce((s, i) => s + drinks[i.name] * i.qty, 0);
  return (
    <ToolPage title="Caffeine Calculator">
      <p className="text-muted mb-6">Track your daily caffeine intake against safe limits (400mg/day for adults).</p>
      <div className="flex gap-2 mb-4">
        <select value={drink} onChange={e => setDrink(e.target.value)} className="flex-1 border border-border rounded-lg px-4 py-2.5 bg-white">{Object.keys(drinks).map(d => <option key={d} value={d}>{d} ({drinks[d]}mg)</option>)}</select>
        <button onClick={add} className="bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-dark">Add</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex justify-between bg-cream rounded-lg px-4 py-2 mb-1">
          <span>{item.name}</span><span className="font-medium">{drinks[item.name]}mg</span>
        </div>
      ))}
      {items.length > 0 && <>
        <Result label="Total Caffeine" value={`${total}mg`} />
        <div className={`rounded-lg p-4 text-center font-medium ${total > 400 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {total > 400 ? `⚠️ Over safe limit by ${total - 400}mg` : `✅ Within safe limit (${400 - total}mg remaining)`}
        </div>
      </>}
    </ToolPage>
  );
}

// 22. Alcohol Unit Calculator
export function AlcoholCalculator() {
  const [volume, setVolume] = useState('330'); const [abv, setAbv] = useState('5'); const [result, setResult] = useState<any>(null);
  const calc = () => {
    const units = (+volume * +abv) / 1000;
    const calories = Math.round(+volume * (+abv / 100) * 7 * 0.789);
    setResult({ units: units.toFixed(1), calories });
  };
  return (
    <ToolPage title="Alcohol Unit Calculator">
      <p className="text-muted mb-6">Calculate alcohol units and calories from any drink.</p>
      <Input label="Volume (ml)" value={volume} onChange={setVolume} />
      <Input label="ABV (%)" value={abv} onChange={setAbv} step="0.1" />
      <Btn onClick={calc}>Calculate</Btn>
      {result && <div className="grid grid-cols-2 gap-3"><Result label="Alcohol Units" value={result.units} /><Result label="Estimated Calories" value={`${result.calories} kcal`} /></div>}
    </ToolPage>
  );
}

// 23. Intermittent Fasting Timer
export function FastingTimer() {
  const [plan, setPlan] = useState('16:8'); const [startTime, setStartTime] = useState('20:00'); const [result, setResult] = useState<any>(null);
  const calc = () => {
    const [fastH] = plan.split(':').map(Number);
    const [h, m] = startTime.split(':').map(Number);
    const startMin = h * 60 + m;
    const endFast = (startMin + fastH * 60) % 1440;
    const endEat = (endFast + (24 - fastH) * 60) % 1440;
    const fmt = (mins: number) => `${Math.floor(mins / 60).toString().padStart(2, '0')}:${(mins % 60).toString().padStart(2, '0')}`;
    setResult({ fastStart: startTime, fastEnd: fmt(endFast), eatEnd: fmt(endEat), fastHours: fastH, eatHours: 24 - fastH });
  };
  return (
    <ToolPage title="Intermittent Fasting Timer">
      <p className="text-muted mb-6">Plan your fasting and eating windows.</p>
      <Select label="Fasting Plan" value={plan} onChange={setPlan} options={[
        { value: '16:8', label: '16:8 (16h fast, 8h eat)' }, { value: '18:6', label: '18:6 (18h fast, 6h eat)' },
        { value: '20:4', label: '20:4 (20h fast, 4h eat)' }, { value: '14:10', label: '14:10 (14h fast, 10h eat)' },
      ]} />
      <Input label="Last Meal Time" value={startTime} onChange={setStartTime} type="time" />
      <Btn onClick={calc}>Calculate Windows</Btn>
      {result && <div className="space-y-3">
        <div className="bg-red-50 rounded-lg p-4"><div className="text-sm text-red-600">🚫 Fasting Window ({result.fastHours}h)</div><div className="text-xl font-bold text-red-700">{result.fastStart} → {result.fastEnd}</div></div>
        <div className="bg-green-50 rounded-lg p-4"><div className="text-sm text-green-600">✅ Eating Window ({result.eatHours}h)</div><div className="text-xl font-bold text-green-700">{result.fastEnd} → {result.eatEnd}</div></div>
      </div>}
    </ToolPage>
  );
}

// 24. TDEE Calculator
export function TDEECalculator() {
  const [age, setAge] = useState('30'); const [weight, setWeight] = useState('70'); const [height, setHeight] = useState('170');
  const [sex, setSex] = useState('male'); const [activity, setActivity] = useState('1.55'); const [result, setResult] = useState<any>(null);
  const calc = () => {
    const w = +weight, h = +height, a = +age, act = +activity;
    const bmr = sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * act);
    setResult({ bmr: Math.round(bmr), tdee, lose: tdee - 500, gain: tdee + 300 });
  };
  return (
    <ToolPage title="TDEE Calculator">
      <p className="text-muted mb-6">Calculate your Total Daily Energy Expenditure for weight management.</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Age" value={age} onChange={setAge} />
        <Select label="Sex" value={sex} onChange={setSex} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
        <Input label="Weight (kg)" value={weight} onChange={setWeight} />
        <Input label="Height (cm)" value={height} onChange={setHeight} />
      </div>
      <Select label="Activity Level" value={activity} onChange={setActivity} options={[
        { value: '1.2', label: 'Sedentary' }, { value: '1.375', label: 'Lightly active' },
        { value: '1.55', label: 'Moderately active' }, { value: '1.725', label: 'Very active' }, { value: '1.9', label: 'Extra active' },
      ]} />
      <Btn onClick={calc}>Calculate TDEE</Btn>
      {result && <div className="space-y-3">
        <Result label="BMR (Basal Metabolic Rate)" value={`${result.bmr} kcal`} />
        <Result label="TDEE (Maintenance)" value={`${result.tdee} kcal`} />
        <div className="grid grid-cols-2 gap-3">
          <Result label="Weight Loss (-500)" value={`${result.lose} kcal`} />
          <Result label="Weight Gain (+300)" value={`${result.gain} kcal`} />
        </div>
      </div>}
    </ToolPage>
  );
}

// 25. Body Fat % Estimator
export function BodyFatCalculator() {
  const [sex, setSex] = useState('male'); const [waist, setWaist] = useState('85'); const [neck, setNeck] = useState('37');
  const [height, setHeight] = useState('175'); const [hip, setHip] = useState('95'); const [result, setResult] = useState<any>(null);
  const calc = () => {
    let bf: number;
    if (sex === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(+waist - +neck) + 0.15456 * Math.log10(+height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(+waist + +hip - +neck) + 0.22100 * Math.log10(+height)) - 450;
    }
    const cat = sex === 'male'
      ? (bf < 6 ? 'Essential Fat' : bf < 14 ? 'Athletes' : bf < 18 ? 'Fitness' : bf < 25 ? 'Average' : 'Above Average')
      : (bf < 14 ? 'Essential Fat' : bf < 21 ? 'Athletes' : bf < 25 ? 'Fitness' : bf < 32 ? 'Average' : 'Above Average');
    setResult({ bf: bf.toFixed(1), cat });
  };
  return (
    <ToolPage title="Body Fat % Estimator">
      <p className="text-muted mb-6">Estimate body fat percentage using the U.S. Navy method.</p>
      <Select label="Sex" value={sex} onChange={setSex} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Waist (cm)" value={waist} onChange={setWaist} />
        <Input label="Neck (cm)" value={neck} onChange={setNeck} />
        <Input label="Height (cm)" value={height} onChange={setHeight} />
        {sex === 'female' && <Input label="Hip (cm)" value={hip} onChange={setHip} />}
      </div>
      <Btn onClick={calc}>Estimate Body Fat</Btn>
      {result && <>
        <Result label="Estimated Body Fat" value={`${result.bf}%`} />
        <Result label="Category" value={result.cat} />
      </>}
    </ToolPage>
  );
}
