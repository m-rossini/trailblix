import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import './shared.css';

const Header: React.FC = () => {
    const { isLoggedIn, username, logout } = useAuth();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logout();
    };

    return (
        <header className="header-container common-container">
            <h1 className="header-title">TrailBlix</h1>
            <nav>
                <ul className="common-links">
                    <li><Link to="/">Home</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><span>Welcome, {username}</span></li>
                            <li><Link to="/" onClick={handleLogout}>Logoff</Link></li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                    <li><Link to="/career">Career Paths</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;