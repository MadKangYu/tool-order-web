#!/usr/bin/env python3
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import random

def scrape_naver_with_undetected():
    options = uc.ChromeOptions()

    # 스텔스 옵션
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")

    # 실제 브라우저처럼 보이게 하기
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    try:
        # undetected-chromedriver 사용
        driver = uc.Chrome(options=options, version_main=None)

        # 웹드라이버 속성 숨기기
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

        print("페이지 로딩 중...")
        url = "https://smartstore.naver.com/osunnystore/products/12040190914"
        driver.get(url)

        # 랜덤 대기 (인간적인 행동 모방)
        time.sleep(random.uniform(3, 7))

        # 페이지 스크롤 (봇 감지 회피)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/3);")
        time.sleep(2)

        # 스크린샷 저장
        driver.save_screenshot("undetected_screenshot.png")
        print("스크린샷 저장됨: undetected_screenshot.png")

        # 페이지 제목 확인
        title = driver.title
        print(f"페이지 제목: {title}")

        if "에러" in title or "오류" in title:
            print("에러 페이지가 로드되었습니다.")
            return None

        # 제품 정보 추출 시도
        product_data = {}

        try:
            # 더 많은 대기 시간
            time.sleep(5)

            # JavaScript로 정보 추출
            data = driver.execute_script("""
                var result = {};

                // 제품명 찾기
                var titleElements = document.querySelectorAll('h1, h2, h3, [class*="title"], [class*="name"]');
                for (var el of titleElements) {
                    if (el.innerText && (el.innerText.includes('세니') || el.innerText.includes('그래핀'))) {
                        result.title = el.innerText;
                        break;
                    }
                }

                // 가격 정보 찾기
                result.prices = [];
                var priceElements = document.querySelectorAll('*');
                for (var el of priceElements) {
                    var text = el.innerText;
                    if (text && text.includes('원') && /[0-9,]+원/.test(text)) {
                        result.prices.push(text.trim());
                    }
                }

                // 이미지 찾기
                result.images = [];
                var images = document.querySelectorAll('img');
                for (var img of images) {
                    if (img.src && (img.src.includes('phinf') || img.src.includes('cdn'))) {
                        result.images.push(img.src);
                    }
                }

                // 페이지 텍스트에서 관련 내용 찾기
                result.related_text = [];
                var allText = document.body.innerText;
                var lines = allText.split('\\n');
                for (var line of lines) {
                    if (line && (line.includes('세니') || line.includes('그래핀') || line.includes('패치'))) {
                        result.related_text.push(line.trim().substring(0, 100));
                    }
                }

                return result;
            """)

            print("\n=== 추출된 데이터 ===")
            print(json.dumps(data, indent=2, ensure_ascii=False))

            # 페이지 소스 저장
            with open("undetected_page_source.html", "w", encoding="utf-8") as f:
                f.write(driver.page_source)
            print("페이지 소스 저장: undetected_page_source.html")

            return data

        except Exception as e:
            print(f"데이터 추출 오류: {e}")
            return None

    except Exception as e:
        print(f"브라우저 오류: {e}")
        return None
    finally:
        try:
            driver.quit()
        except:
            pass

if __name__ == "__main__":
    result = scrape_naver_with_undetected()
    if result:
        print("성공적으로 데이터를 추출했습니다!")
    else:
        print("데이터 추출에 실패했습니다.")