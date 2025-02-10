import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface SignUpData {
    email: string;
    password: string;
    displayName: string;
    birthDate: string;
    consent: boolean;
    marketingConsent: boolean;
}

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [birthDate, setBirthDate] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [consent_data, setConsentData] = useState<boolean>(false);
    const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
    const { signup, logout, isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user) {
            // If a user is already logged in, log them out to prevent multiple accounts
            logout('/');
        }
    }, [logout, isLoggedIn, user]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error message
        setError('');

        // Add consent validation
        if (!consent_data) {
            setError('You must agree to the data processing consent');
            return;
        }

        // Validation
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
            setError(
                'Birth date must be between 10 and 90 years from today.'
            );
            return;
        }

        try {
            await signup(email, password, displayName, birthDate, consent_data, marketingConsent);
            navigate('/profile'); // Redirect to profile after successful signup
        } catch (err) {
            setError('Failed to create an account. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignUp} className="signup-form">
                <div className="form-group">
                    <label htmlFor="email">Email (Username):</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="displayName">Display Name:</label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter display name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthDate">Birth Date:</label>
                    <input
                        type="date"
                        id="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="Enter birth date"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="consent-label">
                        <input
                            type="checkbox"
                            checked={consent_data}
                            onChange={(e) => setConsentData(e.target.checked)}
                            required
                        />
                        I consent to the processing of my personal data for the purpose 
                        of creating and managing my account
                    </label>
                </div>
                <div className="form-group">
                    <label className="consent-label">
                        <input
                            type="checkbox"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                        />
                        I agree to receive marketing information
                    </label>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;