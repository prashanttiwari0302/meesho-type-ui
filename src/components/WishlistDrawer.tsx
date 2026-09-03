import React from 'react';
import { Product } from '../types';
import { X, Trash2, ShoppingBag, Heart, Star, Truck } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#f43397] fill-pink-100" />
            <h2 className="text-base font-bold text-gray-900">
              My Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-[#f43397]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Tap the heart icon on any product to save it for later.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-[#f43397] hover:bg-[#d82080] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 shadow-xs flex gap-3 hover:border-pink-200 transition-colors"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="w-20 h-24 object-cover rounded-md flex-shrink-0 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 
                        onClick={() => {
                          onSelectProduct(prod);
                          onClose();
                        }}
                        className="text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#f43397] cursor-pointer"
                      >
                        {prod.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-gray-900">₹{prod.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{prod.originalPrice}</span>
                        <span className="text-xs font-bold text-[#038d63]">{prod.discountPercentage}% off</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <button
                        onClick={() => onRemoveFromWishlist(prod.id)}
                        className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddToCart(prod);
                        }}
                        className="px-3 py-1.5 bg-[#fde9f2] hover:bg-[#f43397] text-[#f43397] hover:text-white border border-[#f43397] text-xs font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
