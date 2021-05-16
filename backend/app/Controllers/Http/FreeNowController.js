"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const FreeNowTable = use("App/Models/FreeNow");

/**
 * Resourceful controller for interacting with freenows
 */
class FreeNowController {
  async create({ request, response, view }) {
    const data = request.only([
      "id_freenow",
      "motorista",
      "rotas",
      "horas",
      "viagem",
      "preco",
      "extra",
      "servico",
      "metodo",
    ]);
    if (request.only(["key"]).key === `${process.env.REGISTER_KEY}`) {
      const table = await FreeNowTable.create(data);
      return table;
    }
    return response.status(401).json({ Error: "Invalid key" });
  }
}

module.exports = FreeNowController;
