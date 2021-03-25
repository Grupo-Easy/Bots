"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PrioTable = use("App/Models/Prio");

/**
 * Resourceful controller for interacting with prios
 */
class PrioController {
  /**
   * Show a list of all prios.
   * GET prios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new prio.
   * GET prios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
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

  /**
   * Create/save a new prio.
   * POST prios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single prio.
   * GET prios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing prio.
   * GET prios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update prio details.
   * PUT or PATCH prios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a prio with id.
   * DELETE prios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = PrioController;
