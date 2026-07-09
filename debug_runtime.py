from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.on('console', lambda msg: print(f'BROWSER CONSOLE: {msg.text}'))
    page.on('pageerror', lambda err: print(f'BROWSER ERROR: {err.message}'))

    try:
        page.goto('http://localhost:3000/proposal/prop_001', wait_until='networkidle')
    except Exception as e:
        print(f'Navigation failed: {e}')

    page.wait_for_timeout(5000)
    page.screenshot(path='debug_blank_page.png')

    print(f'Page title: {page.title()}')
    print(f'Body content length: {len(page.content())}')

if __name__ == '__main__':
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
