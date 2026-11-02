import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [serverStatus, setServerStatus] = useState('Checking backend connection...');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Basic health check to test backend connection
    async function checkBackend() {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        const data = await response.json();
        if (data.success) {
          setServerStatus('Connected to Backend API (Port 5000)');
          setIsOnline(true);
        } else {
          setServerStatus('Backend returned an unexpected response');
          setIsOnline(false);
        }
      } catch (error) {
        setServerStatus('Backend not running on port 5000 (Start with: npm run dev in backend/)');
        setIsOnline(false);
      }
    }

    checkBackend();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Personal Task Manager</h1>
        <p className="subtitle">MERN Stack Interview Project</p>
      </header>

      <main className="card">
        <h2>Project Setup Complete</h2>
        <p>
          Frontend (React + Vite) and Backend (Node + Express) have been successfully initialized.
        </p>

        <div className={`status-badge ${isOnline ? 'online' : 'offline'}`}>
          <span className="dot"></span>
          <span>{serverStatus}</span>
        </div>

        <div className="info-box">
          <h3>Setup Summary:</h3>
          <ul>
            <li>Backend initialized with Express, Mongoose, CORS, and Dotenv.</li>
            <li>Frontend initialized with React and Vite.</li>
            <li>Git repository initialized with safe .gitignore configuration.</li>
            <li>All architectural documentation prepared in <code>project-context/</code>.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
