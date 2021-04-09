"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const bolt = use("App/Models/BoltGanho");

class BoltGanhoController {
  async index({ params, response }) {
    const { key } = params;
    if (key !== process.env.APP_KEY) {
      return response.status(401).send("");
    }
    return await bolt.all();
  }
  async create({ request, response }) {
    const { key } = await request.only(["key"]);
    const data = await request.only(["user_id", "name", "price", "gived"]);

    if (key !== process.env.APP_KEY) {
      return response.status(401).send("");
    }

    const db = await bolt.create(data);
    return db;
  }
}

module.exports = BoltGanhoController;
