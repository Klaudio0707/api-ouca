import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import conectarAoBanco from './src/config/dbConfig.js'; // Importa a função de conexão com o banco
import routes from './src/routes/oucaRoutes.js'; // Importa as rotas configuradas no arquivo oucaRoutes

// Substitui __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express(); // Inicializa o app 

const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Conexão com o MongoDB e inicialização do servidor
(async () => {
  try {
    console.log('Tentando conectar ao banco de dados...');
    const mongoClient = await conectarAoBanco(process.env.STRING_CONEXAO);
    app.locals.mongoClient = mongoClient; // Disponibiliza o cliente MongoDB para uso nos controladores
    console.log('✅ Conexão com o MongoDB estabelecida com sucesso!');

    // Configuração de rotas
    routes(app); // `app` já foi inicializada

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`🌐 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message);
    process.exit(1); // Encerra o processo em caso de falha
  }
})();
