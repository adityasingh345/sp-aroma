import { Award, Package, ShieldCheck } from 'lucide-react';
import { Service } from '../../types';

const services: Service[] = [
  {
    icon: Award,
    title: "100% Authentic Attars",
    description: "We guarantee the purity and authenticity of every attar."
  },
  {
    icon: Package,
    title: "Free shipping in India",
    description: "Enjoy free shipping on all your orders across the country."
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guarantee",
    description: "We stand by our craft and offer a guarantee for your satisfaction."
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 sm:py-24 border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col items-center text-center">
              <service.icon className="w-10 h-10 text-muted-foreground mb-4" strokeWidth={1.5} />
              <h4 className="text-2xl font-light tracking-widest">{service.title}</h4>
              <p className="mt-2 text-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
