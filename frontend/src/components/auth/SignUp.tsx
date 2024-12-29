import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const birthDateObj = new Date(birthDate);
        if (isNaN(birthDateObj.getTime())) {
            setError('Invalid birth date');
            return;
        }

        const today = new Date();
        const minDate = new Date(today.getFullYear() - 90, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());

        if (birthDateObj < minDate || birthDateObj > maxDate) {
            setError('Birth date must be between 10 and 90 years from today');
            return;
        }

        try {
            await signup(email, password, displayName, birthDate);
            navigate('/login');
        } catch (err) {
            setError('Failed to create an account');
        }
    };

    return (
        <div>
            <main>
                <div>
                    <h2>Sign Up</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label htmlFor="displayName">Display Name:</label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter display name"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                        />
                    </div>
                    <div>
                        <label htmlFor="birthDate">Birth Date:</label>
                        <input
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            placeholder="Enter birth date"
                        />
                    </div>
                    <button onClick={handleSignUp}>Sign Up</button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SignUp;