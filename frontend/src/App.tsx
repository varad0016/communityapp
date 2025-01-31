import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Groups } from './pages/Groups';
import { Events } from './pages/Events';
import LoginPage from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import AboutUs from './pages/AboutUs';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './middleware/ProtectedRoute'; // Import the ProtectedRoute component

import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import CreateEventPage from './pages/CreateEvent';
import { CreateGroup } from './pages/CreateGroup';
// import GroupChat from './pages/GroupChat';
// import UserChat from './pages/DirectChat';

function App() {
  

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} /> {/* Protected route */}
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} /> {/* Protected route */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* Protected route */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path='/edit_prf' element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>} />
                <Route path='/createevent' element={
                <ProtectedRoute>
                  <CreateEventPage />
                </ProtectedRoute>} />
                <Route path='/creategroup' element={
                <ProtectedRoute>
                  <CreateGroup />
                </ProtectedRoute>} />

            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
