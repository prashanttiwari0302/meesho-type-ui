/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, FilterState, Order } from './types';
import { PRODUCTS, CATEGORIES_DATA } from './data/products';
import { Header } from './components/Header';
import { MegaNav } from './components/MegaNav';
import { HeroBanners } from './components/HeroBanners';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrdersModal } from './components/OrdersModal';
import { SupplierModal } from './components/SupplierModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { 
  SlidersHorizontal, 
  Sparkles, 
  RotateCcw, 
  PackageSearch,
  Check
} from 'lucide-react';

export default function App() {
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    subCategory: '',
    gender: '',
    priceRange: [0, 3000],
    minRating: 0,
    freeDeliveryOnly: false,
    sortBy: 'relevance',
    searchQuery: '',
    fabric: '',
  });

  // Local Storage initialized states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('meesho_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('meesho_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('meesho_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('meesho_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('meesho_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('meesho_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Handlers for Wishlist
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('Added to Wishlist ❤️');
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    showToast('Removed from Wishlist');
  };

  // Handlers for Cart
  const handleAddToCart = (
    product: Product,
    selectedSize: string = product.sizes[0] || 'Free Size',
    selectedColor: string = product.colors[0] || 'Default'
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize,
            selectedColor,
            quantity: 1,
          },
        ];
      }
    });

    showToast('Item added to Cart 🛍️');
  };

  const handleBuyNow = (product: Product, selectedSize: string, selectedColor: string) => {
    handleAddToCart(product, selectedSize, selectedColor);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return;
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart');
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  // Navigation handlers
  const handleSelectCategory = (categoryName: string, subCategoryName?: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryName,
      subCategory: subCategoryName || '',
    }));
    // Smooth scroll down to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: '',
      subCategory: '',
      gender: '',
      priceRange: [0, 3000],
      minRating: 0,
      freeDeliveryOnly: false,
      sortBy: 'relevance',
      searchQuery: '',
      fabric: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesSub = item.subCategory.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesFabric = item.fabric?.toLowerCase().includes(q) || false;
        if (!matchesName && !matchesCat && !matchesSub && !matchesDesc && !matchesFabric) {
          return false;
        }
      }

      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subCategory && item.subCategory !== filters.subCategory) {
        return false;
      }

      // Price range
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }

      // Min rating
      if (filters.minRating > 0 && item.rating < filters.minRating) {
        return false;
      }

      // Free delivery only
      if (filters.freeDeliveryOnly && !item.freeDelivery) {
        return false;
      }

      // Fabric filter
      if (filters.fabric && item.fabric && !item.fabric.toLowerCase().includes(filters.fabric.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0; // relevance / default
    });
  }, [PRODUCTS, searchQuery, filters]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-gray-900 pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-150">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenSupplierModal={() => setIsSupplierModalOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onResetFilters={handleResetFilters}
      />

      {/* Category Mega-Navigation Bar */}
      <MegaNav
        selectedCategory={filters.category}
        selectedSubCategory={filters.subCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Hero Banners & Trust Highlights (Only when no search active) */}
      {!searchQuery && !filters.category && (
        <HeroBanners
          onSelectCategory={handleSelectCategory}
          onOpenSupplierModal={() => setIsSupplierModalOpen(true)}
        />
      )}

      {/* Main Content Feed Area */}
      <main id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Section Header & Active Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">
                {searchQuery
                  ? `Showing results for "${searchQuery}"`
                  : filters.category
                  ? `${filters.category} ${filters.subCategory ? `• ${filters.subCategory}` : ''}`
                  : 'Products For You'}
              </h2>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {filteredProducts.length} Items
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Direct from verified suppliers with Free Delivery and Cash on Delivery
            </p>
          </div>

          {/* Controls: Mobile Filter Button & Quick Sort */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden px-3.5 py-2 bg-white border border-gray-300 rounded-md text-xs font-semibold text-gray-700 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#f43397]" />
              <span>Filters</span>
            </button>

            {(filters.category || filters.subCategory || searchQuery || filters.freeDeliveryOnly || filters.minRating > 0 || filters.fabric) && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 bg-[#fde9f2] hover:bg-pink-100 text-[#f43397] text-xs font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Grid with Sidebar */}
        <div className="flex items-start gap-6">
          
          {/* Left: Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            totalProducts={filteredProducts.length}
            isOpenMobile={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />

          {/* Right: Product Cards Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-[#f43397]">
                  <PackageSearch className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">No matching products found</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                    Try adjusting your filters, clearing your search query, or checking another category.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 bg-[#f43397] text-white text-xs font-semibold rounded-md hover:bg-[#d82080] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.some((p) => p.id === product.id);
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={isWishlisted}
                      onToggleWishlist={handleToggleWishlist}
                      onSelectProduct={(p) => setSelectedProduct(p)}
                    />
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenSupplierModal={() => setIsSupplierModalOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenCategories={() => setIsMobileFiltersOpen(true)}
        onGoHome={handleResetFilters}
      />

      {/* Modals and Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOrderPlaced={handleOrderPlaced}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(prod) => {
          handleAddToCart(prod);
          handleRemoveFromWishlist(prod.id);
        }}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      <SupplierModal
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
      />

      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

    </div>
  );
}
