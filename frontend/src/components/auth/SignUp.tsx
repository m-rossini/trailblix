import React, { useEffect, useState, CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styled, { keyframes } from 'styled-components';
import brandColors from '../../styles/brandcolors';
import { FiInfo } from 'react-icons/fi';

// Animation for container fade-in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background-color: ${brandColors.background};
  animation: ${fadeIn} 0.8s ease forwards;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  }
`;

const Title = styled.h2`
  color: ${brandColors.primary};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  background-color: #ffe0e0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${brandColors.textDark};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    border-color: ${brandColors.primary};
    box-shadow: 0 0 0 2px rgba(78,70,229,0.2);
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${brandColors.primary};
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  }
`;

const SignupLink = styled(Link)`
  color: ${brandColors.primary};
  text-decoration: none;
  font-size: 0.95rem;
  text-align: center;
  margin-top: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

// Checkbox container and label styles
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ConsentLabel = styled.label`
  font-size: 0.9rem;
  color: ${brandColors.textDark};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

// TooltipIcon: A styled component for the info icon
const TooltipIcon = styled.span`
  color: ${brandColors.primary};
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.25rem;
`;

// Tooltip text for data consent info
const TooltipText = styled.div`
  background: #f7f7f7;
  color: ${brandColors.textDark};
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

// LinkStyle constant for inline link styling
const LinkStyle: CSSProperties = {
  color: brandColors.primary,
  textDecoration: 'none'
};

const SignUp: React.FC = () => {
  // Form states
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  // Consent states
  const [dataConsent, setDataConsent] = useState<boolean>(false);
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
  const [showDataConsentInfo, setShowDataConsentInfo] = useState<boolean>(false);
  
  const { signup, logout, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      logout('/');
    }
  }, [logout, isLoggedIn, user]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!dataConsent) {
      setError('You must agree to allow Trailblix to store your data.');
      return;
    }

    const birthDateObj = new Date(birthDate);
    if (isNaN(birthDateObj.getTime())) {
      setError('Invalid birth date.');
      return;
    }

    const today = new Date();
    const minDate = new Date(today.getFullYear() - 90, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    if (birthDateObj < minDate || birthDateObj > maxDate) {
      setError('Birth date must be between 10 and 90 years from today.');
      return;
    }

    try {
      await signup(email, password, displayName, birthDate);
      navigate('/profile');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <Container style={visible ? {} : { opacity: 0 }}>
      <Card>
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSignUp}>
          <FormGroup>
            <Label htmlFor="email">Email (Username):</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="displayName">Display Name:</Label>
            <Input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Enter display name"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="birthDate">Birth Date:</Label>
            <Input
              type="date"
              id="birthDate"
              name="birthDate"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          {/* Data Consent Checkbox */}
          <CheckboxContainer>
            <input
              type="checkbox"
              id="dataConsent"
              checked={dataConsent}
              onChange={(e) => setDataConsent(e.target.checked)}
              required
            />
            <ConsentLabel htmlFor="dataConsent">
              I agree to allow Trailblix to store my data for AI-driven insights.
              <TooltipIcon
                onMouseEnter={() => setShowDataConsentInfo(true)}
                onMouseLeave={() => setShowDataConsentInfo(false)}
              >
                <FiInfo />
              </TooltipIcon>
            </ConsentLabel>
          </CheckboxContainer>
          {showDataConsentInfo && (
            <TooltipText>
              We use your data to personalize career recommendations and improve our AI algorithms.
            </TooltipText>
          )}
          {/* Marketing Consent Checkbox */}
          <CheckboxContainer>
            <input
              type="checkbox"
              id="marketingConsent"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
            />
            <ConsentLabel htmlFor="marketingConsent">
              I agree to receive marketing communications from Trailblix.
            </ConsentLabel>
          </CheckboxContainer>
          <Button type="submit">Sign Up</Button>
        </Form>
        <p style={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={LinkStyle}>
            Login
          </Link>
        </p>
      </Card>
    </Container>
  );
};

export default SignUp;
