import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRoutes from './routes';
import { seedDatabase } from './store/seed';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));

app.use(
  cors({
    origin: [
      'http://localhost:3000', // frontend development server
      'http://127.0.0.1:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Base App',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', apiRoutes);

async function startServer() {
  // Seed database
  if (process.env.SEED_DATABASE === 'true') {
    try {
      await seedDatabase();
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }

  app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
  });
}

startServer();

export default app;
