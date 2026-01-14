
## Frontend Architecture

### Overview
This is a React + Vite frontend application designed for the GatePe payment platform. It provides a modern, responsive UI with optimized performance through Vite's fast build tooling and Hot Module Replacement (HMR).

### Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS/Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Linting**: ESLint

### Folder Structure
```
src/
├── components/       # Reusable UI components
├── pages/           # Page-level components
├── hooks/           # Custom React hooks
├── store/           # Zustand store configuration
├── services/        # API service calls
├── utils/           # Utility functions
├── styles/          # Global styles
└── App.jsx          # Main application component
```
### Routing
Navigation is handled by React Router with the following main routes:
- Dashboard
- Payment flows
- User profile
- Transactions
- Settings

### State Management
- **Global State**: Redux Toolkit manages application-wide state (user auth, transactions, payments)
- **Local State**: React hooks for component-specific state
- **API Cache**: Optimized caching for API responses

### API Integration
- Centralized API client in `services/`
- Interceptors for authentication tokens
- Error handling and loading states
- Request/response transformation

### Running Locally
```bash
npm install
npm run dev
```
The application will start at `http://localhost:5173`
