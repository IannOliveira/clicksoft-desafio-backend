'use strict'

const Aluno = use('App/Models/Aluno')

class AlunoController {
  // Cadastrar aluno
  async store ({ request, response }) {
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
    const aluno = await Aluno.create(data)
    return response.status(201).json(aluno)
  }

  // Editar aluno
  async update ({ params, request, response }) {
    const aluno = await Aluno.findOrFail(params.id)
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])
    aluno.merge(data)
    await aluno.save()
    return response.json(aluno)
  }

  // Excluir aluno
  async destroy ({ params, response }) {
    const aluno = await Aluno.findOrFail(params.id)
    await aluno.delete()
    return response.status(204).send()
  }

  // Consultar aluno
  async show ({ params, response }) {
    const aluno = await Aluno.findOrFail(params.id)
    return response.json(aluno)
  }

  // Listar todos os alunos
  async index ({ response }) {
    const alunos = await Aluno.all()
    return response.json(alunos)
  }

  // Consultar salas de um aluno
  async salas ({ params, response }) {
    const aluno = await Aluno.query()
      .where('id', params.id)
      .with('salas.professor')
      .first()

    if (!aluno) {
      return response.status(404).json({ message: 'Aluno não encontrado' })
    }

    const alunoData = aluno.toJSON()

    // Monta a resposta no formato solicitado
    const resultado = {
      aluno: alunoData.nome,
      salas: alunoData.salas.map(sala => ({
        professor: sala.professor.nome,
        numero_sala: sala.numero_sala
      }))
    }

    return response.json(resultado)
  }

}

module.exports = AlunoController
