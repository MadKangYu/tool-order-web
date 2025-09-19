const puppeteer = require('puppeteer');

async function scrapeNaverStore(url) {
  const browser = await puppeteer.launch({
    headless: false, // 디버깅을 위해 브라우저 표시
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('페이지 로딩 중...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // 페이지가 완전히 로딩될 때까지 대기
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 스크린샷 저장 (디버깅용)
    await page.screenshot({ path: 'naver-product.png', fullPage: false });
    console.log('스크린샷 저장: naver-product.png');

    // 페이지 HTML 전체 가져오기
    const html = await page.content();
    console.log('HTML 길이:', html.length);

    // 모든 이미지 URL 수집
    const imageUrls = await page.evaluate(() => {
      const images = [];
      document.querySelectorAll('img').forEach(img => {
        if (img.src && (img.src.includes('shopping-phinf') || img.src.includes('shop-phinf'))) {
          images.push(img.src);
        }
      });
      return images;
    });

    console.log('찾은 이미지 개수:', imageUrls.length);
    imageUrls.forEach((url, idx) => {
      console.log(`이미지 ${idx + 1}: ${url}`);
    });

    // 텍스트 정보 추출
    const textContent = await page.evaluate(() => {
      const texts = [];

      // 모든 텍스트 요소 수집
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
      elements.forEach(el => {
        const text = el.innerText || el.textContent;
        if (text && text.trim().length > 0 && text.trim().length < 500) {
          texts.push(text.trim());
        }
      });

      return texts.slice(0, 100); // 처음 100개만
    });

    console.log('\n주요 텍스트 내용:');
    textContent.forEach(text => {
      if (text.includes('세니') || text.includes('그래핀') || text.includes('패치') || text.includes('원')) {
        console.log('- ' + text);
      }
    });

    // 가격 정보 찾기
    const priceInfo = await page.evaluate(() => {
      const result = {};

      // 숫자와 원이 포함된 텍스트 찾기
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const text = el.innerText || el.textContent;
        if (text && /\d+,?\d*원/.test(text)) {
          if (!result.prices) result.prices = [];
          result.prices.push(text.trim());
        }
      });

      return result;
    });

    console.log('\n가격 정보:', priceInfo);

    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      images: imageUrls,
      texts: textContent,
      prices: priceInfo
    };

  } catch (error) {
    console.error('스크래핑 에러:', error);
    throw error;
  } finally {
    console.log('\n브라우저를 10초 후 닫습니다...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    await browser.close();
  }
}

const url = 'https://smartstore.naver.com/osunnystore/products/12040190914';
scrapeNaverStore(url);