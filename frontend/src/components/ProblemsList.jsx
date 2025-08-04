import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [editingProblem, setEditingProblem] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('');

  const [filterDifficulty, setFilterDifficulty] = useState(''); // Filter by difficulty
  const [filterStatus, setFilterStatus] = useState(''); // Filter by status

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/problems');
      setProblems(res.data);
    } catch (err) {
      console.error('Error fetching problems:', err);
    }
  };

  const deleteProblem = async (id) => {
    await axios.delete(`http://localhost:5050/api/problems/${id}`);
    fetchProblems();
  };

  const startEdit = (problem) => {
    setEditingProblem(problem.id);
    setNewStatus(problem.status);
    setNewDifficulty(problem.difficulty);
  };

  const cancelEdit = () => {
    setEditingProblem(null);
    setNewStatus('');
    setNewDifficulty('');
  };

  const saveEdit = async (id) => {
    await axios.put(`http://localhost:5050/api/problems/${id}`, {
      status: newStatus,
      difficulty: newDifficulty,
    });
    setEditingProblem(null);
    fetchProblems();
  };

  // ✅ Apply filters
  const filteredProblems = problems.filter((p) => {
    return (
      (filterDifficulty ? p.difficulty === filterDifficulty : true) &&
      (filterStatus ? p.status === filterStatus : true)
    );
  });

  return (
    <div className="problems-container">
      {/* Filter Toolbar */}
      <div className="toolbar" style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
        <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Solved">Solved</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>
                  {editingProblem === p.id ? (
                    <select
                      value={newDifficulty}
                      onChange={(e) => setNewDifficulty(e.target.value)}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  ) : (
                    p.difficulty
                  )}
                </td>
                <td>
                  {editingProblem === p.id ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Solved">Solved</option>
                    </select>
                  ) : (
                    p.status
                  )}
                </td>
                <td>
                  {editingProblem === p.id ? (
                    <>
                      <button className="btn save" onClick={() => saveEdit(p.id)}>Save</button>
                      <button className="btn cancel" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn edit" onClick={() => startEdit(p)}>Edit</button>
                      <button className="btn delete" onClick={() => deleteProblem(p.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="mobile-cards">
        {filteredProblems.map((p) => (
          <div key={p.id} className="card">
            <p><strong>Title:</strong> {p.title}</p>
            <p>
              <strong>Difficulty:</strong>{' '}
              {editingProblem === p.id ? (
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              ) : (
                p.difficulty
              )}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {editingProblem === p.id ? (
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Solved">Solved</option>
                </select>
              ) : (
                p.status
              )}
            </p>
            <div className="button-group">
              {editingProblem === p.id ? (
                <>
                  <button className="btn save" onClick={() => saveEdit(p.id)}>Save</button>
                  <button className="btn cancel" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn edit" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn delete" onClick={() => deleteProblem(p.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemsList;
