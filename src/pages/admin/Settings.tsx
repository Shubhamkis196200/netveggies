import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold">Settings</h1>
      <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
        <div>
          <label className="text-sm font-semibold block mb-1">Site Name</label>
          <input type="text" defaultValue="NetVeggies" className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1">Tagline</label>
          <input type="text" defaultValue="Plant-Based Made Simple" className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1">Contact Email</label>
          <input type="email" defaultValue="hello@netveggies.com" className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1">Pinterest URL</label>
          <input type="url" defaultValue="https://pinterest.com/netveggies" className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:outline-none" />
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark transition-colors">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
