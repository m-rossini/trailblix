import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    username: string;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('User');

    const login = (username: string, password: string) => {
        // Add your authentication logic here
        setIsLoggedIn(true);
        setUsername(username);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('User');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};