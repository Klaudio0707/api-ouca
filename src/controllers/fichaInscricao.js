import {
  getFichasInscricao as modelGetFichasInscricao,
  createFichaInscricao as modelCreateFichaInscricao,
  atualizarFichaInscricao as modelAtualizarFichaInscricao,
  excluirFichaInscricao as modelExcluirFichaInscricao,
} from "../models/oucaModel.js";


export async function buscarFichaPorId(req, res) {
  const { id } = req.params;
  try {
    const ficha = await getFichaById(id);
    if (!ficha) {
      return res.status(404).json({ message: "Ficha não encontrada" });
    }
    res.status(200).json(ficha);
  } catch (erro) {
    console.error("Erro ao buscar ficha:", erro.message);
    res.status(500).json({ message: "Erro ao buscar ficha" });
  }
}

export async function listarFichasInscricao(req, res) {
  try {
    const fichas = await modelGetFichasInscricao();
    res.status(200).json(fichas);
  } catch (erro) {
    console.error("Erro ao listar fichas de inscrição:", erro.message);
    res.status(500).json({ message: "Erro ao listar fichas de inscrição" });
  }
}

export async function criarFichaInscricao(req, res) {
  const novaFicha = req.body;
  try {
    const resultado = await modelCreateFichaInscricao(novaFicha);
    res
      .status(201)
      .json({ message: "Ficha de inscrição criada com sucesso", id: resultado.insertedId });
  } catch (erro) {
    console.error("Erro ao criar ficha de inscrição:", erro.message);
    res.status(500).json({ message: "Erro ao criar ficha de inscrição" });
  }
}

export async function atualizarFichaInscricao(req, res) {
  const id = req.params.id;
  const fichaAtualizada = req.body;

  try {
    const resultado = await modelAtualizarFichaInscricao(id, fichaAtualizada);
    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ message: "Ficha de inscrição não encontrada" });
    }
    res.status(200).json({ message: "Ficha de inscrição atualizada com sucesso" });
  } catch (erro) {
    console.error("Erro ao atualizar ficha de inscrição:", erro.message);
    res.status(500).json({ message: "Erro ao atualizar ficha de inscrição" });
  }
}

export async function excluirFichaInscricao(req, res) {
  const id = req.params.id;

  try {
    const resultado = await modelExcluirFichaInscricao(id);
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Ficha de inscrição não encontrada" });
    }
    res.status(200).json({ message: "Ficha de inscrição excluída com sucesso" });
  } catch (erro) {
    console.error("Erro ao excluir ficha de inscrição:", erro.message);
    res.status(500).json({ message: "Erro ao excluir ficha de inscrição" });
  }
}
