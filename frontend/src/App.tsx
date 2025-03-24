import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CareerPath from './components/career/CareerPath';
import Home from './components/home/Home';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserProfile from './components/user/UserProfile';
import UploadCV from './components/user/UploadCV';
import About from './components/about/About'; // Import the About page

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/career"
            element={
              <ProtectedRoute>
                <CareerPath />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-cv"
            element={
              <ProtectedRoute>
                <UploadCV />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default App;
