import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import AuthProvider from './components/context/AutorizationContext.jsx'
import LimitInfoProvider from "./components/context/LimitInfoContext.jsx";
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LimitInfoProvider>
          <App />
        </LimitInfoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
