import React, { useEffect, useState } from 'react';

const CareerPath: React.FC = () => {
    const [careerPaths, setCareerPaths] = useState<any[]>([]);

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
    }, []);

    return (
        <div>
            <h1>Career Paths</h1>
            <ul>
                {careerPaths.map((path) => (
                    <li key={path.id}>{path.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CareerPath;