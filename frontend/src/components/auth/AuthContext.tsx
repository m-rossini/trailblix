import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    _id: string;
    email: string;
    displayName: string;
    birthDate: string;
    consent_data: boolean;
    marketing_consent_data: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthLoading: boolean;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<User>;
    signup: (
        email: string,
        password: string,
        displayName: string,
        birthDate: string,
        consent_data: boolean,
        marketing_consent_data: boolean
    ) => Promise<User>;
    logout: (redirectTo?: string) => void;
    updateUser: (updates: {
        displayName?: string;
        birthDate?: string;
        password?: string;
        consent_data?: boolean;
        marketing_consent_data?: boolean;
    }) => Promise<User>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const data = sessionStorage.getItem('userData');
        if (data) {
            try {
                const parsedData: User = JSON.parse(data);
                setUser(parsedData);
            } catch (error) {
                console.error('Failed to parse auth data:', error);
            }
        }
        setIsAuthLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<User> => {
        setIsAuthLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const responseData = await response.json();

            const userData: User = {
                _id: responseData.data._id,
                email: responseData.data.username,
                displayName: responseData.data.display_name,
                birthDate: responseData.data.birth_date,
                consent_data: responseData.data.consent_data,
                marketing_consent_data: responseData.data.marketing_consent_data
            };

            sessionStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);
            setIsAuthLoading(false);

            return userData;

        } catch (error) {
            setIsAuthLoading(false);
            console.error('Error during login:', error);
            throw error;
        }
    };

    const signup = async (
        email: string,
        password: string,
        displayName: string,
        birthDate: string,
        consent_data: boolean,
        marketing_consent_data: boolean
    ): Promise<User> => {
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    displayName,
                    birthDate,
                    consent_data,
                    marketing_consent_data
                }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const userData: User = await response.json();
            setUser(userData);
            sessionStorage.setItem('userData', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }
    };

    const logout = (redirectTo: string = '/'): void => {
        setUser(null);
        sessionStorage.removeItem('userData');
        navigate(redirectTo);
    };

    const updateUser = async (updates: {
        displayName?: string;
        birthDate?: string;
        password?: string;
        consent_data?: boolean;
        marketing_consent_data?: boolean;
    }): Promise<User> => {
        if (!user) {
            throw new Error('No user is logged in');
        }
        try {
            const response = await fetch('http://localhost:5000/api/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    ...updates,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const serverResponse = await response.json();
            const usableResponse = serverResponse.data;
            const updatedUser: User = {
                ...user,
                displayName: usableResponse.display_name ?? user.displayName,
                birthDate: usableResponse.birth_date ?? user.birthDate,
                consent_data: usableResponse.consent_data ?? user.consent_data,
                marketing_consent_data: usableResponse.marketing_consent_data ?? user.marketing_consent_data,
            };
            setUser(updatedUser);
            sessionStorage.setItem('userData', JSON.stringify(updatedUser));
            return updatedUser;

        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        isAuthLoading,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};