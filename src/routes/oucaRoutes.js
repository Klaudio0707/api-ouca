import express from 'express';
import cors from 'cors';

import { listarFormularios, criarFormulario, atualizarFormulario } from '../controllers/formularioController.js';
import { listarFichasInscricao, criarFichaInscricao, atualizarFichaInscricao } from '../controllers/fichaInscricao.js';
import { listarServicos, criarServico, atualizarServico } from '../controllers/servicosController.js';
import { listarUsuarios, criarUsuario, atualizarUsuario } from '../controllers/usersController.js';

const corsOptions = {
  origin: `http://localhost:${process.env.PORT || 3000}`,
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  // Configura o middleware do Express
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rotas para a coleção "formularios"
  app.get('/formularios', listarFormularios); // Lista todos os formulários
  app.post('/formularios', criarFormulario); // Cria um novo formulário
  app.put('/formularios/:id', atualizarFormulario); // Atualiza um formulário por ID

  // Rotas para a coleção "fichaInscricao"
  app.get('/fichaInscricao', listarFichasInscricao); // Lista todas as fichas de inscrição
  app.post('/fichaInscricao', criarFichaInscricao); // Cria uma nova ficha de inscrição
  app.put('/fichaInscricao/:id', atualizarFichaInscricao); // Atualiza uma ficha de inscrição por ID

  // Rotas para a coleção "servicos"
  app.get('/servicos', listarServicos); // Lista todos os serviços
  app.post('/servicos', criarServico); // Cria um novo serviço
  app.put('/servicos/:id', atualizarServico); // Atualiza um serviço por ID

  // Rotas para a coleção "usuarios"
  app.get('/users', listarUsuarios); // Lista todos os usuários
  app.post('/users', criarUsuario); // Cria um novo usuário
  app.put('/users/:id', atualizarUsuario); // Atualiza um usuário por ID
};

export default routes;
