'use client';

import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Users, Clock, Check } from 'lucide-react';
import { GroupBuy } from '@/lib/types';
import CountdownTimer from './CountdownTimer';
import ProgressBar from './ProgressBar';
import toast from 'react-hot-toast';

interface ProductModalProps {
  product: GroupBuy;
  isOpen: boolean;
  onClose: () => void;
  onOrder: (quantity: number) => void;
}

export default function ProductModal({ product, isOpen, onClose, onOrder }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'detail' | 'info' | 'review'>('detail');

  if (!isOpen) return null;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = product.groupPrice * quantity;
  const totalSavings = (product.originalPrice - product.groupPrice) * quantity;

  const handleOrder = () => {
    onOrder(quantity);
    toast.success(`${product.title} ${quantity}개가 장바구니에 담겼습니다!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Left: Image */}
            <div className="relative h-96 md:h-full bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 space-y-2">
                <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discountRate}% 할인
                </span>
                {product.tags.includes('경록고') && (
                  <span className="block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    경록고 정품
                  </span>
                )}
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-6 overflow-y-auto max-h-[600px]">
              {/* Title */}
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Price */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {product.groupPrice.toLocaleString()}원
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  ✓ 쇼핑백 포함 ✓ 택배비 포함 ✓ {totalSavings.toLocaleString()}원 절약
                </p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">공동구매 진행 현황</h3>
                <ProgressBar
                  current={product.currentParticipants}
                  min={product.minParticipants}
                  max={product.maxParticipants}
                  height="h-8"
                />
              </div>

              {/* Timer */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">남은 시간</h3>
                <CountdownTimer endDate={new Date(product.endDate)} />
              </div>

              {/* Tabs */}
              <div className="border-b mb-4">
                <div className="flex space-x-6">
                  {(['detail', 'info', 'review'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`pb-2 font-medium text-sm ${
                        selectedTab === tab
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab === 'detail' && '상품상세'}
                      {tab === 'info' && '구매정보'}
                      {tab === 'review' && '후기(127)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="mb-6 text-sm text-gray-700">
                {selectedTab === 'detail' && (
                  <div>
                    <h4 className="font-semibold mb-2">제품 특징</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>6년근 흑삼 농축액 100%</li>
                      <li>면역력 강화 및 피로회복</li>
                      <li>휴대 간편한 스틱 포장</li>
                      <li>GMP 인증 시설 제조</li>
                    </ul>
                  </div>
                )}
                {selectedTab === 'info' && (
                  <div>
                    <h4 className="font-semibold mb-2">구매 안내</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>공동구매 목표 달성 시 결제 진행</li>
                      <li>미달성 시 자동 취소 (수수료 없음)</li>
                      <li>배송: 결제 후 2-3일 이내</li>
                      <li>교환/반품: 수령 후 7일 이내</li>
                    </ul>
                  </div>
                )}
                {selectedTab === 'review' && (
                  <div>
                    <div className="space-y-3">
                      <div className="border-b pb-2">
                        <div className="flex items-center mb-1">
                          <span className="text-yellow-400">★★★★★</span>
                          <span className="ml-2 font-semibold">김**님</span>
                        </div>
                        <p className="text-gray-600">부모님 선물로 구매했는데 너무 좋아하세요!</p>
                      </div>
                      <div className="border-b pb-2">
                        <div className="flex items-center mb-1">
                          <span className="text-yellow-400">★★★★☆</span>
                          <span className="ml-2 font-semibold">이**님</span>
                        </div>
                        <p className="text-gray-600">포장도 고급스럽고 맛도 좋아요</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold">구매수량</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">총 주문금액</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleOrder}
                  className="bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  장바구니
                </button>
                <button
                  onClick={() => {
                    handleOrder();
                    setTimeout(() => {
                      window.location.href = '/checkout';
                    }, 1000);
                  }}
                  className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  바로 구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}