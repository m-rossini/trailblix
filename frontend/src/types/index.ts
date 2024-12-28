export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface Career {
    id: string;
    title: string;
    description: string;
    requirements: string[];
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface CareerPath {
    id: string;
    title: string;
    description: string;
    paths: Career[];
}