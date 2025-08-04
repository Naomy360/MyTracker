import pool from '../db.js';

export const getJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM job_applications ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('DB Error (getJobs):', error); // ✅ Full error object
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};


export const addJob = async (req, res) => {
  const { company, role, status, applied_date, notes, contact_name, contact_email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO job_applications (company, role, status, applied_date, notes, contact_name, contact_email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [company, role, status, applied_date, notes, contact_name, contact_email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('DB Error (addJob):', error);
    res.status(500).json({ error: 'Failed to add job' });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { status, notes, contact_name, contact_email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE job_applications SET status = $1, notes = $2, contact_name = $3, contact_email = $4 WHERE id = $5 RETURNING *',
      [status, notes, contact_name, contact_email, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Job not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('DB Error (updateJob):', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};


export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM job_applications WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('DB Error (deleteJob):', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};
