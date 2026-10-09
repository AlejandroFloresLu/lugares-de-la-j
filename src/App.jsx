import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PublicacionesProvider } from './lib/publicaciones'
import { DemoBar } from './components/DemoBar'
import { Web } from './views/Web'
import { Panel } from './views/Panel'
import { Publicar } from './views/Publicar'
import { Anunciar } from './views/Anunciar'
import { Guia } from './views/Guia'

/* La demo es un solo flujo:
   1. /web             → la web del local, conectada a Google Maps
   2. /panel           → el panel del dueño con sus métricas
   3. /panel/publicar  → publica una novedad y mírala en la web
   4. /panel/anunciar  → elige un plan de anuncio en la guía
   5. /guia            → la guía "lugares de la j" que ve el cliente final */

function ScrollArriba() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (!search.includes('nuevo')) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, search])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <PublicacionesProvider>
        <ScrollArriba />
        <Routes>
          <Route path="/" element={<Navigate to="/web" replace />} />
          <Route path="/web" element={<Web />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/panel/publicar" element={<Publicar />} />
          <Route path="/panel/anunciar" element={<Anunciar />} />
          <Route path="/guia" element={<Guia />} />
          <Route path="*" element={<Navigate to="/web" replace />} />
        </Routes>
        <DemoBar />
      </PublicacionesProvider>
    </HashRouter>
  )
}
