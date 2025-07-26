import express from 'express';
import authenticationRoutes from './routes/authenticationRoutes.js';
import widgetRoutes from './routes/widgetsRoutes.js';
import teamRoutses from './routes/teamRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import { initDatabase } from './database/mongodb.js';
import cors from 'cors';
import helmet from 'helmet';

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

app.use('/api/auth/', authenticationRoutes);
app.use('/api/widget/', widgetRoutes);
app.use('/api/todo/', todoRoutes);
app.use('/api/team/', teamRoutses);

export default app;