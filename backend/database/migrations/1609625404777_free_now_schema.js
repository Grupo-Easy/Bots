"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FreeNowSchema extends Schema {
  up() {
    this.create("free_nows", (table) => {
      table.increments();
      table.string("id_freenow").notNullable();
      table.string("motorista").notNullable();
      table.string("rotas").notNullable();
      table.string("horas").notNullable();
      table.string("viagem").notNullable();
      table.string("preco").notNullable();
      table.string("extra").notNullable();
      table.string("servico").notNullable();
      table.string("metodo").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("free_nows");
  }
}

module.exports = FreeNowSchema;
