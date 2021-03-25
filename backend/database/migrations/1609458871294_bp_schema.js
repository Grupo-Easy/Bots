"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BpSchema extends Schema {
  up() {
    this.create("bps", (table) => {
      table.increments();
      table.string("Datas", 254).notNullable();
      table.string("Cartao", 254).notNullable();
      table.string("Km", 254).notNullable();
      table.string("Posto", 254).notNullable();
      table.string("Items", 254).notNullable();
      table.string("Produto", 254).notNullable();
      table.string("Quantidade", 254).notNullable();
      table.string("ValorTotal", 254).notNullable();
      table.string("NumeroDoNegocio", 254).notNullable();
      table.string("TipoDeTransacao", 254).notNullable();
      table.string("EstadoDeConfirmacao", 254).notNullable();
      table.string("ValorDoIssuer", 254).notNullable();
      table.string("NomePerfil", 254).notNullable();
      table.string("Resultado", 254).notNullable();
      table.string("Status", 254).notNullable();
      table.string("ValorDoSupplier", 254).notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("bps");
  }
}

module.exports = BpSchema;
