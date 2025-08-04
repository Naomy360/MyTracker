import React, { useEffect, useState } from 'react';
import API from '../api'; // ✅ Use centralized API instance

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs'); // ✅ Using API instance
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`); // ✅ Using API instance
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const startEdit = (job) => {
    setEditingJob(job.id);
    setNewStatus(job.status);
    setNewNotes(job.notes || '');
    setNewContactName(job.contact_name || '');
    setNewContactEmail(job.contact_email || '');
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/jobs/${id}`, {
        status: newStatus,
        notes: newNotes,
        contact_name: newContactName,
        contact_email: newContactEmail,
      });
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      console.error('Error updating job:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const filteredJobs = jobs
    .filter(job => (filter ? job.status === filter : true))
    .sort((a, b) => {
      if (sort === 'latest') return new Date(b.applied_date) - new Date(a.applied_date);
      if (sort === 'oldest') return new Date(a.applied_date) - new Date(b.applied_date);
      return 0;
    });

  return (
    <div className="job-list">
      {/* Filter & Sort Toolbar */}
      <div className="toolbar">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Notes</th>
              <th>Contact Name</th>
              <th>Contact Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>
                  {editingJob === job.id ? (
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    <span className={`status-badge status-${job.status.toLowerCase()}`}>
                      {job.status}
                    </span>
                  )}
                </td>
                <td>{formatDate(job.applied_date)}</td>
                <td>
                  {editingJob === job.id ? (
                    <input type="text" value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
                  ) : (
                    job.notes || '-'
                  )}
                </td>
                <td>
                  {editingJob === job.id ? (
                    <input type="text" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} />
                  ) : (
                    job.contact_name || '-'
                  )}
                </td>
                <td>
                  {editingJob === job.id ? (
                    <input type="email" value={newContactEmail} onChange={(e) => setNewContactEmail(e.target.value)} />
                  ) : (
                    job.contact_email || '-'
                  )}
                </td>
                <td>
                  {editingJob === job.id ? (
                    <button className="btn save" onClick={() => saveEdit(job.id)}>Save</button>
                  ) : (
                    <button className="btn edit" onClick={() => startEdit(job)}>Edit</button>
                  )}
                  <button className="btn delete" onClick={() => deleteJob(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-cards">
        {filteredJobs.map((job) => (
          <div key={job.id} className="card">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Role:</strong> {job.role}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge status-${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </p>
            <p><strong>Date:</strong> {formatDate(job.applied_date)}</p>
            <p><strong>Notes:</strong> {job.notes || '-'}</p>
            <p><strong>Contact:</strong> {job.contact_name || '-'} ({job.contact_email || '-'})</p>
            <div className="button-group">
              {editingJob === job.id ? (
                <button className="btn save" onClick={() => saveEdit(job.id)}>Save</button>
              ) : (
                <button className="btn edit" onClick={() => startEdit(job)}>Edit</button>
              )}
              <button className="btn delete" onClick={() => deleteJob(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
