# Lugares de la J

Todo lo necesario para salir a visitar locales: **la presentación** y **el demo**.

## 🌐 En línea (sin instalar nada)

- **Demo:** https://alejandrofloreslu.github.io/lugares-de-la-j/
- **Presentación:** https://alejandrofloreslu.github.io/lugares-de-la-j/presentacion/

Cada vez que subes cambios a `main`, el sitio se vuelve a publicar solo (tarda 1–2 minutos).

## 1. Presentación (10 minutos)

Abre `presentacion/index.html` con doble clic. Se abre en el navegador, sin instalar nada.

- **← →** o espacio para avanzar; en el celular, desliza.
- **N** muestra las notas de lo que hay que decir en cada diapositiva.
- **F** pone pantalla completa.
- Antes de presentar, completa lo que está entre [corchetes]: tu nombre, número, duración de lo gratis, mes y fecha.

## 2. Demo (en el celular)

```bash
npm install     # solo la primera vez
npm run dev     # abre en el celular la dirección "Network" que aparece (mismo wifi)
```

Una barra abajo guía los 3 pasos:

1. **Su web** (`/#/web`): carta, novedades, reseñas de Google, el mapa de Google Maps,
   "cómo llegar" y pedidos por WhatsApp.
2. **Su panel** (`/#/panel`): cuánta gente lo encontró en Google, visitas, pedidos,
   cómo lo buscan, lo más visto, su ficha de Google y las reseñas.
3. **Publicar** (`/#/panel/publicar`): sube una foto, elige la categoría y escribe el texto.
   La vista previa muestra cómo queda, y al publicar aparece en la web marcada como "nuevo".

Necesita internet: las fotos (Unsplash) y el mapa vienen de la red.

### Antes de cada visita
- Todo se edita en `src/data/negocio.js`: nombre, frase, carta, precios, horario y fotos.
- **Cambia `google.mapa` por la dirección real del local**, para que el mapa muestre su calle.
- Entre una visita y otra, en el panel toca **"reiniciar demo"**.

Stack: React 18 · Vite 6 · Tailwind CSS 4.
