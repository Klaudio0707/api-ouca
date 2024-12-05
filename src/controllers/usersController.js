import {
  getUsers as modelGetUsers,
  createUser as modelCreateUser,
  atualizarUser as modelAtualizarUser,
  excluirUser as modelExcluirUser,
} from "../models/oucaModel.js";

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await modelGetUsers();
    res.status(200).json(usuarios);
  } catch (erro) {
    console.error("Erro ao listar usuários:", erro.message);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
}

export async function criarUsuario(req, res) {
  const novoUsuario = req.body;
  try {
    const resultado = await modelCreateUser(novoUsuario);
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", id: resultado.insertedId });
  } catch (erro) {
    console.error("Erro ao criar usuário:", erro.message);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
}

export async function atualizarUsuario(req, res) {
  const id = req.params.id;
  const usuarioAtualizado = req.body;

  try {
    const resultado = await modelAtualizarUser(id, usuarioAtualizado);
    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (erro) {
    console.error("Erro ao atualizar usuário:", erro.message);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
}

export async function excluirUsuario(req, res) {
  const id = req.params.id;

  try {
    const resultado = await modelExcluirUser(id);
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (erro) {
    console.error("Erro ao excluir usuário:", erro.message);
    res.status(500).json({ message: "Erro ao excluir usuário" });
  }
}
