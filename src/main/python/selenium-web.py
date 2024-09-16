from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import threading

class RepeatedTimer:
	def __init__(self, interval, function, *args, **kwargs):
		self.interval = interval
		self.function = function
		self.args = args
		self.kwargs = kwargs
		self.start()

	def start(self):
		self.stop_event = threading.Event()
		self.thread = threading.Thread(target=self._run)
		self.thread.start()

	def _run(self):
		while not self.stop_event.wait(self.interval):
			self.function(*self.args, **self.kwargs)

	def stop(self):
		self.stop_event.set()
		self.thread.join()

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument('--headless=new')

browser = webdriver.Chrome(options = chrome_options) # "./chromedriver.exe"

browser.get("https://www.youtube.com/watch?v=OUlCf8WlUVg")

found = False
timer = 0
def findTitles():
	global found
	global timer
	if found:
		timer.stop()
	heads = browser.find_elements(By.CSS_SELECTOR, "title, h1, h2")
	for head in heads:
		if (head.text.strip()):
			found = True
			print(f"title\t{head.text}")

timer = RepeatedTimer(1, findTitles)
