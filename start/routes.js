'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  Route.get('alunos', 'AlunoController.index')
  Route.post('alunos', 'AlunoController.store')
  Route.get('alunos/:id', 'AlunoController.show')
  Route.put('alunos/:id', 'AlunoController.update')
  Route.delete('alunos/:id', 'AlunoController.destroy')
  Route.get('alunos/:id/salas', 'AlunoController.salas')
})

Route.group(() => {
  Route.get('professores', 'ProfessorController.index')
  Route.post('professores', 'ProfessorController.store')
  Route.get('professores/:id', 'ProfessorController.show')
  Route.put('professores/:id', 'ProfessorController.update')
  Route.delete('professores/:id', 'ProfessorController.destroy')
})

Route.group(() => {
  Route.get('salas', 'SalaController.index')
  Route.post('salas', 'SalaController.store')
  Route.get('salas/:id', 'SalaController.show')
  Route.put('salas/:id', 'SalaController.update')
  Route.delete('salas/:id', 'SalaController.destroy')
})

Route.group(() => {
  Route.post('alocacoes', 'AlocacaoController.store')
  Route.delete('alocacoes', 'AlocacaoController.destroy')
  Route.get('salas/:id/alunos', 'AlocacaoController.index')
})
