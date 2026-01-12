import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../types';

interface FeaturedProductProps {
  product: Product;
}

const FeaturedProduct = ({ product }: FeaturedProductProps) => {
  if (!product) return null;

  return (
    <section className="py-16 sm:py-24 bg-primary-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="rounded-lg shadow-2xl w-full max-w-md object-cover aspect-square"
            />
          </motion.div>
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-jost text-xl tracking-widest text-muted-foreground uppercase">Featured Fragrance</h3>
            <h2 className="text-5xl md:text-6xl font-light tracking-widest mt-2">{product.name}</h2>
            <p className="mt-6 text-lg text-foreground leading-relaxed">
              {product.longDescription}
            </p>
            <Link 
              to={`/products/${product.id}`}
              className="mt-10 inline-block bg-white text-foreground font-sans capitalize text-lg px-12 py-5 shadow-[0px_0px_30px_0px_rgba(116,144,155,0.06)] hover:bg-gray-100 transition-colors"
            >
              Discover This Scent
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
