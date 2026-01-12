# SP Aroma - Luxury Fragrance E-Commerce

A modern, elegant e-commerce platform for luxury perfumes and attars, built with React, TypeScript, and integrated with FastAPI backend.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse and filter products (Perfumes & Attars)
- **Product Details**: Detailed product pages with descriptions and images
- **Shopping Cart**: Full cart management with quantity updates
- **Checkout**: Complete checkout flow with address management
- **Order Tracking**: View order history and status

### 🔐 Authentication & User Management
- **Registration**: Email-based registration with OTP verification
- **Login/Logout**: Secure OAuth2-based authentication
- **Password Reset**: Forgot password flow with OTP
- **Profile Management**: Update personal information
- **Password Change**: Change password with current password verification

### 👨‍💼 Admin Features
- **Product Management**: Create, update, and delete products
- **Order Management**: View all orders and sales analytics
- **Sales Dashboard**: Track total sales and order statistics

### 🎨 Design & UX
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: Framer Motion animations throughout
- **Dark/Light Theme**: Theme toggle support
- **Modern UI**: Clean, minimalist design with Tailwind CSS
- **Loading States**: Proper loading indicators for all async operations
- **Error Handling**: User-friendly error messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- FastAPI backend running (see backend documentation)

### Installation

1. **Clone and navigate to the project**:
```bash
cd sp-aroma
```

2. **Run the setup script**:
```bash
./setup.sh
```

3. **Configure environment** (optional):
```bash
# Edit .env file if you need custom backend URL
nano .env
```

4. **Start development server**:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📖 Documentation

- **[INTEGRATION.md](./INTEGRATION.md)** - Complete backend integration guide
- **[api.md](./api.md)** - Backend API documentation

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend Integration
- **FastAPI** - Python backend framework
- **OAuth2** - Authentication protocol
- **RESTful API** - Standard HTTP methods

## 📁 Project Structure

```
sp-aroma/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── sections/        # Homepage sections
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx  # Authentication state
│   │   ├── CartContext.tsx  # Shopping cart state
│   │   └── ThemeProvider.tsx
│   ├── lib/
│   │   ├── api.ts          # API wrapper functions
│   │   └── utils.ts        # Utility functions
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── AllProductsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   └── AccountPage.tsx
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   └── main.tsx           # Entry point
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── setup.sh              # Setup script
└── README.md            # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file (or copy from `.env.example`):

```env
# Backend API URL (optional)
VITE_API_BASE=

# For development with backend on different port:
# VITE_API_BASE=http://localhost:8000

# For production:
# VITE_API_BASE=https://api.yourdomain.com
```

### Vite Proxy (Development)

The project includes a pre-configured Vite proxy for development. When `VITE_API_BASE` is set, API requests are proxied to the backend server.

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript type checking

# Setup
./setup.sh             # Run setup script
```

## 🔐 Authentication Flow

1. **Registration**:
   - User registers with email and password
   - OTP sent to email
   - User verifies OTP to activate account

2. **Login**:
   - OAuth2 password grant authentication
   - Access token stored in localStorage
   - Token included in all authenticated requests

3. **Protected Routes**:
   - Automatic redirect to login for unauthenticated users
   - Token validation on page load

## 🛒 Shopping Flow

1. Browse products or use filters
2. View product details
3. Add items to cart (guest or authenticated)
4. Login or register (if not already)
5. Select or add shipping address
6. Complete checkout
7. View order in order history

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      heading: '#2D2D2D',      // Main headings
      foreground: '#666666',    // Body text
      'primary-bg': '#F8F7F4', // Background
      // ... more colors
    }
  }
}
```

### API Endpoints

All API endpoints are centralized in `src/lib/api.ts` for easy maintenance.

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and verification
- [ ] Login/logout functionality
- [ ] Password reset flow
- [ ] Product browsing and filtering
- [ ] Add to cart / update quantities
- [ ] Checkout with address
- [ ] Order placement
- [ ] Profile updates
- [ ] Admin product management

## 🐛 Troubleshooting

### Common Issues

**Backend Connection Error**:
- Ensure FastAPI backend is running
- Check CORS configuration on backend
- Verify `VITE_API_BASE` in `.env`

**Authentication Issues**:
- Clear localStorage and cookies
- Check token expiration
- Verify backend authentication endpoints

**Cart Not Syncing**:
- Ensure user is logged in
- Check network tab for API errors
- Verify cart endpoints are accessible

See [INTEGRATION.md](./INTEGRATION.md) for detailed troubleshooting.

## 📦 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder will contain the production build.

### Environment Setup

1. Set `VITE_API_BASE` to your production backend URL
2. Ensure CORS is properly configured on backend
3. Deploy `dist` folder to your hosting service

### Recommended Hosting
- **Netlify** - Auto-deploy from Git with serverless functions
- **Vercel** - Zero-config deployments
- **AWS S3 + CloudFront** - Static hosting with CDN
- **DigitalOcean App Platform** - Full-stack hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for SP Aroma.

## 🙋‍♂️ Support

For issues or questions:
1. Check [INTEGRATION.md](./INTEGRATION.md) for detailed docs
2. Review the troubleshooting section
3. Contact the development team

---

**Built with ❤️ for SP Aroma - Where Tradition Meets Luxury**
