import React from 'react';
import { X, Smartphone, QrCode, Star, Download } from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden my-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto rounded-lg bg-[#f43397] text-white flex items-center justify-center shadow-md">
            <span className="text-3xl font-black lowercase">m</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Download Meesho App
          </h2>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Enjoy exclusive app-only deals, early sale access, and order tracking on the go!
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 inline-block mx-auto shadow-xs">
          <div className="w-36 h-36 bg-white border border-gray-300 rounded-md p-2 flex flex-col items-center justify-center relative mx-auto">
            {/* Realistic stylized QR representation */}
            <div className="grid grid-cols-4 gap-1 w-full h-full p-1 opacity-80">
              <div className="bg-black rounded-xs"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-white"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-white"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-white"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-white"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-black rounded-xs"></div>
              <div className="bg-white"></div>
              <div className="bg-black rounded-xs"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-7 h-7 bg-[#f43397] rounded-sm text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                m
              </div>
            </div>
          </div>
          <span className="text-[11px] text-gray-600 font-semibold block mt-2">
            Scan to Download
          </span>
        </div>

        {/* Ratings & Downloads */}
        <div className="flex items-center justify-center gap-6 text-xs text-gray-600 border-y border-gray-100 py-3">
          <div>
            <div className="flex items-center justify-center gap-1 font-bold text-gray-900">
              <span>4.4</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[10px] text-gray-500">4.5M+ Reviews</span>
          </div>
          <div className="h-6 w-px bg-gray-200"></div>
          <div>
            <div className="font-bold text-gray-900">500M+</div>
            <span className="text-[10px] text-gray-500">Downloads</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-gray-900 hover:bg-black text-white rounded-md flex items-center justify-center gap-2 font-semibold transition-colors"
          >
            <span>Google Play</span>
          </a>
          <a
            href="https://apple.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-gray-900 hover:bg-black text-white rounded-md flex items-center justify-center gap-2 font-semibold transition-colors"
          >
            <span>App Store</span>
          </a>
        </div>
      </div>
    </div>
  );
};
