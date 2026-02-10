import { useState } from 'react';
import { Send } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center">
      <h2 className="font-heading text-3xl font-bold text-dark mb-3">Get Weekly Recipes 🌱</h2>
      <p className="text-muted max-w-md mx-auto mb-6">Join 10,000+ plant-based food lovers. Free meal plans, recipes, and tips delivered every Sunday.</p>
      {submitted ? (
        <div className="bg-primary/10 text-primary font-semibold py-3 px-6 rounded-full inline-block">✓ You're in! Check your inbox.</div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-5 py-3 rounded-full border border-border focus:border-primary focus:outline-none text-sm" />
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
