import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReviewData } from '@/components/ReviewModal';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  unit: string;
  minOrder: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review extends ReviewData {
  id: string;
  userName: string;
  createdAt: Date;
  helpful: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity }],
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Review Store
interface ReviewStore {
  reviews: Review[];
  addReview: (review: ReviewData) => void;
  getProductReviews: (productId: string) => Review[];
  updateHelpful: (reviewId: string) => void;
  getAverageRating: (productId: string) => number;
  getTotalReviews: (productId: string) => number;
}

export const useReviewStore = create(
  persist<ReviewStore>(
    (set, get) => ({
      reviews: [],

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: Date.now().toString(),
          userName: '구매자' + Math.floor(Math.random() * 1000),
          createdAt: new Date(),
          helpful: 0,
        };

        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },

      getProductReviews: (productId) => {
        return get().reviews.filter(review => review.productId === productId);
      },

      updateHelpful: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId
              ? { ...review, helpful: review.helpful + 1 }
              : review
          ),
        }));
      },

      getAverageRating: (productId) => {
        const productReviews = get().getProductReviews(productId);
        if (productReviews.length === 0) return 0;

        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / productReviews.length;
      },

      getTotalReviews: (productId) => {
        return get().getProductReviews(productId).length;
      },
    }),
    {
      name: 'review-storage',
    }
  )
);