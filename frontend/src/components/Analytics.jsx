import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [jobStats, setJobStats] = useState({ total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 });
  const [problemStats, setProblemStats] = useState({ total: 0, pending: 0, solved: 0, easy: 0, medium: 0, hard: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = await axios.get('http://localhost:5050/api/jobs');
        const problems = await axios.get('http://localhost:5050/api/problems');

        const jobData = jobs.data;
        const problemData = problems.data;

        const jobStatsCalculated = {
          total: jobData.length,
          applied: jobData.filter(j => j.status === 'Applied').length,
          interview: jobData.filter(j => j.status === 'Interview').length,
          offer: jobData.filter(j => j.status === 'Offer').length,
          rejected: jobData.filter(j => j.status === 'Rejected').length,
        };

        const problemStatsCalculated = {
          total: problemData.length,
          pending: problemData.filter(p => p.status === 'Pending').length,
          solved: problemData.filter(p => p.status === 'Solved').length,
          easy: problemData.filter(p => p.difficulty === 'Easy').length,
          medium: problemData.filter(p => p.difficulty === 'Medium').length,
          hard: problemData.filter(p => p.difficulty === 'Hard').length,
        };

        setJobStats(jobStatsCalculated);
        setProblemStats(problemStatsCalculated);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchData();
  }, []);

  const calcPercentage = (part, total) => (total ? ((part / total) * 100).toFixed(1) : 0);

  return (
    <div className="analytics-container" style={{ width: '100%', padding: '20px' }}>
      <h2 className="analytics-title">Analytics Overview</h2>
      
      {/* Job Stats */}
      <div className="analytics-card jobs-card" style={{ marginBottom: '20px' }}>
        <h3>Job Applications</h3>
        <p>Total: <strong>{jobStats.total}</strong></p>
        <div className="progress-group">
          <p>Applied: {jobStats.applied} ({calcPercentage(jobStats.applied, jobStats.total)}%)</p>
          <div className="progress-bar applied" style={{ width: `${calcPercentage(jobStats.applied, jobStats.total)}%` }}></div>
        </div>
        <div className="progress-group">
          <p>Interview: {jobStats.interview} ({calcPercentage(jobStats.interview, jobStats.total)}%)</p>
          <div className="progress-bar interview" style={{ width: `${calcPercentage(jobStats.interview, jobStats.total)}%` }}></div>
        </div>
        <div className="progress-group">
          <p>Offer: {jobStats.offer} ({calcPercentage(jobStats.offer, jobStats.total)}%)</p>
          <div className="progress-bar offer" style={{ width: `${calcPercentage(jobStats.offer, jobStats.total)}%` }}></div>
        </div>
        <div className="progress-group">
          <p>Rejected: {jobStats.rejected} ({calcPercentage(jobStats.rejected, jobStats.total)}%)</p>
          <div className="progress-bar rejected" style={{ width: `${calcPercentage(jobStats.rejected, jobStats.total)}%` }}></div>
        </div>
      </div>

      {/* Problem Stats */}
      <div className="analytics-card problems-card">
        <h3>DSA Problems</h3>
        <p>Total: <strong>{problemStats.total}</strong></p>
        <div className="progress-group">
          <p>Solved: {problemStats.solved} ({calcPercentage(problemStats.solved, problemStats.total)}%)</p>
          <div className="progress-bar solved" style={{ width: `${calcPercentage(problemStats.solved, problemStats.total)}%` }}></div>
        </div>
        <div className="progress-group">
          <p>Pending: {problemStats.pending} ({calcPercentage(problemStats.pending, problemStats.total)}%)</p>
          <div className="progress-bar pending" style={{ width: `${calcPercentage(problemStats.pending, problemStats.total)}%` }}></div>
        </div>
        <div className="progress-group">
          <p>Easy: {problemStats.easy} ({calcPercentage(problemStats.easy, problemStats.total)}%)</p>
          <div className="progress-bar easy" style={{ width: `${calcPercentage(problemStats.easy, problemStats.total)}%` }}></div>
        </div>
        <div className="progress-group">
          <p>Medium: {problemStats.medium} ({calcPercentage(problemStats.medium, problemStats.total)}%)</p>
          <div className="progress-bar medium" style={{ width: `${calcPercentage(problemStats.medium, problemStats.total)}%` }}></div>
        </div>
        <div className="progress-group">
          <p>Hard: {problemStats.hard} ({calcPercentage(problemStats.hard, problemStats.total)}%)</p>
          <div className="progress-bar hard" style={{ width: `${calcPercentage(problemStats.hard, problemStats.total)}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
