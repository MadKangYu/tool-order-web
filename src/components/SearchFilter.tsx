'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: string) => void;
}

export interface FilterOptions {
  priceRange: [number, number];
  discountRate: number;
  categories: string[];
  status: string[];
}

export default function SearchFilter({ onSearch, onFilterChange, onSortChange }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['active']);
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: '건강식품', name: '건강식품' },
    { id: '뷰티', name: '뷰티' },
    { id: '가전', name: '가전제품' },
    { id: '패션', name: '패션' },
    { id: '식품', name: '식품' },
  ];

  const sortOptions = [
    { value: 'popular', label: '인기순' },
    { value: 'latest', label: '최신순' },
    { value: 'discount', label: '할인율순' },
    { value: 'price-low', label: '낮은 가격순' },
    { value: 'price-high', label: '높은 가격순' },
    { value: 'ending', label: '마감 임박순' },
    { value: 'achievement', label: '달성률순' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newCategories);
    applyFilters(newCategories, priceRange, minDiscount, selectedStatus);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    applyFilters(selectedCategories, [min, max], minDiscount, selectedStatus);
  };

  const handleDiscountChange = (discount: number) => {
    setMinDiscount(discount);
    applyFilters(selectedCategories, priceRange, discount, selectedStatus);
  };

  const applyFilters = (
    categories: string[],
    price: [number, number],
    discount: number,
    status: string[]
  ) => {
    onFilterChange({
      priceRange: price,
      discountRate: discount,
      categories: categories,
      status: status,
    });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 100000]);
    setMinDiscount(0);
    setSelectedCategories([]);
    setSelectedStatus(['active']);
    setSortBy('popular');
    onSearch('');
    onFilterChange({
      priceRange: [0, 100000],
      discountRate: 0,
      categories: [],
      status: ['active'],
    });
    onSortChange('popular');
  };

  return (
    <div className="bg-white border-b sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="flex gap-4 items-center mb-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="상품명, 브랜드 검색..."
              className="w-full px-4 py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onSearch('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </form>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>필터</span>
            {(selectedCategories.length > 0 || minDiscount > 0 || priceRange[1] < 100000) && (
              <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {selectedCategories.length + (minDiscount > 0 ? 1 : 0) + (priceRange[1] < 100000 ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  sortBy === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 border-t">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">카테고리</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="mr-2"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">가격대</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                      className="w-24 px-2 py-1 border rounded text-sm"
                      placeholder="최소"
                    />
                    <span>~</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                      className="w-24 px-2 py-1 border rounded text-sm"
                      placeholder="최대"
                    />
                    <span className="text-sm">원</span>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => handlePriceChange(0, 10000)}
                      className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 mr-2"
                    >
                      1만원 이하
                    </button>
                    <button
                      onClick={() => handlePriceChange(10000, 30000)}
                      className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 mr-2"
                    >
                      1~3만원
                    </button>
                    <button
                      onClick={() => handlePriceChange(30000, 50000)}
                      className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 mr-2"
                    >
                      3~5만원
                    </button>
                  </div>
                </div>
              </div>

              {/* Discount Rate */}
              <div>
                <h3 className="font-semibold mb-3">최소 할인율</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="70"
                      step="10"
                      value={minDiscount}
                      onChange={(e) => handleDiscountChange(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{minDiscount}%</span>
                  </div>
                  <div className="flex gap-2">
                    {[30, 40, 50].map(rate => (
                      <button
                        key={rate}
                        onClick={() => handleDiscountChange(rate)}
                        className={`text-xs px-3 py-1 rounded ${
                          minDiscount === rate
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {rate}% 이상
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                필터 초기화
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}