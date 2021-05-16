"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bolts
 */
const bolt = use("App/Models/Bolt");
const utf8 = require("utf8");

class BoltController {
  async index() {
    return await bolt.all();
  }

  async create({ request, response }) {
    const data = request.only(["name", "status"]);
    const { key } = request.only(["key"]);

    if (process.env.APP_KEY !== key) {
      return response.status(401).send("?");
    }

    return await bolt.create(data);
  }

  async search({ request, response }) {
    const name = request.headers().name;
    console.log(name);
    const db = await bolt.findBy("name", `${name}`);
    if (db) {
      return db;
    }
    return response.status(404).send("");
  }

  async searchList() {
    var value = [];
    const db = await bolt.all();
    for (let i = 0; i < db.rows.length; i++) {
      const element = db.rows[i].$attributes.name;
      value.push(element);
    }
    return value;
  }
}

module.exports = BoltController;
