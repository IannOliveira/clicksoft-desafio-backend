'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AlunoSala extends Model {
  static get table () {
    return 'aluno_sala'
  }
}

module.exports = AlunoSala
