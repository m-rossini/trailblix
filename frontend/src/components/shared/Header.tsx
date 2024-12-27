import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Career Path Finder</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/career">Career Paths</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;