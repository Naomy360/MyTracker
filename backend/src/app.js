import express from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobs.js';
import problemsRoutes from './routes/problems.js';
import contactRoutes from './routes/contact.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/jobs', jobsRoutes);
app.use('/api/problems', problemsRoutes);
app.use('/api/contact', contactRoutes);

export default app;
