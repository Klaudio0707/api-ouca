import express from 'express';
import cors from 'cors';
import { login } from '../controllers/authController.js';
import {
  listarFormularios,
  criarFormulario,
  atualizarFormulario,
  buscarFormularioPorId,
  excluirFormulario,
} from '../controllers/formularioController.js';

import {
  listarFichasInscricao,
  criarFichaInscricao,
  atualizarFichaInscricao,
  buscarFichaPorId,
  excluirFichaInscricao,
} from '../controllers/fichaInscricao.js';

import {
  listarServicos,
  criarServico,
  atualizarServico,
  buscarServicoPorId,
  excluirServico,
} from '../controllers/servicosController.js';

import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  buscarUsuarioPorId,
  excluirUsuario,
} from '../controllers/usersController.js';

const routes = (app) => {
  const router = express.Router();

  // Middleware global
  router.use(cors());
  router.use(express.json());

  // Rota de login
  router.post('/login', login);

  // Rotas para formulários
  router.get('/formularios', listarFormularios);
  router.get('/formularios/:id', buscarFormularioPorId);
  router.post('/formularios', criarFormulario);
  router.put('/formularios/:id', atualizarFormulario);
  router.delete('/formularios/:id', excluirFormulario);

  // Rotas para fichas de inscrição
  router.get('/fichaInscricao', listarFichasInscricao);
  router.get('/fichaInscricao/:id', buscarFichaPorId);
  router.post('/fichaInscricao', criarFichaInscricao);
  router.put('/fichaInscricao/:id', atualizarFichaInscricao);
  router.delete('/fichaInscricao/:id', excluirFichaInscricao);

  // Rotas para serviços
  router.get('/servicos', listarServicos);
  router.get('/servicos/:id', buscarServicoPorId);
  router.post('/servicos', criarServico);
  router.put('/servicos/:id', atualizarServico);
  router.delete('/servicos/:id', excluirServico);

  // Rotas para usuários
  router.get('/users', listarUsuarios);
  router.get('/users/:id', buscarUsuarioPorId);
  router.post('/users', criarUsuario);
  router.put('/users/:id', atualizarUsuario);
  router.delete('/users/:id', excluirUsuario);

  app.use('/api', router); // Prefixo "api" para todas as rotas
};

export default routes;
