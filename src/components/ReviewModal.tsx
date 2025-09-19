'use client';

import { useState } from 'react';
import { Star, Camera, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    image: string;
  };
  onSubmit: (review: ReviewData) => void;
}

export interface ReviewData {
  productId: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
  wouldRecommend: boolean;
  purchaseVerified: boolean;
}

export default function ReviewModal({ isOpen, onClose, product, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [wouldRecommend, setWouldRecommend] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('제목을 입력해주세요');
      return;
    }

    if (!content.trim()) {
      toast.error('내용을 입력해주세요');
      return;
    }

    if (content.length < 10) {
      toast.error('리뷰는 최소 10자 이상 작성해주세요');
      return;
    }

    const reviewData: ReviewData = {
      productId: product.id,
      rating,
      title,
      content,
      images,
      wouldRecommend,
      purchaseVerified: true, // 실제로는 구매 이력 확인 필요
    };

    onSubmit(reviewData);
    toast.success('리뷰가 작성되었습니다! 포인트 100P가 적립됩니다.');

    // Reset form
    setRating(5);
    setTitle('');
    setContent('');
    setImages([]);
    setWouldRecommend(true);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          setImages(prev => [...prev, ...newImages]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">리뷰 작성</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Product Info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <Check className="h-3 w-3" />
                <span>구매 인증됨</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">별점을 선택해주세요</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-semibold">
                {rating === 5 && '아주 좋아요!'}
                {rating === 4 && '좋아요'}
                {rating === 3 && '보통이에요'}
                {rating === 2 && '별로예요'}
                {rating === 1 && '아쉬워요'}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              리뷰 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="리뷰 제목을 입력해주세요"
              maxLength={100}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              리뷰 내용 <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-2">
                ({content.length}/1000)
              </span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상품에 대한 솔직한 리뷰를 작성해주세요 (최소 10자)"
              rows={6}
              maxLength={1000}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              사진 첨부 <span className="text-xs text-gray-500">(선택, 최대 5장)</span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Review ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500">
                  <Camera className="h-6 w-6 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Would Recommend */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-3">이 제품을 추천하시겠습니까?</p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={wouldRecommend}
                  onChange={() => setWouldRecommend(true)}
                  className="mr-2"
                />
                <span className="text-sm">네, 추천합니다 👍</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!wouldRecommend}
                  onChange={() => setWouldRecommend(false)}
                  className="mr-2"
                />
                <span className="text-sm">아니요, 추천하지 않습니다</span>
              </label>
            </div>
          </div>

          {/* Guidelines */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">리뷰 작성 가이드</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 구매하신 제품에 대한 솔직한 평가를 작성해주세요</li>
              <li>• 다른 구매자에게 도움이 되는 정보를 포함해주세요</li>
              <li>• 욕설, 비방, 개인정보 노출은 삭제될 수 있습니다</li>
              <li>• 포토리뷰 작성 시 추가 포인트 50P 지급!</li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              리뷰 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}