import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const UserProfile: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [displayName, setDisplayName] = useState<string>(user?.displayName || '');
    const [birthDate, setBirthDate] = useState<string>(user?.birthDate || '');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const birthDateObj = new Date(birthDate);
        if (isNaN(birthDateObj.getTime())) {
            setError('Invalid birth date.');
            return;
        }

        const today = new Date();
        const minDate = new Date(
            today.getFullYear() - 90,
            today.getMonth(),
            today.getDate()
        );
        const maxDate = new Date(
            today.getFullYear() - 10,
            today.getMonth(),
            today.getDate()
        );

        if (birthDateObj < minDate || birthDateObj > maxDate) {
            setError(
                'Birth date must be between 10 and 90 years from today.'
            );
            return;
        }

        const updates: {
            displayName?: string;
            birthDate?: string;
            password?: string;
        } = {};

        if (displayName !== user?.displayName) {
            updates.displayName = displayName;
        }

        if (birthDate !== user?.birthDate) {
            updates.birthDate = birthDate;
        }

        if (password) {
            updates.password = password;
        }

        if (Object.keys(updates).length === 0) {
            setError('No changes to update.');
            return;
        }

        try {
            setIsUpdating(true);
            await updateUser(updates);
            setSuccessMessage('Profile updated successfully!');
            setError('');
            // Clear password fields
            setPassword('');
            setConfirmPassword('');
            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (err) {
            console.error('Update failed:', err);
            setError('Failed to update profile. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
                <p className="success-message">{successMessage}</p>
            )}
            <form onSubmit={handleUpdate} className="profile-form">
                <div className="form-group">
                    <label htmlFor="email">Email (Username):</label>
                    <input
                        type="email"
                        id="email"
                        value={user?.email || ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="displayName">Display Name:</label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter display name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthDate">Birth Date:</label>
                    <input
                        type="date"
                        id="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="Enter birth date"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                    />
                </div>
                <button type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;