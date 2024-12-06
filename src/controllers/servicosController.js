import {
  getServicos as modelGetServicos,
  createServico as modelCreateServico,
  atualizarServico as modelAtualizarServico,
  excluirServico as modelExcluirServico,
  getServicoById as modelGetServicoById, // Adicionando importação do model para obter serviço por ID
} from "../models/oucaModel.js";

// Lista todos os serviços
export async function listarServicos(req, res) {
  try {
    const servicos = await modelGetServicos();
    res.status(200).json(servicos);
  } catch (erro) {
    console.error("Erro ao listar serviços:", erro.message);
    res.status(500).json({ message: "Erro ao listar serviços" });
  }
}

// Cria um novo serviço
export async function criarServico(req, res) {
  const novoServico = req.body;
  try {
    const resultado = await modelCreateServico(novoServico);
    res
      .status(201)
      .json({ message: "Serviço criado com sucesso", id: resultado.insertedId });
  } catch (erro) {
    console.error("Erro ao criar serviço:", erro.message);
    res.status(500).json({ message: "Erro ao criar serviço" });
  }
}

// Atualiza um serviço por ID
export async function atualizarServico(req, res) {
  const id = req.params.id;
  const servicoAtualizado = req.body;

  try {
    const resultado = await modelAtualizarServico(id, servicoAtualizado);
    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    res.status(200).json({ message: "Serviço atualizado com sucesso" });
  } catch (erro) {
    console.error("Erro ao atualizar serviço:", erro.message);
    res.status(500).json({ message: "Erro ao atualizar serviço" });
  }
}

// Exclui um serviço por ID
export async function excluirServico(req, res) {
  const id = req.params.id;

  try {
    const resultado = await modelExcluirServico(id);
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    res.status(200).json({ message: "Serviço excluído com sucesso" });
  } catch (erro) {
    console.error("Erro ao excluir serviço:", erro.message);
    res.status(500).json({ message: "Erro ao excluir serviço" });
  }
}

// Busca um serviço por ID (Função adicionada)
export async function buscarServicoPorId(req, res) {
  const { id } = req.params;
  try {
    const servico = await modelGetServicoById(id);
    if (!servico) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }
    res.status(200).json(servico);
  } catch (erro) {
    console.error("Erro ao buscar serviço:", erro.message);
    res.status(500).json({ message: "Erro ao buscar serviço" });
  }
}
