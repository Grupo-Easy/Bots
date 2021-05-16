"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BpSchema extends Schema {
  up() {
    this.create("bps", (table) => {
      table.increments();
      table.string("Datas").notNullable();
      table.string("Cartao").notNullable();
      table.string("Km").notNullable();
      table.string("Posto").notNullable();
      table.string("Items").notNullable();
      table.string("Produto").notNullable();
      table.string("Quantidade").notNullable();
      table.string("ValorTotal").notNullable();
      table.string("NumeroDoNegocio").notNullable();
      table.string("TipoDeTransacao").notNullable();
      table.string("EstadoDeConfirmacao").notNullable();
      table.string("ValorDoIssuer").notNullable();
      table.string("NomePerfil").notNullable();
      table.string("Resultado").notNullable();
      table.string("Status").notNullable();
      table.string("ValorDoSupplier").notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("bps");
  }
}

module.exports = BpSchema;
