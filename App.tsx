
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AskAssistant from './pages/AskAssistant';
import Notifications from './pages/Notifications';
import History from './pages/History';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { UserProfile } from './types';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(storageService.getUser());

  const handleLogin = (profile: UserProfile) => {
    storageService.setUser(profile);
    setUser(profile);
  };

  const handleLogout = () => {
    storageService.clearUser();
    setUser(null);
  };

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Auth onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/ask" 
            element={user ? <AskAssistant user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/notifications" 
            element={user ? <Notifications user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/history" 
            element={user ? <History user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} onUpdate={setUser} /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
