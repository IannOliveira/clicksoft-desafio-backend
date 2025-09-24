'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlunosSchema extends Schema {
  up () {
    this.create('alunos', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('email').notNullable().unique()
      table.string('matricula').notNullable().unique()
      table.date('data_nascimento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('alunos')
  }
}

module.exports = AlunosSchema
