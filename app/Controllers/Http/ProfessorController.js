'use strict'

const Professor = use('App/Models/Professor')

class ProfessorController {
  // Cadastrar professor
  async store ({ request, response }) {
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
    const professor = await Professor.create(data)
    return response.status(201).json(professor)
  }

  // Editar professor
  async update ({ params, request, response }) {
    const professor = await Professor.findOrFail(params.id)
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
    professor.merge(data)
    await professor.save()
    return response.json(professor)
  }

  // Excluir professor
  async destroy ({ params, response }) {
    const professor = await Professor.findOrFail(params.id)
    await professor.delete()
    return response.status(204).send()
  }

  // Consultar professor
  async show ({ params, response }) {
    const professor = await Professor.findOrFail(params.id)
    return response.json(professor)
  }

  // Listar todos os professores
  async index ({ response }) {
    const professores = await Professor.all()
    return response.json(professores)
  }
}

module.exports = ProfessorController
