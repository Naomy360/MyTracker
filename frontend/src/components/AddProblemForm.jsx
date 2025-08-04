import React, { useState } from 'react';
import axios from 'axios';

const AddProblemForm = ({ onProblemAdded }) => {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProblem = { title, difficulty, status };
      import API from '../api';

      const res = await API.post('/problems', newProblem);

      onProblemAdded(res.data);
      setTitle('');
      setDifficulty('');
      setStatus('');
    } catch (err) {
      console.error('Error adding problem:', err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Problem</h2>
      <form onSubmit={handleSubmit} className="form-layout">
        <input
          type="text"
          placeholder="Problem Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="btn primary">Add Problem</button>
      </form>
    </div>
  );
};

export default AddProblemForm;
