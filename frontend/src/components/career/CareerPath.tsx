import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

/**
 * Reusable UploadArea component.
 */
interface UploadAreaProps {
    file: File | null;
    onFileChange: (file: File) => void;
    onUploadClick: () => void;
    stage: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({
    file,
    onFileChange,
    onUploadClick,
    stage,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Handle file selection via input dialog.
     * @param e - Change event from file input
     */
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileChange(selectedFile);
        }
    };

    /**
     * Handle drag over event to allow dropping.
     * @param e - Drag event
     */
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    /**
     * Handle drop event to capture the file.
     * @param e - Drag event
     */
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const droppedFile = files[0];
            onFileChange(droppedFile);
            e.dataTransfer.clearData();
        }
    };

    /**
     * Trigger the hidden file input dialog.
     */
    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    /**
     * Utility function to capitalize the first letter.
     * @param word - string to capitalize
     * @returns capitalized string
     */
    const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

    return (
        <div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '10px',
                }}
                onClick={handleBrowseClick} // Clicking this div opens the file dialog
            >
                {file ? (
                    <p>{file.name}</p>
                ) : (
                    <p>
                        Drop here or browse local files{' '}
                        (PDF, text, rich text, or Word documents)
                    </p>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept=".pdf,.txt,.rtf,.doc,.docx,text/plain" // Accept only specific file types
                    style={{ display: 'none' }} // Hidden file input
                />
            </div>
            <div>
                <button
                    type="button"
                    onClick={onUploadClick}
                    disabled={!file} // Disable button if no file is selected
                >
                    Upload {capitalize(stage)} CV
                </button>
            </div>
        </div>
    );
};

const CareerPath: React.FC = () => {
    const { isLoggedIn, user } = useAuth(); // Access username from AuthContext
    const [displayName] = useState<string>(user?.displayName || '');

    const navigate = useNavigate();

    // Unified state for both current and future CV files
    const [cvFiles, setCvFiles] = useState<{ [key: string]: File | null }>({
        current: null,
        future: null,
    });

    // State to manage success messages
    const [uploadMessages, setUploadMessages] = useState<{ [key: string]: string }>({
        current: '',
        future: '',
    });

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
    }, [isLoggedIn, navigate]);

    /**
     * Generic handler for file selection.
     * @param stage - "current" or "future"
     * @param file - selected file
     */
    const handleFileChange = (stage: 'current' | 'future') => (file: File) => {
        if (isValidFileType(file.type)) {
            setCvFiles(prev => ({ ...prev, [stage]: file }));
        } else {
            alert(`Please upload a PDF, text, rich text, or Word document for your ${stage} CV.`);
        }
    };

    /**
     * Generic handler for upload button click.
     * @param stage - "current" or "future"
     */
    const handleUploadClick = (stage: 'current' | 'future') => () => {
        const file = cvFiles[stage];
        if (!file) {
            alert(`No ${stage} CV file selected for upload.`);
            return;
        }

        const formData = new FormData();
        formData.append('cvFile', file);
        formData.append('username', user?.email || '');
        formData.append('stage', stage);

        fetch('http://localhost:5001/api/upload-cv', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to upload ${stage} CV`);
                }
                return response.json();
            })
            .then(data => {
                console.info(`${capitalize(stage)} CV upload successful:`, data);
                // Replace alert with setting success message
                setUploadMessages(prev => ({
                    ...prev,
                    [stage]: `${capitalize(stage)} CV uploaded successfully!`,
                }));
                // Optionally, reset the file input
                setCvFiles(prev => ({ ...prev, [stage]: null }));
                // Clear the message after 5 seconds
                setTimeout(() => {
                    setUploadMessages(prev => ({ ...prev, [stage]: '' }));
                }, 5000);
            })
            .catch(error => {
                console.error(`Error uploading ${stage} CV:`, error);
                alert(`Error uploading ${stage} CV: ${error.message}`);
            });
    };

    /**
     * Utility function to validate file types.
     * @param fileType - MIME type of the file
     * @returns boolean indicating if the file type is valid
     */
    const isValidFileType = (fileType: string): boolean => {
        const validTypes = [
            'application/pdf',
            'text/plain',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/rtf',
        ];
        return validTypes.includes(fileType);
    };

    /**
     * Utility function to capitalize the first letter.
     * @param word - string to capitalize
     * @returns capitalized string
     */
    const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

    return (
        <div>
            <h1>Career Paths</h1>
            <p style={{ color: 'green' }}>This is the Career Path Page</p>

            {/* Current CV Upload Section */}
            <h2>Upload Your Current CV</h2>
            <UploadArea
                file={cvFiles.current}
                onFileChange={handleFileChange('current')}
                onUploadClick={handleUploadClick('current')}
                stage="current"
            />
            {uploadMessages.current && (
                <p style={{ color: 'green', marginTop: '5px' }}>{uploadMessages.current}</p>
            )}

            {/* Future CV Upload Section */}
            <h2>Upload Your Future CV</h2>
            <UploadArea
                file={cvFiles.future}
                onFileChange={handleFileChange('future')}
                onUploadClick={handleUploadClick('future')}
                stage="future"
            />
            {uploadMessages.future && (
                <p style={{ color: 'green', marginTop: '5px' }}>{uploadMessages.future}</p>
            )}
        </div>
    );
};

export default CareerPath;