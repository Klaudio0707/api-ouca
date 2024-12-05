import { getFormularios, createPost, atualizarPost } from "../models/oucaModel.js";

export async function listarBd(req, res) {
  try {
    // Busca todos os formulários no banco de dados
    const resultado = await getFormularios();
    res.status(200).json(resultado); // Retorna os dados como JSON
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ message: "Erro ao listar dados do banco" });
  }
}

export async function postarNovoFormulario(req, res) {
  const novoFormulario = req.body; // Novo formulário enviado pelo cliente
  try {
    // Cria um novo registro no banco
    const formularioCriado = await createPost(novoFormulario);
    res.status(201).json({
      message: "Formulário criado com sucesso",
      id: formularioCriado.insertedId,
    });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ message: "Erro ao criar novo formulário" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id; // ID do post a ser atualizado
  const novoPost = req.body; // Dados atualizados enviados pelo cliente

  try {
    // Atualiza o post no banco
    const resultado = await atualizarPost(id, novoPost);

    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json({ message: "Post atualizado com sucesso" });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ message: "Erro ao atualizar post" });
  }
}
