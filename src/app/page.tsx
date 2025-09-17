'use client';

import { useState } from 'react';
import { groupBuys } from '@/lib/group-buy-data';
import CountdownTimer from '@/components/CountdownTimer';
import ProgressBar from '@/components/ProgressBar';
import ProductModal from '@/components/ProductModal';
import { ShoppingCart, Users, Clock, TrendingUp, Share2, Heart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeDeals = groupBuys.filter(gb => gb.status === 'active');
  const { addItem, getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  const categories = [
    { id: 'all', name: '전체' },
    { id: '건강식품', name: '건강식품' },
    { id: '뷰티', name: '뷰티' },
    { id: '가전', name: '가전제품' },
    { id: '패션', name: '패션' },
    { id: '식품', name: '식품' },
  ];

  const filteredDeals = selectedCategory === 'all'
    ? activeDeals
    : activeDeals.filter(deal => deal.category === selectedCategory);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOrder = (quantity: number) => {
    if (selectedProduct) {
      addItem(selectedProduct, quantity);
      toast.success(`제품이 장바구니에 담겼습니다!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">구픽 | 경록고 공동구매</h1>
              <span className="ml-3 text-sm bg-red-500 text-white px-2 py-1 rounded">
                흑삼 전문
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Heart className="h-6 w-6" />
              </button>
              <button
                onClick={() => router.push('/cart')}
                className="text-gray-600 hover:text-gray-900 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🔥 오늘의 HOT 공동구매
          </h2>
          <p className="text-lg opacity-90">
            최대 43% 할인! 쇼핑백과 택배비 모두 포함된 가격
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{activeDeals.length}</span>
              <span className="text-sm ml-2">진행중</span>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">3,847</span>
              <span className="text-sm ml-2">참여자</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map(deal => (
            <div key={deal.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={deal.images[0]}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                {deal.tags.includes('경록고') && (
                  <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                    경록고 정품
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {deal.discountRate}% OFF
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">{deal.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{deal.description}</p>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {deal.groupPrice.toLocaleString()}원
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {deal.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    ✓ 쇼핑백 포함 ✓ 택배비 포함
                  </p>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <ProgressBar
                    current={deal.currentParticipants}
                    min={deal.minParticipants}
                    max={deal.maxParticipants}
                    height="h-5"
                  />
                </div>

                {/* Timer */}
                <div className="mb-4">
                  <CountdownTimer endDate={new Date(deal.endDate)} />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{deal.currentParticipants}명 참여중</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-600 font-semibold">
                      {(deal.originalPrice - deal.groupPrice).toLocaleString()}원 절약
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/product/${deal.id}`)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    상세보기
                  </button>
                  <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Seller Info */}
                <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-gray-500">
                  <span>판매: {deal.seller.name}</span>
                  <span>⭐ {deal.seller.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">해당 카테고리에 진행중인 공동구매가 없습니다.</p>
          </div>
        )}
      </main>

      {/* Bottom Notice */}
      <div className="bg-yellow-50 border-t border-yellow-200 py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-yellow-800">
            💡 공동구매 달성 시에만 결제가 진행됩니다 |
            미달성 시 자동 취소 |
            100% 정품 보장
          </p>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOrder={handleOrder}
        />
      )}

      <Toaster position="bottom-center" />
    </div>
  );
}