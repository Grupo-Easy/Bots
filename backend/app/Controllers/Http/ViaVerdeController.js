"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ViaVerdeTable = use("App/Models/ViaVerde");

/**
 * Resourceful controller for interacting with viaverdes
 */
class ViaVerdeController {
  /**
   * Show a list of all viaverdes.
   * GET viaverdes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new viaverde.
   * GET viaverdes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
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

  /**
   * Create/save a new viaverde.
   * POST viaverdes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single viaverde.
   * GET viaverdes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing viaverde.
   * GET viaverdes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update viaverde details.
   * PUT or PATCH viaverdes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a viaverde with id.
   * DELETE viaverdes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ViaVerdeController;
