import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Smartphone, 
  User, 
  ShoppingCart, 
  Heart, 
  Package, 
  ChevronDown, 
  X, 
  HelpCircle, 
  Store,
  Sparkles
} from 'lucide-react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenSupplierModal: () => void;
  onOpenDownloadModal: () => void;
  onResetFilters: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenSupplierModal,
  onOpenDownloadModal,
  onResetFilters,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const popularSearches = [
    'Saree',
    'Kurti',
    'Cotton Bedsheet',
    'Men T-Shirt',
    'Kundan Jewellery',
    'Smartwatch',
    'Lipstick',
    'Mojari Juttis',
  ];

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* Top Banner Notice */}
      <div className="bg-[#f43397] text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        <span>Meesho Maha Dhamaka Sale • Free Delivery on All Orders • Extra 15% off on 1st Order</span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-8">
          
          {/* Logo & Search Block */}
          <div className="flex items-center gap-6 sm:gap-10 flex-1 min-w-0">
            {/* Logo */}
            <button 
              id="meesho-logo-btn"
              onClick={onResetFilters}
              className="flex items-center group text-left cursor-pointer transition-transform active:scale-95 flex-shrink-0"
            >
              <div className="text-3xl font-extrabold text-[#f43397] tracking-tight lowercase select-none">
                meesho
              </div>
            </button>

            {/* Search Bar */}
            <div ref={searchRef} className="relative flex-1 max-w-md sm:max-w-lg lg:max-w-xl">
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Search className="h-4.5 w-4.5" />
                </div>
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Try Saree, Kurti or Search by Product Code"
                  className="block w-full pl-10 pr-9 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#f43397] focus:border-[#f43397] text-sm text-gray-800 placeholder-gray-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Live Search Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in duration-150">
                  <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Popular Searches
                    </span>
                    <span className="text-xs text-[#f43397] font-medium">Trending on Meesho</span>
                  </div>
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          setIsSearchFocused(false);
                        }}
                        className="text-left px-3 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-[#f43397] rounded-md transition-colors flex items-center gap-1.5 font-medium"
                      >
                        <Search className="w-3 h-3 text-gray-400" />
                        <span className="truncate">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons & Navigation with Sleek Dividers */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-sm font-medium flex-shrink-0">
            
            {/* Download App Button */}
            <div 
              onClick={onOpenDownloadModal}
              className="hidden lg:flex flex-col items-center cursor-pointer group"
            >
              <span className="text-sm text-gray-600 group-hover:text-[#f43397] transition-colors">
                Download App
              </span>
            </div>

            <div className="hidden lg:block h-6 w-[1px] bg-gray-300"></div>

            {/* Become a Supplier */}
            <div 
              onClick={onOpenSupplierModal}
              className="hidden md:flex flex-col items-center cursor-pointer group"
            >
              <span className="text-sm text-gray-600 group-hover:text-[#f43397] transition-colors">
                Become a Supplier
              </span>
            </div>

            <div className="hidden md:block h-6 w-[1px] bg-gray-300"></div>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <div
                id="header-profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex flex-col items-center cursor-pointer group text-center"
              >
                <User className="h-5 w-5 text-gray-600 group-hover:text-[#f43397] transition-colors" />
                <span className="text-xs mt-0.5 text-gray-600 group-hover:text-[#f43397] transition-colors hidden sm:block">
                  Profile
                </span>
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-900">Hello, Shopper!</p>
                    <p className="text-[11px] text-gray-500">Welcome to Meesho</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenOrders();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-[#f43397] flex items-center gap-2.5"
                    >
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>My Orders</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenWishlist();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-[#f43397] flex items-center gap-2.5"
                    >
                      <Heart className="w-4 h-4 text-gray-500" />
                      <span>Wishlist ({wishlist.length})</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenSupplierModal();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-[#f43397] flex items-center gap-2.5"
                    >
                      <Store className="w-4 h-4 text-gray-500" />
                      <span>Sell on Meesho (0% Comm.)</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenDownloadModal();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-[#f43397] flex items-center gap-2.5"
                    >
                      <Smartphone className="w-4 h-4 text-gray-500" />
                      <span>Get Meesho App</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <div
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative flex flex-col items-center cursor-pointer group text-center"
            >
              <div className="relative">
                <Heart className="h-5 w-5 text-gray-600 group-hover:text-[#f43397] transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#f43397] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5 text-gray-600 group-hover:text-[#f43397] transition-colors hidden sm:block">
                Wishlist
              </span>
            </div>

            {/* Cart Button */}
            <div
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex flex-col items-center cursor-pointer group text-center"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-[#f43397] transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#f43397] text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center border-2 border-white">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5 text-gray-600 group-hover:text-[#f43397] transition-colors hidden sm:block">
                Cart
              </span>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
