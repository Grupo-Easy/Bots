"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const FreeNowTable = use("App/Models/FreeNow");

/**
 * Resourceful controller for interacting with freenows
 */
class FreeNowController {
  /**
   * Show a list of all freenows.
   * GET freenows
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new freenow.
   * GET freenows/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
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

  /**
   * Create/save a new freenow.
   * POST freenows
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single freenow.
   * GET freenows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing freenow.
   * GET freenows/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update freenow details.
   * PUT or PATCH freenows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a freenow with id.
   * DELETE freenows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = FreeNowController;
