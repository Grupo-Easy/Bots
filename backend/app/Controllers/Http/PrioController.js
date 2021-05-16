"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PrioTable = use("App/Models/Prio");

/**
 * Resourceful controller for interacting with prios
 */
class PrioController {
  async create({ request, response, view }) {
    const data = request.only([
      "Posto",
      "Rede",
      "Data",
      "Cartao",
      "Litros",
      "Combustivel",
      "Recibo",
      "Kms",
      "Idcond",
      "Fatura",
      "ValorUnit",
      "Total",
    ]);
    if (request.only(["key"]).key === `${process.env.REGISTER_KEY}`) {
      const table = await PrioTable.create(data);
      return table;
    }
    return response.status(401).json({ Error: "Invalid key" });
  }
}

module.exports = PrioController;
