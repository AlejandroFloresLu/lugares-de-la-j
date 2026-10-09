import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' = rutas relativas: el build funciona igual en GitHub Pages
// (https://usuario.github.io/lugares-de-la-j/) que en cualquier carpeta.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // permite abrir en la red local (ideal para probar en el celular)
    port: 5173,
  },
})
