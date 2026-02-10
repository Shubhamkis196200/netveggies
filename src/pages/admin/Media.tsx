import { Upload, Image as ImageIcon } from 'lucide-react';

export default function Media() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Media Library</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"><Upload className="w-4 h-4" /> Upload</button>
      </div>
      <div className="bg-white rounded-2xl border border-border border-dashed p-16 text-center">
        <ImageIcon className="w-12 h-12 text-muted mx-auto mb-4" />
        <p className="text-muted">Drag and drop images here, or click Upload</p>
        <p className="text-xs text-muted mt-2">Supports JPG, PNG, WebP up to 10MB</p>
      </div>
    </div>
  );
}
