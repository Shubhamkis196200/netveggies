import { Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold">Get in Touch 💌</h1>
        <p className="text-muted mt-2">Have a question, recipe request, or just want to say hi? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-heading text-lg font-semibold">Email</h3>
                <p className="text-muted">hello@netveggies.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageCircle className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-heading text-lg font-semibold">Social</h3>
                <p className="text-muted">@netveggies on Instagram, Pinterest, and YouTube</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-cream rounded-2xl p-6">
            <h3 className="font-heading text-lg font-semibold mb-2">Recipe Requests</h3>
            <p className="text-sm text-muted">Want us to veganize your favorite dish? We love a good challenge! Send us the recipe and we'll make it plant-based.</p>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-primary/10 rounded-2xl p-8 text-center">
              <p className="text-primary font-semibold text-lg">✓ Message sent! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-dark block mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-dark block mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-dark block mb-1">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none resize-none" />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
