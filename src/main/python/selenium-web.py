from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import asyncio

async def my_function(waitSecs):
    try:
        await asyncio.sleep(waitSecs)
        print("This won't be printed if cancelled.")
    except asyncio.CancelledError:
        print("Task was cancelled.")

async def setTimeout(func:function, waitSecs:float):
    task = asyncio.create_task(func(waitSecs))
    await asyncio.sleep(waitSecs)  # Cancel the task after 2 seconds
    task.cancel()

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument('--headless=new')

browser = webdriver.Chrome(options = chrome_options) # "./chromedriver.exe"

browser.get("https://www.youtube.com/watch?v=XlF2FpmHIM8")

def findTitles():
	heads = browser.find_elements(By.CSS_SELECTOR, "title, h1, h2")
	for head in heads:
		print(f"{head.text}")

asyncio.run(setTimeout(findTitles, 0.2))
