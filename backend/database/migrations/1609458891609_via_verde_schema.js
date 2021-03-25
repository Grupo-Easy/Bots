"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ViaVerdeSchema extends Schema {
  up() {
    this.create("via_verdes", (table) => {
      table.increments();
      table.string("Contrato", 60).notNullable();
      table.string("Matricula", 60).notNullable();
      table.string("Descricao", 124).notNullable();
      table.string("Pagamento", 124).notNullable();
      table.string("Valor", 124).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("via_verdes");
  }
}

module.exports = ViaVerdeSchema;
