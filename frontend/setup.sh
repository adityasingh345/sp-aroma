#!/bin/bash

echo "🎨 SP Aroma Frontend Setup"
echo "=========================="
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "✅ .env file already exists"
else
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
# Backend API URL (optional)
# Leave empty to use relative paths (recommended for production)
# Set to your backend URL for development (e.g., http://localhost:8000)
VITE_API_BASE=

# Uncomment and set this for local development if backend runs on different port
# VITE_API_BASE=http://localhost:8000
EOF
    echo "✅ Created .env file"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Configure your backend API URL in .env if needed"
echo "   2. Start your FastAPI backend server"
echo "   3. Run 'npm run dev' to start the frontend"
echo ""
echo "📖 For more information, see INTEGRATION.md"
