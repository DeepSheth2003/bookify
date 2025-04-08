import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FirebaseProvider } from './context/firebase.jsx'
import { BrowserRouter } from 'react-router';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </BrowserRouter>
  </StrictMode>,
)
