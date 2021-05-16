"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ViaVerdeSchema extends Schema {
  up() {
    this.create("via_verdes", (table) => {
      table.increments();
      table.string("Contrato").notNullable();
      table.string("Matricula").notNullable();
      table.string("Descricao").notNullable();
      table.string("Pagamento").notNullable();
      table.string("Valor").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("via_verdes");
  }
}

module.exports = ViaVerdeSchema;
