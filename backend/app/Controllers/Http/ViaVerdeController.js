"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ViaVerdeTable = use("App/Models/ViaVerde");

/**
 * Resourceful controller for interacting with viaverdes
 */
class ViaVerdeController {
  async create({ request, response, view }) {
    const data = request.only([
      "Contrato",
      "Matricula",
      "Descricao",
      "Pagamento",
      "Valor",
    ]);

    if (request.only(["key"]).key === `${process.env.REGISTER_KEY}`) {
      const table = await ViaVerdeTable.create(data);
      return table;
    }
    return response.status(401).json({ Error: "Invalid key" });
  }
}

module.exports = ViaVerdeController;
