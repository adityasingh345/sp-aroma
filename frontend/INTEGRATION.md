# SP Aroma Frontend - Backend Integration Guide

## Overview
This document describes the complete integration of the SP Aroma frontend with the FastAPI backend.

## ✅ Completed Integrations

### 1. Authentication System
All authentication endpoints have been integrated:

#### **Registration & Verification**
- ✅ User registration with email and password (`/accounts/register`)
- ✅ Email verification with OTP (`/accounts/register/verify`)
- ✅ OTP resend functionality (`/accounts/otp`)
- ✅ Multi-step registration flow with proper UX

#### **Login & Logout**
- ✅ OAuth2 password grant login (`/accounts/login`)
- ✅ Token-based authentication with localStorage
- ✅ Automatic session refresh
- ✅ Secure logout with token invalidation (`/accounts/logout`)

#### **Password Management**
- ✅ Forgot password flow (`/accounts/reset-password`)
- ✅ OTP-based password reset verification (`/accounts/reset-password/verify`)
- ✅ Password change for logged-in users (`/accounts/me/password`)

### 2. User Profile Management
- ✅ Fetch current user profile (`/accounts/me`)
- ✅ Update user information (first name, last name) (`/accounts/me` PUT)
- ✅ Change password with current password verification
- ✅ Display account details (joined date, last login, verification status)

### 3. Product Management

#### **Public Product Access**
- ✅ List all products with filtering (All, Perfume, Attar) (`/products`)
- ✅ View product details (`/products/{product_id}`)
- ✅ Product image display with fallback
- ✅ Related products suggestions

#### **Admin Product Management** (Admin Only)
- ✅ Create new products (`/products` POST)
- ✅ Update product details (`/products/{product_id}` PUT)
- ✅ Delete products (`/products/{product_id}` DELETE)
- ✅ Inline editing for product names

### 4. Shopping Cart
- ✅ Add items to cart (`/cart/add`)
- ✅ View cart contents (`/cart`)
- ✅ Update item quantities (`/cart/item/{item_id}` PUT)
- ✅ Remove items from cart (`/cart/item/{item_id}` DELETE)
- ✅ Cart synchronization between local storage and backend
- ✅ Automatic cart refresh on login

### 5. Checkout & Orders
- ✅ Address management modal
- ✅ Create new shipping addresses (`/addresses` POST)
- ✅ Select address for checkout
- ✅ Complete checkout process (`/cart/checkout`)
- ✅ Order placement with automatic cart clearing

### 6. Order Management
- ✅ View user's order history (`/orders`)
- ✅ Display order details with items
- ✅ Order status tracking (Processing, Shipped, Delivered)
- ✅ Admin view all orders (`/orders/admin/allorders`)

### 7. Address Management
- ✅ List user addresses (`/addresses`)
- ✅ Create new address (`/addresses` POST)
- ✅ Update address (`/addresses/{address_id}` PUT)
- ✅ Delete address (`/addresses/{address_id}` DELETE)
- ✅ Address selection during checkout

## 📁 File Structure

### Core API Files
- **`src/lib/api.ts`** - Complete API wrapper with all backend endpoints
- **`src/contexts/AuthContext.tsx`** - Authentication state management
- **`src/contexts/CartContext.tsx`** - Shopping cart state with backend sync
- **`src/types/index.ts`** - TypeScript interfaces for all data models

### Pages
- **`src/pages/AuthPage.tsx`** - Complete auth flow (login, signup, verify, reset password)
- **`src/pages/AllProductsPage.tsx`** - Product listing with filters
- **`src/pages/ProductDetailPage.tsx`** - Individual product view with add to cart
- **`src/pages/CartPage.tsx`** - Shopping cart with checkout integration
- **`src/pages/AccountPage.tsx`** - User dashboard

### Dashboard Components
- **`src/components/dashboard/ProfileSection.tsx`** - User profile + password change
- **`src/components/dashboard/OrderHistorySection.tsx`** - Order history display
- **`src/components/dashboard/AdminProductsSection.tsx`** - Product CRUD for admins
- **`src/components/dashboard/SalesSection.tsx`** - Sales overview for admins

### Other Components
- **`src/components/AddressModal.tsx`** - Address selection/creation modal

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Backend API URL (optional, defaults to same origin)
VITE_API_BASE=http://localhost:8000

# Or leave empty to use relative paths (recommended for production)
# VITE_API_BASE=
```

### API Base URL Resolution
The app uses smart URL resolution:
- **Development**: If `VITE_API_BASE` is set, all requests go to that URL
- **Production**: If not set, uses relative paths (proxied by Vite or served from same origin)

## 🚀 How to Use

### 1. Start the Backend
Ensure your FastAPI backend is running:
```bash
# In your backend directory
uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend
```bash
# In the frontend directory
npm install
npm run dev
```

### 3. Configure Vite Proxy (Development)
If not using `VITE_API_BASE`, configure Vite to proxy API requests by adding to `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/accounts': 'http://localhost:8000',
      '/products': 'http://localhost:8000',
      '/cart': 'http://localhost:8000',
      '/orders': 'http://localhost:8000',
      '/addresses': 'http://localhost:8000',
      '/payments': 'http://localhost:8000',
      '/attributes': 'http://localhost:8000',
    }
  }
})
```

## 📝 API Functions Reference

All API functions are in `src/lib/api.ts`:

### Authentication
```typescript
apiRegister(email, password, password_confirm)
apiVerifyRegistration(email, otp)
apiLogin(username, password)
apiLogout()
apiResetPassword(email)
apiVerifyResetPassword(email, otp, password, password_confirm)
apiResendOTP(email, code_type)
```

### User Management
```typescript
apiGetCurrentUser()
apiUpdateCurrentUser(data)
apiChangePassword(current_password, password, password_confirm)
apiChangeEmail(email)
apiVerifyChangeEmail(otp)
apiGetUser(userId)
```

### Products
```typescript
apiGetProducts()
apiGetProduct(productId)
apiCreateProduct(data)
apiUpdateProduct(productId, data)
apiDeleteProduct(productId)
```

### Cart
```typescript
apiGetCart()
apiAddToCart(variant_id, quantity)
apiUpdateCartItem(itemId, quantity)
apiDeleteCartItem(itemId)
apiCheckout(addressId)
```

### Orders
```typescript
apiGetOrders()
apiGetOrder(orderId)
apiGetAllOrders() // Admin only
```

### Addresses
```typescript
apiGetAddresses()
apiGetAddress(addressId)
apiCreateAddress(data)
apiUpdateAddress(addressId, data)
apiDeleteAddress(addressId)
```

## 🔐 Authentication Flow

1. **Registration**:
   - User fills registration form
   - OTP sent to email
   - User verifies OTP
   - Account activated

2. **Login**:
   - OAuth2 password grant
   - Access token stored in localStorage
   - Token sent with all authenticated requests via `Authorization: Bearer <token>`

3. **Password Reset**:
   - User requests reset
   - OTP sent to email
   - User verifies OTP and sets new password

## 🛒 Shopping Flow

1. **Browse Products**: View all products or filter by type
2. **Add to Cart**: Select quantity and add items
3. **View Cart**: Review items and update quantities
4. **Checkout**:
   - Login if not authenticated
   - Select or create shipping address
   - Place order
   - Cart automatically cleared on success

## 👤 User Features

### Regular Users
- Register and verify email
- Login/Logout
- Browse products
- Add items to cart
- Checkout and place orders
- View order history
- Update profile
- Change password

### Admin Users
- All regular user features
- Create/Update/Delete products
- View all orders (sales dashboard)
- Manage product inventory

## 🎨 UI/UX Features

- **Loading States**: All API calls show loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages for actions
- **Responsive Design**: Mobile-friendly layouts
- **Smooth Animations**: Framer Motion animations throughout
- **Form Validation**: Client-side validation before API calls

## ⚠️ Important Notes

1. **CORS**: Ensure your FastAPI backend has CORS configured to allow requests from your frontend origin
2. **Token Expiry**: Tokens are stored in localStorage; implement refresh token logic if needed
3. **Cart Sync**: Cart syncs with backend when user logs in
4. **Admin Access**: Admin features only accessible to users with `is_superuser: true`
5. **Product Variants**: Currently uses first variant as default; extend if multiple variants needed

## 🐛 Troubleshooting

### "Login failed" errors
- Check backend is running
- Verify CORS configuration
- Check browser console for detailed error
- Ensure credentials are correct

### Cart not syncing
- Check authentication token is valid
- Verify `/cart` endpoint is accessible
- Check browser console for errors

### Products not loading
- Ensure `/products` endpoint returns data
- Check product data structure matches frontend expectations
- Verify image URLs are accessible

### Checkout failing
- User must be authenticated
- At least one address must exist or be created
- Cart must have items
- Check `/cart/checkout` endpoint logs

## 📚 Next Steps

### Recommended Enhancements
1. **Payment Integration**: Integrate with payment gateway using `/payments/create/{order_id}`
2. **Product Variants**: Enhance UI to support multiple product variants (size, volume)
3. **Product Images**: Add multiple image upload/management
4. **Order Details**: Add detailed order view page
5. **Email Change**: Implement email change flow (`/accounts/me/email`)
6. **Product Search**: Add search functionality
7. **Wishlist**: Implement product wishlist feature
8. **Reviews**: Add product review system
9. **Notifications**: Add real-time notifications for order updates
10. **Analytics**: Add admin analytics dashboard

## ✅ Testing Checklist

- [ ] User registration and email verification
- [ ] Login with valid credentials
- [ ] Password reset flow
- [ ] Profile information update
- [ ] Password change
- [ ] Product listing and filtering
- [ ] Product detail view
- [ ] Add to cart (logged in and guest)
- [ ] Cart quantity updates
- [ ] Remove from cart
- [ ] Address creation
- [ ] Checkout flow
- [ ] Order placement
- [ ] Order history view
- [ ] Admin product creation
- [ ] Admin product update
- [ ] Admin product deletion
- [ ] Admin sales dashboard

---

**All core features are now fully integrated and ready for testing!** 🎉
