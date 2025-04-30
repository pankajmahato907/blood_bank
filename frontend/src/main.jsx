import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';

import './index.css';
import { AuthProvider } from './components/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
      <ToastContainer 
      position="top-right"
      autoClose={1000}
      theme="light"
      limit={3}
      /> 
    </AuthProvider>
  </StrictMode>
);

