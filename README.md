# GatePe - Complete Project README

## Project Overview

GatePe is a full-stack MERN application designed to simulate an online payment and event ticketing workflow. The project focuses on building a scalable frontend and secure backend using modern web technologies, demonstrating real-world concepts such as authentication, role-based access control, API-driven communication, and clean UI design.

## Tech Stack

### Frontend

- **Framework**: React
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **API**: REST APIs

## High-Level Architecture

```
Client (React)
    ↓ HTTP Requests
Backend (Express API)
    ↓ Business Logic
MongoDB Database
```

## Folder Structure

```
GatePe/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── config/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Frontend Workflow

1. User interacts with React components
2. Application state is managed using Zustand
3. API requests are sent using Axios
4. Server responses update the UI and global state
5. User actions are reflected in real-time

## Backend Workflow

1. Requests are received by Express routes
2. JWT authentication middleware validates access
3. Controllers handle business logic
4. Models interact with MongoDB
5. Responses are sent back to the client

## Client-Server Communication

### API Flow

```
Frontend Request
    ↓
API Routes
    ↓
Authentication Middleware
    ↓
Controllers
    ↓
MongoDB
    ↓
Response
```

## Authentication & Authorization

- **Method**: JWT-based authentication
- **Access Control**: Role-based access control (RBAC)
- **Protected Routes**: Middleware validates tokens on backend
- **Secure Communication**: API-driven with encrypted credentials

## Environment Variables Setup

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (`.env`)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Installation & Setup

### Prerequisites

- Node.js v16+
- npm
- Git

### Steps

1. **Clone Repository**

```bash
git clone https://github.com/konlin008/GatePe.git
cd GatePe
```

2. **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
npm run dev
```

## Running Locally

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

## Features

- User authentication using JWT
- Role-based access control
- Secure REST APIs
- Responsive UI with Tailwind CSS
- Scalable frontend and backend architecture

## Future Improvements

- Payment gateway integration
- Enhanced error handling
- Admin dashboard
- CI/CD deployment pipeline
