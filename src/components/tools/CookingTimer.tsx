import { useState, useEffect, useRef, useCallback } from 'react';

interface Timer { id: number; name: string; total: number; remaining: number; running: boolean; }

const CookingTimer = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newName, setNewName] = useState('');
  const [newMinutes, setNewMinutes] = useState(10);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addTimer = () => {
    if (!newName.trim()) return;
    setTimers(prev => [...prev, { id: Date.now(), name: newName, total: newMinutes * 60, remaining: newMinutes * 60, running: false }]);
    setNewName('');
  };

  const toggleTimer = (id: number) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, running: !t.running } : t));
  };

  const removeTimer = (id: number) => setTimers(prev => prev.filter(t => t.id !== id));

  const resetTimer = (id: number) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, remaining: t.total, running: false } : t));
  };

  const tick = useCallback(() => {
    setTimers(prev => prev.map(t => {
      if (!t.running || t.remaining <= 0) return t;
      const next = t.remaining - 1;
      if (next === 0) {
        try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ==').play(); } catch {}
      }
      return { ...t, remaining: next, running: next > 0 };
    }));
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(tick, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tick]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input placeholder="Timer name" value={newName} onChange={e => setNewName(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input type="number" min={1} value={newMinutes} onChange={e => setNewMinutes(+e.target.value)} className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <span className="self-center text-sm text-gray-500">min</span>
        <button onClick={addTimer} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Add</button>
      </div>
      {timers.length === 0 && <p className="text-center text-gray-400 py-8">Add a timer to get started ⏱️</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        {timers.map(t => {
          const pct = t.total > 0 ? ((t.total - t.remaining) / t.total) * 100 : 0;
          return (
            <div key={t.id} className={`bg-white rounded-xl p-4 border-2 ${t.remaining === 0 ? 'border-red-400 bg-red-50' : t.running ? 'border-green-400' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">{t.name}</span>
                <button onClick={() => removeTimer(t.id)} className="text-gray-400 hover:text-red-500">×</button>
              </div>
              <p className={`text-3xl font-mono font-bold text-center ${t.remaining === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {t.remaining === 0 ? '🔔 Done!' : formatTime(t.remaining)}
              </p>
              <div className="h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${t.remaining === 0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => toggleTimer(t.id)} className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${t.running ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {t.running ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => resetTimer(t.id)} className="flex-1 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">Reset</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CookingTimer;
