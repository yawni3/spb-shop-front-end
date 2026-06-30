import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ToastProvider from './components/ToastProvider.jsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/OneSignalSDKWorker.js')
      .then(registration => {
        console.log('✅ ServiceWorker registered successfully:', registration);
      })
      .catch(error => {
        console.error('❌ ServiceWorker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <ToastProvider>
  <BrowserRouter>
  < App/>
  </BrowserRouter>
  </ToastProvider>
);
