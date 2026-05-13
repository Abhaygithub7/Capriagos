import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import ProductGrid from './components/ProductGrid';
import StorySection from './components/StorySection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CustomCursor from './components/CustomCursor';
import RecentlyDroppedTicker from './components/RecentlyDroppedTicker';
import LookbookSection from './components/LookbookSection';
import NewsletterSection from './components/NewsletterSection';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import WomenPage from './pages/WomenPage';
import MenPage from './pages/MenPage';
import UnisexPage from './pages/UnisexPage';
import HomeDecorPage from './pages/HomeDecorPage';
import StoryPage from './pages/StoryPage';
import { useWishlist } from './hooks';

function HomePage({ onProductClick, isWishlisted, onToggleWishlist }) {
  return (
    <main>
      <Hero />
      <CategoryNav />
      <ProductGrid onProductClick={onProductClick} isWishlisted={isWishlisted} onToggleWishlist={onToggleWishlist} />
      <StorySection />
      <LookbookSection />
      <Testimonials />
      <NewsletterSection />
    </main>
  );
}

function App() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const {
    wishlist,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    addToWishlist,
  } = useWishlist();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCartFromModal = (product) => {
    console.log('Added to cart:', product);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="gradient-mesh" />
        <div className="noise-overlay" />

        <CustomCursor />
        <RecentlyDroppedTicker />
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onProductClick={handleProductClick}
                isWishlisted={isInWishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/women"
            element={
              <WomenPage
                onProductClick={handleProductClick}
                isWishlisted={isInWishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/men"
            element={
              <MenPage
                onProductClick={handleProductClick}
                isWishlisted={isInWishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/unisex"
            element={
              <UnisexPage
                onProductClick={handleProductClick}
                isWishlisted={isInWishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />
          <Route
            path="/home-decor"
            element={
              <HomeDecorPage
                onProductClick={handleProductClick}
                isWishlisted={isInWishlist}
                onToggleWishlist={toggleWishlist}
              />
            }
          />
          <Route path="/story" element={<StoryPage />} />
        </Routes>

        <Footer />
        <CartDrawer />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlist={wishlist}
          onRemove={removeFromWishlist}
          onMoveToCart={addToWishlist}
        />

        <ProductDetailModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCartFromModal}
        />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;