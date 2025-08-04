import express from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobs.js';
import problemsRoutes from './routes/problems.js';
import contactRoutes from './routes/contact.js';

const app = express();

// ✅ Configure CORS for your frontend (Vercel) + local dev
const allowedOrigins = [
  'https://mytracker.vercel.app', // Deployed frontend
  'http://localhost:5173'         // Local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ API Routes
app.use('/api/jobs', jobsRoutes);
app.use('/api/problems', problemsRoutes);
app.use('/api/contact', contactRoutes);

export default app;
