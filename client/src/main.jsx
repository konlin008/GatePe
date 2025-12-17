import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { Toaster } from './components/ui/sonner';
import LoadingSpinner from './components/LoadingSpinner';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;


export const Custom = ({ children }) => {
  const { isLoading } = useLoadUserProfileQuery()
  return (
    <>
      {isLoading ? <LoadingSpinner /> : <> {children} </>}
    </>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
      <Toaster />
    </Auth0Provider>
  </StrictMode>,
)
