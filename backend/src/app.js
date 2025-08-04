import express from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobs.js';
import problemsRoutes from './routes/problems.js';
import contactRoutes from './routes/contact.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Allowed origins: from .env or default values
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'https://my-tracker-coral.vercel.app', // ✅ Your deployed frontend
      'http://localhost:5173'               // Local development
    ];

// ✅ CORS setup
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

// ✅ Middleware
app.use(express.json());

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ API Routes
app.use('/api/jobs', jobsRoutes);
app.use('/api/problems', problemsRoutes);
app.use('/api/contact', contactRoutes);

export default app;
