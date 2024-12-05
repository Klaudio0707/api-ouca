import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import conectarAoBanco from './src/config/dbConfig.js'; // Importa a função de conexão com o banco

// Substitui __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'seu-token-seguro';
const dbPath = path.join(__dirname, 'db.json');

// Middleware
app.use(bodyParser.json());

// Verifica se o arquivo JSON existe, caso contrário, cria um vazio
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ users: [], empresas: [] }, null, 2));
}

// Middleware para autenticação
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: 'Acesso não autorizado' });
  }
  next();
};

// Lê o conteúdo do arquivo JSON
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Escreve dados no arquivo JSON
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Rotas
app.post('/auth/login', (req, res) => {
  const { email, senha } = req.body;
  const db = readDB();
  const user = db.users.find((u) => u.email === email && u.senha === senha);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  res.json({ user, token: AUTH_TOKEN });
});

app.get('/users/me', authenticate, (req, res) => {
  const db = readDB();
  const user = db.users.find((u) => u.email === req.body.email);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.json(user);
});

app.get('/empresas', authenticate, (req, res) => {
  const db = readDB();
  res.json(db.empresas);
});

app.post('/empresas', authenticate, (req, res) => {
  const novaEmpresa = req.body;
  const db = readDB();

  novaEmpresa.id = db.empresas.length + 1; // Define um ID simples
  db.empresas.push(novaEmpresa);
  writeDB(db);

  res.status(201).json(novaEmpresa);
});

// Conexão com o MongoDB
(async () => {
  try {
    console.log('Tentando conectar ao banco de dados...');
    const mongoClient = await conectarAoBanco(process.env.STRING_CONEXAO);
    app.locals.mongoClient = mongoClient; // Disponibiliza o cliente MongoDB para uso em rotas
    console.log('✅ Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message);
    process.exit(1); // Encerra o processo em caso de falha
  }
})();

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});




