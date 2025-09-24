'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sala extends Model {
  static get table () {
    return 'salas'
  }

  professor () {
    return this.belongsTo('App/Models/Professor')
  }

  alunos () {
    return this
      .belongsToMany('App/Models/Aluno')
      .pivotTable('aluno_sala')
  }
}

module.exports = Sala
