import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ArtOfPerfumerySection = () => {
  return (
    <section id="our-story" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://kannaujattar.com/wp-content/uploads/2019/09/copper-deg-traditional-attar-making.jpg"
              alt="Traditional Indian perfume making pots"
              className="rounded-lg shadow-xl w-full max-w-md object-cover aspect-[4/5]"
            />
          </motion.div>
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-jost text-heading tracking-widest normal-case">
              Our Story: The Art of Perfumery
            </h2>
            <p className="mt-6 text-lg text-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              A legacy of over 200 years in the Indian perfume industry. From the ancient city of Kannauj, we blend tradition with innovation. Our family's legacy in the art of attar-making inspires our collection of modern perfumes, while honoring the timeless deg-bhapka method that captures the soul of fragrance.
            </p>
            <Link
              to="/products"
              className="mt-10 inline-block bg-dark-text text-white font-sans uppercase text-sm tracking-widest px-10 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            >
              Know More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtOfPerfumerySection;
