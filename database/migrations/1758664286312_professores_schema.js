'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessoresSchema extends Schema {
  up () {
    this.create('professores', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('email').notNullable().unique()
      table.string('matricula').notNullable().unique()
      table.date('data_nascimento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('professores')
  }
}

module.exports = ProfessoresSchema
