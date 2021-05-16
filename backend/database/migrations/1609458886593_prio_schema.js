"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PrioSchema extends Schema {
  up() {
    this.create("prios", (table) => {
      table.increments();
      table.string("Posto").notNullable();
      table.string("Rede").notNullable();
      table.string("Data").notNullable();
      table.string("Cartao").notNullable();
      table.string("Litros").notNullable();
      table.string("Combustivel").notNullable();
      table.string("Recibo").notNullable();
      table.string("Kms").notNullable();
      table.string("Idcond").notNullable();
      table.string("Fatura").notNullable();
      table.string("ValorUnit").notNullable();
      table.string("Total").notNullable();
      table.string("teste");
      table.timestamps();
    });
  }

  down() {
    this.drop("prios");
  }
}

module.exports = PrioSchema;
