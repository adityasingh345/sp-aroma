import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import AddressModal from '../components/AddressModal';

const CartPage = () => {
  const { cartItems, cartTotal, cartCount, updateItemQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setShowAddressModal(true);
  };

  const handleAddressSelect = (addressId: number) => {
    setShowAddressModal(false);
    navigate('/checkout', { state: { addressId } });
  };

  const handleIncreaseQuantity = (itemId: number, variantId?: number) => {
    const item = cartItems.find(item =>
      item.id === itemId &&
      (item as any).variantId === variantId
    );
    if (item) {
      updateItemQuantity(itemId, item.quantity + 1, variantId);
    }
  };

  const handleDecreaseQuantity = (itemId: number, variantId?: number) => {
    const item = cartItems.find(item =>
      item.id === itemId &&
      (item as any).variantId === variantId
    );
    if (item) {
      if (item.quantity > 1) {
        updateItemQuantity(itemId, item.quantity - 1, variantId);
      } else {
        if (window.confirm('Remove this item from cart?')) {
          removeFromCart(itemId, variantId);
        }
      }
    }
  };

  if (cartCount === 0) {
    return (
      <main className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-light tracking-widest">Your Cart is Empty</h1>
        <p className="mt-4 text-foreground text-lg">Looks like you haven't added any fragrances yet.</p>
        <Link
          to="/products"
          className="mt-8 inline-block bg-heading text-white font-sans capitalize text-lg px-12 py-4 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <>
      <main className="pt-32 pb-24 bg-primary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest text-center mb-12">
            Shopping Cart
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items - Takes 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-sm">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-light tracking-widest">{item.name}</h3>

                    {/* Show variant information */}
                    {(item as any).variantName && (
                      <p className="text-sm text-heading font-medium mt-1">
                        Size: {(item as any).variantName}
                        {(item as any).variantSize && (item as any).variantSize !== (item as any).variantName &&
                          ` (${(item as any).variantSize})`
                        }
                      </p>
                    )}

                    <p className="text-sm text-muted-foreground">{item.type}</p>

                    <div className="flex items-center justify-between sm:justify-start sm:space-x-8 mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id, (item as any).variantId)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <span className="text-lg">−</span>
                        </button>
                        <span className="w-8 text-center font-sans text-lg">{item.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id, (item as any).variantId)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>

                      {/* Item Price */}
                      <div className="text-right sm:text-left">
                        <p className="font-sans text-lg text-heading">
                          ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            ₹{parseFloat(item.price.replace('₹', '').replace(',', '')).toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id, (item as any).variantId)}
                      className="mt-4 text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Takes 1/3 width on large screens */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md sticky top-32">
                <h2 className="text-2xl font-light tracking-widest border-b border-gray-200 pb-4">
                  Order Summary
                </h2>
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-sans">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span className="font-sans text-sm">Calculated at checkout</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-dark-text border-t border-gray-200 mt-6 pt-4">
                  <span>Total</span>
                  <span className="font-sans">₹{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-8 bg-heading text-white font-sans uppercase text-lg tracking-wider py-3.5 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Proceed to Checkout
                </button>
                {!isAuthenticated && (
                  <p className="text-sm text-center text-gray-600 mt-4">
                    Please log in to complete your purchase
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={handleAddressSelect}
      />
    </>
  );
};

export default CartPage;