'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Users, Package, TrendingUp, DollarSign,
  ShoppingCart, Calendar, Bell, Settings, BarChart3,
  Plus, Edit, Trash2, Eye
} from 'lucide-react';
import { groupBuys } from '@/lib/group-buy-data';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard');

  // 통계 데이터
  const stats = {
    totalSales: 15234000,
    todaySales: 892000,
    totalOrders: 342,
    todayOrders: 28,
    totalUsers: 1247,
    newUsers: 15,
    activeDeals: groupBuys.filter(gb => gb.status === 'active').length,
  };

  // 임시 주문 데이터
  const recentOrders = [
    {
      id: '2025011600001',
      customer: '김철수',
      product: '[경록고] 비경 흑삼농축액',
      amount: 33800,
      status: 'processing',
      date: '2025-01-16 14:23',
    },
    {
      id: '2025011600002',
      customer: '이영희',
      product: '[DHTX] 멍케 두피 강화 샴푸 500ml',
      amount: 14700,
      status: 'preparing',
      date: '2025-01-16 13:45',
    },
    {
      id: '2025011600003',
      customer: '박민수',
      product: '[경록고] 천녹향 녹용 흑삼',
      amount: 39900,
      status: 'shipped',
      date: '2025-01-16 11:20',
    },
  ];

  // 임시 사용자 데이터
  const users = [
    { id: '1', name: '김철수', email: 'kim@example.com', joinDate: '2024-12-15', orders: 5, totalSpent: 234000 },
    { id: '2', name: '이영희', email: 'lee@example.com', joinDate: '2025-01-02', orders: 3, totalSpent: 127000 },
    { id: '3', name: '박민수', email: 'park@example.com', joinDate: '2025-01-10', orders: 2, totalSpent: 89000 },
  ];

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: string } = {
      active: 'bg-green-100 text-green-800',
      upcoming: 'bg-yellow-100 text-yellow-800',
      success: 'bg-blue-100 text-blue-800',
      failed: 'bg-red-100 text-red-800',
      processing: 'bg-blue-100 text-blue-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-green-100 text-green-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>홈으로</span>
              </button>
              <h1 className="text-xl font-bold">관리자 대시보드</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              대시보드
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              상품 관리
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              주문 관리
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-3 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              회원 관리
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalSales.toLocaleString()}원</h3>
                <p className="text-sm text-gray-500 mt-1">총 매출</p>
                <p className="text-xs text-gray-400 mt-2">오늘: {stats.todaySales.toLocaleString()}원</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+8.2%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
                <p className="text-sm text-gray-500 mt-1">총 주문</p>
                <p className="text-xs text-gray-400 mt-2">오늘: {stats.todayOrders}건</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+5.3%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
                <p className="text-sm text-gray-500 mt-1">총 회원</p>
                <p className="text-xs text-gray-400 mt-2">신규: {stats.newUsers}명</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Package className="h-6 w-6 text-orange-600" />
                  </div>
                  <span className="text-sm text-blue-600 font-medium">{stats.activeDeals}건</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{groupBuys.length}</h3>
                <p className="text-sm text-gray-500 mt-1">총 공구 상품</p>
                <p className="text-xs text-gray-400 mt-2">진행중: {stats.activeDeals}건</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">최근 주문</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  전체보기 →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-xs text-gray-500 uppercase border-b">
                    <tr>
                      <th className="text-left py-3">주문번호</th>
                      <th className="text-left py-3">고객명</th>
                      <th className="text-left py-3">상품</th>
                      <th className="text-left py-3">금액</th>
                      <th className="text-left py-3">상태</th>
                      <th className="text-left py-3">일시</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium">{order.id}</td>
                        <td className="py-3 text-sm">{order.customer}</td>
                        <td className="py-3 text-sm">{order.product}</td>
                        <td className="py-3 text-sm font-medium">{order.amount.toLocaleString()}원</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(order.status)}`}>
                            {order.status === 'processing' ? '처리중' : order.status === 'preparing' ? '준비중' : '배송완료'}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">매출 추이</h2>
                <select className="text-sm border rounded px-3 py-1">
                  <option>최근 7일</option>
                  <option>최근 30일</option>
                  <option>최근 3개월</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">매출 차트 영역</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">상품 목록</h2>
              <button
                onClick={() => toast.success('상품 추가 기능 준비중')}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                새 상품 추가
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs text-gray-500 uppercase border-b">
                  <tr>
                    <th className="text-left py-3">상품명</th>
                    <th className="text-left py-3">카테고리</th>
                    <th className="text-left py-3">가격</th>
                    <th className="text-left py-3">참여자</th>
                    <th className="text-left py-3">상태</th>
                    <th className="text-left py-3">종료일</th>
                    <th className="text-left py-3">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {groupBuys.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium">{product.title}</td>
                      <td className="py-3 text-sm">{product.category}</td>
                      <td className="py-3 text-sm">
                        <span className="font-medium">{product.groupPrice.toLocaleString()}원</span>
                        <span className="text-gray-400 line-through text-xs ml-1">
                          {product.originalPrice.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 text-sm">
                        {product.currentParticipants}/{product.minParticipants}
                      </td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(product.status)}`}>
                          {product.status === 'active' ? '진행중' :
                           product.status === 'upcoming' ? '예정' :
                           product.status === 'success' ? '성공' : '실패'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">
                        {product.endDate.toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <button className="text-gray-600 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-green-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">주문 관리</h2>
              <div className="flex space-x-2">
                <select className="text-sm border rounded px-3 py-1">
                  <option>전체 상태</option>
                  <option>처리중</option>
                  <option>준비중</option>
                  <option>배송완료</option>
                </select>
                <input
                  type="search"
                  placeholder="주문 검색..."
                  className="text-sm border rounded px-3 py-1 w-64"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs text-gray-500 uppercase border-b">
                  <tr>
                    <th className="text-left py-3">주문번호</th>
                    <th className="text-left py-3">고객명</th>
                    <th className="text-left py-3">상품</th>
                    <th className="text-left py-3">금액</th>
                    <th className="text-left py-3">상태</th>
                    <th className="text-left py-3">일시</th>
                    <th className="text-left py-3">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium">{order.id}</td>
                      <td className="py-3 text-sm">{order.customer}</td>
                      <td className="py-3 text-sm">{order.product}</td>
                      <td className="py-3 text-sm font-medium">{order.amount.toLocaleString()}원</td>
                      <td className="py-3">
                        <select
                          className={`text-xs px-2 py-1 rounded border-0 ${getStatusBadge(order.status)}`}
                          defaultValue={order.status}
                        >
                          <option value="processing">처리중</option>
                          <option value="preparing">준비중</option>
                          <option value="shipped">배송완료</option>
                        </select>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{order.date}</td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">회원 목록</h2>
              <input
                type="search"
                placeholder="회원 검색..."
                className="text-sm border rounded px-3 py-1 w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs text-gray-500 uppercase border-b">
                  <tr>
                    <th className="text-left py-3">이름</th>
                    <th className="text-left py-3">이메일</th>
                    <th className="text-left py-3">가입일</th>
                    <th className="text-left py-3">주문수</th>
                    <th className="text-left py-3">총 구매액</th>
                    <th className="text-left py-3">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium">{user.name}</td>
                      <td className="py-3 text-sm">{user.email}</td>
                      <td className="py-3 text-sm">{user.joinDate}</td>
                      <td className="py-3 text-sm">{user.orders}건</td>
                      <td className="py-3 text-sm font-medium">{user.totalSpent.toLocaleString()}원</td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}