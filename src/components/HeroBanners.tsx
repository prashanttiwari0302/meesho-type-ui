import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Banknote, 
  RotateCcw, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Percent, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TOP_BUBBLES } from '../data/products';

interface HeroBannersProps {
  onSelectCategory: (categoryName: string) => void;
  onOpenSupplierModal: () => void;
}

export const HeroBanners: React.FC<HeroBannersProps> = ({ 
  onSelectCategory,
  onOpenSupplierModal 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Lowest Prices Everyday',
      subtitle: 'Best Quality Products Direct from Manufacturers & Surat Mills',
      badge: 'MAHA SAVINGS FESTIVAL',
      highlight: 'Starting at just ₹99',
      cta: 'Explore Ethnic Wear',
      category: 'Women Ethnic',
      bgGradient: 'from-[#650e56] via-[#851670] to-[#b3279c]',
      bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
    },
    {
      title: 'Trendsetter Western Styles',
      subtitle: 'Dresses, Tops, Denim & Summer Loungewear at Factory Rates',
      badge: 'NEW TREND DROPS',
      highlight: 'Up to 75% Off',
      cta: 'Shop Western Wear',
      category: 'Women Western',
      bgGradient: 'from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]',
      bannerImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80',
    },
    {
      title: "Men's Smart Casuals & Daily Essentials",
      subtitle: 'Breathable Cotton Shirts, Solid Tees & Chinos',
      badge: 'POPULAR CHOICE',
      highlight: 'Combos from ₹299',
      cta: "Explore Men's Wear",
      category: 'Men',
      bgGradient: 'from-[#065f46] via-[#059669] to-[#10b981]',
      bannerImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80',
    },
  ];

  // Auto slide banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      {/* Interactive Hero Carousel */}
      <div className="relative rounded-lg overflow-hidden border border-pink-100 bg-[#fde9f2]">
        <div 
          className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center transition-all duration-700 bg-cover bg-right"
          style={{
            backgroundImage: `linear-gradient(to right, #fde9f2 0%, rgba(253, 233, 242, 0.95) 45%, rgba(253, 233, 242, 0.6) 70%, rgba(253, 233, 242, 0.2) 100%), url(${heroSlides[currentSlide].bannerImage})`
          }}
        >
          <div className="relative z-10 max-w-lg p-6 sm:p-8 space-y-2.5">
            <span className="bg-white text-[#f43397] text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider inline-block shadow-xs">
              {heroSlides[currentSlide].badge}
            </span>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 max-w-md">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                id={`hero-slide-cta-${currentSlide}`}
                onClick={() => onSelectCategory(heroSlides[currentSlide].category)}
                className="bg-[#f43397] hover:bg-[#d82080] text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>{heroSlides[currentSlide].cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-gray-900">
                {heroSlides[currentSlide].highlight}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            aria-label="Previous Slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-sm transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            aria-label="Next Slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-sm transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-5 bg-[#f43397]' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sleek Trust Pillars */}
      <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-gray-600 font-medium">
        <div className="flex items-center justify-center space-x-2">
          <Truck className="w-5 h-5 text-[#038d63]" />
          <span className="font-semibold text-gray-800">Free Delivery</span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Banknote className="w-5 h-5 text-[#038d63]" />
          <span className="font-semibold text-gray-800">Cash On Delivery</span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <RotateCcw className="w-5 h-5 text-[#038d63]" />
          <span className="font-semibold text-gray-800">Easy Returns</span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-[#038d63]" />
          <span className="font-semibold text-gray-800">Lowest Price Guarantee</span>
        </div>
      </div>

      {/* Top Categories Circular Quick Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Top Categories to choose from</span>
          </h2>
          <span className="text-xs text-[#f43397] font-semibold cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto pb-1">
          {TOP_BUBBLES.map((bubble) => {
            const categoryMatchName = 
              bubble.id === 'women-ethnic' ? 'Women Ethnic' :
              bubble.id === 'women-western' ? 'Women Western' :
              bubble.id === 'men' ? 'Men' :
              bubble.id === 'jewellery-accessories' ? 'Jewellery & Accessories' :
              bubble.id === 'home-kitchen' ? 'Home & Kitchen' :
              bubble.id === 'beauty-health' ? 'Beauty & Health' :
              bubble.id === 'bags-footwear' ? 'Bags & Footwear' : 'Electronics';

            return (
              <button
                key={bubble.id}
                id={`bubble-category-${bubble.id}`}
                onClick={() => onSelectCategory(categoryMatchName)}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 border-2 border-gray-200 group-hover:border-[#f43397] transition-all transform group-hover:scale-105 bg-white shadow-xs">
                  <img
                    src={bubble.image}
                    alt={bubble.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-800 mt-2 text-center group-hover:text-[#f43397] transition-colors leading-tight">
                  {bubble.name}
                </span>
                <span className="text-[10px] text-[#f43397] font-bold mt-0.5 bg-pink-50 px-1.5 py-0.5 rounded-full">
                  {bubble.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Supplier Banner Promo Strip */}
      <div className="bg-[#fde9f2] rounded-lg p-4 border border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#f43397] text-white flex items-center justify-center font-black text-xl shadow-xs">
            0%
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Register as a Meesho Supplier
            </h3>
            <p className="text-xs text-gray-600">
              Sell your products to 14+ Crore customers at <strong className="text-[#f43397]">0% Commission</strong>
            </p>
          </div>
        </div>
        <button
          id="hero-supplier-register-btn"
          onClick={onOpenSupplierModal}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#f43397] hover:bg-[#d82080] text-white text-xs sm:text-sm font-semibold rounded-md transition-all shadow-xs cursor-pointer whitespace-nowrap"
        >
          Start Selling Today
        </button>
      </div>
    </div>
  );
};
