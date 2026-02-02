import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Sources from './pages/Sources.tsx'
import Breeders from './pages/Breeders.tsx'
import Archives from './pages/Archives.tsx'
import CultivatorDetail from './pages/CultivatorDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/breeders" element={<Breeders />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/cultivators/:id" element={<CultivatorDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
