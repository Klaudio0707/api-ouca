import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

// Conexão com o MongoDB
const client = new MongoClient(process.env.STRING_CONEXAO);

async function conectarAoBanco() {
  if (!client.isConnected) {
    await client.connect(); // Conecta ao banco caso não esteja conectado
  }
  return client.db("backendOuca"); // Retorna a referência do banco `Oucadb`
}

// Função para obter todos os formulários
export async function getFormularios() {
  const db = await conectarAoBanco();
  const colecao = db.collection("formularios");
  return await colecao.find().toArray();
}

// Função para criar um novo post
export async function createPost(novoFormulario) {
  const db = await conectarAoBanco();
  const colecao = db.collection("formularios");
  return await colecao.insertOne(novoFormulario);
}

// Função para atualizar um post existente
export async function atualizarPost(id, novoFormulario) {
  const db = await conectarAoBanco();
  const colecao = db.collection("formularios");
  return await colecao.updateOne(
    { _id: new ObjectId(id) },
    { $set: novoFormulario }
  );
}

// Função para excluir um post
export async function excluirPost(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("formularios");
  return await colecao.deleteOne({ _id: new ObjectId(id) });
}
