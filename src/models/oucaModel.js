import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

// Conexão com o MongoDB
const client = new MongoClient(process.env.STRING_CONEXAO);

async function conectarAoBanco() {
  if (!client.isConnected) {
    await client.connect(); // Conecta ao banco caso não esteja conectado
  }
  return client.db("Oucadb"); // Retorna a referência do banco `Oucadb`
}

// Função para obter todos os formulários
export async function getFormularios() {
  const db = await conectarAoBanco();
  const colecao = db.collection("formularios");
  return await colecao.find().toArray();
}

// Função para criar um novo post
export async function createPost(novoPost) {
  const db = await conectarAoBanco();
  const colecao = db.collection("posts");
  return await colecao.insertOne(novoPost);
}

// Função para atualizar um post existente
export async function atualizarPost(id, novoPost) {
  const db = await conectarAoBanco();
  const colecao = db.collection("posts");
  return await colecao.updateOne(
    { _id: new ObjectId(id) },
    { $set: novoPost }
  );
}

// Função para excluir um post
export async function excluirPost(id) {
  const db = await conectarAoBanco();
  const colecao = db.collection("posts");
  return await colecao.deleteOne({ _id: new ObjectId(id) });
}
