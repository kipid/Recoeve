import { Browser, Builder, By, WebDriver, WebElement } from "selenium-webdriver";

(async function example(): Promise<void> {
	let driver: WebDriver = await new Builder().forBrowser(Browser.CHROME).build();
	try {
		await driver.get('https://kipid.tistory.com/entry/Lists');
		await findHeads(driver);
	} finally {
		await driver.quit();
	}
})();

async function findHeads(driver: WebDriver): Promise<void> {
	const heads: WebElement[] = await driver.findElements(By.css('title, h1, h2'));
	for (const head of heads) {
		let headText: string = await head.getText();
		headText = headText.replace(/\s/g, ' ').trim();
		console.log(headText);
		if (headText.length) {
			return; // Exit the loop if we find a non-empty headText
		}
	}
	setTimeout(() => findHeads(driver), 200);
}
