

# Server

A backend server for event management and ticketing system built with Express.js, MongoDB, and Stripe integration.

## Features

- User authentication with JWT
- Organization management
- Event creation and management
- Ticket booking and QR code generation
- Stripe payment integration
- File uploads with Cloudinary
- Security with Helmet and CORS

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose & Prisma ORM
- **Authentication**: JWT, bcrypt
- **Payments**: Stripe
- **File Upload**: Multer, Cloudinary
- **Security**: Helmet, CORS
- **Development**: Nodemon

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file with necessary environment variables for database, JWT, Stripe, and Cloudinary.

## Running the Server

```bash
npm start
```

Server runs on `http://localhost:8080`

## API Endpoints

- `/api/v1/auth/` - Authentication routes
- `/api/v1/org/` - Organization management
- `/api/v1/event` - Event management
- `/api/v1/ticket` - Ticket operations
- `/api/v1/gateMate` - Gate operations

## License

ISC

## Backend Architecture

### Overview

The backend is built with Express.js and follows an MVC pattern with separation of concerns. It handles user authentication, event management, ticketing, payments, and gate operations through RESTful APIs.

### Folder Structure

```
server/
├── controllers/        # Request handlers and business logic
├── routes/            # API endpoint definitions
├── models/            # MongoDB/Prisma schemas
├── middleware/        # Auth, validation, error handling
├── config/            # Database and external service configs
├── utils/             # Helper functions and utilities
├── validators/        # Input validation schemas
└── .env               # Environment variables
```

### API Routing & Controller Flow

Routes are organized by feature domains:
- **Auth Controller**: Handles registration, login, token refresh
- **Organization Controller**: CRUD operations for organizations
- **Event Controller**: Event creation, updates, listing
- **Ticket Controller**: Booking, QR code generation, validation
- **GateMate Controller**: Gate check-in and access control

Request flow: Route → Middleware (Auth/Validation) → Controller → Service Logic → Database → Response

### Authentication & Authorization

- **JWT Strategy**: Access tokens for API requests, refresh tokens for long-term sessions
- **Password Security**: Bcrypt hashing with salt rounds
- **Role-Based Access**: Users have roles (admin, organizer, attendee) with specific permissions
- **Middleware Protection**: `verifyToken` middleware protects routes requiring authentication

### Database Schema & Data Flow

- **Users**: Store credentials, profiles, roles
- **Organizations**: Organization details linked to admins
- **Events**: Event metadata, pricing, capacity, linked to organizations
- **Tickets**: User bookings with unique identifiers for QR codes
- **Transactions**: Stripe payment records and ticket purchase history

Data relationships are enforced through foreign keys and Mongoose references.

### Middleware Stack

- **CORS**: Handles cross-origin requests
- **Helmet**: Sets security HTTP headers
- **Body Parser**: Processes JSON/form data
- **Auth Middleware**: Validates JWT tokens
- **Validation Middleware**: Uses schemas to validate request data
- **Error Handler**: Centralized error processing and response formatting

### Error Handling

Errors are caught and passed to a centralized error handler middleware that:
- Logs errors for debugging
- Returns standardized error responses with status codes
- Distinguishes between client errors (4xx) and server errors (5xx)
- Hides sensitive information in production

### Environment Variables Required

```
# Database
MONGODB_URI=

# JWT
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# Cloudinary
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

# Server
PORT=8080
NODE_ENV=development
```

### Running the Backend Locally

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in root with variables above

3. Start development server:
```bash
npm start
```

Server starts on `http://localhost:8080`

For development with auto-reload, Nodemon watches file changes and restarts the server automatically.
