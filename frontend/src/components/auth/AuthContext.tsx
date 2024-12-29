import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isLoggedIn: boolean;
    username: string;
    login: (username: string, password: string) => Promise<void>;
    signup: (email: string, password: string, displayName: string, birthDate: string) => Promise<void>;
    logout: () => void;
}

interface CustomError extends Error {
    name: string;
    message: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('User');
    const navigate = useNavigate();

    const login = async (username: string, password: string): Promise<void> => {
        console.log('login function called with:', username, password);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            console.log('response:', response);
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            console.log('data:', data);
            localStorage.setItem('authToken', data.token);
            setIsLoggedIn(true);
            setUsername(username);
            navigate('/'); // Navigate to home or another page after login
        } catch (error) {
            const typedError = error as CustomError;
            if (typedError.name === 'AbortError') {
                console.error('Login request timed out');
                throw new Error('Login request timed out');
            } else {
                console.error('Login error:', typedError);
                throw typedError;
            }
        }
    };

    const signup = async (email: string, password: string, displayName: string, birthDate: string): Promise<void> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, displayName, birthDate }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            setIsLoggedIn(true);
            setUsername(displayName);
            navigate('/login'); 
        } catch (error) {
            const typedError = error as CustomError;
            if (typedError.name === 'AbortError') {
                console.error('Signup request timed out');
                throw new Error('Signup request timed out');
            } else {
                console.error('Signup error:', typedError);
                throw typedError;
            }
        }
    };

    const logout = (): void => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUsername('User');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};