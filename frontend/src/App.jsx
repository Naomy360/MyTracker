import express from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobs.js';
import problemsRoutes from './routes/problems.js';
import contactRoutes from './routes/contact.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'https://my-tracker-coral.vercel.app', 
      'http://localhost:5173'              
    ];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  credentials: true
}));


app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/jobs', jobsRoutes);
app.use('/api/problems', problemsRoutes);
app.use('/api/contact', contactRoutes);

export default app;
