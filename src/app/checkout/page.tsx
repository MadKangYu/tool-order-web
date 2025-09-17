'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'phone' | 'transfer'>('card');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: '',
    memo: '',
  });

  // 임시 장바구니 데이터 (실제로는 store에서 가져옴)
  const cartItems = [
    { id: '1', name: '[경록고] 비경 흑삼농축액', price: 16900, quantity: 2 },
    { id: '3', name: '[경록고] 천녹향 녹용 흑삼', price: 39900, quantity: 1 },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('필수 정보를 모두 입력해주세요');
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    toast.success('결제가 완료되었습니다!');
    setStep('complete');
  };

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h2>
          <p className="text-gray-600 mb-6">
            주문번호: #2025011500{Math.floor(Math.random() * 1000)}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">배송 정보</h3>
            <p className="text-sm text-gray-600">{formData.name}</p>
            <p className="text-sm text-gray-600">{formData.phone}</p>
            <p className="text-sm text-gray-600">{formData.address} {formData.detailAddress}</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              계속 쇼핑하기
            </button>
            <button
              onClick={() => router.push('/mypage')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              주문 내역 보기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>뒤로가기</span>
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step === 'info' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full border-2 ${step === 'info' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center font-semibold`}>
              1
            </div>
            <span className="ml-2 font-medium">주문정보</span>
          </div>
          <div className="w-24 h-0.5 bg-gray-300 mx-4"></div>
          <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full border-2 ${step === 'payment' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center font-semibold`}>
              2
            </div>
            <span className="ml-2 font-medium">결제</span>
          </div>
        </div>

        {step === 'info' ? (
          <>
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">주문 상품</h2>
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity}개</p>
                    </div>
                    <span className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">총 결제금액</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">배송 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="받으시는 분 성함"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    휴대폰 번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    placeholder="기본 주소"
                  />
                  <input
                    type="text"
                    name="detailAddress"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="상세 주소"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    배송 메모
                  </label>
                  <textarea
                    name="memo"
                    value={formData.memo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="배송 시 요청사항을 입력해주세요"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmitOrder}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                다음 단계
              </button>
            </div>
          </>
        ) : (
          /* Payment Step */
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">결제 수단 선택</h2>
            <div className="space-y-3 mb-6">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3"
                />
                <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                <span>신용/체크카드</span>
              </label>
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="phone"
                  checked={paymentMethod === 'phone'}
                  onChange={() => setPaymentMethod('phone')}
                  className="mr-3"
                />
                <Smartphone className="h-5 w-5 mr-2 text-gray-600" />
                <span>휴대폰 결제</span>
              </label>
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                  onChange={() => setPaymentMethod('transfer')}
                  className="mr-3"
                />
                <Building2 className="h-5 w-5 mr-2 text-gray-600" />
                <span>계좌이체</span>
              </label>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>상품 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>배송비</span>
                <span className="text-green-600">무료</span>
              </div>
              <div className="pt-2 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">최종 결제금액</span>
                  <span className="text-xl font-bold text-blue-600">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep('info')}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
              >
                이전 단계
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                결제하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}