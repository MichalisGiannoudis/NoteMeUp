import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import helmet from 'helmet';
import { initDatabase } from './database/database.js';

const app = express();

await initDatabase();

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Protection']
}));
app.use(authRoutes);

export default app;