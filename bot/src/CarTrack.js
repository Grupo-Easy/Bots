const puppeteer = require("puppeteer");
const settings = require("./settings-CarTrack.json");

(async () => {
	const browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		headless: false,
	});
	const page = await browser.newPage();
	await page.goto("https://fleetweb-pt.cartrack.com/login");
	const username = await page.waitForXPath(
		"/html/body/div[1]/div[3]/div[1]/div/div[2]/div/span/form/div[3]/div/input"
	);
	await username.type(settings.username);
	const password = await page.waitForXPath(
		"/html/body/div[1]/div[3]/div[1]/div/div[2]/div/span/form/div[4]/div/input"
	);
	await password.type(settings.password);

	const loginButton = await page.waitForXPath(
		"/html/body/div[1]/div[3]/div[1]/div/div[2]/div/span/form/button"
	);
	await loginButton.click();
	await page.waitForNavigation();
})();
