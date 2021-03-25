"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UberTable = use("App/Models/Uber");

/**
 * Resourceful controller for interacting with ubers
 */
class UberController {
  /**
   * Show a list of all ubers.
   * GET ubers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new uber.
   * GET ubers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response }) {
    // "Nome", "Despesas", "GanhosDeViagem", "Ganhos"
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

  /**
   * Create/save a new uber.
   * POST ubers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single uber.
   * GET ubers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing uber.
   * GET ubers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update uber details.
   * PUT or PATCH ubers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a uber with id.
   * DELETE ubers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = UberController;
