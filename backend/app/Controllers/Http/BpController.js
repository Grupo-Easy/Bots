"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BpTable = use("App/Models/Bp");

/**
 * Resourceful controller for interacting with bps
 */
class BpController {
  /**
   * Show a list of all bps.
   * GET bps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new bp.
   * GET bps/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
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

  /**
   * Create/save a new bp.
   * POST bps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single bp.
   * GET bps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing bp.
   * GET bps/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update bp details.
   * PUT or PATCH bps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a bp with id.
   * DELETE bps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = BpController;
