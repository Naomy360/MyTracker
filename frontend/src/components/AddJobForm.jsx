import { useState } from 'react';
import API from '../api';

export default function AddJobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied', // default value
    applied_date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', formData);
      onJobAdded(); // Refresh list
      setFormData({ company: '', role: '', status: 'Applied', applied_date: '' });
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="card job-section">
      <h2>Add Job</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          name="applied_date"
          value={formData.applied_date}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn save">
          Add Job
        </button>
      </form>
    </div>
  );
}
