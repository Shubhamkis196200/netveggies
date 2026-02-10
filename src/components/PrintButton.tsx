import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-dark-light transition-colors">
      <Printer className="w-4 h-4" /> Print Recipe
    </button>
  );
}
