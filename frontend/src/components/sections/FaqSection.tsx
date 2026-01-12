import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '../../types';

const faqItems: FaqItem[] = [
  {
    question: "Are these pure attars or synthetic perfumes?",
    answer: "Our products are 100% pure, natural attars, made using traditional hydro-distillation methods in Kannauj. They are completely free of alcohol and synthetic chemicals."
  },
  {
    question: "How long does the fragrance of an attar last?",
    answer: "Pure attars are very long-lasting. A small dab can last 8-12 hours. The scent also matures and evolves with your skin's chemistry, becoming uniquely yours over time."
  },
  {
    question: "What is the best way to apply attar?",
    answer: "For the best experience, apply a small amount to your pulse points, such as the wrists, behind the ears, and at the base of your throat. A little goes a long way!"
  }
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <section id="faqs" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-light tracking-widest text-center mb-12">
          Common Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-5">
              <button 
                className="w-full flex justify-between items-center text-left"
                onClick={() => toggleFaq(index)}
              >
                <h4 className="text-2xl font-light tracking-widest">{item.question}</h4>
                {openIndex === index ? <Minus className="w-7 h-7 text-heading" /> : <Plus className="w-7 h-7 text-heading" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <p className="text-foreground text-lg leading-relaxed pr-8">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
