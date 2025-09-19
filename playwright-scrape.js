const { chromium } = require('playwright');

async function scrapeWithPlaywright() {
  const browser = await chromium.launch({
    headless: false, // 브라우저 보이기
  });

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    console.log('네이버 스마트스토어 페이지 로딩 중...');
    await page.goto('https://smartstore.naver.com/osunnystore/products/12040190914', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // 페이지 로딩 대기
    await page.waitForTimeout(5000);

    // 스크린샷
    await page.screenshot({ path: 'playwright-screenshot.png' });
    console.log('스크린샷 저장: playwright-screenshot.png');

    // 제품명 찾기
    const title = await page.textContent('h3').catch(() => null);
    console.log('제품명:', title);

    // 가격 찾기
    const price = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      for (let el of elements) {
        const text = el.innerText;
        if (text && /^\d{1,3}(,\d{3})*원$/.test(text.trim())) {
          return text.trim();
        }
      }
      return null;
    });
    console.log('가격:', price);

    // 모든 이미지 URL 수집
    const images = await page.evaluate(() => {
      const imgs = [];
      document.querySelectorAll('img').forEach(img => {
        if (img.src && (img.src.includes('.jpg') || img.src.includes('.png') || img.src.includes('.webp'))) {
          imgs.push(img.src);
        }
      });
      return imgs;
    });

    console.log('이미지 개수:', images.length);
    images.slice(0, 10).forEach((url, i) => {
      console.log(`이미지 ${i+1}: ${url}`);
    });

    // 상품 설명 텍스트
    const description = await page.evaluate(() => {
      const texts = [];
      document.querySelectorAll('p, div, span').forEach(el => {
        const text = el.innerText;
        if (text && text.includes('세니') || text && text.includes('그래핀')) {
          texts.push(text.trim());
        }
      });
      return texts.slice(0, 10);
    });

    console.log('\n상품 설명:');
    description.forEach(text => console.log('- ' + text.substring(0, 100)));

    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('에러 발생:', error);
  } finally {
    await browser.close();
  }
}

scrapeWithPlaywright();