import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="connect">
      <div className="bg-gradient-to-t from-primary-bg/0 to-primary-bg py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-6xl font-light tracking-widest">Join our family</h2>
            <p className="mt-4 text-foreground text-lg">
              Subscribe for stories from Kannauj and exclusive offers on our attars.
            </p>
            <form className="w-full max-w-xl mt-10">
              <div className="flex justify-between items-center border-b border-border-color pb-2">
                <input 
                  type="email" 
                  placeholder="Write your email address here..." 
                  className="w-full bg-transparent text-foreground placeholder:text-foreground focus:outline-none"
                />
                <button type="submit" className="font-jost text-xl tracking-[0.1em] text-heading uppercase hover:text-dark-text transition-colors">
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex gap-6 mt-16">
                <a href="#" className="text-heading hover:text-accent"><Facebook size={24} /></a>
                <a href="#" className="text-heading hover:text-accent"><Twitter size={24} /></a>
                <a href="#" className="text-heading hover:text-accent"><Instagram size={24} /></a>
                <a href="#" className="text-heading hover:text-accent"><Linkedin size={24} /></a>
                <a href="#" className="text-heading hover:text-accent"><Youtube size={24} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-5">
        <p className="text-center text-foreground text-sm">
          &copy; {new Date().getFullYear()} SP Aroma. Crafted with love in India. Reimagined by Dualite Alpha.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
