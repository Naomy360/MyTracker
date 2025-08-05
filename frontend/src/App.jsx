import { useState } from 'react';
import JobList from './components/JobList';
import AddJobForm from './components/AddJobForm';
import ProblemsList from './components/ProblemsList';
import AddProblemForm from './components/AddProblemForm';
import Analytics from './components/Analytics';
import './index.css';

export default function App() {
  const [refreshJobs, setRefreshJobs] = useState(false);
  const [refreshProblems, setRefreshProblems] = useState(false);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>MyTracker</h1>
        <p>Track your jobs and DSA progress effortlessly</p>
      </header>

      <main className="main-container">
        {/* Grid for Jobs & Problems */}
        <div className="grid">
          {/* Job Section */}
          <div className="card job-section">
            <h2>Job Applications</h2>
            <AddJobForm onJobAdded={() => setRefreshJobs(!refreshJobs)} />
            <hr />
            <h2>Job Applications</h2>
            <JobList key={refreshJobs} />
          </div>

          {/* Problems Section */}
          <div className="card problem-section">
            <h2>DSA Problems</h2>
            <AddProblemForm onProblemAdded={() => setRefreshProblems(!refreshProblems)} />
            <hr />
            <h2>DSA Problems</h2>
            <ProblemsList key={refreshProblems} />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="card analytics-section">
          <h2>Analytics</h2>
          <Analytics />
        </div>
      </main>
    </div>
  );
}
