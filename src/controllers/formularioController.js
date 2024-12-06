import { 
  getFormularios, 
  createFormulario, 
  atualizarFormulario as atualizarFormularioModel, 
  excluirFormulario as excluirFormularioModel, // Renomeando para evitar conflito
  getFormularioById 
} from "../models/oucaModel.js";

// Lista todos os formulários
export async function listarFormularios(req, res) {
  try {
    const formularios = await getFormularios();
    res.status(200).json(formularios);
  } catch (erro) {
    console.error("Erro ao listar formulários:", erro.message);
    res.status(500).json({ message: "Erro ao listar formulários" });
  }
}

// Busca um formulário por ID
export async function buscarFormularioPorId(req, res) {
  const { id } = req.params;
  try {
    const formulario = await getFormularioById(id);
    if (!formulario) {
      return res.status(404).json({ message: "Formulário não encontrado" });
    }
    res.status(200).json(formulario);
  } catch (erro) {
    console.error("Erro ao buscar formulário:", erro.message);
    res.status(500).json({ message: "Erro ao buscar formulário" });
  }
}

// Cria um novo formulário
export async function criarFormulario(req, res) {
  const novoFormulario = req.body;
  try {
    const resultado = await createFormulario(novoFormulario);
    res.status(201).json({ message: "Formulário criado com sucesso", id: resultado.insertedId });
  } catch (erro) {
    console.error("Erro ao criar formulário:", erro.message);
    res.status(500).json({ message: "Erro ao criar formulário" });
  }
}

// Atualiza um formulário por ID
export async function atualizarFormulario(req, res) {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const resultado = await atualizarFormularioModel(id, dadosAtualizados);
    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ message: "Formulário não encontrado" });
    }
    res.status(200).json({ message: "Formulário atualizado com sucesso" });
  } catch (erro) {
    console.error("Erro ao atualizar formulário:", erro.message);
    res.status(500).json({ message: "Erro ao atualizar formulário" });
  }
}

// Exclui um formulário por ID
export async function excluirFormulario(req, res) {
  const { id } = req.params;
  try {
    const resultado = await excluirFormularioModel(id); // Usando a versão renomeada
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Formulário não encontrado" });
    }
    res.status(200).json({ message: "Formulário excluído com sucesso" });
  } catch (erro) {
    console.error("Erro ao excluir formulário:", erro.message);
    res.status(500).json({ message: "Erro ao excluir formulário" });
  }
}

