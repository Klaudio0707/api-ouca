import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// Conexão com o MongoDB
const client = new MongoClient(process.env.STRING_CONEXAO);

async function conectarAoBanco() {
  if (!client.isConnected) {
    await client.connect(); // Conecta ao banco caso não esteja conectado
  }
  return client.db("backendOuca"); // Retorna a referência do banco
}

// *** Formulários ***


const UserSchema = new mongoose.Schema({
  nomeRepresentante: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['administrador', 'usuario'], // Exemplos de tipos de usuário
    default: 'usuario',
  },
}, {
  timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
});

// Criação do modelo User
export const User = mongoose.model('User', UserSchema);

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

// Busca um formulário por ID
export const getFormularioById = async (id) => {
  const db = await conectarAoBanco();
  const colecao = db.collection('formularios');
  return await colecao.findOne({ _id: new ObjectId(id) });
};

// *** Usuários ***

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

// Busca um usuário por ID
export async function getUserById(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("users");

  const usuario = await colecao.findOne({ _id: new ObjectId(id) });
  return usuario;
}
export async function getServicoById(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  // Usando ObjectId para garantir que o id está no formato correto do MongoDB
  const servico = await colecao.findOne({ _id: new ObjectId(id) });
  return servico;
}
// *** Serviços ***
// Função para obter todos os serviços
export async function getServicos() {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.find().toArray();
}

// Função para criar um novo serviço
export async function createServico(novoServico) {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.insertOne(novoServico);
}

// Função para atualizar um serviço por ID
export async function atualizarServico(id, novoServico) {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.updateOne(
    { _id: new ObjectId(id) },
    { $set: novoServico }
  );
}

// Função para excluir um serviço por ID
export async function excluirServico(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("servicos");
  return await colecao.deleteOne({ _id: new ObjectId(id) });
}


// *** Ficha de Inscrição ***

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

// Busca uma ficha de inscrição por ID
export async function getFichaInscricaoById(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("fichaInscricao");
  return await colecao.findOne({ _id: new ObjectId(id) });
}
