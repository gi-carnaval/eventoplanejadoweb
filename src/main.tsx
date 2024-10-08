import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="w-full h-dvh text-center flex justify-center items-center bg-main-background bg-cover overflow-hidden">
      <App />
    </div>
  </React.StrictMode>,
)
