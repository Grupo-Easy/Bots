"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BpTable = use("App/Models/Bp");

/**
 * Resourceful controller for interacting with bps
 */
class BpController {
  async create({ request, response }) {
    const data = request.only([
      "Datas",
      "Cartao",
      "Km",
      "Posto",
      "Items",
      "Produto",
      "Quantidade",
      "ValorTotal",
      "NumeroDoNegocio",
      "TipoDeTransacao",
      "EstadoDeConfirmacao",
      "ValorDoIssuer",
      "NomePerfil",
      "Resultado",
      "Status",
      "ValorDoSupplier",
    ]);
    if (request.only(["key"]).key === `${process.env.REGISTER_KEY}`) {
      const table = await BpTable.create(data);
      return table;
    }
    return response.status(401).json({ Error: "Invalid key" });
  }
}

module.exports = BpController;
