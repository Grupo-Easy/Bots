"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const bolt = use("App/Models/BoltGanho");
const utf8 = require("utf8");

class BoltGanhoController {
  async index({ params, response }) {
    const { key } = params;
    if (key !== process.env.APP_KEY) {
      return response.status(401).send("");
    }
    return await bolt.all();
  }

  async create({ request, response }) {
    const { key } = await request.only(["key"]);
    const data = await request.only(["user_id", "name", "price", "gived"]);

    if (key !== process.env.APP_KEY) {
      return response.status(401).send("");
    }

    const db = await bolt.create(data);
    return db;
  }

  async search({ request, response }) {
    const { name, key } = request.headers();
    console.log(name);
    var data = name.indexOf("Ã§Ã£");
    if (data > -1) {
      data = utf8.decode(name);
    } else {
      data = name;
    }
    if (key !== process.env.APP_KEY) {
      return response.status(401).send("");
    }

    try {
      const db = await bolt.query().select("*").where("name", data).fetch();

      return response.status(200).send(db);
    } catch (err) {
      console.log(err);
      return response.status(404).send({ name: data, err });
    }
  }
}

module.exports = BoltGanhoController;
