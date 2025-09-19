#!/usr/bin/env python3
import undetected_chromedriver as uc
import time
import json

def simple_naver_scrape():
    try:
        # 가장 기본적인 설정
        print("브라우저 시작 중...")
        driver = uc.Chrome()

        print("페이지 로딩 중...")
        driver.get("https://smartstore.naver.com/osunnystore/products/12040190914")

        # 충분한 대기
        time.sleep(10)

        # 스크린샷
        driver.save_screenshot("simple_screenshot.png")
        print("스크린샷 저장: simple_screenshot.png")

        # 페이지 제목
        title = driver.title
        print(f"페이지 제목: {title}")

        if "에러" not in title and "오류" not in title:
            # 성공적으로 로드됨
            print("페이지가 성공적으로 로드되었습니다!")

            # 간단한 정보 추출
            result = driver.execute_script("""
                var info = {
                    title: document.title,
                    url: window.location.href,
                    textContent: document.body.innerText.substring(0, 2000)
                };
                return info;
            """)

            print("\n=== 페이지 정보 ===")
            print(f"제목: {result['title']}")
            print(f"URL: {result['url']}")
            print(f"텍스트 일부: {result['textContent'][:500]}...")

            # 세니나 그래핀이 포함된 텍스트 찾기
            if '세니' in result['textContent'] or '그래핀' in result['textContent']:
                print("\n✅ 제품 관련 텍스트를 찾았습니다!")

            with open("page_content.txt", "w", encoding="utf-8") as f:
                f.write(result['textContent'])
            print("페이지 내용 저장: page_content.txt")

        else:
            print("❌ 에러 페이지가 로드되었습니다.")

    except Exception as e:
        print(f"오류: {e}")
    finally:
        print("브라우저 종료 중...")
        driver.quit()

if __name__ == "__main__":
    simple_naver_scrape()