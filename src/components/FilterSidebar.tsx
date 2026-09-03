import React from 'react';
import { FilterState } from '../types';
import { CATEGORIES_DATA } from '../data/products';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Star, 
  Check, 
  ChevronDown,
  X 
} from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalProducts: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  totalProducts,
  isOpenMobile,
  onCloseMobile,
}) => {
  const resetFilters = () => {
    setFilters({
      category: '',
      subCategory: '',
      gender: '',
      priceRange: [0, 2000],
      minRating: 0,
      freeDeliveryOnly: false,
      sortBy: 'relevance',
      searchQuery: '',
      fabric: '',
    });
    if (onCloseMobile) onCloseMobile();
  };

  const handlePriceSelect = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }));
  };

  const isPriceActive = (min: number, max: number) => {
    return filters.priceRange[0] === min && filters.priceRange[1] === max;
  };

  const fabricOptions = ['All', 'Cotton', 'Silk', 'Rayon', 'Microfiber'];

  const content = (
    <div className="space-y-5 text-sm text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#f43397]" />
          <span>Filters</span>
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-[#f43397] font-normal hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Sort By Option */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Sort By
        </p>
        <select
          id="sort-select"
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              sortBy: e.target.value as FilterState['sortBy'],
            }))
          }
          className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-xs text-gray-700 focus:outline-none focus:border-[#f43397] focus:ring-1 focus:ring-[#f43397] cursor-pointer"
        >
          <option value="relevance">Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Customer Rating</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      {/* Free Delivery Quick Filter */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Delivery
        </p>
        <label className="flex items-center text-sm cursor-pointer select-none">
          <input
            id="free-delivery-checkbox"
            type="checkbox"
            checked={filters.freeDeliveryOnly}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                freeDeliveryOnly: e.target.checked,
              }))
            }
            className="mr-2 w-4 h-4 accent-[#f43397] cursor-pointer"
          />
          <span className="text-sm text-gray-800">Free Delivery Only</span>
        </label>
      </div>

      {/* Category Selection */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Category
        </p>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                category: '',
                subCategory: '',
              }))
            }
            className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between ${
              filters.category === ''
                ? 'bg-[#f43397] text-white font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  category: cat.name,
                  subCategory: '',
                }))
              }
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between ${
                filters.category === cat.name
                  ? 'bg-pink-50 text-[#f43397] font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Price
        </p>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <button
            onClick={() => handlePriceSelect(0, 199)}
            className={`px-2 py-1.5 rounded-md border text-center font-medium transition-colors ${
              isPriceActive(0, 199)
                ? 'border-[#f43397] bg-pink-50 text-[#f43397] font-bold'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Under ₹199
          </button>
          <button
            onClick={() => handlePriceSelect(200, 399)}
            className={`px-2 py-1.5 rounded-md border text-center font-medium transition-colors ${
              isPriceActive(200, 399)
                ? 'border-[#f43397] bg-pink-50 text-[#f43397] font-bold'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            ₹200 - ₹399
          </button>
          <button
            onClick={() => handlePriceSelect(400, 699)}
            className={`px-2 py-1.5 rounded-md border text-center font-medium transition-colors ${
              isPriceActive(400, 699)
                ? 'border-[#f43397] bg-pink-50 text-[#f43397] font-bold'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            ₹400 - ₹699
          </button>
          <button
            onClick={() => handlePriceSelect(700, 3000)}
            className={`px-2 py-1.5 rounded-md border text-center font-medium transition-colors ${
              isPriceActive(700, 3000)
                ? 'border-[#f43397] bg-pink-50 text-[#f43397] font-bold'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            ₹700 & Above
          </button>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Rating
        </p>
        <div className="space-y-1.5">
          {[4.0, 3.5, 3.0].map((rate) => (
            <label
              key={rate}
              className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 hover:text-gray-900"
            >
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === rate}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    minRating: prev.minRating === rate ? 0 : rate,
                  }))
                }
                className="text-[#f43397] accent-[#f43397]"
              />
              <span className="flex items-center gap-1 font-medium">
                <span className="px-2 py-0.5 rounded-full bg-[#038d63] text-white font-bold text-[10px] flex items-center gap-0.5">
                  {rate} ★
                </span>
                <span>& Above</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fabric / Material Filter */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
          Fabric
        </p>
        <div className="space-y-1.5">
          {fabricOptions.map((fab) => {
            const isChecked = (fab === 'All' && !filters.fabric) || filters.fabric === fab;
            return (
              <label key={fab} className="flex items-center text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      fabric: fab === 'All' ? '' : (filters.fabric === fab ? '' : fab),
                    }))
                  }
                  className="mr-2 accent-[#f43397]"
                />
                <span className="text-sm text-gray-700">{fab}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white rounded-lg border border-gray-200 p-4 shrink-0 overflow-y-auto self-start sticky top-20">
        {content}
      </aside>

      {/* Mobile Filter Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-t-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="font-bold text-base text-gray-900">Filters</span>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {content}
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg text-sm"
              >
                Clear
              </button>
              <button
                onClick={onCloseMobile}
                className="flex-1 py-2.5 bg-[#f43397] hover:bg-[#e02885] text-white font-bold rounded-lg text-sm"
              >
                Apply Filters ({totalProducts})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
