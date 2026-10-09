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

Una barra abajo guía los 5 pasos:

1. **Su web** (`/#/web`): carta, novedades, reseñas de Google, el mapa de Google Maps,
   "cómo llegar" y pedidos por WhatsApp.
2. **Su panel** (`/#/panel`): cuánta gente lo encontró en Google, visitas, pedidos,
   cómo lo buscan, lo más visto, su ficha de Google y las reseñas.
3. **Publicar** (`/#/panel/publicar`): sube una foto, elige la categoría y escribe el texto.
   La vista previa muestra cómo queda, y al publicar aparece en la web marcada como "nuevo".
4. **Anunciar** (`/#/panel/anunciar`): el local elige su plan en la guía (fundador gratis,
   destacado o portada), ve cómo quedaría y lo activa.
5. **La guía** (`/#/guia`): "lugares de la j", lo que ve el cliente final. Anuncio de portada,
   promos de hoy, destacados y todos los locales. Ahí aparece lo que el local publicó y el anuncio que activó.

Los locales de la guía son de ejemplo (`src/data/guia.js`). Los precios de los planes también:
**decide los reales antes de mostrarlos**.

Necesita internet: las fotos (Unsplash) y el mapa vienen de la red.

### Antes de cada visita
- Todo se edita en `src/data/negocio.js`: nombre, frase, carta, precios, horario y fotos.
- **Cambia `google.mapa` por la dirección real del local**, para que el mapa muestre su calle.
- Entre una visita y otra, en el panel toca **"reiniciar demo"** (borra publicaciones y anuncio activo).

## Documentación
- [`docs/visitas.md`](docs/visitas.md): bitácora de visitas a locales, resultados y siguientes pasos.

Stack: React 18 · Vite 6 · Tailwind CSS 4.
