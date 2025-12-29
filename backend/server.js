import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './config/db.js';
import sequelize from './config/db.js';
import './models/index.js'; 

dotenv.config();
const app = express();

// CORS é uma abreviação de Cross-Origin Resource Sharing. É um mecanismo que usa cabeçalhos HTTP adicionais para permitir que um user agent (geralmente um navegador) obtenha permissão para acessar recursos selecionados de um servidor, em um domínio diferente daquele do qual o primeiro recurso foi servido.
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});


app.use('/api/auth', authRoutes);

app.get('/api/health', (res) => {
  res.json({ status: 'OK' });
});

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    console.log('✅ DB synced');
        
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();