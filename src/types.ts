export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  gender?: 'Women' | 'Men' | 'Kids' | 'Unisex';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  freeDelivery: boolean;
  trusted: boolean;
  fabric?: string;
  sizes: string[];
  colors: string[];
  description: string;
  seller: {
    name: string;
    rating: number;
    followers: string;
    productCount: number;
  };
  details: Record<string, string>;
  reviews: {
    id: string;
    user: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
  }[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface FilterState {
  category: string;
  subCategory: string;
  gender: string;
  priceRange: [number, number];
  minRating: number;
  freeDeliveryOnly: boolean;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'discount';
  searchQuery: string;
  fabric: string;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'cod' | 'upi' | 'card';
  status: 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
}
