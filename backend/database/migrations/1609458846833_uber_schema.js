"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UberSchema extends Schema {
  up() {
    this.create("ubers", (table) => {
      table.increments();
      table.string("Nome").notNullable().unique();
      table.string("Despesas").notNullable();
      table.string("GanhosDeViagens").notNullable();
      table.string("Ganhos").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("ubers");
  }
}

module.exports = UberSchema;
