import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const CareerPath: React.FC = () => {
    const [careerPaths, setCareerPaths] = useState<any[]>([]);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
    }, [isLoggedIn, navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCvFile(e.target.files[0]);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleUploadClick = async () => {
        const formData = new FormData();
        if (cvFile) {
            formData.append('cvFile', cvFile);
        }
        formData.append('googleDocsUrl', url);

        try {
            const response = await fetch('/api/upload-cv', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload CV');
            }

            const data = await response.json();
            console.info('CV upload successful:', data);
        } catch (error) {
            console.error('Error uploading CV:', error);
        }
    };

    const handlePagesClick = async () => {
        try {
            const response = await fetch('/api/upload-cv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ linkedinUrl: url }),
            });

            if (!response.ok) {
                throw new Error('Failed to upload LinkedIn URL');
            }

            const data = await response.json();
            console.info('LinkedIn URL upload successful:', data);
        } catch (error) {
            console.error('Error uploading LinkedIn URL:', error);
        }
    };

    return (
        <div>
            <h1>Career Paths</h1>
            <p style={{ color: 'green' }}>This is the Career Path Page</p>
            <ul>
                {careerPaths.map((path) => (
                    <li key={path.id}>{path.name}</li>
                ))}
            </ul>
            <h2>Upload Your CV</h2>
            <div>
                <label htmlFor="url">URL:</label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={handleUrlChange}
                />
            </div>
            <div>
                <button type="button" onClick={handleUploadClick}>Upload from Device/Google Docs</button>
                <input type="file" id="cvFile" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <div>
                <button type="button" onClick={handlePagesClick}>Upload LinkedIn URL</button>
            </div>
        </div>
    );
};

export default CareerPath;