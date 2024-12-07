import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors'; 
import path from 'path';
import { fileURLToPath } from 'url';
import conectarAoBanco from './src/config/dbConfig.js';
import routes from './src/routes/oucaRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware para interpretar JSON
app.use(express.json());

// Configuração de CORS
const allowedOrigins = [
  'https://seu-frontend.netlify.app', // Substitua pelo domínio do seu app no Netlify
  'http://localhost:3000', // Para desenvolvimento local
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origem não permitida pelo CORS'));
      }
    },
  })
);

// Função para console estilizado
const log = {
  info: (message) => console.log(`✅ \x1b[32m${message}\x1b[0m`), // Verde
  warn: (message) => console.warn(`⚠️ \x1b[33m${message}\x1b[0m`), // Amarelo
  error: (message) => console.error(`❌ \x1b[31m${message}\x1b[0m`), // Vermelho
};

// Conexão com o MongoDB e inicialização do servidor
(async () => {
  try {
    log.info('Tentando conectar ao banco de dados...');
    const mongoClient = await conectarAoBanco(process.env.STRING_CONEXAO);
    app.locals.mongoClient = mongoClient; // Disponibiliza o cliente MongoDB para uso nos controladores
    log.info('Conexão com o MongoDB estabelecida com sucesso!');

    // Configuração de rotas
    routes(app); // `app` já foi inicializada

    // Inicia o servidor
    app.listen(PORT, () => {
      if (ENV === 'production') {
        log.info(`🚀 Servidor rodando em modo PRODUÇÃO na porta ${PORT}`);
      } else {
        log.warn(`🚀 Servidor rodando em modo DESENVOLVIMENTO na porta ${PORT}`);
      }
    });
  } catch (error) {
    log.error(`Erro ao conectar ao banco de dados: ${error.message}`);
    process.exit(1); // Encerra o processo em caso de falha
  }
})();
