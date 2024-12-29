import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleLogin = async () => {
        console.log('handleLogin called with:', username, password);
        try {
            await login(username, password);
            console.log('Login successful');
            setError(null); // Clear any previous error
            // Add your login logic here, e.g., navigate to a different page
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your username and password.');
        }
    };

    return (
        <div>
            <main>
                <div>
                    <h2>Login</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                    <button onClick={handleLogin}>Login</button>
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;