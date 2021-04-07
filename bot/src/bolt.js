require("dotenv").config();
const puppeteer = require("puppeteer");
const axios = require("axios").default;
const config = require("./bolt.json");

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
		headless: true,
	});

	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
	);
	await page.goto("https://fleets.bolt.eu/login");
	await login(page, config.auth);

	async function exist_warn(xpath) {
		if ((await page.$(xpath)) !== null) {
			console.log("Ok invalid credentials");
			browser.close();
			process.exit(1);
		} else {
			await delay(2500);
			if (await verify(page, config.warnings["valid-in-dashboard"])) {
				const response = await data(page);
				for (let i = 0; i < response.length; i++) {
					const element = response[i];
					try {
						await axios.post(`${process.env.APP_HOST}/bot/bolt`, {
							...element,
							key: process.env.APP_KEY,
						});
					} catch (err) {}
				}
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
