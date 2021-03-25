"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PrioSchema extends Schema {
  up() {
    this.create("prios", (table) => {
      table.increments();
      table.string("Posto", 254).notNullable();
      table.string("Rede", 254).notNullable();
      table.string("Data", 254).notNullable();
      table.string("Cartao", 254).notNullable();
      table.string("Litros", 254).notNullable();
      table.string("Combustivel", 254).notNullable();
      table.string("Recibo", 254).notNullable();
      table.string("Kms", 254).notNullable();
      table.string("Idcond", 254).notNullable();
      table.string("Fatura", 254).notNullable();
      table.string("ValorUnit", 254).notNullable();
      table.string("Total", 254).notNullable();
      table.string("teste", 1);
      table.timestamps();
    });
  }

  down() {
    this.drop("prios");
  }
}

module.exports = PrioSchema;
