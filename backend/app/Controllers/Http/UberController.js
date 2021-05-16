"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UberTable = use("App/Models/Uber");

/**
 * Resourceful controller for interacting with ubers
 */
class UberController {
  async create({ request, response }) {
    const data = request.only([
      "Nome",
      "Despesas",
      "GanhosDeViagens",
      "Ganhos",
    ]);

    if (request.only(["key"]).key === `${process.env.REGISTER_KEY}`) {
      const table = await UberTable.create(data);
      return table;
    }
    return response.status(401).json({ Error: "Invalid key" });
  }
}

module.exports = UberController;
