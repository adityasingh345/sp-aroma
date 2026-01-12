import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { apiGetProducts } from '../lib/api';

type FilterType = 'All' | 'Perfume' | 'Attar';

const AllProductsPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await apiGetProducts();
        const items = res?.products || [];
        const mapped: Product[] = items.map((p: any) => ({
          id: p.product_id,
          name: p.product_name,
          type: (p.status === 'attar' || p.product_name?.toLowerCase().includes('attar')) ? 'Attar' : 'Perfume',
          price: p.price ? `₹${p.price}` : (p.variants && p.variants[0] ? `₹${p.variants[0].price}` : '₹0'),
          originalPrice: undefined,
          imageUrl: (p.media && p.media[0] && p.media[0].src) || '/placeholder.png',
          categories: [],
          shortDescription: p.description || '',
          longDescription: p.description || '',
          ingredients: '',
          howToUse: '',
        }));
        if (mounted) setProducts(mapped);
      } catch (err) {
        console.warn('Failed to load products', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter(p => p.type === activeFilter);

  const filters: FilterType[] = ['All', 'Perfume', 'Attar'];

  return (
    <main className="pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light tracking-widest">
            Our Fragrance Collection
          </h1>
          <p className="mt-4 text-foreground text-lg">
            Explore our complete collection of handcrafted perfumes and pure attars from Kannauj. Each bottle is a testament to tradition and craftsmanship.
          </p>
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 my-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-6 py-2 text-lg rounded-full transition-colors font-sans",
                activeFilter === filter
                  ? "bg-heading text-white"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          <AnimatePresence>
            {loading ? (
              <p className="col-span-full text-center">Loading products…</p>
            ) : filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-foreground">No products found</p>
            ) : filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
};

export default AllProductsPage;
