import { Shield } from 'lucide-react';

export default function Users() {
  const users = [
    { name: 'Admin', email: 'admin@netveggies.com', role: 'Admin', avatar: '👨‍🍳' },
    { name: 'Editor', email: 'editor@netveggies.com', role: 'Editor', avatar: '✍️' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold">Users</h1>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {users.map((u, i) => (
          <div key={i} className="p-4 flex items-center justify-between border-b border-border/50 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{u.avatar}</span>
              <div>
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-xs text-muted">{u.email}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs bg-cream px-3 py-1 rounded-full"><Shield className="w-3 h-3" /> {u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
