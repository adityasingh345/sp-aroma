import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`} className="text-center group">
      <div className="bg-gray-50 mb-5 overflow-hidden aspect-square relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 bg-white/80 text-heading text-xs font-jost uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
          {product.type}
        </span>
      </div>
      <h4 className="text-2xl font-light tracking-widest">{product.name}</h4>
      <div className="mt-2 flex justify-center items-baseline gap-2 font-sans text-2xl text-heading">
        {product.originalPrice && (
          <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
        )}
        <span>{product.price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
