const puppeteer = require("puppeteer");

const Run1 = async () => {
	const browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		headless: false,
	});
	const page = await browser.newPage();
	const cookies = [
		{
			name: "jwt-session",
			value:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDkyODAxODksImV4cCI6MTYwOTM2NjU4OX0.D4FB9PLBrMMVjynR8IMjmmjVuSFJig7Os0ox2RH1MwQ",
			domain: "drivers.uber.com",
			path: "/",
			expires: 1609366589.430829,
			size: 139,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "AMP_TOKEN",
			value: "%24RETRIEVING",
			domain: ".uber.com",
			path: "/",
			expires: 1609280215,
			size: 22,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_ua",
			value:
				'{"session_id":"4727c93c-a402-47d2-a754-61276392ba8f","session_time_ms":1609280189293}',
			domain: "drivers.uber.com",
			path: "/",
			expires: -1,
			size: 88,
			httpOnly: false,
			secure: true,
			session: true,
		},
		{
			name: "_fbp",
			value: "fb.1.1609280185462.1758938344",
			domain: ".uber.com",
			path: "/",
			expires: 1617056192,
			size: 33,
			httpOnly: false,
			secure: false,
			session: false,
			sameSite: "Lax",
		},
		{
			name: "utag_main",
			value:
				"v_id:0176b092ddda001bbad3150aa3b203067009805f00bd0$_sn:1$_ss:0$_st:1609281991533$ses_id:1609280183771%3Bexp-session$_pn:2%3Bexp-session",
			domain: ".uber.com",
			path: "/",
			expires: 1640816191,
			size: 144,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_gcl_au",
			value: "1.1.1338736359.1609280185",
			domain: ".uber.com",
			path: "/",
			expires: 1617056192,
			size: 32,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "fsid",
			value: "a7i87dfl-aqom-juor-trrx-4rsv0x109dea",
			domain: ".drivers.uber.com",
			path: "/",
			expires: 1611872192.629779,
			size: 40,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "csid",
			value: "1.1611872188417.uIYm4lcaUnuIervHUFXfxb8UpNwAD7SjGLd0u0Mo+5U=",
			domain: ".drivers.uber.com",
			path: "/",
			expires: 1611872188.512856,
			size: 64,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "deviceCookieID",
			value: "060fd2a2-5010-4583-8ac0-e00b9d16dab0",
			domain: ".uber.com",
			path: "/",
			expires: -1,
			size: 50,
			httpOnly: true,
			secure: true,
			session: true,
		},
		{
			name: "auth_ga_trigger",
			value: "main",
			domain: ".uber.com",
			path: "/",
			expires: -1,
			size: 19,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "segmentCookie",
			value: "b",
			domain: ".uber.com",
			path: "/",
			expires: 4102358400,
			size: 14,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "privacyStatment",
			value:
				'Utilizamos cookies para fornecer uma experiência personalizada e segura para os usuários. Você pode obter mais informações em nossa <a href="https://www.uber.com/legal/privacy/cookies">Declaração de Cookies</a>.',
			domain: "drivers.uber.com",
			path: "/",
			expires: -1,
			size: 233,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "partners-platform-cookie",
			value:
				"QX1wS8TUhcV8_pWXOfj3Xg.-HNb1Wo4nIkIHvvm23_wcFIIXB8OGxLSer7ew-08i1oP592s0IaeczvO0wP9RjN-cUw2mMTU1a-EMYDgndS9UtVGWSgHMwL1EoHLZf7Dg4nFJH5bFtmOiWeWjyMTIylVQztfI2jtVX7mk6Bq3oBaQ1yKkguyRf30EwPUyizcpJOV6nwusFxfglvTGWALppjC5R_0PrOgFVixp-zmmFwJTYSS878fk6KJ2y-QRj-Xlcr5_EUNT9qRicBhJ_neRLyDAhpazZpcH5-xgnRYCT1RqIV-ra9xFumqhgy8X3divmVd6xGxlS1FntEOFk_N8-_Ir0A8Uf8WIkYC9AipBVByQRfviNtr_7fnc-gw_5K0-UsxHyIpuDJeuINpWyHqc0qIH3SzsDcNXEZLvdZ-tcj1VSSFlm7nAlbRVbah9UxtwAoed_zMwflZ0-iNbavFjNDLsksykeJE-gOzEiYdtLcC9lPlTePo7NEqNWsVyzavgC-ALVxbVUoWj7NWWqc_1ncg_ZVpmVgPQwPw7Nw595KoBaHAhIHPqAXjd1petyR9sD6BDi4TAUrJpoASKo2RC4GUbCl-inxfZC0YZYEy4J49ZOySCEP-boUu2r9tBVjMEYMgvDWWm_v_vu-eise3k9_CYQJkHjWrhrorAcxOwXbG0LvuAbOjKWT2cM_-aSWxSuocsmjwRtwZhO5H2kFTT0wvBrBKF7gTVWiPk0b5OSAhMgN7L-BOS9gS0TnzWF8u1KoBVG8cytaIHcJPyLqZegZIyDm1f_K6v3s-eii8ARtcCd-TYvGtZrg7b4s77ATGEBoSi2uRL-E5ia5oQAvkv2XY.1609280188426.1209600000.LiJMtwelQ__MwOxvWKDyR4cOX5U3y0nIEoKP8eGTgVI",
			domain: "drivers.uber.com",
			path: "/",
			expires: 1610489789.407357,
			size: 948,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "OPTOUTMULTI",
			value: "",
			domain: ".uber.com",
			path: "/",
			expires: 1617056191,
			size: 11,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "marketing_vistor_id",
			value: "47a2668a-bf9b-4af8-8712-d17ca2d51430",
			domain: ".uber.com",
			path: "/",
			expires: 1640816188.186952,
			size: 55,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "sid",
			value:
				"QA.CAESEH8aytMZ9UhYpVogYTmSVWMYvO_MgAYiATEqJDk1ZjQyNzhkLTBmYzktNGU3OS05NjVhLWYxMTM3MzY0Y2ZmYTI8XeJi3EUsdRg8lI8Y783tRIyCsdtRkeEw13nBKIxvx8dkWJm2fpx2A7s9tCt5XalZun5g2ook0i1SsjBtOgExQgh1YmVyLmNvbQ.K5idzy2e_0FlNbiBM2-PVHXFpBi-TwMnGVusw3yqzzU",
			domain: ".uber.com",
			path: "/",
			expires: 1611872188.187024,
			size: 240,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "_ua",
			value:
				"%7B%22session_id%22%3A%224727c93c-a402-47d2-a754-61276392ba8f%22%2C%22session_time_ms%22%3A1609280189293%7D",
			domain: "drivers.uber.com",
			path: "/p3/fleet-manager",
			expires: -1,
			size: 110,
			httpOnly: false,
			secure: false,
			session: true,
		},
	];
	await page.setCookie(...cookies);
	await page.goto("https://drivers.uber.com");
	await page.cookies("https://drivers.uber.com");
	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};
	await sleep(15000);

	const names = await page.evaluate(async () => {
		var index = 1;
		var nameArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div._style_Kk61b > div._style_1xJXmb > div`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const nameText = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div._style_Kk61b > div._style_1xJXmb > div`
			);
			nameArry.push(nameText.innerText || nameText);
		}
		return nameArry;
	});

	const despesas = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(2) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(2) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});

	const ganhosDeViagens = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(3) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(3) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});

	const ganhos = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(4) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(4) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});
	browser.close();
	return { names, despesas, ganhosDeViagens, ganhos };
};

const Run2 = async () => {
	const browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	const page = await browser.newPage();
	const cookies = [
		{
			name: "csid",
			value: "1.KSsp/OpdW1yq1rNGiMKZo6xc0gvMdeJH+pnLgqVd8IQ=",
			domain: ".auth.uber.com",
			path: "/",
			expires: 1611945638.246768,
			size: 50,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "sid",
			value:
				"QA.CAESEAF6gBKhNkZ8r8jNG93NoUYYpq3RgAYiATEqJGI2NjkwYWVhLWU5YmYtNGI4MS05ZGU5LWNhYjZkN2ExZGRhNjJAJqnWMOZhZyq07j5dUKBeINXiO4rqtMhDniOV6e0CYQUDFvOkq5HX8tutdmNcsfDjzY3OcTefQPRHDW0j7WddQzoBMUIIdWJlci5jb20.V_BjeOGnvB7ibxxRF0u6t1L7y0rYAF05muctJ5FyDVY",
			domain: ".uber.com",
			path: "/",
			expires: 1611945638.246706,
			size: 245,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "udi-id",
			value:
				"NCNvI4YacumFqrz5dbflSfWkWiqrnWcvDVSeECG1p1pPrmcvgLsW6ImKnwPHipR8jeYycShDsskzUj%2FTENEkoulu%2F1qrmux5bs9qxF%2BDaSmrPIFXM7OoL5gKeb4e1vc4DRTbZCt5PQOtGmGgiiRGKrjF2DmWnR42Ce%2Bk3p1K0AhxMazpNYnkpso%2BFcF78LUvkUcp7XoRU3f1xlFxFx9N4Q%3D%3Df1HmywEMVPNwptRCUO12CQ%3D%3DQ6TYCbCvkz5RsUAd13lWupiA2QNzXA79bdJfir4q9vM%3D",
			domain: "auth.uber.com",
			path: "/",
			expires: 1924712996.956925,
			size: 310,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "utag_main",
			value:
				"v_id:0176b4e9a5c5000fe710106f39c603067009805f00bd0$_sn:1$_ss:0$_st:1609355442337$ses_id:1609352979912%3Bexp-session$_pn:2%3Bexp-session",
			domain: ".uber.com",
			path: "/",
			expires: 1640889642,
			size: 144,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_gcl_au",
			value: "1.1.1160486520.1609352981",
			domain: ".uber.com",
			path: "/",
			expires: 1617129650,
			size: 32,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "udi-fingerprint",
			value:
				"c6BQbipU6jySbTHlYp26lutbwIPe58ashqPtm5nEanXzPOAz8swUmZhY4NAPK2B4oFQW%2BPOm3wMsc1WV7FJyFw%3D%3DvcIgWmJuepSNve3%2BrIEFySR%2FNonGy4Og1Aoi9Vzzh8E%3D",
			domain: "auth.uber.com",
			path: "/",
			expires: 1924712981.725295,
			size: 159,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "arch-frontend:sess",
			value:
				"YFhKn-yzS6N1ubqGk-oglA.kvyTEos-GWfcJbHLtwhT6lPc7dP6IDm1Qz4WzlOUGAn0-CDD0X7mBGfizYZEeOEneMQpMelvFOy1NoSa5btk0ALDc4Zkt3swp2uIsD_fSxxws4_KeNgyTT7RBvW30Yb2rxcv0mWtMN9cKAr2gQJgfvMhe_quETu2EKWgC1OdbvrQlwVNIg9ntWQSFY2m5jR2zv-jVxuDCRCTQKRfVPXeyG1XBHTRkrPOrvpueY_LcFlw9mgoqEbflKOW3mYdBH8dVvtXz0kgb6s0nKrHSNjPtl7KF0TOuwIUKpfeUCRjYvOgJUQgl78muMtGm48Wbb0QGP23vKsQB99dxk7tuhDlCQs0Atj0Q9XU4Ud6MBfyNTiJ2ephFhLEHOTgbBAOYlzkf9K25xm-xglv4ZrjhsiD1V9p8E8AOU4llsxXnkpgJHcRedVcPqgWhnE0VF1FsM_dtOIZlS0YYCjjlVqgOM1twmy8lKdHa1QySF95gnrFI38FtBu7_9-ltOmKgP1TXWAeiN1mXOkmTPZQ_IBsKQd6vJ1F7AIWVRVP112bLKETbYjjGfmQnHwiB39qxCYyrPTaXwPZfOznB5JB7vaNYF8syOeyWnYb-mForJpX4L_-rq95KpnIawbdusuzjbssVCTB6e_VgG4gHgKMGKsaRzVa3hqf6l-IymnZod5ogHXr4E16BDCEd6Q3lv8e_3wWbKgJjFggPkHqgscn_r8vgx78jeVRsoTGOjNvB7X-7J9QXG-OLuM8vJKGUAlej8bfzfhkTyeMtHMjDonUGqhLyL1Qv_XI_mqv3Aje6G8MaR5JuX_1SrKnecqElDtpJcVKUysrcgIz2YSHq82eUMDlgC5KW-PSAsVVJ57Pwf9rHKFS-z-hOsKLcpgu8bLJuWGsj8rb_gYvjDLGDibCNm0OKOSS4A.1609352978954.1209600000.kvDKQhTN4CGQpyvovc21Pd3EFjcs0xpQaBP_IYEDqA4",
			domain: "auth.uber.com",
			path: "/",
			expires: 1610562579.246875,
			size: 1028,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "segmentCookie",
			value: "b",
			domain: ".uber.com",
			path: "/",
			expires: 4102358400,
			size: 14,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_ua",
			value:
				"%7B%22id%22%3A%225ed29c40-a090-4619-8e9d-496a84933481%22%2C%22ts%22%3A1609352979628%7D",
			domain: "auth.uber.com",
			path: "/",
			expires: -1,
			size: 89,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "_fbp",
			value: "fb.1.1609352981444.2028108975",
			domain: ".uber.com",
			path: "/",
			expires: 1617129644,
			size: 33,
			httpOnly: false,
			secure: false,
			session: false,
			sameSite: "Lax",
		},
		{
			name: "_ga",
			value: "GA1.2.1477258459.1609352991",
			domain: ".uber.com",
			path: "/",
			expires: 1672425652,
			size: 30,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_cc",
			value: "AQkRj9EU8NtFbiTcjxxqLQ8w",
			domain: "auth.uber.com",
			path: "/",
			expires: 1640878180,
			size: 27,
			httpOnly: false,
			secure: true,
			session: false,
			sameSite: "None",
		},
		{
			name: "deviceCookieID",
			value: "a338b4ee-094d-489d-9506-cd6ddbfc6bbf",
			domain: ".uber.com",
			path: "/",
			expires: -1,
			size: 50,
			httpOnly: true,
			secure: true,
			session: true,
		},
		{
			name: "auth_ga_trigger",
			value: "main",
			domain: ".uber.com",
			path: "/",
			expires: -1,
			size: 19,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "privacyStatment",
			value:
				'Utilizamos cookies para fornecer uma experiência personalizada e segura para os usuários. Você pode obter mais informações em nossa <a href="https://www.uber.com/legal/privacy/cookies">Declaração de Cookies</a>.',
			domain: "auth.uber.com",
			path: "/",
			expires: -1,
			size: 233,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "_gid",
			value: "GA1.2.506527814.1609352991",
			domain: ".uber.com",
			path: "/",
			expires: 1609440052,
			size: 30,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "OPTOUTMULTI",
			value: "",
			domain: ".uber.com",
			path: "/",
			expires: 1617129642,
			size: 11,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "marketing_vistor_id",
			value: "26023713-0a35-49d2-b836-907b559a8383",
			domain: ".uber.com",
			path: "/",
			expires: 1640889638.246622,
			size: 55,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_ua",
			value:
				"%7B%22id%22%3A%225ed29c40-a090-4619-8e9d-496a84933481%22%2C%22ts%22%3A1609352979628%7D",
			domain: "auth.uber.com",
			path: "/login",
			expires: -1,
			size: 89,
			httpOnly: false,
			secure: false,
			session: true,
		},
	];
	await page.setCookie(...cookies);
	await page.goto("https://drivers.uber.com");
	await page.cookies("https://drivers.uber.com");
	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};
	await sleep(15000);

	const names = await page.evaluate(async () => {
		var index = 1;
		var nameArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div._style_Kk61b > div._style_1xJXmb > div`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const nameText = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div._style_Kk61b > div._style_1xJXmb > div`
			);
			nameArry.push(nameText.innerText || nameText);
		}
		return nameArry;
	});

	const despesas = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(2) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(2) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});

	const ganhosDeViagens = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(3) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(3) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});

	const ganhos = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(4) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(4) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});
	browser.close();
	return { names, despesas, ganhosDeViagens, ganhos };
};

const Run3 = async () => {
	const browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	const page = await browser.newPage();
	const cookies = [
		{
			name: "csid",
			value: "1.0AibR8G70Oo2vZvUCmXz70Nv1Nflr8KPnV56JHcZn7M=",
			domain: ".auth.uber.com",
			path: "/",
			expires: 1611952391.098343,
			size: 50,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "sid",
			value:
				"QA.CAESELbgVaPpGk51nhMd0ddijMwYhuLRgAYiATEqJGRlZTljNzY3LWY2MzktNDk5Yy05ZGIzLTJjNTE3ZmQyMmFkZDJALZpAMOro2ucWDUFlFQNNN3WrJE1OXaaYat7-Z_uDdgASQOBWY5XjYzFaltQunEl932RRSrQ1NE13khnYZpSDWjoBMUIIdWJlci5jb20.eaSZ-EGFaCrrfb6zbg0dmJKttoUbS6NBwJOIE88AkJs",
			domain: ".uber.com",
			path: "/",
			expires: 1611952391.098322,
			size: 245,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "_gat_tealium_0",
			value: "1",
			domain: ".uber.com",
			path: "/",
			expires: 1609360450,
			size: 15,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "udi-id",
			value:
				"G8Q5fX6jP7XlwEOQ%2Fj3nMDoiqJlfwn1q6RwbgC9Zd%2Fb08mjEJOl%2BlxIbvyzhqdEJzI%2F6M%2Bs8CRf%2FLOukgMcN1Bj%2BNcim72iUFE25rwo0jYyxlz1froyvG3wfxNLvW5k7KYTd4%2FzUIrsTFNft3xmUZxNNSBQgGbVerLG3yc6%2BU9JHKoH6zmfINRsIZN1UVlyCF7HfdBarNVNCUWUp9PlOwA%3D%3DtubnPYcmLBEV9J03z%2FF5UA%3D%3DdU%2F%2F7NjAlpX4%2FtcpMgMBLvL0WrWQcyNVq%2FWtWdoapLw%3D",
			domain: "auth.uber.com",
			path: "/",
			expires: 1924720025.278915,
			size: 328,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "utag_main",
			value:
				"v_id:0176b55513190075e2f22dae996003067009905f00bd0$_sn:1$_ss:0$_st:1609362193980$ses_id:1609360020251%3Bexp-session$_pn:2%3Bexp-session",
			domain: ".uber.com",
			path: "/",
			expires: 1640896393,
			size: 144,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_gcl_au",
			value: "1.1.1956708976.1609360022",
			domain: ".uber.com",
			path: "/",
			expires: 1617136401,
			size: 32,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "udi-fingerprint",
			value:
				"x27PEz6nWOZrD%2BRp7EN6pAPN0BcH7WynJGN9qcCPD%2FoOGssih7AbpdVfZPpLycqQNOqeJijz5x1yLfI3kXyAhA%3D%3DxblT4dc2sHUpDipdQI%2FRaehlXaCqkbLQeMTN%2FVmvycg%3D",
			domain: "auth.uber.com",
			path: "/",
			expires: 1924720022.182442,
			size: 161,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "arch-frontend:sess",
			value:
				"VUQU9lqCHWnW28geagFXUQ.-3TP0rB4IT8ww3gvv_7Q5XySLRcHvN2STvRl62saE3DR95Od3d8QjWneqG85zVh-wHVXuQG1HrX-SBWqVLplfnITGXlHgnCN2db8hkaPzrGZ8fePT6aenknz-4v2f1-pJlQVc68HW-u5C5M2obYfFvqv11tFp7dN4liagBV5Qkckti53JwhlODQESwkXzQgSvNlry5RSf-fF4r3R5WBxBkyM3n78rBbdvfl2ab7SjB36G8bFVOZEAXJE38Tj2R38MZH2xxhX_71BojAoXoaxACSCfZyuEuFsdosmo4YY6uibqjObE8zA_kmYrEh_ehjCESNnpKrTMxePBsTL-T-SLvNt852xu0dn-vi18OJ2bTcB4mYxZdls0XSOenyot8XfnWMvafqxByUgd6wGH0kmTgwHRa6hti4AChrCPNB5eP2D_wdHZALX4kEt_ANWj0wSqUy-RImmsLuSMQcjSNjXBrUub-Hy-xARgTlTo9vMoSJnrPfMhQFsoUGSZZabiFYPDQT4lW4FoZoj1pKOma9wJSaCmxW5AhbJkbIf2PWzWgRowAHrZpxfgzVnlZGRUnW0lCL0viTZ5eiXz851oOxsTJmOdqcV5QvDYPyWROGWWm4wvmRVNcYVGR6tmUlQPklYCyNJ4E0BO-D1IY5aUvYf3kU3RhGMbFz7o__bSNFhlj_M2TowBTWwLIeLCduORibNo4gFJb4Pji_nHn7cPrgu6s4yiGQv1CE4GV_YLEA3LYOYx4_j56o3TMqKnsXLStVBnpGU90vyNyd1mtLA3kO1k5v-RdqrX2gKw_VLHae3xFbsYTrDT2vOl5E-rlJd8cu98bTiyN3hohOPdwtYjrJTg6DWGRb2RABd4DfUAmmNK7FbiMjMpQ9nNdQKYp2gPZ8f.1609360019296.1209600000.fS0SqqEGEKwgv_PeG2LR0T9a9RK1MVl9yNDF6AK8Igo",
			domain: "auth.uber.com",
			path: "/",
			expires: 1610569621.098398,
			size: 1006,
			httpOnly: true,
			secure: true,
			session: false,
		},
		{
			name: "segmentCookie",
			value: "a",
			domain: ".uber.com",
			path: "/",
			expires: 4102358400,
			size: 14,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_ua",
			value:
				"%7B%22id%22%3A%22b8cdb44a-5730-4e03-f079-62cbb10591b7%22%2C%22ts%22%3A1609360020064%7D",
			domain: "auth.uber.com",
			path: "/",
			expires: -1,
			size: 89,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "_fbp",
			value: "fb.1.1609360021926.1783482901",
			domain: ".uber.com",
			path: "/",
			expires: 1617136396,
			size: 33,
			httpOnly: false,
			secure: false,
			session: false,
			sameSite: "Lax",
		},
		{
			name: "_ga",
			value: "GA1.2.80564157.1609360032",
			domain: ".uber.com",
			path: "/",
			expires: 1672432404,
			size: 28,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_cc",
			value: "AbvX%2Fx6sNbNy5lt1%2FOfv5hvg",
			domain: "auth.uber.com",
			path: "/",
			expires: 1640885220,
			size: 31,
			httpOnly: false,
			secure: true,
			session: false,
			sameSite: "None",
		},
		{
			name: "deviceCookieID",
			value: "6389f073-0f6c-4313-bfb6-f0804552c322",
			domain: ".uber.com",
			path: "/",
			expires: -1,
			size: 50,
			httpOnly: true,
			secure: true,
			session: true,
		},
		{
			name: "auth_ga_trigger",
			value: "main",
			domain: ".uber.com",
			path: "/",
			expires: -1,
			size: 19,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "AMP_TOKEN",
			value: "%24ERROR",
			domain: ".uber.com",
			path: "/",
			expires: 1609360434,
			size: 17,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "privacyStatment",
			value:
				'Utilizamos cookies para fornecer uma experiência personalizada e segura para os usuários. Você pode obter mais informações em nossa <a href="https://www.uber.com/legal/privacy/cookies">Declaração de Cookies</a>.',
			domain: "auth.uber.com",
			path: "/",
			expires: -1,
			size: 233,
			httpOnly: false,
			secure: false,
			session: true,
		},
		{
			name: "_gid",
			value: "GA1.2.1829687319.1609360032",
			domain: ".uber.com",
			path: "/",
			expires: 1609446804,
			size: 31,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "OPTOUTMULTI",
			value: "",
			domain: ".uber.com",
			path: "/",
			expires: 1617136393,
			size: 11,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "marketing_vistor_id",
			value: "17087f08-de24-40e0-ad68-5b93dd8db08b",
			domain: ".uber.com",
			path: "/",
			expires: 1640896390.098264,
			size: 55,
			httpOnly: false,
			secure: false,
			session: false,
		},
		{
			name: "_ua",
			value:
				"%7B%22id%22%3A%22b8cdb44a-5730-4e03-f079-62cbb10591b7%22%2C%22ts%22%3A1609360020064%7D",
			domain: "auth.uber.com",
			path: "/login",
			expires: -1,
			size: 89,
			httpOnly: false,
			secure: false,
			session: true,
		},
	];
	await page.setCookie(...cookies);
	await page.goto("https://drivers.uber.com");
	await page.cookies("https://drivers.uber.com");
	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};
	await sleep(15000);

	const names = await page.evaluate(async () => {
		var index = 1;
		var nameArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div._style_Kk61b > div._style_1xJXmb > div`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const nameText = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div._style_Kk61b > div._style_1xJXmb > div`
			);
			nameArry.push(nameText.innerText || nameText);
		}
		return nameArry;
	});

	const despesas = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(2) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(2) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});

	const ganhosDeViagens = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(3) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(3) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});

	const ganhos = await page.evaluate(async () => {
		var index = 1;
		var despesasArry = [];
		while (true) {
			if (
				document.querySelector(
					`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${index}) > div:nth-child(4) > div > span`
				)
			) {
				index++;
			} else {
				break;
			}
		}
		for (var i = 1; i < index; i++) {
			const data = await document.querySelector(
				`#app-content > div > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div._style_2nzcKA > div._style_uc2Ng > div._style_1idVfP > div._style_Kk61b > div > div:nth-child(${i}) > div:nth-child(4) > div > span`
			);
			despesasArry.push(data.innerText.replace("€", "") || data);
		}
		return despesasArry;
	});
	browser.close();
	return { names, despesas, ganhosDeViagens, ganhos };
};
// Run1();
module.exports = { Run1, Run2, Run3 };
