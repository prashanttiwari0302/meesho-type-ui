import React from 'react';
import { Smartphone, Store, ShieldCheck, HelpCircle } from 'lucide-react';

interface FooterProps {
  onOpenSupplierModal: () => void;
  onOpenDownloadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSupplierModal,
  onOpenDownloadModal,
}) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 pb-16 md:pb-6 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand pitch */}
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-[#f43397] lowercase tracking-tight">meesho</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#f43397] -mt-1"></span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              India's favorite one-stop online shopping destination for fashion, home, beauty, and electronics at lowest wholesale prices.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={onOpenDownloadModal}
                className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Get App</span>
              </button>
              <button
                onClick={onOpenSupplierModal}
                className="px-3 py-1.5 border border-[#f43397] text-[#f43397] hover:bg-pink-50 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Supplier</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Careers &amp; Company
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li><a href="#careers" className="hover:text-[#f43397]">Careers at Meesho</a></li>
              <li><a href="#supplier" onClick={(e) => { e.preventDefault(); onOpenSupplierModal(); }} className="hover:text-[#f43397]">Become a Supplier (0% Comm.)</a></li>
              <li><a href="#hall-of-fame" className="hover:text-[#f43397]">Hall of Fame</a></li>
              <li><a href="#newsroom" className="hover:text-[#f43397]">Meesho Newsroom</a></li>
              <li><a href="#tech-blog" className="hover:text-[#f43397]">Meesho Tech Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Policies */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Customer Policies
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li><a href="#returns" className="hover:text-[#f43397]">7-Day Return Policy</a></li>
              <li><a href="#terms" className="hover:text-[#f43397]">Terms &amp; Conditions</a></li>
              <li><a href="#privacy" className="hover:text-[#f43397]">Security &amp; Privacy</a></li>
              <li><a href="#shipping" className="hover:text-[#f43397]">Free Delivery Terms</a></li>
              <li><a href="#safety" className="hover:text-[#f43397]">M-Trusted Supplier Rules</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Contact &amp; Support
            </h4>
            <p className="text-xs text-gray-600">
              Fashnear Technologies Private Limited,<br />
              Outer Ring Road, Bellandur,<br />
              Bengaluru, Karnataka - 560103, India
            </p>
            <p className="text-xs text-gray-600">
              Customer Support: <strong className="text-gray-900">query@meesho.com</strong>
            </p>
          </div>
        </div>

        {/* Popular Searches SEO Strip */}
        <div className="border-t border-gray-200 pt-6 pb-4 space-y-2">
          <h5 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Popular Searches on Meesho
          </h5>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Sarees • Silk Sarees • Cotton Kurtis • Party Wear Kurtis • Anarkali Suits • Designer Blouses • Lehengas • Men T-Shirts • Casual Cotton Shirts • Formal Trousers • Denim Jeans • Double Bedsheets • Cushion Covers • Stainless Steel Cookware • Kitchen Storage • Kundan Jewellery Sets • Gold Plated Jhumkas • Liquid Matte Lipsticks • Vitamin C Serums • Wireless Earbuds • Smartwatches • Flats and Juttis • Running Shoes • Kids Dungaree Sets
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Meesho Interface Clone. All rights reserved.</span>
          <span className="text-[11px] text-gray-500">
            Crafted with lowest prices and free delivery for Indian shoppers.
          </span>
        </div>

      </div>
    </footer>
  );
};
