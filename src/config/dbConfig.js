import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConexao);

    console.log('Tentando conectar ao banco de dados...');
    await mongoClient.connect();

    console.log('✅ Conexão com o MongoDB estabelecida com sucesso!');
    console.log(`🌐 Banco conectado no cluster: ${mongoClient.options.srvHost || 'localhost'}`);
    
    return mongoClient;
  } catch (erro) {
    console.error('❌ Falha na conexão com o banco de dados:', erro.message);
    process.exit(1); // Encerra o processo em caso de erro na conexão
  }
}

export async function fecharConexao() {
  if (mongoClient) {
    try {
      await mongoClient.close();
      console.log('Conexão com o MongoDB encerrada.');
    } catch (erro) {
      console.error('Erro ao encerrar conexão com o MongoDB:', erro);
    }
  }
}
