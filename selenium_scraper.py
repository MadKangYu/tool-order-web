#!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import json

def scrape_naver_product():
    # Chrome 옵션 설정
    chrome_options = Options()
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

    # 브라우저 실행 (헤드리스 모드 해제)
    chrome_options.add_argument("--headless=new")

    driver = webdriver.Chrome(options=chrome_options)

    try:
        # 페이지 열기
        url = "https://smartstore.naver.com/osunnystore/products/12040190914"
        print(f"페이지 로딩 중: {url}")
        driver.get(url)

        # JavaScript 실행 대기
        driver.execute_script("return document.readyState")
        time.sleep(5)

        # 스크린샷
        driver.save_screenshot("selenium_screenshot.png")
        print("스크린샷 저장: selenium_screenshot.png")

        product_data = {}

        # JavaScript로 데이터 추출
        try:
            # 모든 텍스트 추출
            texts = driver.execute_script("""
                var texts = [];
                var elements = document.querySelectorAll('*');
                elements.forEach(function(el) {
                    var text = el.innerText || el.textContent;
                    if (text && text.trim().length > 0 && text.trim().length < 200) {
                        texts.push(text.trim());
                    }
                });
                return texts.slice(0, 200);
            """)

            # 가격 정보 찾기
            for text in texts:
                if "원" in text and text.replace(",", "").replace("원", "").strip().isdigit():
                    if "price" not in product_data:
                        product_data["price"] = []
                    product_data["price"].append(text)
                if "세니" in text or "그래핀" in text:
                    if "related_text" not in product_data:
                        product_data["related_text"] = []
                    product_data["related_text"].append(text[:100])

            # 이미지 URL 추출
            images = driver.execute_script("""
                var images = [];
                document.querySelectorAll('img').forEach(function(img) {
                    if (img.src && (img.src.includes('shopping-phinf') || img.src.includes('shop-phinf'))) {
                        images.push(img.src);
                    }
                });
                return images;
            """)
            product_data["images"] = images[:10]

        except Exception as e:
            print(f"데이터 추출 오류: {e}")

        # 결과 출력
        print("\n=== 추출된 데이터 ===")
        print(json.dumps(product_data, indent=2, ensure_ascii=False))

        # 페이지 소스 일부 저장
        with open("page_source.html", "w", encoding="utf-8") as f:
            f.write(driver.page_source[:10000])
        print("\n페이지 소스 저장: page_source.html")

        return product_data

    except Exception as e:
        print(f"오류 발생: {e}")
        return None

    finally:
        driver.quit()

if __name__ == "__main__":
    result = scrape_naver_product()