const puppetter = require("puppeteer");
const settings = require("./settings-FreeNow.json");

const Run = async () => {
	const browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		headless: false,
	});
	const page = await browser.newPage();
	await page.goto("https://portal.free-now.com/login");

	const CookieButton = await page.waitForXPath(
		"/html/body/div/div/div/div/div[2]/button[2]"
	);
	await CookieButton.click();

	const username = await page.waitForXPath(
		"/html/body/div/main/div/form/div[2]/input"
	);
	await username.type(settings.username);

	const password = await page.waitForXPath(
		"/html/body/div/main/div/form/div[3]/input"
	);
	await password.type(settings.password);

	const buttonLogin = await page.waitForXPath(
		"/html/body/div/main/div/form/button"
	);
	await buttonLogin.click();
	await page.waitForNavigation({ timeout: 30000 });
	await page.goto(
		"https://portal.free-now.com/booking-history?origin=kapten&lang=PT"
	);

	var id = [];
	var motorista = [];
	var rotas = [];
	var horas = [];
	var viagem = [];
	var preco = [];
	var extra = [];
	var servico = [];
	var metodo = [];

	while (true) {
		const getTotal = await page.evaluate(() => {
			var index = 2;
			while (true) {
				if (
					document.querySelector(
						`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${index})`
					) == null
				) {
					break;
				}
				index++;
			}
			return index;
		});

		const getid = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(1)`
				);
				itensArry.push(item.innerText || item);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getid != undefined) {
			id = [...id, ...getid];
		}

		const getmotorista = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(2)`
				);
				itensArry.push(item.innerText || item);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getmotorista != undefined) {
			motorista = [...motorista, ...getmotorista];
		}

		const getRota = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(3)`
				);
				itensArry.push(item.innerText || item);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getRota != undefined) {
			rotas = [...rotas, ...getRota];
		}

		const getHora = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(4)`
				);
				itensArry.push(item.innerText || item);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getHora != undefined) {
			horas = [...horas, ...getHora];
		}

		const getViagem = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(5)`
				);
				itensArry.push(item.innerText.replace("\n", " ") || item);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getViagem != undefined) {
			viagem = [...viagem, ...getViagem];
		}

		const getPreco = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(6)`
				);
				itensArry.push(
					item.innerText.replace("\n", " ").replace(" \n", " ") || item
				);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getPreco != undefined) {
			preco = [...preco, ...getPreco];
		}

		const getExtra = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(7)`
				);
				itensArry.push(
					item.innerText.replace("\n", " ").replace(" \n", " ") || item
				);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getExtra != undefined) {
			extra = [...extra, ...getExtra];
		}

		const getServico = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(8)`
				);
				itensArry.push(
					item.innerText.replace("\n", " ").replace(" \n", " ") || item
				);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getServico != undefined) {
			servico = [...servico, ...getServico];
		}
		const getMetodo = await page.evaluate((itens) => {
			const itensArry = [];
			for (var i = 2; i < itens; i++) {
				const item = document.querySelector(
					`#root > main > section > div.sc-iBPRYJ.igqca-d > div.sc-jeGSBP.iRgiNB > div > div:nth-child(${i}) > div:nth-child(9)`
				);
				itensArry.push(
					item.innerText.replace("\n", " ").replace(" \n", " ") || item
				);
			}
			return itensArry.reverse();
		}, getTotal);
		if (getMetodo != undefined) {
			metodo = [...metodo, ...getMetodo];
		}

		const isValidContinue = await page.evaluate(() => {
			const ExistButton = document.querySelector(
				"#root > main > section > div.sc-jSgupP.bzGtyn > div > div:nth-child(1) > button:nth-child(3)"
			).attributes.disabled;
			if (ExistButton == undefined) {
				return true;
			} else {
				return false;
			}
		});
		if (!isValidContinue) {
			break;
		}
		await page.click(
			"#root > main > section > div.sc-jSgupP.bzGtyn > div > div:nth-child(1) > button:nth-child(3)"
		);
		const sleep = (milliseconds) => {
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
		};
		await sleep(3000);
	}
	browser.close();
	return {
		id,
		motorista,
		rotas,
		horas,
		viagem,
		preco,
		extra,
		servico,
		metodo,
	};
};

module.exports = Run;
