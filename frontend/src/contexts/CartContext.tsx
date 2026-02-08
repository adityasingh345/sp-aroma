import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product} from '../types';
import { useAuth } from './AuthContext';
import {
  apiGetCart,
  apiAddToCart,
  apiUpdateCartItem,
  apiDeleteCartItem,
  apiVerifyProductData
} from '../lib/api';

// Define CartItem interface that extends Product with cart-specific properties
interface CartItem extends Product {
  quantity: number;
  variantId?: number;
  selectedOption?: string;
  variantName?: string;
  variantPrice?: string | number;
  variantSize?: string;
  stock?: number;
  cartItemId?: number; // For backend cart item ID
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, variantId?: number) => Promise<void>;
  removeFromCart: (productId: number, variantId?: number) => Promise<void>;
  updateItemQuantity: (productId: number, quantity: number, variantId?: number) => Promise<void>;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const areItemsSame = (item1: CartItem, item2: CartItem): boolean => {
  // First check product ID
  if (item1.id !== item2.id) return false;

  // Then check variant ID
  const variantId1 = item1.variantId;
  const variantId2 = item2.variantId;

  // If both have no variantId, they're the same
  if (!variantId1 && !variantId2) return true;

  // If both have variantId, compare them
  if (variantId1 && variantId2) {
    return variantId1 === variantId2;
  }

  // One has variantId, the other doesn't - they're different
  return false;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('spAromaCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  const { user } = useAuth();

  // Sync cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('spAromaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch cart from backend when user logs in
  const refreshCart = async () => {
    if (!user) return;
    try {
      const cartResp = await apiGetCart();
      const serverItemsRaw = cartResp?.items || [];

      // Map backend cart items to frontend CartItem format
      const serverItems: CartItem[] = serverItemsRaw.map((it: any) => ({
        id: it.product_id ?? it.variant_id ?? it.id ?? 0,
        cartItemId: it.item_id ?? it.id,
        variantId: it.variant_id,
        name: it.product_name ?? it.name ?? '',
        type: (it.type || 'Perfume') as any,
        price: it.price ? `₹${it.price}` : (it.display_price ?? '₹0'),
        originalPrice: undefined,
        imageUrl: (it.image_url ?? it.imageUrl ?? it.media?.[0]?.src) || '',
        categories: it.categories ?? [],
        shortDescription: it.description ?? it.shortDescription ?? '',
        longDescription: it.longDescription ?? '',
        ingredients: it.ingredients ?? '',
        howToUse: it.howToUse ?? '',
        quantity: it.quantity ?? it.qty ?? 1,
        //variant 
        variantName: it.variant_name || it.variantName || '',
        variantSize: it.variant_size || it.variantSize || '',
        selectedOption: it.selected_option || it.selectedOption || '',
        variantPrice: it.variant_price || it.variantPrice || it.price,
        stock: it.stock
      }));

      setCartItems(serverItems);
    } catch (err) {
      console.warn('Failed to fetch cart from backend', err);
    }
  };

  useEffect(() => {
    const syncFromServer = async () => {
      if (!user) return;
      await refreshCart();
    };
    syncFromServer();
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const addToCart = async (product: Product, quantity: number, variantId?: number) => {
    // Extract variant information from product
    const extractedVariantId = variantId || (product as any).variantId;

    // Create new cart item
    const newCartItem: CartItem = {
      ...product,
      quantity: quantity,
      variantId: extractedVariantId,
      selectedOption: (product as any).selectedOption,
      variantName: (product as any).variantName,
      variantPrice: (product as any).variantPrice || product.price,
      variantSize: (product as any).variantSize,
      stock: (product as any).stock
    };

    // CRITICAL: Always verify price and stock from backend before adding to cart
    try {
      const verification = await apiVerifyProductData(product.id, extractedVariantId);

      if (!verification.available) {
        throw new Error('Product is out of stock');
      }

      if (verification.stock < quantity) {
        throw new Error(`Only ${verification.stock} items available in stock`);
      }
    } catch (err: any) {
      console.error('Product verification failed:', err);
      throw err;
    }

    if (user) {
      // Add to backend cart
      try {
        await apiAddToCart(product.id, quantity, extractedVariantId);
        await refreshCart();
      } catch (err) {
        console.error('Failed to add to cart on backend', err);
        // Fall back to local cart
        setCartItems(prevItems => {
          // Check if exact same item (with same variant) already exists
          const existingItemIndex = prevItems.findIndex(item =>
            areItemsSame(item, newCartItem)
          );

          if (existingItemIndex !== -1) {
            // Update quantity of existing item
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity
            };
            return updatedItems;
          }

          // Add as new item
          return [...prevItems, newCartItem];
        });
      }
    } else {
      // Not logged in - use local cart
      setCartItems(prevItems => {
        // Check if exact same item (with same variant) already exists
        const existingItemIndex = prevItems.findIndex(item =>
          areItemsSame(item, newCartItem)
        );

        if (existingItemIndex !== -1) {
          // Update quantity of existing item
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        }

        // Add as new item
        return [...prevItems, newCartItem];
      });
    }
  };

  const removeFromCart = async (productId: number, variantId?: number) => {
    if (user) {
      try {
        // Find cart item ID for this product
        const cartItem = cartItems.find(item => 
          item.id === productId && 
          (variantId !== undefined ? item.variantId === variantId : !item.variantId)
        );
        
        if (cartItem?.cartItemId) {
          await apiDeleteCartItem(cartItem.cartItemId);
        }
        await refreshCart();
      } catch (err) {
        console.error('Failed to remove from cart on backend', err);
        // Fall back to local removal
        setCartItems(prevItems => prevItems.filter(item => 
          !(item.id === productId && 
            (variantId !== undefined ? item.variantId === variantId : !item.variantId))
        ));
      }
    } else {
      // Fix: Correct filter logic for removing items
      setCartItems(prevItems => prevItems.filter(item => 
        !(item.id === productId && 
          (variantId !== undefined ? item.variantId === variantId : !item.variantId))
      ));
    }
  };

  const updateItemQuantity = async (productId: number, quantity: number, variantId?: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId, variantId);
      return;
    }

    if (user) {
      try {
        const cartItem = cartItems.find(item =>
          item.id === productId &&
          item.variantId === variantId
        );

        if (cartItem?.cartItemId) {
          await apiUpdateCartItem(cartItem.cartItemId, quantity);
        }
        await refreshCart();
      } catch (err) {
        console.error('Failed to update cart item on backend', err);
        // Fall back to local update
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === productId && item.variantId === variantId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter(item => item.quantity > 0)
        );
      }
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId && item.variantId === variantId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      );
    }
  };


  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

 const cartTotal = cartItems.reduce((total, item) => {
    // Use variantPrice if available, otherwise use regular price
    const priceValue = item.variantPrice || item.price;
    const price = parseFloat(priceValue.toString().replace('₹', '').replace(',', ''));
    return total + price * item.quantity;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    cartCount,
    cartTotal,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
