import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './retro.css'
import Directory from './Directory.tsx'
import Sources from './pages/Sources.tsx'
import Breeders from './pages/Breeders.tsx'
import CultivatorDetail from './pages/CultivatorDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/breeders" element={<Breeders />} />
        <Route path="/cultivators/:id" element={<CultivatorDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
