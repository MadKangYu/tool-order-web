'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, User, MapPin, CreditCard, Heart, Settings, LogOut, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'address' | 'favorites'>('orders');

  // 임시 사용자 데이터
  const userInfo = {
    name: '홍길동',
    phone: '010-1234-5678',
    email: 'user@example.com',
    joinDate: '2024년 12월 가입',
    points: 5280,
    coupon: 3,
  };

  // 임시 주문 내역 데이터
  const orders = [
    {
      id: '2025011500123',
      date: '2025-01-15',
      items: [
        { name: '[경록고] 비경 흑삼농축액', price: 16900, quantity: 2, image: 'https://mirae-eni.co.kr/web/product/big/202306/36806560f5ecbebad2c788720e44d464.jpg' }
      ],
      total: 33800,
      status: 'processing',
      groupBuyStatus: 'active',
      participants: 127,
      minParticipants: 50,
    },
    {
      id: '2025011400089',
      date: '2025-01-14',
      items: [
        { name: '[경록고] 천녹향 녹용 흑삼', price: 39900, quantity: 1, image: 'https://mirae-eni.co.kr/web/product/big/202509/450f3e67c2b36ede48e3fb513d4b2c47.jpg' }
      ],
      total: 39900,
      status: 'completed',
      groupBuyStatus: 'success',
      participants: 52,
      minParticipants: 20,
    },
    {
      id: '2025011200045',
      date: '2025-01-12',
      items: [
        { name: '[경록고] 흑삼고 프리미엄', price: 19900, quantity: 1, image: 'https://mirae-eni.co.kr/web/product/big/202509/176010baed6818af5595756e17502e7d.jpg' }
      ],
      total: 19900,
      status: 'cancelled',
      groupBuyStatus: 'failed',
      participants: 15,
      minParticipants: 30,
      refundMessage: '공동구매 미달성으로 자동 취소되었습니다.',
    },
  ];

  const favorites = [
    {
      id: '1',
      name: '[경록고] 비경 흑삼농축액',
      price: 16900,
      originalPrice: 28000,
      image: 'https://mirae-eni.co.kr/web/product/big/202306/36806560f5ecbebad2c788720e44d464.jpg',
      discountRate: 40,
    },
    {
      id: '4',
      name: '[경록고] 흑삼천 파우치',
      price: 39900,
      originalPrice: 68000,
      image: 'https://mirae-eni.co.kr/web/product/big/202509/f383047694a54aa15c58923f5ee8bd45.jpg',
      discountRate: 41,
    },
  ];

  const addresses = [
    {
      id: '1',
      name: '집',
      recipient: '홍길동',
      phone: '010-1234-5678',
      address: '서울특별시 강남구 테헤란로 123',
      detailAddress: '삼성빌딩 5층',
      isDefault: true,
    },
    {
      id: '2',
      name: '회사',
      recipient: '홍길동',
      phone: '010-1234-5678',
      address: '서울특별시 중구 을지로 45',
      detailAddress: 'SK빌딩 10층',
      isDefault: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            진행중
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            완료
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            취소
          </span>
        );
      default:
        return null;
    }
  };

  const getGroupBuyBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">공구 진행중</span>;
      case 'success':
        return <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">공구 성공</span>;
      case 'failed':
        return <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">공구 실패</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>홈으로</span>
            </button>
            <h1 className="text-xl font-bold">마이페이지</h1>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="font-bold text-lg">{userInfo.name}</h2>
                <p className="text-sm text-gray-500">{userInfo.email}</p>
                <p className="text-xs text-gray-400 mt-1">{userInfo.joinDate}</p>
              </div>

              {/* Points & Coupons */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{userInfo.points.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">포인트</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{userInfo.coupon}</p>
                  <p className="text-xs text-gray-600">쿠폰</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    주문내역
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    회원정보
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTab('address')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    activeTab === 'address' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    배송지 관리
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                    activeTab === 'favorites' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    찜목록
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>

              <button
                onClick={() => {
                  toast.success('로그아웃 되었습니다');
                  router.push('/');
                }}
                className="w-full mt-6 flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">주문 내역</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm text-gray-500">주문번호: {order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getGroupBuyBadge(order.groupBuyStatus)}
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      {order.refundMessage && (
                        <div className="bg-red-50 text-red-700 text-sm p-3 rounded mb-3">
                          {order.refundMessage}
                        </div>
                      )}

                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-4 mb-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              {item.price.toLocaleString()}원 × {item.quantity}개
                            </p>
                          </div>
                        </div>
                      ))}

                      {order.groupBuyStatus === 'active' && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-blue-700">
                            공동구매 진행중: {order.participants}/{order.minParticipants}명 참여
                          </p>
                          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.min((order.participants / order.minParticipants) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-semibold">결제금액: {order.total.toLocaleString()}원</span>
                        <button
                          onClick={() => router.push(`/order/${order.id}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          주문 상세보기 →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">회원 정보</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                    <input
                      type="text"
                      value={userInfo.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <input
                      type="email"
                      value={userInfo.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  <button
                    onClick={() => toast.success('회원정보가 수정되었습니다')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                  >
                    정보 수정
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">배송지 관리</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    + 새 배송지 추가
                  </button>
                </div>
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <h3 className="font-medium">{addr.name}</h3>
                          {addr.isDefault && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">기본 배송지</span>
                          )}
                        </div>
                        <button className="text-sm text-gray-500 hover:text-gray-700">수정</button>
                      </div>
                      <p className="text-sm text-gray-600">{addr.recipient} | {addr.phone}</p>
                      <p className="text-sm text-gray-600">{addr.address}</p>
                      <p className="text-sm text-gray-600">{addr.detailAddress}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">찜 목록</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-bold text-blue-600">
                              {item.price.toLocaleString()}원
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                            <span className="text-xs text-red-500">
                              {item.discountRate}% OFF
                            </span>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => router.push(`/product/${item.id}`)}
                              className="flex-1 bg-blue-600 text-white py-1.5 rounded text-sm font-medium hover:bg-blue-700"
                            >
                              상세보기
                            </button>
                            <button
                              onClick={() => {
                                toast.success('찜 목록에서 삭제되었습니다');
                              }}
                              className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
                            >
                              <Heart className="h-4 w-4 text-red-500 fill-current" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}