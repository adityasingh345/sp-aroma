import { Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-card p-8 rounded-2xl h-full flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-accent fill-current" />
          ))}
        </div>
        <p className="text-card-foreground/80 mb-6">"{testimonial.quote}"</p>
      </div>
      <div className="flex items-center gap-4">
        <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-bold text-card-foreground">{testimonial.author}</p>
          <p className="text-sm text-card-foreground/60">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
