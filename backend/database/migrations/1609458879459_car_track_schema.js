'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarTrackSchema extends Schema {
  up () {
    this.create('car_tracks', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('car_tracks')
  }
}

module.exports = CarTrackSchema
