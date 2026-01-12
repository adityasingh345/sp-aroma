import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { useEffect, useState } from 'react';
import { getJson } from '../../lib/api';
import { Product } from '../../types';

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await getJson('/products');
        const items = res?.products || [];
        const mapped: Product[] = items.map((p: any) => ({
          id: p.product_id,
          name: p.product_name,
          type: (p.status === 'attar' || p.product_name?.toLowerCase().includes('attar')) ? 'Attar' : 'Perfume',
          price: p.price ? `₹${p.price}` : (p.variants && p.variants[0] ? `₹${p.variants[0].price}` : '₹0'),
          originalPrice: undefined,
          imageUrl: (p.media && p.media[0] && p.media[0].src) || '/placeholder.png',
          categories: p.categories || [],
          shortDescription: p.description || '',
          longDescription: p.description || '',
          ingredients: '',
          howToUse: '',
        }));
        if (mounted) setFeatured(mapped.filter(x => x.categories.includes('Best Selling')).slice(0,3));
      } catch (e) {
        console.warn('failed to load featured products', e);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  return (
    <section id="attars" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light tracking-widest">
            Our Best Sellers
          </h2>
          <p className="mt-4 text-foreground text-lg">
            Discover the fragrances our customers love the most. A curated collection of our finest perfumes and attars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-16">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-16">
            <Link 
              to="/products"
              className="inline-block bg-white text-foreground font-sans capitalize text-lg px-12 py-5 shadow-[0px_0px_30px_0px_rgba(116,144,155,0.06)] hover:bg-gray-100 transition-colors"
            >
              Explore All Products
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
