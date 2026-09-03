import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  ArrowLeft,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onOrderPlaced: (order: Order) => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOrderPlaced,
  onContinueShopping,
}) => {
  const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'success'>('cart');
  
  // Address State
  const [fullName, setFullName] = useState('Pooja Verma');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('Flat 402, Lotus Apartments, Sector 62');
  const [city, setCity] = useState('Noida');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('201301');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Calculation
  const originalTotalPrice = cart.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );
  const itemsTotalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalSavings = originalTotalPrice - itemsTotalPrice;
  const firstOrderDiscount = itemsTotalPrice > 0 ? 50 : 0;
  const finalPayable = Math.max(0, itemsTotalPrice - firstOrderDiscount);

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      orderId: 'MEE-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cart],
      totalAmount: finalPayable,
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      },
      paymentMethod,
      status: 'Confirmed',
      estimatedDelivery: '3 to 4 Days (By Friday)',
    };

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setPlacedOrder(newOrder);
    onOrderPlaced(newOrder);
    setStep('success');
  };

  const handleCloseAndReset = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {step !== 'cart' && step !== 'success' && (
              <button
                onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
                className="p-1 -ml-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-base font-bold text-gray-900">
              {step === 'cart' && `Shopping Cart (${cart.length} items)`}
              {step === 'address' && 'Delivery Address'}
              {step === 'payment' && 'Select Payment Method'}
              {step === 'success' && 'Order Confirmed!'}
            </h2>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker Bar */}
        {step !== 'success' && (
          <div className="bg-gray-50 px-6 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs">
            <span className={`font-semibold ${step === 'cart' ? 'text-[#f43397]' : 'text-emerald-600'}`}>
              1. Cart
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className={`font-semibold ${step === 'address' ? 'text-[#f43397]' : step === 'payment' ? 'text-emerald-600' : 'text-gray-400'}`}>
              2. Address
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className={`font-semibold ${step === 'payment' ? 'text-[#f43397]' : 'text-gray-400'}`}>
              3. Payment
            </span>
          </div>
        )}

        {/* Body Content by Step */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-[#f43397]">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Your Cart is Empty</h3>
                    <p className="text-xs text-gray-500 mt-1">Add items that you like to your cart.</p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onContinueShopping();
                    }}
                    className="px-6 py-2.5 bg-[#f43397] hover:bg-[#d82080] text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <>
                  {/* Free Delivery Banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 flex items-center gap-2.5 text-xs text-emerald-800">
                    <Truck className="w-4 h-4 text-[#038d63] flex-shrink-0" />
                    <span className="font-semibold">
                      Yay! Free Delivery applies on this order.
                    </span>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${idx}`}
                        className="bg-white border border-gray-200 rounded-lg p-3 shadow-xs space-y-3"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-18 h-22 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">
                                {item.product.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-medium">
                                  Size: {item.selectedSize}
                                </span>
                                <span>•</span>
                                <span>{item.selectedColor}</span>
                              </div>
                            </div>

                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-bold text-gray-900">
                                ₹{item.product.price * item.quantity}
                              </span>
                              <span className="text-xs text-gray-400 line-through">
                                ₹{item.product.originalPrice * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-gray-400 hover:text-red-600 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>

                          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1.5 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-3 h-3 text-gray-700" />
                            </button>
                            <span className="px-3 font-bold text-gray-900 text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-200 cursor-pointer"
                            >
                              <Plus className="w-3 h-3 text-gray-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Details Card */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2.5 text-xs text-gray-700">
                    <span className="font-bold text-gray-900 block uppercase tracking-wider text-[11px]">
                      Price Details ({cart.length} items)
                    </span>
                    <div className="flex justify-between">
                      <span>Total Product Price</span>
                      <span className="font-medium">₹{itemsTotalPrice}</span>
                    </div>
                    <div className="flex justify-between text-[#038d63]">
                      <span>Total Product Discount</span>
                      <span className="font-medium">-₹{totalSavings}</span>
                    </div>
                    <div className="flex justify-between text-[#038d63]">
                      <span>First Order Extra Discount</span>
                      <span className="font-medium">-₹{firstOrderDiscount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className="text-[#038d63] font-bold">FREE</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-gray-900">
                      <span>Order Total</span>
                      <span className="text-base text-[#f43397]">₹{finalPayable}</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* STEP 2: DELIVERY ADDRESS */}
          {step === 'address' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#fde9f2] border border-pink-100 rounded-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#f43397]" />
                <span className="font-semibold text-gray-800">
                  Deliver to this address
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:border-[#f43397] focus:ring-1 focus:ring-[#f43397] outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Phone Number (For Delivery Updates)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:border-[#f43397] focus:ring-1 focus:ring-[#f43397] outline-none"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">House No. / Building Name / Street</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:border-[#f43397] focus:ring-1 focus:ring-[#f43397] outline-none"
                    placeholder="e.g. House No 42, 3rd Cross"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:border-[#f43397] focus:ring-1 focus:ring-[#f43397] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:border-[#f43397] focus:ring-1 focus:ring-[#f43397] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs focus:border-[#f43397] focus:ring-1 focus:ring-[#f43397] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#fde9f2] border border-pink-100 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900 block">Total Amount to Pay</span>
                  <span className="text-[11px] text-gray-500">Including all discounts &amp; free delivery</span>
                </div>
                <span className="text-xl font-bold text-[#f43397]">₹{finalPayable}</span>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-gray-900 block uppercase tracking-wider text-[11px]">
                  Payment Options
                </span>

                {/* COD Option */}
                <label className={`block p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-[#f43397] bg-pink-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-[#f43397] accent-[#f43397]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm">Cash on Delivery (COD)</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          POPULAR
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Pay cash when your delivery package arrives at your door.
                      </p>
                    </div>
                  </div>
                </label>

                {/* UPI Option */}
                <label className={`block p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-[#f43397] bg-pink-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-0.5 text-[#f43397] accent-[#f43397]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm">UPI (GPay / PhonePe / Paytm)</span>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                          FASTEST
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Instant zero-charge UPI payment verification.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Card Option */}
                <label className={`block p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#f43397] bg-pink-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-0.5 text-[#f43397] accent-[#f43397]"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 text-sm block">Credit / Debit Card</span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Visa, MasterCard, Rupay accepted with 128-bit encryption.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Delivery Address Review */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Delivery Address
                </span>
                <p className="font-semibold text-gray-900">{fullName} ({phone})</p>
                <p className="text-gray-600">{address}, {city}, {state} - {pincode}</p>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED SUCCESS */}
          {step === 'success' && placedOrder && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-gray-900">Order Placed Successfully!</h3>
                <p className="text-xs text-gray-500">
                  Thank you for shopping on Meesho. We have sent SMS confirmation.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-bold text-gray-900">{placedOrder.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span className="font-bold text-[#038d63]">{placedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Payment:</span>
                  <span className="font-bold uppercase text-gray-900">{placedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span>Amount:</span>
                  <span className="text-[#f43397]">₹{placedOrder.totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-[#f43397] hover:bg-[#d82080] text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        {step !== 'success' && cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 block">Total Payable</span>
              <span className="text-lg font-bold text-[#f43397]">₹{finalPayable}</span>
            </div>

            {step === 'cart' && (
              <button
                id="cart-continue-btn"
                onClick={() => setStep('address')}
                className="px-6 py-2.5 bg-[#f43397] hover:bg-[#d82080] text-white font-semibold text-xs rounded-md transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Select Address</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 'address' && (
              <button
                id="address-continue-btn"
                onClick={() => setStep('payment')}
                className="px-6 py-2.5 bg-[#f43397] hover:bg-[#d82080] text-white font-semibold text-xs rounded-md transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 'payment' && (
              <button
                id="place-order-btn"
                onClick={handlePlaceOrder}
                className="px-8 py-2.5 bg-[#f43397] hover:bg-[#d82080] text-white font-semibold text-xs rounded-md transition-colors shadow-xs hover:shadow-sm cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Place Order (₹{finalPayable})</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
