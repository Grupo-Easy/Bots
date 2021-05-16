"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BoltSchema extends Schema {
  up() {
    this.create("bolts", (table) => {
      table.increments();
      table.string("name").notNullable().unique();
      table.string("status").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bolts");
  }
}

module.exports = BoltSchema;
