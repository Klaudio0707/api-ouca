import express from 'express';
import cors from 'cors';
import {
  listarBd,
  postarNovoFormulario,
  atualizarFormulario,
  listarFichasInscricao,
  postarNovaFichaInscricao,
  atualizarFichaInscricao,
  listarServicos,
  postarNovoServico,
  atualizarServico,
  listarUsuarios,
  postarNovoUsuario,
  atualizarUsuario,
} from '../controllers/oucaController.js';

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  // Configura o middleware do Express
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rotas para a coleção "formularios"
  app.get('/formularios', listarBd); // Lista todos os formulários
  app.post('/formularios', postarNovoFormulario); // Cria um novo formulário
  app.put('/formularios/:id', atualizarFormulario); // Atualiza um formulário por ID

  // Rotas para a coleção "fichaInscricao"
  app.get('/fichaInscricao', listarFichasInscricao); // Lista todas as fichas de inscrição
  app.post('/fichaInscricao', postarNovaFichaInscricao); // Cria uma nova ficha de inscrição
  app.put('/fichaInscricao/:id', atualizarFichaInscricao); // Atualiza uma ficha de inscrição por ID

  // Rotas para a coleção "servicos"
  app.get('/servicos', listarServicos); // Lista todos os serviços
  app.post('/servicos', postarNovoServico); // Cria um novo serviço
  app.put('/servicos/:id', atualizarServico); // Atualiza um serviço por ID

  // Rotas para a coleção "usuarios"
  app.get('/usuarios', listarUsuarios); // Lista todos os usuários
  app.post('/usuarios', postarNovoUsuario); // Cria um novo usuário
  app.put('/usuarios/:id', atualizarUsuario); // Atualiza um usuário por ID
};

export default routes;
