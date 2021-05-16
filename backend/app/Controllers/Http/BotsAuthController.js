"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bot = use("App/Models/BotsAuth");
const crypto = require("crypto");
class BotsAuthController {
  async index() {
    return await Bot.all();
  }

  async create({ request, response }) {
    const data = request.only(["name", "token"]);

    async function encrypt(text) {
      var ciper = crypto.createCipheriv("aes-256-gcm", process.env.APP_KEY);
      var hash = ciper.update(text, "hex", "utf-8");
      hash += ciper.final("hex");
      return hash;
    }

    try {
      if (data.token !== process.env.APP_KEY) {
        return response.status(401).send("");
      }

      const db = await Bot.create({
        name: data.name,
      });
      console.log(db);

      return db;
    } catch (err) {
      console.error(err);

      return response.status(500).send("");
    }
  }
}

module.exports = BotsAuthController;
