import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from './AuthContext';
import brandColors from '../../styles/brandcolors';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedinIn } from 'react-icons/fa';

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
  max-width: 420px;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.15);
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

const LoginButton = styled.button`
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

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  color: ${brandColors.textMedium};
  font-size: 0.9rem;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #ddd;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  background: transparent;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const GoogleButton = styled(SocialButton)`
  color: #444;
`;

const LinkedInButton = styled(SocialButton)`
  color: #0077b5;
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

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
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

  return (
    <Container style={visible ? {} : { opacity: 0 }}>
      <Card>
        <Title>Login to TrailBlix</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="email">Email (Username):</Label>
            <Input type="email" id="email" name="email" placeholder="Enter email" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input type="password" id="password" name="password" placeholder="Enter password" required />
          </FormGroup>
          <LoginButton type="submit">Login</LoginButton>
        </Form>
        <Divider>or</Divider>
        <SocialButtonsContainer>
          <GoogleButton>
            <FcGoogle size={24} /> Continue with Google
          </GoogleButton>
          <LinkedInButton>
            <FaLinkedinIn size={20} /> Continue with LinkedIn
          </LinkedInButton>
        </SocialButtonsContainer>
        <SignupLink to="/signup">Don't have an account? Sign Up</SignupLink>
      </Card>
    </Container>
  );
};

export default Login;
