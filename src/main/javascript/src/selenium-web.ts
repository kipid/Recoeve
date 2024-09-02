import { Builder, Browser, By, Key, until, WebDriver, WebElement } from 'selenium-webdriver';
import { ChromiumWebDriver } from 'selenium-webdriver/chromium';

(async function example(): Promise<void> {
  let driver:WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    driver.get('https://kipid.tistory.com/entry/Lists')
      .then(function findHeads() {
        const heads:Promise<WebElement[]> = driver.findElements(By.css('title, h1, h2'));
        heads.then((heads:WebElement[]) => {
          if (!heads.some(async (head:WebElement) => {
              let headText:string = await head.getText();
              headText = headText.replace(/\s/g, " ").trim();
              console.log(headText);
              return !!headText.length;
            })) {
            setTimeout(findHeads, 200);
          }
        });
      })
  } finally {
    driver.quit();
  }
})();
