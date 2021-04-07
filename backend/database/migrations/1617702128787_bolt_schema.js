"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BoltSchema extends Schema {
  up() {
    this.create("bolts", (table) => {
      table.increments();
      table.string("name", 124).notNullable().unique();
      table.string("status", 24).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bolts");
  }
}

module.exports = BoltSchema;
