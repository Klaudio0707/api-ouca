import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

const uri = process.env.MONGODB_URI;

async function testConnection() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Conexão com o MongoDB estabelecida com sucesso!");
    mongoose.connection.close(); // Fecha a conexão após o teste
  } catch (error) {
    console.error("❌ Falha na conexão com o MongoDB:", error.message);
  }
}

testConnection();
