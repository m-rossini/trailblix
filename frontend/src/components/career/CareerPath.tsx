import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const CareerPath: React.FC = () => {
    const { isLoggedIn, username } = useAuth(); // Access username from AuthContext
    const navigate = useNavigate();
    const [cvFile, setCvFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
    }, [isLoggedIn, navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (
            file.type === 'application/pdf' ||
            file.type === 'text/plain' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'application/rtf'
        )) {
            setCvFile(file);
        } else {
            alert('Please upload a PDF, text, rich text, or Word document.');
        }
    };

    const handleUploadClick = () => {
        if (!cvFile) {
            alert('No file selected for upload.');
            return;
        }

        const formData = new FormData();
        formData.append('cvFile', cvFile);
        formData.append('username', username); // Append the username

        fetch('http://localhost:5001/api/upload-cv', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to upload CV');
            }
            return response.json();
        })
        .then(data => {
            console.info('CV upload successful:', data);
        })
        .catch(error => {
            console.error('Error uploading CV:', error);
        });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (
                file.type === 'application/pdf' ||
                file.type === 'text/plain' ||
                file.type === 'application/msword' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                file.type === 'application/rtf'
            ) {
                setCvFile(file);
            } else {
                alert('Please upload a PDF, text, rich text, or Word document.');
            }
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click(); 
    };

    return (
        <div>
            <h1>Career Paths</h1>
            <p style={{ color: 'green' }}>This is the Career Path Page</p>
            <h2>Upload Your CV</h2>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
                onClick={handleBrowseClick} // Clicking this div opens the file dialog
            >
                {cvFile ? (
                    <p>{cvFile.name}</p>
                ) : (
                    <p>Drop here or browse local files (PDF, text, rich text, or Word documents)</p>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.txt,.rtf,.doc,.docx" // Accept only specific file types
                    style={{ display: 'none' }} // Hidden file input
                />
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={!cvFile} // Disable button if no file is selected
                >
                    Upload CV
                </button>
            </div>
        </div>
    );
};

export default CareerPath;