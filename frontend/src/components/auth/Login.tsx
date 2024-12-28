import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = () => {
        login(username, password);
        // Add your login logic here
    };

    return (
        <div>
            <h2>Login</h2>
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
        </div>
    );
};

export default Login;