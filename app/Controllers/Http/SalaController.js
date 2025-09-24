'use strict'

const Sala = use('App/Models/Sala')
const Professor = use('App/Models/Professor')

class SalaController {
  // Criar sala
  async store ({ request, response }) {
    const data = request.only(['numero_sala', 'capacidade', 'disponibilidade', 'professor_id'])

    const professor = await Professor.find(data.professor_id)

    if (!professor) {
      return response.status(404).json({
        message: 'Professor não encontrado. Verifique o professor_id informado.'
      })
    }

    const sala = await Sala.create(data)
    return response.status(201).json(sala)
  }

  // Editar sala
  async update ({ params, request, response }) {
    const sala = await Sala.findOrFail(params.id)
    const data = request.only(['numero_sala', 'capacidade', 'disponibilidade'])
    sala.merge(data)
    await sala.save()
    return response.json(sala)
  }

  // Excluir sala
  async destroy ({ params, response }) {
    const sala = await Sala.findOrFail(params.id)
    await sala.delete()
    return response.status(204).send()
  }

  // Consultar sala
  async show ({ params, response }) {
    const sala = await Sala.query()
      .where('id', params.id)
      .with('professor')
      .with('alunos')
      .firstOrFail()

    return response.json(sala)
  }

  // Listar todas as salas
  async index ({ response }) {
    const salas = await Sala.query().with('professor').fetch()
    return response.json(salas)
  }
}

module.exports = SalaController
