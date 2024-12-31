import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isLoggedIn: boolean;
    username: string;
    displayName: string;
    isAuthLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (email: string, password: string, displayName: string, birthDate: string) => Promise<void>;
    logout: (redirectTo?: string) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('User');
    const [displayName, setDisplayName] = useState<string>('User');
    const [isAuthLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const data = sessionStorage.getItem('userData');
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                setIsLoggedIn(true);
                setUsername(parsedData.username); // Replace with actual username from token validation
                setDisplayName(parsedData.displayName); // Replace with actual display name from token validation
            } catch (error) {
                console.error('Failed to parse auth token:', error);
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const result = await response.json();
            const data = result.data;
            const jsonData = JSON.stringify(data);
            sessionStorage.setItem('userData', jsonData);
            setIsLoggedIn(true);
            setUsername(data.username);
            setDisplayName(data.display_name);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (email: string, password: string, displayName: string, birthDate: string): Promise<void> => {
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, displayName, birthDate }),
            });

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const result = await response.json();
            const data = result.data;
            localStorage.setItem('data', JSON.stringify(data));
            setIsLoggedIn(true);
            setUsername(data.username);
            setDisplayName(data.display_name);
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const logout = (redirectTo?: string): void => {
        console.info(`Logging out. User: ${username}`);
        sessionStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUsername('User');
        setDisplayName('User');
        if (redirectTo) {
            navigate(redirectTo);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, displayName, isAuthLoading, login, signup, logout }}>
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