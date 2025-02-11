import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskPage from './pages/TaskPage';
import './styles/darkTheme.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark to-black text-text-light">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks/:date" element={<TaskPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;