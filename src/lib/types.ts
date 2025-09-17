export interface GroupBuy {
  id: string;
  title: string;
  description: string;
  images: string[];
  originalPrice: number;
  groupPrice: number;
  discountRate: number;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'success' | 'failed' | 'ended';
  category: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  options?: ProductOption[];
  shippingFee: number;
  freeShippingMin?: number;
  tags: string[];
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
  priceModifier?: number;
}

export interface Participant {
  id: string;
  userId: string;
  groupBuyId: string;
  quantity: number;
  selectedOptions?: Record<string, string>;
  joinedAt: Date;
  paymentStatus: 'pending' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'vip';
  joinedGroupBuys: number;
  successfulBuys: number;
}