import React from 'react';
import { useAuth } from '../auth/AuthContext';
import './shared.css';

const Header: React.FC = () => {
    const { isLoggedIn, username, logout } = useAuth();

    return (
        <header className="header-container common-container">
            <h1 className="header-title">TrailBlix</h1>
            <nav>
                <ul className="common-links">
                    <li><a href="/">Home</a></li>
                    {isLoggedIn ? (
                        <>
                            <li><span>{username}</span></li>
                            <li><a href="/" onClick={logout}>Logoff</a></li>
                        </>
                    ) : (
                        <li><a href="/login">Login</a></li>
                    )}
                    <li><a href="/career">Career Paths</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;