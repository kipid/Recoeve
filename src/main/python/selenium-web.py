import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import asyncio

async def my_function():
    try:
        await asyncio.sleep(5)
        print("This won't be printed if cancelled.")
    except asyncio.CancelledError:
        print("Task was cancelled.")

async def main(func, waitSecs:number):
    task = asyncio.create_task(func())
    await asyncio.sleep(waitSecs)  # Cancel the task after 2 seconds
    task.cancel()

asyncio.run(main())

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument('--headless=new')

browser = webdriver.Chrome(options = chrome_options) # "./chromedriver.exe"

browser.get("https://www.youtube.com/watch?v=XlF2FpmHIM8")

def findTitles():
	heads = browser.find_elements(By.CSS_SELECTOR, "title, h1, h2")
	for head in heads:
		print(f"{head.text}")

set_interval(findTitles, 0.2)
