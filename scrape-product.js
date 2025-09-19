const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('페이지 로딩 중...');
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // 페이지 로딩 대기
    await page.waitForSelector('._1QY7TuIyn', { timeout: 10000 }).catch(() => {});

    // 제품 정보 추출
    const productInfo = await page.evaluate(() => {
      const info = {};

      // 제품명
      const titleEl = document.querySelector('._1eddO7u4UC') || document.querySelector('h3._1-wqmqHEH');
      info.title = titleEl ? titleEl.innerText : '';

      // 가격
      const priceEl = document.querySelector('._1LY7DqCnwR') || document.querySelector('strong.wBkQlMMZZ');
      info.price = priceEl ? priceEl.innerText : '';

      // 원가
      const originalPriceEl = document.querySelector('del._1QY7TuIyn') || document.querySelector('._3_FVkrm9t');
      info.originalPrice = originalPriceEl ? originalPriceEl.innerText : '';

      // 할인율
      const discountEl = document.querySelector('._2r7XK7ktfN') || document.querySelector('strong._2-qK6dXfX');
      info.discount = discountEl ? discountEl.innerText : '';

      // 상품 설명
      const descEl = document.querySelector('._1eddO7u4UC') || document.querySelector('._1LWP5DPVy');
      info.description = descEl ? descEl.innerText : '';

      // 이미지 URL들
      const images = [];

      // 메인 이미지
      const mainImgEl = document.querySelector('._2JKm5WLxA5 img') || document.querySelector('img._3ckBfN05XK');
      if (mainImgEl) {
        images.push(mainImgEl.src);
      }

      // 썸네일 이미지들
      const thumbs = document.querySelectorAll('._23RpEYSJtH img');
      thumbs.forEach(img => {
        if (img.src && !images.includes(img.src)) {
          images.push(img.src);
        }
      });

      // 상세 이미지들
      const detailImgs = document.querySelectorAll('._3Hgx5YEWfH img, .se-image-resource img');
      detailImgs.forEach(img => {
        if (img.src && !images.includes(img.src)) {
          images.push(img.src);
        }
      });

      info.images = images;

      // 상품 상세 정보 텍스트
      const detailTextEl = document.querySelector('._2aaV2eRvJ7') || document.querySelector('.se-main-container');
      info.detailText = detailTextEl ? detailTextEl.innerText.substring(0, 1000) : '';

      return info;
    });

    console.log('스크래핑 결과:');
    console.log(JSON.stringify(productInfo, null, 2));

    return productInfo;

  } catch (error) {
    console.error('스크래핑 에러:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// URL을 인자로 받아 실행
const url = process.argv[2] || 'https://smartstore.naver.com/osunnystore/products/12040190914';
scrapeProduct(url).then(data => {
  console.log('완료');
}).catch(err => {
  console.error('실패:', err);
  process.exit(1);
});