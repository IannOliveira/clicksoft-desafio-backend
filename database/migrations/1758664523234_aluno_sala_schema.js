'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlunoSalaSchema extends Schema {
  up () {
    this.create('aluno_sala', (table) => {
      table.increments()
      table
        .integer('aluno_id')
        .unsigned()
        .references('id')
        .inTable('alunos')
        .onDelete('CASCADE')
      table
        .integer('sala_id')
        .unsigned()
        .references('id')
        .inTable('salas')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('aluno_salas')
  }
}

module.exports = AlunoSalaSchema
