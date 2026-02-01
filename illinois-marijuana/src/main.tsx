import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Sources from './pages/Sources.tsx'
import Breeders from './pages/Breeders.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/breeders" element={<Breeders />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
