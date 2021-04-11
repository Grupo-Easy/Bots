require("dotenv").config();
const puppeteer = require("puppeteer");
const axios = require("axios").default;
const config = require("./bolt.json");
const push = require("../components/push");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function login(page, auth) {
	const usernameInput = await page.waitForXPath(config["login-username-xpath"]);
	await usernameInput.type(auth.username);
	const passwordInput = await page.waitForXPath(config["login-password-xpath"]);
	await passwordInput.type(auth.password);

	const buttonInput = await page.waitForXPath(config["login-button-xpath"]);
	await buttonInput.click();
}

async function recursive_date(page, selector) {
	const result = await page.evaluate((query) => {
		const values = [];
		const Elements = document.querySelectorAll(query);
		for (let i = 0; i < Elements.length; i++) {
			const element = Elements[i].innerText;
			values.push(element);
		}
		return values;
	}, selector);
	return result;
}
async function data(page) {
	const data = [];
	const name = await recursive_date(page, config.dashboard.name);
	const status = await recursive_date(page, config.dashboard.status);

	for (let i = 0; i < name.length; i++) {
		const elementName = name[i];
		const elementStatus = status[i];
		data.push({ name: elementName, status: elementStatus });
	}

	return data;
}

async function verify(page, selector) {
	if ((await page.$(selector)) !== null) {
		return true;
	}
	return false;
}

async function run() {
	const browser = await puppeteer.launch({
		headless: false,
	});

	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
	);
	await page._client.send("Page.setDownloadBehavior", {
		behavior: "allow",
		downloadPath: "./files",
	});
	await page.goto("https://fleets.bolt.eu/login");
	await login(page, config.auth);

	async function get_all_users() {
		try {
			const response = await axios.get(`${process.env.APP_HOST}/bot/bolt`);
			return response.data;
		} catch (err) {
			return false;
		}
	}

	async function click_selector(page, path) {
		page.evaluate((path) => {
			document.querySelector(path).click();
			console.log("?");
			console.log(path);
		}, path);
	}

	async function download(page, xpath) {
		const download = await page.waitForXPath(xpath);
		await download.click();
		await delay(2500);
		await page.reload();
	}

	async function write_input(page, selector, text) {
		await page.waitForSelector(selector);
		await page.type(selector, text);
		await page.waitForSelector("div>div>ul>li");
		await page.click("div>div>ul>li");
		await download(
			page,
			"/html/body/div[1]/div/div/div/div[2]/div[2]/div[5]/div[2]/a"
		);
	}

	async function get_csv_all_users(page) {
		const users = await get_all_users();
		console.log(users);
		await page.click(config.pages["history-order"]);
		for (let i = 0; i < users.length; i++) {
			const element = users[i];
			await page.waitForSelector(
				"div.col-sm-4 > span > div > div > span > span.bs-caret"
			);
			await click_selector(
				page,
				"div.col-sm-4 > span > div > div > span > span.bs-caret"
			);

			await write_input(
				page,
				"div.col-sm-4 > span > div > div > span > span.bs-caret",
				element.name
			);
		}
	}

	async function exist_warn(xpath) {
		if ((await page.$(xpath)) !== null) {
			console.log("Ok invalid credentials");
			browser.close();
			process.exit(1);
		} else {
			await delay(2500);
			console.log("Ok");
			if (await verify(page, config.warnings["valid-in-dashboard"])) {
				const response = await data(page);
				for (let i = 0; i < response.length; i++) {
					const element = response[i];

					try {
						console.log(element);
						const resp = await axios.post(`${process.env.APP_HOST}/bot/bolt`, {
							...element,
							key: process.env.APP_KEY,
						});
					} catch (err) {
						console.log(err);
					}
				}
				console.log("what");
				await get_csv_all_users(page);
				await push();
				browser.close();
				process.exit(1);
			} else {
				console.log("Tô no dash não");
			}
		}
	}

	await setTimeout(
		async (config) => {
			await exist_warn(config.warnings["invalid-auth"]);
			await page.screenshot({
				path: "teste.jpg",
			});
		},
		2500,
		config
	);
}

run();
