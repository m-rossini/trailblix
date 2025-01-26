// Login.tsx

import React, { useState, useEffect, CSSProperties } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import brandColors from '../../styles/brandcolors'; // or wherever your brandcolors are

const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 60px)', // for example, minus header height
  backgroundColor: brandColors.background,
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.8s ease, transform 0.8s ease'
};

const containerVisible: CSSProperties = {
  opacity: 1,
  transform: 'translateY(0)'
};

const cardStyle: CSSProperties = {
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: '400px',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const titleStyle: CSSProperties = {
  color: brandColors.primary,
  margin: 0,
  fontSize: '1.8rem',
  textAlign: 'center' as const,
  fontWeight: 700
};

const errorStyle: CSSProperties = {
  color: 'red',
  backgroundColor: '#ffe0e0',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  textAlign: 'center' as const,
  fontSize: '0.9rem'
};

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const formGroupStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle: CSSProperties = {
  fontSize: '0.9rem',
  color: brandColors.textDark
};

const inputStyle: CSSProperties = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
  transition: 'border-color 0.2s ease'
};

const inputFocusHoverStyle: CSSProperties = {
  borderColor: brandColors.primary
};

const buttonStyle: CSSProperties = {
  backgroundColor: brandColors.primary,
  color: '#fff',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
};

const buttonHoverStyle: CSSProperties = {
  transform: 'scale(1.03)',
  boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
};

const linkStyle: CSSProperties = {
  color: brandColors.primary,
  textDecoration: 'none'
};

const Login: React.FC = () => {
  const [error, setError] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // fade-in state
  const [visible, setVisible] = useState(false);
  // hovered states
  const [hoveredButton, setHoveredButton] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const containerCombinedStyle: CSSProperties = {
    ...containerStyle,
    ...(visible ? containerVisible : {})
  };

  return (
    <div style={containerCombinedStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Login</h2>
        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleLogin} style={formStyle}>
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email (Username):
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              style={{
                ...inputStyle,
                ...(focusedInput === 'email' ? inputFocusHoverStyle : {})
              }}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              style={{
                ...inputStyle,
                ...(focusedInput === 'password' ? inputFocusHoverStyle : {})
              }}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <button
            type="submit"
            style={{
              ...buttonStyle,
              ...(hoveredButton ? buttonHoverStyle : {})
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={linkStyle}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
