# Project Overview

The Career Path App is designed to help individuals explore and find their future career paths. It consists of a frontend built with React and TypeScript, and two backend services for user management and career management.

## Project Structure

```
career-path-app
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   └── Login.tsx
│   │   │   ├── career
│   │   │   │   └── CareerPath.tsx
│   │   │   └── shared
│   │   │       └── Header.tsx
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── user_service
│   ├── app
│   │   ├── routes
│   │   │   └── auth.py
│   │   └── __init__.py
│   ├── requirements.txt
│   └── config.py
├── career_service
│   ├── app
│   │   ├── routes
│   │   │   └── career.py
│   │   └── __init__.py
│   ├── requirements.txt
│   └── config.py
└── README.md
```

## Setup Instructions

1. **Frontend Setup**
   - Navigate to the `frontend` directory.
   - Install dependencies using `npm install`.
   - Start the development server with `npm start`.

2. **User Service Setup**
   - Navigate to the `user_service` directory.
   - Install dependencies using `pip install -r requirements.txt`.
   - Run the Flask application.

3. **Career Service Setup**
   - Navigate to the `career_service` directory.
   - Install dependencies using `pip install -r requirements.txt`.
   - Run the Flask application.

## Features

- **User Authentication**: Users can log in and manage their profiles.
- **Career Management**: Users can explore various career paths and related information.
- **Responsive UI**: The frontend is built with React and TypeScript for a modern user experience.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.