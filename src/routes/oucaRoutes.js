import express from 'express';
import cors from 'cors';

import {
  listarFormularios,
  criarFormulario,
  atualizarFormulario,
  buscarFormularioPorId,
  excluirFormulario
} from '../controllers/formularioController.js';

import {
  listarFichasInscricao,
  criarFichaInscricao,
  atualizarFichaInscricao,
  buscarFichaPorId,
  excluirFichaInscricao
} from '../controllers/fichaInscricao.js';

import {
  listarServicos,
  criarServico,
  atualizarServico,
  buscarServicoPorId,
  excluirServico
} from '../controllers/servicosController.js';

import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  buscarUsuarioPorId,
  excluirUsuario
} from '../controllers/usersController.js';

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      `http://localhost:${process.env.PORT || 3000}`,
      'https://oucaminhvoz.netlify.app',
    ];

    // Permite origens que estão na lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // Para compatibilidade com navegadores antigos
};
const routes = (app) => {
  // Configura o middleware do Express
  app.use(express.json());
  app.use(cors(corsOptions));

  // *** Rotas para a coleção "formularios" ***
  app.get('/formularios', listarFormularios); // Lista todos os formulários
  app.get('/formularios/:id', buscarFormularioPorId); // Busca um formulário por ID
  app.post('/formularios', criarFormulario); // Cria um novo formulário
  app.put('/formularios/:id', atualizarFormulario); // Atualiza um formulário por ID
  app.delete('/formularios/:id', excluirFormulario); // Exclui um formulário por ID

  // *** Rotas para a coleção "fichaInscricao" ***
  app.get('/fichaInscricao', listarFichasInscricao); // Lista todas as fichas de inscrição
  app.get('/fichaInscricao/:id', buscarFichaPorId); // Busca uma ficha de inscrição por ID
  app.post('/fichaInscricao', criarFichaInscricao); // Cria uma nova ficha de inscrição
  app.put('/fichaInscricao/:id', atualizarFichaInscricao); // Atualiza uma ficha de inscrição por ID
  app.delete('/fichaInscricao/:id', excluirFichaInscricao); // Exclui uma ficha de inscrição por ID

  // *** Rotas para a coleção "servicos" ***
  app.get('/servicos', listarServicos); // Lista todos os serviços
  app.get('/servicos/:id', buscarServicoPorId); // Busca um serviço por ID
  app.post('/servicos', criarServico); // Cria um novo serviço
  app.put('/servicos/:id', atualizarServico); // Atualiza um serviço por ID
  app.delete('/servicos/:id', excluirServico); // Exclui um serviço por ID

  // *** Rotas para a coleção "usuarios" ***
  app.get('/users', listarUsuarios); // Lista todos os usuários
  app.get('/users/:id', buscarUsuarioPorId); // Busca um usuário por ID
  app.post('/users', criarUsuario); // Cria um novo usuário
  app.put('/users/:id', atualizarUsuario); // Atualiza um usuário por ID
  app.delete('/users/:id', excluirUsuario); // Exclui um usuário por ID
};

export default routes;
