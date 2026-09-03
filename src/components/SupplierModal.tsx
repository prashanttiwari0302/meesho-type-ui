import React, { useState } from 'react';
import { X, Store, CheckCircle, Smartphone, TrendingUp, DollarSign, Shield } from 'lucide-react';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupplierModal: React.FC<SupplierModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden my-auto p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-pink-100 text-[#f43397] flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Become a Supplier on Meesho</h2>
              <p className="text-xs text-gray-500">Sell to 14+ Crore customers across India</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#fde9f2]/50 rounded-lg border border-pink-100 space-y-1">
            <div className="flex items-center gap-1.5 text-[#f43397] font-bold">
              <DollarSign className="w-4 h-4" />
              <span>0% Commission Fee</span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Keep 100% of your product profit margin without deduction.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1">
            <div className="flex items-center gap-1.5 text-[#038d63] font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Pan-India Reach</span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Reach buyers in 28,000+ pincodes across Tier 1, 2, 3 cities.
            </p>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold">
              <Shield className="w-4 h-4" />
              <span>7-Day Payment Cycle</span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Direct bank transfer within 7 days of order dispatch.
            </p>
          </div>

          <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100 space-y-1">
            <div className="flex items-center gap-1.5 text-purple-700 font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Lowest Shipping Costs</span>
            </div>
            <p className="text-gray-600 text-[11px]">
              Access Meesho’s discounted national courier delivery network.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <span className="font-bold text-xs text-gray-900 block">
            Start Registration (GSTIN &amp; Bank Account Required)
          </span>
          {submitted ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-[#038d63] font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#038d63]" />
              <span>Thank you! Our seller onboarding team will contact you shortly.</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-xs focus:border-[#f43397] outline-none"
              />
              <button
                onClick={() => {
                  if (phone.length >= 10) setSubmitted(true);
                }}
                className="px-4 py-2 bg-[#f43397] text-white font-semibold text-xs rounded-md hover:bg-[#d82080] transition-colors cursor-pointer"
              >
                Send OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
