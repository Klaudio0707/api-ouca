import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

// Conexão com o MongoDB
const client = new MongoClient(process.env.STRING_CONEXAO);

async function conectarAoBanco() {
  if (!client.isConnected) {
    await client.connect(); // Conecta ao banco caso não esteja conectado
  }
  return client.db("backendOuca"); // Retorna a referência do banco
}

// Obtém todos os formulários
export const getFormularios = async () => {
  const db = await conectarAoBanco();
  return await db.collection('formularios').find().toArray();
};

// Cria um novo formulário
export const createFormulario = async (formulario) => {
  const db = await conectarAoBanco();
  return await db.collection('formularios').insertOne(formulario);
};

// Atualiza um formulário por ID
export const atualizarFormulario = async (id, formularioAtualizado) => {
  const db = await conectarAoBanco();
  return await db.collection('formularios').updateOne(
    { _id: new ObjectId(id) },
    { $set: formularioAtualizado }
  );
};

// Exclui um formulário por ID
export const excluirFormulario = async (id) => {
  const db = await conectarAoBanco();
  return await db.collection('formularios').deleteOne({ _id: new ObjectId(id) });
};

// ** Usuários **

// Obtém todos os usuários
export async function getUsers() {
  const db = await conectarAoBanco();
  const colecao = db.collection("users");
  return await colecao.find().toArray();
}

// Cria um novo usuário
export async function createUser(novoUsuario) {
  const db = await conectarAoBanco();
  const colecao = db.collection("users");
  return await colecao.insertOne(novoUsuario);
}

// Atualiza um usuário por ID
export async function atualizarUser(id, novoUsuario) {
  const db = await conectarAoBanco();
  const colecao = db.collection("users");
  return await colecao.updateOne(
    { _id: new ObjectId(id) },
    { $set: novoUsuario }
  );
}

// Exclui um usuário por ID
export async function excluirUser(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("users");
  return await colecao.deleteOne({ _id: new ObjectId(id) });
}

// Função para obter um usuário por ID
export async function getUserById(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("users");

  // Usando ObjectId para garantir que o id está no formato correto do MongoDB
  const usuario = await colecao.findOne({ _id: new ObjectId(id) });

  return usuario;
}

// ** Serviços **

// Obtém todos os serviços
export async function getServicos() {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.find().toArray();
}

// Cria um novo serviço
export async function createServico(novoServico) {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.insertOne(novoServico);
}

// Atualiza um serviço por ID
export async function atualizarServico(id, novoServico) {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.updateOne(
    { _id: new ObjectId(id) },
    { $set: novoServico }
  );
}

// Exclui um serviço por ID
export async function excluirServico(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.deleteOne({ _id: new ObjectId(id) });
}

// ** Ficha de Inscrição **

// Obtém todas as fichas de inscrição
export async function getFichasInscricao() {
  const db = await conectarAoBanco();
  const colecao = db.collection("fichaInscricao");
  return await colecao.find().toArray();
}

// Cria uma nova ficha de inscrição
export async function createFichaInscricao(novaFicha) {
  const db = await conectarAoBanco();
  const colecao = db.collection("fichaInscricao");
  return await colecao.insertOne(novaFicha);
}

// Atualiza uma ficha de inscrição por ID
export async function atualizarFichaInscricao(id, novaFicha) {
  const db = await conectarAoBanco();
  const colecao = db.collection("fichaInscricao");
  return await colecao.updateOne(
    { _id: new ObjectId(id) },
    { $set: novaFicha }
  );
}

// Exclui uma ficha de inscrição por ID
export async function excluirFichaInscricao(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("fichaInscricao");
  return await colecao.deleteOne({ _id: new ObjectId(id) });
}
