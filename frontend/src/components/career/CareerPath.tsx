import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const CareerPath: React.FC = () => {
    const [careerPaths, setCareerPaths] = useState<any[]>([]);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCareerPaths = async () => {
            try {
                const response = await fetch('/api/career-paths');
                const data = await response.json();
                setCareerPaths(data);
            } catch (error) {
                console.error('Error fetching career paths:', error);
            }
        };

        fetchCareerPaths();
    }, [isLoggedIn, navigate]);

    return (
        <div>
            <h1>Career Paths</h1>
            <p style={{ color: 'green' }}>This is the Career Path Page</p>
            <ul>
                {careerPaths.map((path) => (
                    <li key={path.id}>{path.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CareerPath;