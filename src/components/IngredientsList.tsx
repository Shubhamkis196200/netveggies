import { useState } from 'react';
import { Minus, Plus, Check } from 'lucide-react';

interface Ingredient { amount: string; unit: string; name: string }

export default function IngredientsList({ ingredients, baseServings }: { ingredients: Ingredient[]; baseServings: number }) {
  const [servings, setServings] = useState(baseServings);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const ratio = servings / baseServings;

  function scaleAmount(amount: string) {
    if (!amount) return '';
    const fractions: Record<string, number> = { '½': 0.5, '⅓': 0.333, '¼': 0.25, '⅔': 0.667, '¾': 0.75, '⅛': 0.125 };
    let num = fractions[amount];
    if (!num) num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const scaled = num * ratio;
    if (scaled === Math.floor(scaled)) return scaled.toString();
    return scaled.toFixed(1).replace(/\.0$/, '');
  }

  function toggle(i: number) {
    const s = new Set(checked);
    s.has(i) ? s.delete(i) : s.add(i);
    setChecked(s);
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <h3 className="font-heading text-xl font-semibold">Ingredients</h3>
        <div className="flex items-center gap-2 bg-cream rounded-full px-3 py-1">
          <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
          <span className="text-sm font-semibold w-16 text-center">{servings} servings</span>
          <button onClick={() => setServings(servings + 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
        </div>
      </div>
      <ul className="space-y-2">
        {ingredients.map((ing, i) => (
          <li key={i} onClick={() => toggle(i)} className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer hover:bg-cream transition-colors ${checked.has(i) ? 'line-through text-muted' : ''}`}>
            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked.has(i) ? 'bg-primary border-primary text-white' : 'border-border'}`}>
              {checked.has(i) && <Check className="w-3 h-3" />}
            </span>
            <span>
              {scaleAmount(ing.amount)} {ing.unit} {ing.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
