require("dotenv").config();
const fs = require("fs");
const csv = require("csvtojson");
const axios = require("axios").default;

async function list_files(path) {
	const data = [];
	const response = await fs.readdirSync(path);
	for (let i = 0; i < response.length; i++) {
		const element = response[i];
		data.push(
			element.replace("Bolt - Order history - ", "").replace(".csv", "")
		);
	}
	return { path: response, data };
}

async function read_csv(path) {
	try {
		const result = await csv().fromFile(path);
		return JSON.stringify(result);
	} catch (err) {
		console.error(err);
	}
}

async function get_user_data(name) {
	try {
		const response = await axios.get(
			`${process.env.APP_HOST}/bot/bolt/driver`,
			{
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					name: name,
				},
			}
		);
		return response.data;
	} catch (err) {
		console.error(err);
	}
}

async function save_data(data, user) {
	for (let i = 0; i < data.length; i++) {
		console.log(i);
		const element = data[i];
		try {
			const response = await axios.post(
				`${process.env.APP_HOST}/bot/bolt/lucros`,
				{
					user_id: user.id,
					name: user.name,
					price: element["Pre�o da Gorjeta"],
					gived: element.Gorjeta,
					key: process.env.APP_KEY,
				}
			);
		} catch (err) {
			console.log(err);
		}
	}
}

async function run() {
	const files = await list_files("./files");

	for (let i = 0; i < files.path.length; i++) {
		const element = files.path[i];
		const data_file = JSON.parse(await read_csv(`./files/${element}`));
		const data_user = await get_user_data(files.data[i]);

		const response = save_data(data_file, data_user);
		if (response) {
			console.log("Salvado");
		} else {
			console.log("Deu um erro");
		}
	}
}
run();
// module.exports = run;
