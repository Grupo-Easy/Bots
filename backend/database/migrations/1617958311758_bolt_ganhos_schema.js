"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BoltGanhosSchema extends Schema {
  up() {
    this.create("bolt_ganhos", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("bolts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name");
      table.string("price");
      table.string("gived");
      table.timestamps();
    });
  }

  down() {
    this.drop("bolt_ganhos");
  }
}

module.exports = BoltGanhosSchema;
