import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskPage from './pages/TaskPage';
import './styles/darkTheme.css';

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show your custom install button or prompt
  console.log('PWA installation prompt available');
  // Example: Show a button to install the app
  const installButton = document.createElement('button');
  installButton.textContent = 'Install App';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '20px';
  installButton.style.right = '20px';
  installButton.style.zIndex = '1000';
  document.body.appendChild(installButton);

  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt variable
      deferredPrompt = null;
    });
  });
});

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