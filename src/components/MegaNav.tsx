import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface MegaNavProps {
  selectedCategory: string;
  selectedSubCategory: string;
  onSelectCategory: (categoryName: string, subCategoryName?: string) => void;
}

export const MegaNav: React.FC<MegaNavProps> = ({
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-gray-100 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center justify-start lg:justify-center space-x-6 sm:space-x-8 lg:space-x-10 overflow-x-auto whitespace-nowrap scrollbar-none py-2 text-sm font-normal text-gray-600"
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {CATEGORIES_DATA.map((category) => {
            const isActive = selectedCategory === category.name;
            const isHovered = hoveredCategory === category.id;

            return (
              <div
                key={category.id}
                className="relative flex-shrink-0"
                onMouseEnter={() => setHoveredCategory(category.id)}
              >
                <button
                  id={`nav-cat-${category.id}`}
                  onClick={() => onSelectCategory(category.name)}
                  className={`pb-1 text-sm font-normal transition-colors flex items-center gap-1 border-b-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#f43397] border-[#f43397] font-medium'
                      : isHovered
                      ? 'text-[#f43397] border-[#f43397]'
                      : 'text-gray-600 hover:text-[#f43397] hover:border-[#f43397] border-transparent'
                  }`}
                >
                  <span>{category.name}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isHovered ? 'rotate-180 text-[#f43397]' : 'text-gray-400'}`} />
                </button>

                {/* Dropdown Menu on hover */}
                {isHovered && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-b-lg shadow-xl border border-gray-200 p-3 z-50 animate-in fade-in duration-150">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                      {category.name} Categories
                    </div>
                    <div className="space-y-1">
                      {category.subcategories.map((sub) => {
                        const isSubActive = selectedSubCategory === sub.name;
                        return (
                          <button
                            key={sub.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCategory(category.name, sub.name.startsWith('All') ? '' : sub.name);
                              setHoveredCategory(null);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md flex items-center justify-between transition-colors ${
                              isSubActive
                                ? 'bg-pink-50 text-[#f43397] font-semibold'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-[#f43397]'
                            }`}
                          >
                            <span>{sub.name}</span>
                            <span className="text-[10px] text-gray-400">
                              {sub.count}+
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
