'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Minus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import ProgressBar from '@/components/ProgressBar';
import toast, { Toaster } from 'react-hot-toast';
import { useCartStore } from '@/lib/store';

// 상품별 상세 이미지
const productDetails: Record<string, any> = {
  '1': {
    title: '[경록고] 비경 흑삼농축액',
    detailImages: [
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/a221250b428d2f46b33e20c5fe5f571e.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/846f61a90dbb435e3e0cdcc7944fea58.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/5a72ccbc683dc6db8263a605ac397534.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/29c599799204dc9ea50dfe5212f6ba7a.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/b593e886109b9fb6d9af98010f964fda.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/9661d2931b0a6ef092328cbe7a64bad6.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/02cd7bee5c5eb8877e38c07488b52752.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/852736c77c992125fb8bf4970348e225.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/aa8a4cfcd4040477a883beb4c1c75322.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/851be4304f7509cc276ce1a213b5cdfb.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/aefb03d6844d79f7afe617287f679c43.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/15b4f4c64021e32440fd4056d86287ef.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20230628/c5bd75d6971fce3dc00b3824b3c7f8fd.jpg',
    ],
    description: '6년근 흑삼 농축액 100% 휴대용 스틱',
    ingredients: '흑삼농축액 100% (국내산 6년근)',
    howToUse: '1일 1~2회, 1회 1포를 그대로 섭취하거나 물에 타서 드세요.',
    storage: '직사광선을 피하고 서늘한 곳에 보관',
  },
  '2': {
    title: '[경록고] 흑삼고 프리미엄',
    detailImages: [
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250811/d67771bfbba1f11513f9ac9e850286df.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250811/2858b2e73e0ec16e6da68c9be84a0172.jpg',
    ],
    description: '흑삼진액 70ml x 30포, 명절 선물 베스트!',
    ingredients: '흑삼농축액, 정제수, 꿀',
    howToUse: '1일 1~2회, 1회 1포를 섭취하세요.',
    storage: '냉장 보관 권장',
  },
  '3': {
    title: '[경록고] 천녹향 녹용 흑삼',
    detailImages: [
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250916/copy-1758004392-EC8DB8EB84A4EC9DBC28EAB080EBA19CED98952904.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250916/copy-1758004433-EC8DB8EB84A4EC9DBC28EAB080EBA19CED98952907.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250916/copy-1758004459-EC8DB8EB84A4EC9DBC28EAB080EBA19CED98952902.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250916/copy-1758004483-EC8DB8EB84A4EC9DBC28EAB080EBA19CED98952905.jpg',
    ],
    description: '녹용과 흑삼의 프리미엄 조합!',
    ingredients: '녹용추출물, 흑삼농축액',
    howToUse: '1일 2회, 아침 저녁으로 1포씩 섭취',
    storage: '서늘하고 건조한 곳에 보관',
  },
  '4': {
    title: '[경록고] 흑삼천 파우치',
    detailImages: [
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250912/8ce83de38bdd60809d4b39f5018a3582.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250912/78042258ac680f92e5d79a319befafda.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250912/5154feccd2359d03daedf7f1c70b5bde.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250912/afb1d52e05914fd7d5944f08d04e3d55.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250912/f72bdb81c4d525548b874c469a821fea.jpg',
      'https://mirae-eni.co.kr/web/upload/NNEditor/20250912/c62af05a4858696c5112c0e95e84f0be.jpg',
    ],
    description: '언제 어디서나 간편하게!',
    ingredients: '흑삼농축액 100%',
    howToUse: '1일 1~3회 섭취',
    storage: '실온 보관 가능',
  },
  '9': {
    title: '[DHTX] 멍케 두피 강화 샴푸 500ml',
    detailImages: [
      'https://dht-x.com/web/product/big/202501/42d737f6882afcc38220c9d09e84ae2a.jpg',
      'https://dht-x.com/web/product/extra/big/202211/6f6fefdd4470c86893afd5693893f466.jpg',
      'https://dht-x.com/web/product/extra/big/202302/097ef7d6abb844b86aecfeccf481eb7a.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/1672896341079.png',
      'https://dht-x.com/web/upload/NNEditor/20230825/EC9E90EC82ACEBAAB0EC8898ECA095_EC8381EC84B8ED8E98EC9DB4ECA780_EC96B8EBA1A0.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895689-DHTX_1-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230111/copy-1673419770-DHTX_2-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895689-DHTX_3-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/DHTX_4-EC84B1EBB684-EAB095ED9994.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895689-DHTX_6-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895689-DHTX_7-ED96A5-EAB3B5ED86B5.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895689-DHTX_8-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/shampoo_point_01.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/shampoo_point_02.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/shampoo_point_03.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/shampoo_point_04.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/shampoo_howto.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/shampoo_ingredients.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/certification.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/banner_delivery.jpg',
    ],
    description: '멍게껍질 특허성분으로 탈모 완화! DHT 억제 효과',
    ingredients: '멍게껍질추출물, 살리실산, 덱스판테놀, 징크피리치온',
    howToUse: '미온수로 두피를 충분히 적신 후, 적당량을 손에 덜어 거품을 낸 후 두피를 마사지하듯 문지른 뒤 깨끗이 헹구어냅니다.',
    storage: '직사광선을 피하고 서늘한 곳에 보관',
    features: [
      '✓ 탈모 증상 완화 기능성 샴푸',
      '✓ 멍게껍질 추출물 특허 성분',
      '✓ DHT 호르몬 억제 효과',
      '✓ 약산성 두피 케어',
      '✓ FDA 승인 기능성 성분 함유',
    ],
  },
  '10': {
    title: '[DHTX] 멍케 두피 쿨링 샴푸 500ml',
    detailImages: [
      'https://dht-x.com/web/product/big/202501/5a238a8765b647f858d8fe246d09d51a.jpg',
      'https://dht-x.com/web/product/extra/big/202211/959a8f259c619afda0c509e7c8bb236e.jpg',
      'https://dht-x.com/web/product/extra/big/202302/2fdf663d115c4d34cb655fb3c38534fb.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230719/ECBFA8EC83B4ED91B820EC9584EC9DB4EC8AA420ED82A4EBB984ECA5ACEC96BC_20230719.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230825/copy-1692942514-EC9E90EC82ACEBAAB0EC8898ECA095_EC8381EC84B8ED8E98EC9DB4ECA780_EC96B8EBA1A0.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895602-DHTX_1-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230111/copy-1673419855-DHTX_2-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895602-DHTX_3-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/DHTX_4-EC84B1EBB684-ECBFA8EBA781.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895602-DHTX_6-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895602-DHTX_7-ED96A5-EAB3B5ED86B5.jpg',
      'https://dht-x.com/web/upload/NNEditor/20230105/copy-1672895602-DHTX_8-EAB3B5ED86B5EC8381EC84B8.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/cooling_point_01.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/cooling_point_02.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/cooling_point_03.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/shampoo_howto.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/cooling_ingredients.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/certification.jpg',
      'https://gi.esmplus.com/planbbio/DHT-X/mall/banner_delivery.jpg',
    ],
    description: '시원한 쿨링감과 두피 냄새 제거! 여름철 필수 아이템',
    ingredients: '멍게껍질추출물, 멘톨, 페퍼민트오일, 살리실산',
    howToUse: '미온수로 두피를 충분히 적신 후, 적당량을 손에 덜어 거품을 낸 후 두피를 마사지하듯 문지른 뒤 깨끗이 헹구어냅니다.',
    storage: '직사광선을 피하고 서늘한 곳에 보관',
    features: [
      '✓ 탈모 증상 완화 기능성 샴푸',
      '✓ 시원한 쿨링 효과',
      '✓ 두피 냄새 제거',
      '✓ 정수리 집중 케어',
      '✓ 여름철 두피 관리',
    ],
  },
  '11': {
    title: '[라온까사] 시그니처 미니멀 3종 냄비 세트',
    detailImages: [
      'https://image.yes24.com/goods/141216334/XL',
      'https://enwel.hgodo.com/md/notice/notice.jpg',
      'https://enwel.hgodo.com/md/SJC/SJC00025_1.jpg',
      'https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
    ],
    description: '미니멀한 디자인의 프리미엄 3종 냄비 세트',
    ingredients: '스테인리스 스틸, 알루미늄, 세라믹 코팅',
    howToUse: '중약불에서 조리하며, 사용 후 중성세제로 세척하세요. 식기세척기 사용 가능합니다.',
    storage: '건조한 곳에 보관하세요',
    features: [
      '✓ 18cm 편수 + 20cm 양수 + 28cm 찜기',
      '✓ 인덕션, 가스레인지 모두 사용 가능',
      '✓ 열전도율이 우수한 3중 바닥',
      '✓ 식기세척기 사용 가능',
      '✓ 미니멀한 디자인으로 주방 인테리어 효과',
      '✓ 안전한 세라믹 코팅',
    ],
  },
  '9': {
    title: '[세니랩] 그래핀 패치 30매',
    detailImages: [
      'https://image.auction.co.kr/itemimage/52/28/44/52284451b1.jpg',
      'https://image.auction.co.kr/itemimage/52/28/44/52284451c1.jpg',
      'https://image.auction.co.kr/itemimage/52/28/44/52284451f1.jpg',
      'https://image.auction.co.kr/itemimage/52/28/44/5228445201.jpg',
      'https://image.auction.co.kr/itemimage/52/28/44/5228445211.jpg',
    ],
    description: '세니랩 그래핀 패치 30매. 장시간 서서 일하는 분, 앉아서 오랫동안 일하는 분들의 일상의 불편함을 해결하는 패치',
    ingredients: '그래핀, 철분, 활성탄, 천연광물질, 의료용 점착제',
    howToUse: '1. 패치를 포장에서 꺼냅니다\n2. 보호필름을 제거합니다\n3. 원하는 부위에 부착합니다\n4. 필요 시 교체하여 사용합니다',
    storage: '직사광선을 피하고 서늘한 곳에 보관',
    features: [
      '✓ 세니랩 브랜드 정품 그래핀 패치 30매',
      '✓ 장시간 서서 일하는 분들에게 추천',
      '✓ 앉아서 오랫동안 일하는 분들에게 필수',
      '✓ 무릎과 허리가 불편한 중장년층에게 적합',
      '✓ 강한 점착력으로 신체 어디든 부착 가능',
      '✓ 일상의 불편함을 해결하고 아름다움을 더하는 패치',
    ],
  },
  '10': {
    title: '[리앤티] 혀클리너 2개입',
    detailImages: [
      'https://shopping-phinf.pstatic.net/main_3456789/34567891234.1.jpg',
      'https://shopping-phinf.pstatic.net/main_3456789/34567891234.2.jpg',
      'https://shopping-phinf.pstatic.net/main_3456789/34567891234.3.jpg',
      'https://shopping-phinf.pstatic.net/main_3456789/34567891234.4.jpg',
      'https://shopping-phinf.pstatic.net/main_3456789/34567891234.5.jpg',
    ],
    description: '구강 위생의 완성! 스테인리스 스틸 혀클리너로 혀 청소를 편리하게',
    ingredients: '스테인리스 스틸 304, 실리콘 손잡이',
    howToUse: '1. 물로 혀클리너를 헹굽니다\n2. 혀 뒤쪽부터 앞쪽으로 부드럽게 긁어냅니다\n3. 사용 후 깨끗이 씻어 보관합니다\n4. 매일 사용하시면 더욱 효과적입니다',
    storage: '건조한 곳에 보관, 사용 후 물기 제거',
    features: [
      '✓ 리앤티 브랜드 정품 혀클리너 2개입',
      '✓ 스테인리스 스틸 304 재질로 위생적',
      '✓ 항균 효과로 구강 건강 개선',
      '✓ 인체공학적 설계로 사용이 편리',
      '✓ 반영구적 사용 가능한 내구성',
      '✓ 휴대용 케이스 포함으로 여행 시 편리',
    ],
  },
  '11': {
    title: '[워시테라피] 4in1 고농축 캡슐세제 50개입',
    detailImages: [
      'https://cdn.011st.com/11dims/resize/800x800/quality/75/11src/product/6931156039/B.webp?142144779',
      'https://cdn.011st.com/11dims/resize/800x800/quality/75/11src/product/6931156039/1.jpg',
      'https://cdn.011st.com/11dims/resize/800x800/quality/75/11src/product/6931156039/2.jpg',
      'https://cdn.011st.com/11dims/resize/800x800/quality/75/11src/product/6931156039/3.jpg',
      'https://cdn.011st.com/11dims/resize/800x800/quality/75/11src/product/6931156039/4.jpg',
    ],
    description: '잔류세제 걱정 없는 4in1 고농축 캡슐 세탁세제. 피부에 자극이 적은 저자극 세제',
    ingredients: '고농축 세정제, 섬유유연제, 표백제, 향료',
    howToUse: '1. 세탁기에 옷을 넣습니다\n2. 캡슐 1개를 드럼 안쪽에 넣습니다\n3. 평소와 같이 세탁을 시작합니다\n4. 세탁 완료 후 꺼내면 됩니다',
    storage: '어린이 손이 닿지 않는 서늘한 곳에 보관',
    features: [
      '✓ 하모니코리아 워시테라피 정품 50개입',
      '✓ 4in1 고농축으로 한 번에 완벽 세탁',
      '✓ 잔류세제 걱정 없는 완전 용해',
      '✓ 피부에 자극이 적은 저자극 성분',
      '✓ 일반세탁기, 드럼세탁기 모두 사용 가능',
      '✓ 편리한 개별 포장으로 사용량 조절 쉬움',
    ],
  },
};

const products = [
  {
    id: '1',
    name: '[경록고] 비경 흑삼농축액',
    price: 16900,
    originalPrice: 28000,
    discountRate: 40,
    image: 'https://mirae-eni.co.kr/web/product/big/202306/36806560f5ecbebad2c788720e44d464.jpg',
    unit: '30포',
  },
  {
    id: '2',
    name: '[경록고] 흑삼고 프리미엄',
    price: 19900,
    originalPrice: 35000,
    discountRate: 43,
    image: 'https://mirae-eni.co.kr/web/product/big/202509/176010baed6818af5595756e17502e7d.jpg',
    unit: '30포',
  },
  {
    id: '3',
    name: '[경록고] 천녹향 녹용 흑삼',
    price: 39900,
    originalPrice: 68000,
    discountRate: 41,
    image: 'https://mirae-eni.co.kr/web/product/big/202509/450f3e67c2b36ede48e3fb513d4b2c47.jpg',
    unit: '30포',
  },
  {
    id: '4',
    name: '[경록고] 흑삼천 파우치',
    price: 39900,
    originalPrice: 68000,
    discountRate: 41,
    image: 'https://mirae-eni.co.kr/web/product/big/202509/f383047694a54aa15c58923f5ee8bd45.jpg',
    unit: '30포',
  },
  {
    id: '9',
    name: '[DHTX] 멍케 두피 강화 샴푸 500ml',
    price: 4900,
    originalPrice: 8900,
    discountRate: 45,
    image: 'https://dht-x.com/web/product/big/202501/42d737f6882afcc38220c9d09e84ae2a.jpg',
    unit: '500ml',
  },
  {
    id: '10',
    name: '[DHTX] 멍케 두피 쿨링 샴푸 500ml',
    price: 4900,
    originalPrice: 8900,
    discountRate: 45,
    image: 'https://dht-x.com/web/product/big/202501/5a238a8765b647f858d8fe246d09d51a.jpg',
    unit: '500ml',
  },
  {
    id: '11',
    name: '[라온까사] 시그니처 미니멀 3종 냄비 세트',
    price: 42900,
    originalPrice: 62000,
    discountRate: 31,
    image: 'https://image.yes24.com/goods/141216334/XL',
    unit: '세트',
  },
  {
    id: '12',
    name: '[세니랩] 그래핀 패치 30매',
    price: 19900,
    originalPrice: 32000,
    discountRate: 38,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    unit: '30매',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'detail' | 'info' | 'review'>('detail');
  const { addItem } = useCartStore();

  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const detail = productDetails[productId];

  if (!product || !detail) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleAddToCart = () => {
    addItem(product as any, quantity);
    toast.success('장바구니에 담았습니다!');
  };

  const handleBuyNow = () => {
    addItem(product as any, quantity);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>뒤로가기</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left: Main Image */}
          <div className="bg-white rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>

          {/* Right: Product Info */}
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">{product.name}</h1>
            <p className="text-gray-600 mb-4">{detail.description}</p>

            {/* Price */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-blue-600">
                  {product.price.toLocaleString()}원
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  {product.discountRate}% OFF
                </span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                ✓ 쇼핑백 포함 ✓ 택배비 포함
              </p>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">공동구매 진행 현황</h3>
              <ProgressBar
                current={127}
                min={50}
                max={200}
                height="h-8"
              />
            </div>

            {/* Timer */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">남은 시간</h3>
              <CountdownTimer endDate={new Date('2025-01-20')} />
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold">구매수량</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
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
                  {(product.price * quantity).toLocaleString()}원
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                바로 구매하기
              </button>
            </div>

            <div className="flex gap-3 mt-3">
              <button className="flex-1 flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50">
                <Heart className="h-5 w-5 mr-2" />
                찜하기
              </button>
              <button className="flex-1 flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50">
                <Share2 className="h-5 w-5 mr-2" />
                공유하기
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg">
          <div className="border-b">
            <div className="flex">
              {(['detail', 'info', 'review'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-4 font-medium ${
                    selectedTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'detail' && '상품상세'}
                  {tab === 'info' && '구매정보'}
                  {tab === 'review' && '구매후기'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {selectedTab === 'detail' && (
              <div>
                <h3 className="font-bold text-lg mb-4">상품 상세정보</h3>

                {/* 상세 이미지들 */}
                <div className="space-y-4">
                  {detail.detailImages.map((img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      alt={`상세이미지 ${index + 1}`}
                      className="w-full h-auto"
                    />
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  {detail.features && (
                    <div>
                      <h4 className="font-semibold mb-2">제품 특징</h4>
                      <div className="space-y-2">
                        {detail.features.map((feature: string, index: number) => (
                          <p key={index} className="text-gray-700">{feature}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-2">{productId === '9' || productId === '10' ? '주요 성분' : '원재료'}</h4>
                    <p className="text-gray-700">{detail.ingredients}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{productId === '9' || productId === '10' ? '사용방법' : '섭취방법'}</h4>
                    <p className="text-gray-700">{detail.howToUse}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">보관방법</h4>
                    <p className="text-gray-700">{detail.storage}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'info' && (
              <div>
                <h3 className="font-bold text-lg mb-4">구매 안내</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">배송정보</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>배송비: 무료배송 (택배비 포함가)</li>
                      <li>배송기간: 결제 후 2-3일 이내</li>
                      <li>배송업체: CJ대한통운</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">교환/반품</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>수령 후 7일 이내 가능</li>
                      <li>단순 변심 시 왕복 배송비 구매자 부담</li>
                      <li>제품 하자 시 무료 교환/반품</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">판매자 정보</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>상호명:</strong> 구픽 (경록고)</li>
                      <li><strong>대표자:</strong> 홍길동</li>
                      <li><strong>사업자등록번호:</strong> 123-45-67890</li>
                      <li><strong>통신판매업신고:</strong> 2025-서울강남-1234</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">고객센터</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>전화번호:</strong> 1588-1234</li>
                      <li><strong>카카오톡:</strong> @구픽공동구매</li>
                      <li><strong>운영시간:</strong> 평일 09:00 - 18:00</li>
                      <li><strong>이메일:</strong> help@gupick.kr</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'review' && (
              <div>
                <h3 className="font-bold text-lg mb-4">구매후기</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="ml-2 font-semibold">김**님</span>
                      <span className="ml-auto text-sm text-gray-500">2025.01.10</span>
                    </div>
                    <p className="text-gray-700">부모님 선물로 구매했는데 너무 좋아하세요! 포장도 고급스럽고 맛도 좋대요.</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">★★★★☆</span>
                      <span className="ml-2 font-semibold">이**님</span>
                      <span className="ml-auto text-sm text-gray-500">2025.01.08</span>
                    </div>
                    <p className="text-gray-700">휴대하기 편해서 좋아요. 맛이 조금 쓰긴 한데 건강한 맛이에요.</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="ml-2 font-semibold">박**님</span>
                      <span className="ml-auto text-sm text-gray-500">2025.01.05</span>
                    </div>
                    <p className="text-gray-700">재구매입니다. 피로회복에 확실히 도움이 되는 것 같아요.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
}