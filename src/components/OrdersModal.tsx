import React from 'react';
import { Order } from '../types';
import { X, Package, CheckCircle2, Clock, Truck, ChevronRight } from 'lucide-react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#f43397]" />
            <h2 className="text-base font-bold text-gray-900">My Orders ({orders.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-[#f43397]">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-gray-900">No Orders Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Once you place an order, you can track delivery updates, invoices and returns here.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.orderId}
                className="border border-gray-200 rounded-lg p-4 space-y-3 bg-white hover:border-pink-200 transition-colors shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-xs text-gray-500">Order ID: </span>
                    <strong className="text-xs text-gray-900">{ord.orderId}</strong>
                    <span className="text-xs text-gray-400 ml-2">Placed on {ord.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#038d63] text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ord.status}</span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-14 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-800 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#f43397]" />
                    <span>Expected Delivery: <strong className="text-gray-900">{ord.estimatedDelivery}</strong></span>
                  </div>
                  <div>
                    <span>Total Paid: <strong className="text-[#f43397] font-bold text-sm">₹{ord.totalAmount}</strong></span>
                    <span className="text-[10px] text-gray-500 ml-1 uppercase">({ord.paymentMethod})</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
