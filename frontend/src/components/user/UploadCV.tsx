import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const UploadCV: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [cvType, setCvType] = useState<'current' | 'future'>('current');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuth();

    // Add effect to clear messages when cvType changes
    useEffect(() => {
        setError('');
        setSuccess('');
    }, [cvType]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file: File) => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        setError('');
        setSuccess('');

        if (!validTypes.includes(file.type)) {
            setError('Please upload a PDF or Word document');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setFile(file);
    };

    const handleUpload = async () => {
        if (!file || !user) return;

        const formData = new FormData();
        formData.append('cvFile', file);
        formData.append('username', user._id);
        formData.append('stage', cvType);

        setIsUploading(true);
        setError('');
        setSuccess('');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch('http://localhost:5001/api/upload-cv', {
                method: 'POST',
                body: formData,
                signal: controller.signal
            });

            if (!response.ok) throw new Error('Upload failed');

            setSuccess('CV uploaded successfully!');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            if (err instanceof Error) {
                setError(err.name === 'AbortError' 
                    ? 'Upload timed out. Please try again.' 
                    : 'Failed to upload CV. Please try again.');
            }
        } finally {
            clearTimeout(timeoutId);
            setIsUploading(false);
        }
    };

    return (
        <div className="upload-cv-container">
            <h2>Upload Your CV</h2>
            
            <div className="cv-type-selector">
                <label>
                    <input
                        type="radio"
                        name="cvType"
                        value="current"
                        checked={cvType === 'current'}
                        onChange={(e) => setCvType(e.target.value as 'current' | 'future')}
                    />
                    Current CV
                </label>
                <label>
                    <input
                        type="radio"
                        name="cvType"
                        value="future"
                        checked={cvType === 'future'}
                        onChange={(e) => setCvType(e.target.value as 'current' | 'future')}
                    />
                    Future CV
                </label>
            </div>

            <div
                className="drop-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
            >
                {file ? (
                    <p className="file-name">{file.name}</p>
                ) : (
                    <p>Drop your {cvType} CV here or click to browse</p>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button
                className="upload-button"
                onClick={handleUpload}
                disabled={!file || isUploading}
            >
                {isUploading ? 'Uploading...' : `Upload ${cvType} CV`}
            </button>
        </div>
    );
};

export default UploadCV;