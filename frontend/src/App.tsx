
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Groups } from './pages/Groups';
import { Events } from './pages/Events';
import { Profile } from './pages/Profile';
import LoginPage, { Login } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutUs/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;