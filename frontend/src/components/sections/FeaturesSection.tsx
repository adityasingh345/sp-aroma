import { Feature } from '../../types';

const leftFeatures: Feature[] = [
  {
    title: "Pure & Natural",
    description: "Sourced directly from local farms in and around Kannauj, ensuring purity."
  },
  {
    title: "Aged to Perfection",
    description: "Our attars are aged for months, sometimes years, to develop a rich and complex character."
  },
  {
    title: "Traditional Craft",
    description: "Handcrafted using the ancient deg-bhapka (hydro-distillation) technique."
  }
];

const rightFeatures: Feature[] = [
    {
      title: "Alcohol-Free",
      description: "Experience pure, oil-based fragrances that are gentle and nourishing for the skin."
    },
    {
      title: "Evolving Scent",
      description: "Our attars evolve with your body's warmth, creating a unique personal fragrance."
    },
    {
      title: "A Scent with a Story",
      description: "Each bottle holds not just a fragrance, but the heritage of Kannauj."
    }
  ];

const FeaturesSection = () => {
  return (
    <section id="process" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
          <div className="space-y-12 text-center lg:text-right">
            {leftFeatures.map((feature) => (
              <div key={feature.title}>
                <h4 className="text-2xl font-light tracking-widest">{feature.title}</h4>
                <p className="mt-2 text-foreground max-w-xs mx-auto lg:ml-auto lg:mr-0">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="relative flex justify-center">
            <img 
              src="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/68be/2df9/5a9a31fe4cbc5e09f456d23ee6c3815d?Expires=1763337600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=alnQogT0I3F7n1BViPnxH8NLqZ1O2~ontocXGL~OckhhNty24l~ZMBACtmYU6g5YLsU9LLqgeGY7TAg4PC~84etQpf8~KlFRgLDtflIkQmdVRJnqIeh~37jCyX91bT0oOWF8XgKzZA8iaLCHM69Zn7XzZ2LohapQvJl33ugTqCGHBcFGmo9IB0cNSaNXo-oPs5AEyDqBqAYe1SdXJJHxiXtq7SK5C0BWqDv-B9oUd~Z6C5mmpilt~a4LTvqrGBFOt34i9JF9KMWgeuzBHcIooCz-ecmMCoboHP5b3sYI5GEl6A8brSwndrB3tA3WwUsvSUXEOrWtfd587JY9kxpnQA__"
              alt="Woman applying traditional attar"
              className="max-w-full h-auto"
            />
          </div>

          <div className="space-y-12 text-center lg:text-left">
            {rightFeatures.map((feature) => (
              <div key={feature.title}>
                <h4 className="text-2xl font-light tracking-widest">{feature.title}</h4>
                <p className="mt-2 text-foreground max-w-xs mx-auto lg:mx-0">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
