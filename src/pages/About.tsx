import { Heart, Leaf, DollarSign, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold">About NetVeggies 🌿</h1>
        <p className="text-lg text-muted mt-4 max-w-2xl mx-auto">We believe plant-based eating should be easy, affordable, and absolutely delicious.</p>
      </div>

      <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12">
        <img src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&h=675&fit=crop" alt="Fresh vegetables" className="w-full h-full object-cover" />
      </div>

      <div className="prose-lg max-w-none space-y-6 text-dark-light">
        <h2 className="font-heading text-3xl font-bold text-dark">Our Story</h2>
        <p>NetVeggies started with a simple frustration: why is vegan cooking made to seem so complicated and expensive? We knew from experience that some of the most delicious meals on the planet are plant-based — and they can cost less than a fast food meal.</p>
        <p>So we created NetVeggies to share easy, budget-friendly vegan recipes that anyone can make — whether you're a lifelong vegan or just trying Meatless Monday for the first time.</p>

        <h2 className="font-heading text-3xl font-bold text-dark mt-12">Our Mission</h2>
        <p>Every recipe on NetVeggies is designed with three principles in mind:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        {[
          { icon: Heart, title: 'Simple', desc: 'Everyday ingredients, straightforward instructions. No culinary degree required.' },
          { icon: DollarSign, title: 'Affordable', desc: 'Every recipe shows cost per serving. Most meals are under $3/serving.' },
          { icon: Leaf, title: 'Plant-Based', desc: '100% vegan recipes. Better for you, better for the planet.' },
        ].map(item => (
          <div key={item.title} className="bg-cream rounded-2xl p-6 text-center">
            <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-3xl p-8 text-center">
        <Users className="w-8 h-8 text-primary mx-auto mb-3" />
        <h2 className="font-heading text-2xl font-bold mb-2">Join Our Community</h2>
        <p className="text-muted max-w-md mx-auto">Over 10,000 plant-based food lovers get our weekly recipes. Join us!</p>
      </div>
    </div>
  );
}
