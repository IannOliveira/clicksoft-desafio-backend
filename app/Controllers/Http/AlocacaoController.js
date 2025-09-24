'use strict'

const Sala = use('App/Models/Sala')
const Aluno = use('App/Models/Aluno')

class AlocacaoController {
  // Alocar aluno em sala
  async store ({ request, response }) {
    const { sala_id, aluno_id, professor_id } = request.only(['sala_id', 'aluno_id', 'professor_id'])

    // Verifica se sala existe
    const sala = await Sala.query().where('id', sala_id).with('alunos').first()
    if (!sala) {
      return response.status(404).json({ message: 'Sala não encontrada' })
    }

    // Verifica se professor é dono da sala
    if (sala.professor_id !== professor_id) {
      return response.status(403).json({ message: 'Você não tem permissão para alocar alunos nesta sala' })
    }

    // Verifica se aluno existe
    const aluno = await Aluno.find(aluno_id)
    if (!aluno) {
      return response.status(404).json({ message: 'Aluno não encontrado' })
    }

    // Verifica duplicidade
    const jaAlocado = await sala.alunos().where('aluno_id', aluno_id).first()
    if (jaAlocado) {
      return response.status(400).json({ message: 'Aluno já está alocado nesta sala' })
    }

    // Verifica capacidade
    const alunosCount = await sala.alunos().getCount()
    if (alunosCount >= sala.capacidade) {
      return response.status(400).json({ message: 'Capacidade da sala atingida' })
    }

    // Aloca aluno
    await sala.alunos().attach([aluno_id])

    return response.status(201).json({ message: 'Aluno alocado com sucesso' })
  }

  // Remover aluno de sala
  async destroy ({ request, response }) {
    const { sala_id, aluno_id, professor_id } = request.only(['sala_id', 'aluno_id', 'professor_id'])

    // Verifica se sala existe
    const sala = await Sala.find(sala_id)
    if (!sala) {
      return response.status(404).json({ message: 'Sala não encontrada' })
    }

    // Verifica se professor é dono da sala
    if (sala.professor_id !== professor_id) {
      return response.status(403).json({ message: 'Você não tem permissão para remover alunos desta sala' })
    }

    // Remove aluno
    await sala.alunos().detach([aluno_id])

    return response.json({ message: 'Aluno removido da sala com sucesso' })
  }

  // Listar alunos de uma sala
  async index ({ params, response }) {
    const sala = await Sala.query().where('id', params.id).with('alunos').first()
    if (!sala) {
      return response.status(404).json({ message: 'Sala não encontrada' })
    }

    return response.json(sala.toJSON().alunos)
  }
}

module.exports = AlocacaoController
