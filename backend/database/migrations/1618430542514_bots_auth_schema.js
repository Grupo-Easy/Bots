"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BotsAuthSchema extends Schema {
  up() {
    this.create("bots_auths", (table) => {
      table.increments();
      table.string("name");
      table.timestamps();
    });
  }

  down() {
    this.drop("bots_auths");
  }
}

module.exports = BotsAuthSchema;
