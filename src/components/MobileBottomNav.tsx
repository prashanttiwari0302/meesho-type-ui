import React from 'react';
import { Home, Grid, Heart, Package, ShoppingCart } from 'lucide-react';
import { CartItem, Product } from '../types';

interface MobileBottomNavProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenCategories: () => void;
  onGoHome: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenCategories,
  onGoHome,
}) => {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40 md:hidden py-1.5 px-3 flex items-center justify-around shadow-lg">
      <button
        onClick={onGoHome}
        className="flex flex-col items-center justify-center p-1 text-[#f43397]"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-0.5">Home</span>
      </button>

      <button
        onClick={onOpenCategories}
        className="flex flex-col items-center justify-center p-1 text-gray-600 hover:text-[#f43397]"
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Categories</span>
      </button>

      <button
        onClick={onOpenWishlist}
        className="relative flex flex-col items-center justify-center p-1 text-gray-600 hover:text-[#f43397]"
      >
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-1 bg-[#f43397] text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
        <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
      </button>

      <button
        onClick={onOpenOrders}
        className="flex flex-col items-center justify-center p-1 text-gray-600 hover:text-[#f43397]"
      >
        <Package className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">My Orders</span>
      </button>

      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center p-1 text-gray-600 hover:text-[#f43397]"
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-1 bg-[#f43397] text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-medium mt-0.5">Cart</span>
      </button>
    </div>
  );
};
