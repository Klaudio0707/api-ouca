import { ObjectId } from 'mongodb'; // Para lidar com IDs no MongoDB
import bcrypt from 'bcrypt'; // Opcional: Para criptografia de senhas (se necessário)
import dotenv from 'dotenv'; // Para carregar variáveis de ambiente

dotenv.config(); // Carrega as variáveis do arquivo .env

export const login = async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const db = req.app.locals.mongoClient.db('backendOuca');
      const usuario = await db.collection('users').findOne({ email });
  
      if (!usuario) {
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }
  
      if (usuario.senha !== senha) {
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }
  
      res.status(200).json({
        id: usuario._id,
        nome: usuario.nomeRepresentante,
        email: usuario.email,
        tipo: usuario.tipo,
      });
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      res.status(500).json({ message: 'Erro no servidor.' });
    }
  };
  