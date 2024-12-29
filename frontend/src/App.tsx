import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CareerPath from './components/career/CareerPath';
import Home from './components/home/Home';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { AuthProvider } from './components/auth/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/career" element={<CareerPath />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default App;