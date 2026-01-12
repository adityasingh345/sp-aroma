import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-primary-bg to-transparent pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh] lg:min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
          <div className="order-1 lg:order-1 text-center lg:text-left">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.1em] leading-tight">
              The Soul of<br />SP Aroma
            </h1>
            <p className="mt-6 max-w-md mx-auto lg:mx-0 text-foreground text-lg leading-relaxed">
              From timeless attars to modern perfumes and bespoke scents, we craft fragrances that tell your story. Experience the heritage of Kannauj, reimagined for today.
            </p>
            <Link 
              to="/products" 
              className="mt-10 inline-block bg-white text-foreground font-sans capitalize text-lg px-12 py-5 shadow-[0px_0px_30px_0px_rgba(116,144,155,0.06)] hover:bg-gray-100 transition-colors"
            >
              Explore The Collection
            </Link>
          </div>
          <div className="relative order-2 lg:order-2 flex justify-center">
             <div className="p-3 border-[12px] border-white/30 rounded-[30px] shadow-lg">
                <img 
                    src="https://www.shutterstock.com/image-photo/still-life-shot-davidoff-cool-600nw-2435571775.jpg"
                    alt="Traditional Indian Attar Bottle"
                    className="rounded-[20px] max-w-sm md:max-w-md lg:max-w-lg"
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
