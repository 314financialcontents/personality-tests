import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './form.css'
import App from './App.jsx'
import './i18n';

createRoot(document.getElementById('root')).render(
    <App />,
)
