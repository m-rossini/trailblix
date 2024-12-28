import React from 'react';
import './shared.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer-container common-container">
            <div>
                <h2>Follow Us</h2>
                <ul className="common-links">
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;