import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const userData = sessionStorage.getItem('userData');
    let parsedUserData;
    try {
        parsedUserData = JSON.parse(userData || '{}');
    } catch (error) {
        console.error("Failed to parse userData:", error);
        parsedUserData = {};
    }

    console.info("Parsed user data:", parsedUserData);
    if (!parsedUserData._id) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;