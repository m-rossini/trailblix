// SignUp.tsx

import React, { useEffect, useState, CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import brandColors from '../../styles/brandcolors'; // adjust path if needed

const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 60px)', // example offset for header height
  backgroundColor: brandColors.background,
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.8s ease, transform 0.8s ease'
};

const containerVisibleStyle: CSSProperties = {
  opacity: 1,
  transform: 'translateY(0)'
};

const cardStyle: CSSProperties = {
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: '500px',
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

const inputFocusStyle: CSSProperties = {
  borderColor: brandColors.primary
};

const buttonStyle: CSSProperties = {
  backgroundColor: brandColors.primary,
  color: '#fff',
  border: 'none',
  padding: '0.75rem',
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

const SignUp: React.FC = () => {
  // form states
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  // brand-based fade-in & hover states
  const [visible, setVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const { signup, logout, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      // If a user is already logged in, log them out to prevent multiple accounts
      logout('/');
    }
  }, [logout, isLoggedIn, user]);

  useEffect(() => {
    // fade in container
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset error
    setError('');

    // Validate
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const birthDateObj = new Date(birthDate);
    if (isNaN(birthDateObj.getTime())) {
      setError('Invalid birth date.');
      return;
    }

    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 90,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - 10,
      today.getMonth(),
      today.getDate()
    );

    if (birthDateObj < minDate || birthDateObj > maxDate) {
      setError('Birth date must be between 10 and 90 years from today.');
      return;
    }

    try {
      await signup(email, password, displayName, birthDate);
      navigate('/profile'); // Redirect to profile after successful signup
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
  };

  const containerCombinedStyle: CSSProperties = {
    ...containerStyle,
    ...(visible ? containerVisibleStyle : {})
  };

  return (
    <div style={containerCombinedStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Sign Up</h2>
        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSignUp} style={formStyle}>
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email (Username):
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              style={{
                ...inputStyle,
                ...(focusedInput === 'email' ? inputFocusStyle : {})
              }}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="displayName" style={labelStyle}>
              Display Name:
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter display name"
              required
              style={{
                ...inputStyle,
                ...(focusedInput === 'displayName' ? inputFocusStyle : {})
              }}
              onFocus={() => setFocusedInput('displayName')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="birthDate" style={labelStyle}>
              Birth Date:
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              style={{
                ...inputStyle,
                ...(focusedInput === 'birthDate' ? inputFocusStyle : {})
              }}
              onFocus={() => setFocusedInput('birthDate')}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                ...inputStyle,
                ...(focusedInput === 'password' ? inputFocusStyle : {})
              }}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              style={{
                ...inputStyle,
                ...(focusedInput === 'confirmPassword' ? inputFocusStyle : {})
              }}
              onFocus={() => setFocusedInput('confirmPassword')}
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
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: brandColors.primary, textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
