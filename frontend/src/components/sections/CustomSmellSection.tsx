import { FlaskConical, Pencil, Package } from 'lucide-react';

const steps = [
  {
    icon: Pencil,
    title: "1. Consultation",
    description: "Share your story, memories, and favorite notes with our master perfumer to begin crafting your unique scent profile."
  },
  {
    icon: FlaskConical,
    title: "2. Creation",
    description: "We meticulously blend the finest ingredients, creating samples for you to experience and refine until it's perfect."
  },
  {
    icon: Package,
    title: "3. Your Signature",
    description: "Receive your final bespoke fragrance, beautifully bottled and named by you. A scent that is truly yours."
  }
];

const CustomSmellSection = () => {
  return (
    <section id="custom-scents" className="bg-primary-bg py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light tracking-widest">
            Create Your Signature Scent
          </h2>
          <p className="mt-4 text-foreground text-lg">
            A fragrance should be as unique as you are. We offer a bespoke service to create a one-of-a-kind scent that captures your essence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <step.icon className="w-10 h-10 text-heading" strokeWidth={1.5} />
              </div>
              <h4 className="text-2xl font-light tracking-widest">{step.title}</h4>
              <p className="mt-2 text-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-block bg-white text-foreground font-sans capitalize text-lg px-12 py-5 shadow-[0px_0px_30px_0px_rgba(116,144,155,0.06)] hover:bg-gray-100 transition-colors"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomSmellSection;
