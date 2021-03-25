"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FreeNowSchema extends Schema {
  up() {
    this.create("free_nows", (table) => {
      table.increments();
      table.string("id_freenow", 124).notNullable();
      table.string("motorista", 124).notNullable();
      table.string("rotas", 124).notNullable();
      table.string("horas", 124).notNullable();
      table.string("viagem", 124).notNullable();
      table.string("preco", 124).notNullable();
      table.string("extra", 124).notNullable();
      table.string("servico", 124).notNullable();
      table.string("metodo", 124).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("free_nows");
  }
}

module.exports = FreeNowSchema;
