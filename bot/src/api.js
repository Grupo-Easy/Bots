require("dotenv/config");
const axios = require("axios").default;

const api = axios.create({
  baseURL: `${process.env.APP_DB_API}`,
});

module.exports = api;
