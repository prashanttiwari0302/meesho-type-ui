import React from 'react';
import { Product } from '../types';
import { Heart, Star, ShieldCheck, Truck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col relative"
    >
      {/* Product Image & Badges */}
      <div className="relative w-full pt-[105%] bg-gray-200 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-xs bg-white/90 hover:bg-white transition-all active:scale-90 ${
            isWishlisted
              ? 'text-[#f43397]'
              : 'text-gray-500 hover:text-[#f43397]'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-[#f43397] text-[#f43397]' : ''
            }`}
          />
        </button>

        {/* M-Trusted Tag */}
        {product.trusted && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-[#f43397] text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center shadow-xs">
              M-Trusted
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <p className="text-sm text-gray-500 truncate group-hover:text-[#f43397] transition-colors">
            {product.name}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline mt-1">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="ml-2 text-xs text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
            <span className="ml-2 text-xs font-bold text-[#038d63]">
              {product.discountPercentage}% off
            </span>
          </div>

          {/* Delivery Tag */}
          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
            {product.freeDelivery && (
              <span className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                Free Delivery
              </span>
            )}
          </div>
        </div>

        {/* Bottom Rating Row */}
        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <span className="bg-[#038d63] text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              {product.rating} ★
            </span>
            <span className="ml-1 text-[10px] text-gray-400 font-medium">
              {product.reviewCount.toLocaleString()} Reviews
            </span>
          </div>

          <span className="text-[10px] font-medium text-gray-400 group-hover:text-[#f43397] transition-colors">
            View &gt;
          </span>
        </div>
      </div>
    </div>
  );
};
