"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UberSchema extends Schema {
  up() {
    this.create("ubers", (table) => {
      table.increments();
      table.string("Nome", 254).notNullable().unique();
      table.string("Despesas", 60).notNullable();
      table.string("GanhosDeViagens", 60).notNullable();
      table.string("Ganhos", 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("ubers");
  }
}

module.exports = UberSchema;
