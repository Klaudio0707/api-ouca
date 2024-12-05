import { 
  getFormularios as modelGetFormularios,
  createFormulario as modelCreateFormulario,
  atualizarFormulario as modelAtualizarFormulario,
  excluirFormulario as modelExcluirFormulario 
} from "../models/oucaModel.js";

export async function listarFormularios(req, res) {
  try {
    const formularios = await modelGetFormularios();
    res.status(200).json(formularios);
  } catch (erro) {
    console.error('Erro ao listar formulários:', erro.message);
    res.status(500).json({ message: "Erro ao listar formulários" });
  }
}

export async function criarFormulario(req, res) {
  const novoFormulario = req.body;
  try {
    const resultado = await modelCreateFormulario(novoFormulario);
    res.status(201).json({ message: "Formulário criado com sucesso", id: resultado.insertedId });
  } catch (erro) {
    console.error('Erro ao criar formulário:', erro.message);
    res.status(500).json({ message: "Erro ao criar formulário" });
  }
}

export async function atualizarFormulario(req, res) {
  const id = req.params.id;
  const formularioAtualizado = req.body;

  try {
    const resultado = await modelAtualizarFormulario(id, formularioAtualizado);
    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ message: "Formulário não encontrado" });
    }
    res.status(200).json({ message: "Formulário atualizado com sucesso" });
  } catch (erro) {
    console.error('Erro ao atualizar formulário:', erro.message);
    res.status(500).json({ message: "Erro ao atualizar formulário" });
  }
}

export async function excluirFormulario(req, res) {
  const id = req.params.id;

  try {
    const resultado = await modelExcluirFormulario(id);
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Formulário não encontrado" });
    }
    res.status(200).json({ message: "Formulário excluído com sucesso" });
  } catch (erro) {
    console.error('Erro ao excluir formulário:', erro.message);
    res.status(500).json({ message: "Erro ao excluir formulário" });
  }
}
