import express from 'express';
import { getProblems, addProblem, updateProblemStatus, deleteProblem } from '../controllers/problemsController.js';

const router = express.Router();

// GET all DSA problems
router.get('/', getProblems);

// POST a new DSA problem
router.post('/', addProblem);

// PUT update a problem's status
router.put('/:id', updateProblemStatus);

// DELETE a problem
router.delete('/:id', deleteProblem);

export default router;
