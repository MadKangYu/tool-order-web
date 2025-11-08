'use client';

import { X, Link2, MessageCircle, Facebook, Twitter, Share2 } from 'lucide-react';
import { shareKakao, shareNaver, shareFacebook, shareTwitter, copyToClipboard, shareNative } from '@/lib/share';
import toast from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    id: string;
  };
}

export default function ShareModal({ isOpen, onClose, product }: ShareModalProps) {
  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/product/${product.id}`
    : '';

  const shareData = {
    title: product.title,
    text: `${product.description} - ${product.price.toLocaleString()}원 (${Math.round((1 - product.price / product.originalPrice) * 100)}% 할인)`,
    url: shareUrl,
    price: product.originalPrice.toString(),
    discount: product.price.toString(),
  };

  const handleKakaoShare = () => {
    shareKakao(shareData);
  };

  const handleNaverShare = () => {
    shareNaver(shareData);
  };

  const handleFacebookShare = () => {
    shareFacebook(shareData);
  };

  const handleTwitterShare = () => {
    shareTwitter(shareData);
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      toast.success('링크가 복사되었습니다!');
    } else {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  const handleNativeShare = async () => {
    const success = await shareNative(shareData);
    if (!success) {
      toast.error('공유 기능을 사용할 수 없습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">공유하기</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">{product.title}</p>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-blue-600">
              {product.price.toLocaleString()}원
            </span>
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={handleKakaoShare}
            className="flex flex-col items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition"
          >
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs">카카오톡</span>
          </button>

          <button
            onClick={handleNaverShare}
            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xs">네이버</span>
          </button>

          <button
            onClick={handleFacebookShare}
            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
              <Facebook className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs">페이스북</span>
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex flex-col items-center p-4 bg-sky-50 hover:bg-sky-100 rounded-lg transition"
          >
            <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mb-2">
              <Twitter className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs">트위터</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mb-2">
              <Link2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs">링크 복사</span>
          </button>

          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              onClick={handleNativeShare}
              className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs">더보기</span>
            </button>
          )}
        </div>

        <div className="text-center text-xs text-gray-500">
          친구에게 공유하고 함께 구매하세요!
        </div>
      </div>
    </div>
  );
}