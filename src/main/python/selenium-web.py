import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import threading

def set_interval(func, sec):
	def func_wrapper():
		set_interval(func, sec)
		func()
	t = threading.Timer(sec, func_wrapper)
	t.start()
	return t

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument('--headless=new')

browser = webdriver.Chrome(options = chrome_options) # "./chromedriver.exe"

browser.get("https://www.youtube.com/watch?v=XlF2FpmHIM8")

def findTitles():
	heads = browser.find_elements(By.CSS_SELECTOR, "title, h1, h2")
	for head in heads:
		print(f"{head.text}")

set_interval(findTitles, 1)
