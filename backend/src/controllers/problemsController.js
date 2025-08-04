import pool from '../db.js';

// Get all problems
export const getProblems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dsa_problems ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
};

// Add new problem
export const addProblem = async (req, res) => {
  const { title, difficulty, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO dsa_problems (title, difficulty, status) VALUES ($1, $2, $3) RETURNING *',
      [title, difficulty, status]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add problem' });
  }
};

// Update problem status
export const updateProblemStatus = async (req, res) => {
  const { id } = req.params;
  const { status, difficulty } = req.body;
  try {
    const result = await pool.query(
      'UPDATE dsa_problems SET status = $1, difficulty = $2 WHERE id = $3 RETURNING *',
      [status, difficulty, id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: 'Problem not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('DB Error (updateProblemStatus):', error);
    res.status(500).json({ error: 'Failed to update problem' });
  }
};


// Delete a problem
export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM dsa_problems WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.json({ message: 'Problem deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete problem' });
  }
};
