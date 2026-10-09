import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { publicacionesIniciales } from '../data/negocio'

/* Publicaciones de la demo. Se guardan en el navegador para que, si recargas
   la página durante la reunión, lo publicado siga ahí. */
const KEY = 'casa-olmo-publicaciones-v2'
const Ctx = createContext(null)

function cargar() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* sin almacenamiento: seguimos en memoria */
  }
  return publicacionesIniciales
}

export function PublicacionesProvider({ children }) {
  const [lista, setLista] = useState(cargar)
  const [ultima, setUltima] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lista))
    } catch {
      /* imagen muy grande o almacenamiento bloqueado: no pasa nada */
    }
  }, [lista])

  const publicar = useCallback((p) => {
    const nueva = { ...p, id: `p-${Date.now()}`, fecha: 'recién publicado' }
    setLista((l) => [nueva, ...l])
    setUltima(nueva.id)
    return nueva
  }, [])

  const reiniciar = useCallback(() => {
    setLista(publicacionesIniciales)
    setUltima(null)
  }, [])

  return <Ctx.Provider value={{ lista, ultima, publicar, reiniciar }}>{children}</Ctx.Provider>
}

export const usePublicaciones = () => useContext(Ctx)
