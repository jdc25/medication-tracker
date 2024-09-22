import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage'; // Ensure correct path
import Tracker from './components/Tracker'; // Ensure correct path
import UserLogOut from './components/UserLogOut'; // Ensure correct path
import { AuthProvider } from './components/AuthContext'; // Ensure correct path

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/logout" element={<UserLogOut />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;