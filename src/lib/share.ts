// 소셜 공유 유틸리티 함수들

interface ShareData {
  title: string;
  text: string;
  url: string;
  price?: string;
  discount?: string;
}

// 카카오톡 공유
export const shareKakao = (data: ShareData) => {
  // Kakao SDK가 로드되어 있는지 확인
  if (typeof window !== 'undefined' && window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      // 실제 카카오 앱 키로 교체 필요
      window.Kakao.init('YOUR_KAKAO_APP_KEY');
    }

    window.Kakao.Share.sendDefault({
      objectType: 'commerce',
      content: {
        title: data.title,
        imageUrl: 'https://dht-x.com/web/product/big/202501/42d737f6882afcc38220c9d09e84ae2a.jpg',
        link: {
          mobileWebUrl: data.url,
          webUrl: data.url,
        },
        description: data.text,
      },
      commerce: {
        productName: data.title,
        regularPrice: parseInt(data.price?.replace(/[^0-9]/g, '') || '0'),
        discountPrice: parseInt(data.discount?.replace(/[^0-9]/g, '') || '0'),
        discountRate: Math.round(
          ((parseInt(data.price?.replace(/[^0-9]/g, '') || '0') -
            parseInt(data.discount?.replace(/[^0-9]/g, '') || '0')) /
            parseInt(data.price?.replace(/[^0-9]/g, '') || '1')) * 100
        ),
      },
      buttons: [
        {
          title: '구매하기',
          link: {
            mobileWebUrl: data.url,
            webUrl: data.url,
          },
        },
      ],
    });
  } else {
    // 카카오 SDK가 없을 때 대체 방법
    window.open(`https://story.kakao.com/share?url=${encodeURIComponent(data.url)}`);
  }
};

// 네이버 공유
export const shareNaver = (data: ShareData) => {
  const url = `https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(data.url)}&title=${encodeURIComponent(data.title)}`;
  window.open(url, '_blank', 'width=500,height=600');
};

// 페이스북 공유
export const shareFacebook = (data: ShareData) => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

// 트위터(X) 공유
export const shareTwitter = (data: ShareData) => {
  const text = `${data.title}\n${data.text}\n`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(data.url)}`;
  window.open(url, '_blank', 'width=600,height=400');
};

// URL 복사
export const copyToClipboard = async (url: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (err) {
    // 폴백 방법
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Web Share API (모바일)
export const shareNative = async (data: ShareData): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
      });
      return true;
    } catch (err) {
      console.error('Error sharing:', err);
      return false;
    }
  }
  return false;
};

// TypeScript를 위한 Window 인터페이스 확장
declare global {
  interface Window {
    Kakao: any;
  }
}