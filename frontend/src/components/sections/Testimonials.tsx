import { useState } from 'react';
import { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    quote: "The Mitti Attar is unbelievable. It smells exactly like the first rain on dry earth. It transports me back to my childhood. Truly magical!",
    author: "Priya Sharma",
    location: "Mumbai, India",
    avatarUrl: "https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/F5EFEF/8D7B7C?text=PS"
  },
  {
    quote: "I've never experienced such a pure rose scent. The Gulab Attar is not like commercial perfumes; it's the real essence of the flower. I am in love.",
    author: "Rohan Mehra",
    location: "Delhi, India",
    avatarUrl: "https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/F5EFEF/8D7B7C?text=RM"
  },
  {
    quote: "SP Aroma is a gem. You can feel the history and passion in their fragrances. The quality is exceptional. A customer for life.",
    author: "Anjali Desai",
    location: "Bangalore, India",
    avatarUrl: "https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/F5EFEF/8D7B7C?text=AD"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section id="reviews" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="absolute -top-20 -left-20 font-syne text-[400px] text-primary-bg/70 z-0 leading-none select-none">“</span>
          <div className="relative z-10">
            <p className="font-sans text-3xl lg:text-4xl text-foreground leading-relaxed">
              {testimonials[currentIndex].quote}
            </p>
            <p className="mt-8 font-jost text-2xl tracking-widest text-heading uppercase">
              - {testimonials[currentIndex].author}
            </p>
            <div className="flex justify-center gap-5 mt-12">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-colors ${currentIndex === index ? 'bg-heading' : 'border-2 border-accent'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
