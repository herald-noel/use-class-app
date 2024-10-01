import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/toaster'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { ENV } from './data/env.constants.ts'

if (import.meta.env.VITE_ENV === ENV.PROD) disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        <Toaster />
    </React.StrictMode>
)
