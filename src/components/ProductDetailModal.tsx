import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Heart, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ShoppingBag, 
  Check, 
  MapPin, 
  Store,
  ChevronRight,
  Share2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onBuyNow: (product: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');
  const [pincode, setPincode] = useState('110001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-gray-500 truncate">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>{product.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-semibold truncate">{product.subCategory}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-[#f43397] hover:bg-pink-50 rounded-full transition-colors relative"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-gray-900 text-white py-0.5 px-2 rounded-md whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
            <button
              id="close-product-detail-modal"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left: Product Images & Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-4/5 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={() => onToggleWishlist(product)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-xs transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-[#f43397] text-[#f43397]' : 'text-gray-600'
                  }`}
                />
              </button>
              {product.trusted && (
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[#f43397] text-white text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center shadow-xs">
                    M-Trusted
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#f43397]'
                        : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Delivery Pincode Checker */}
            <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f43397]" />
                  Check Delivery Date & Pincode
                </span>
                {pincodeChecked && (
                  <span className="text-xs text-[#038d63] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Free Delivery
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode"
                  className="flex-1 bg-white border border-gray-300 px-3 py-1.5 rounded-md text-xs font-medium text-gray-800 focus:border-[#f43397] outline-none"
                />
                <button
                  onClick={() => setPincodeChecked(true)}
                  className="px-3 py-1.5 bg-[#f43397] hover:bg-[#d82080] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Check
                </button>
              </div>
              {pincodeChecked && (
                <p className="text-[11px] text-gray-600">
                  Estimated Delivery: <strong className="text-gray-900">Within 3 to 4 Days</strong> with Cash on Delivery option.
                </p>
              )}
            </div>
          </div>

          {/* Right: Product Meta & Purchase Options */}
          <div className="md:col-span-6 space-y-5">
            {/* Title & Ratings */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <span className="bg-[#038d63] text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-white text-white" />
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {product.reviewCount.toLocaleString()} Ratings &amp; 1,480+ Reviews
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-[#fde9f2] p-3 rounded-lg border border-pink-100 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-xs font-bold text-[#038d63] bg-white px-2 py-0.5 rounded-full shadow-xs">
                {product.discountPercentage}% OFF
              </span>
              <span className="text-xs text-[#f43397] font-semibold ml-auto">
                Special Offer Price
              </span>
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Select Size
                  </label>
                  <span className="text-[11px] text-[#f43397] font-medium cursor-pointer hover:underline">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-[#f43397] bg-pink-50 text-[#f43397]'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Color Variant: <span className="text-[#f43397] font-semibold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((clr) => (
                    <button
                      key={clr}
                      onClick={() => setSelectedColor(clr)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        selectedColor === clr
                          ? 'border-[#f43397] bg-[#f43397] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
              <span className="font-bold text-gray-900 block uppercase tracking-wider text-[11px]">
                Product Description
              </span>
              <p>{product.description}</p>
            </div>

            {/* Product Specifications Table */}
            <div className="space-y-2 border-t border-gray-100 pt-3">
              <span className="font-bold text-gray-900 block uppercase tracking-wider text-[11px]">
                Product Specifications
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-md border border-gray-200">
                {Object.entries(product.details).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-gray-400 block text-[10px]">{key}</span>
                    <span className="font-medium text-gray-800">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Information */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-[#f43397] flex items-center justify-center font-bold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{product.seller.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="bg-[#038d63] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      {product.seller.rating} <Star className="w-2.5 h-2.5 fill-white" />
                    </span>
                    <span className="text-[11px] text-gray-500">{product.seller.followers} Followers</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#f43397] border border-[#f43397] px-2.5 py-1 rounded-md hover:bg-pink-50 cursor-pointer">
                View Shop
              </span>
            </div>

            {/* Customer Reviews Snippet */}
            {product.reviews.length > 0 && (
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <span className="font-bold text-gray-900 block uppercase tracking-wider text-[11px]">
                  Customer Reviews
                </span>
                <div className="space-y-2">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-2.5 bg-gray-50 rounded-md text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{rev.user}</span>
                        <span className="text-[10px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="bg-[#038d63] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full flex items-center">
                          {rev.rating} ★
                        </div>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 font-medium">
                            • Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-xs italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-20 flex items-center justify-between gap-3 sm:gap-4">
          <div className="hidden sm:block">
            <span className="text-xs text-gray-500 block">Total Payable</span>
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="modal-add-to-cart-btn"
              onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              className="flex-1 sm:flex-initial px-6 py-2.5 border border-[#f43397] text-[#f43397] hover:bg-pink-50 font-semibold text-xs sm:text-sm rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              id="modal-buy-now-btn"
              onClick={() => onBuyNow(product, selectedSize, selectedColor)}
              className="flex-1 sm:flex-initial px-8 py-2.5 bg-[#f43397] hover:bg-[#d82080] text-white font-semibold text-xs sm:text-sm rounded-md shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
