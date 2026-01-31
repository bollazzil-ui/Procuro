from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/")
        page.wait_for_timeout(2000) # wait for animations
        page.screenshot(path="verification/landing_page.png")
        browser.close()

if __name__ == "__main__":
    run()
