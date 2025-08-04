import express from 'express';
import { addContact } from '../controllers/contactController.js';

const router = express.Router();

// POST recruiter contact info
router.post('/', addContact);

export default router;
