import { useState, useEffect, useRef } from 'react';

const protocols = [
  { name: '16:8', fast: 16, eat: 8, label: '16:8 (most popular)' },
  { name: '18:6', fast: 18, eat: 6, label: '18:6 (intermediate)' },
  { name: '20:4', fast: 20, eat: 4, label: '20:4 (warrior diet)' },
  { name: 'OMAD', fast: 23, eat: 1, label: 'OMAD (one meal a day)' },
];

const IntermittentFastingTimer = () => {
  const [protocol, setProtocol] = useState(protocols[0]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fastSeconds = protocol.fast * 3600;

  useEffect(() => {
    if (startTime) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startTime]);

  const startFast = () => { setStartTime(Date.now()); setElapsed(0); };
  const stopFast = () => { setStartTime(null); setElapsed(0); };

  const remaining = Math.max(fastSeconds - elapsed, 0);
  const progress = fastSeconds > 0 ? Math.min((elapsed / fastSeconds) * 100, 100) : 0;
  const done = remaining === 0 && startTime !== null;

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Fasting Protocol</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {protocols.map(p => (
            <button key={p.name} onClick={() => { setProtocol(p); stopFast(); }} className={`p-3 rounded-lg text-sm font-medium text-left transition-colors ${protocol.name === p.name ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <span className="font-bold">{p.name}</span>
              <p className="text-xs opacity-75 mt-1">Fast {p.fast}h • Eat {p.eat}h</p>
            </button>
          ))}
        </div>
      </div>
      <div className="text-center">
        {/* Progress ring */}
        <div className="relative inline-block w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke={done ? '#22c55e' : '#9333ea'} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${progress * 2.827} ${282.7 - progress * 2.827}`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {startTime ? (
              <>
                <p className="text-sm text-gray-500">{done ? '🎉 Complete!' : 'Remaining'}</p>
                <p className="text-2xl font-mono font-bold">{formatTime(remaining)}</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">Ready to start</p>
            )}
          </div>
        </div>
      </div>
      {!startTime ? (
        <button onClick={startFast} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors">Start {protocol.name} Fast</button>
      ) : (
        <button onClick={stopFast} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors">End Fast</button>
      )}
      {startTime && (
        <div className="grid sm:grid-cols-2 gap-4 text-center">
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <p className="text-xs text-purple-600">Elapsed</p>
            <p className="font-bold text-purple-700">{formatTime(elapsed)}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-green-600">Progress</p>
            <p className="font-bold text-green-700">{Math.round(progress)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntermittentFastingTimer;
