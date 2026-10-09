/* ==========================================================================
   DATOS DEL NEGOCIO DE LA DEMO
   --------------------------------------------------------------------------
   Todo lo que se ve en la web, el panel y la publicación sale de aquí.
   Antes de una visita, cambia nombre, textos, carta, horario y dirección.

   Fotos: son de Unsplash (se cargan desde internet). Para un local real,
   pon sus fotos en /public y escribe la ruta, ej. foto: '/mi-local.jpg'.
   ========================================================================== */

const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

export const negocio = {
  nombre: 'casa olmo',
  tipo: 'café & panadería',
  sector: 'la j',
  dueno: 'María',
  frase: 'pan del día y café de verdad.',
  descripcion:
    'Horneamos cada mañana desde las 6:00 y tostamos nuestro café cada semana. Un lugar tranquilo para desayunar, trabajar un rato o llevarte el pan a casa.',

  moneda: 'USD',
  telefono: '+593 99 123 4567',
  whatsapp: '593991234567', // sin + ni espacios
  instagram: '@casaolmo.cafe',
  direccion: 'Calle principal y pasaje J, local 4',

  /* GOOGLE MAPS
     mapa:    lo que escribirías en Google Maps para encontrar el local.
              👉 Cámbialo por la dirección real del negocio antes de la visita.
     placeId: opcional. Con él, "dejar reseña" abre directo el formulario. */
  google: {
    mapa: 'Guayaquil, Ecuador',
    placeId: '',
    rating: 4.8,
    resenas: 126,
  },

  fotos: {
    portada: u('1517433670267-08bbd4be890f', 2000),
    interior: u('1521017432531-fbd92d768814'),
    barra: u('1442512595331-e89e73853f31'),
    mesa: u('1600891964092-4316c288032e'),
    desayunos: u('1525351484163-7529414344d8'),
  },

  valores: [
    { titulo: 'horneado aquí.', texto: 'pan de masa madre y bollería que sale del horno cada mañana.' },
    { titulo: 'café de origen.', texto: 'compramos a pequeños productores y lo tostamos cada semana.' },
    { titulo: 'pídelo directo.', texto: 'escríbenos por whatsapp y lo tienes listo, sin apps ni comisiones.' },
  ],

  horario: [
    { dia: 'lunes', abre: '07:00', cierra: '19:00' },
    { dia: 'martes', abre: '07:00', cierra: '19:00' },
    { dia: 'miércoles', abre: '07:00', cierra: '19:00' },
    { dia: 'jueves', abre: '07:00', cierra: '19:00' },
    { dia: 'viernes', abre: '07:00', cierra: '20:00' },
    { dia: 'sábado', abre: '08:00', cierra: '18:00' },
    { dia: 'domingo', abre: '08:00', cierra: '14:00' },
  ],

  carta: [
    { id: 'capuchino', nombre: 'capuchino', detalle: 'doble espresso y leche texturizada', precio: 2.5, foto: u('1514432324607-a09d9b4aefdd', 800), vistas: 412 },
    { id: 'croissant', nombre: 'croissant de mantequilla', detalle: 'hojaldrado a mano, sale a las 7:00', precio: 1.8, foto: u('1555507036-ab1f4038808a', 800), vistas: 356 },
    { id: 'masa-madre', nombre: 'pan de masa madre', detalle: '24 horas de fermentación', precio: 4.5, foto: u('1509440159596-0249088772ff', 800), vistas: 241 },
    { id: 'cold-brew', nombre: 'café frío', detalle: 'cold brew de 18 horas con leche', precio: 3.0, foto: u('1461023058943-07fcbe16d735', 800), vistas: 198 },
    { id: 'pancakes', nombre: 'pancakes de la casa', detalle: 'con frutos rojos y miel de abeja', precio: 5.5, foto: u('1506084868230-bb9d95c24759', 800), vistas: 187 },
    { id: 'torta', nombre: 'torta de chocolate', detalle: 'cacao ecuatoriano 70%', precio: 3.5, foto: u('1578985545062-69928b1d9587', 800), vistas: 164 },
  ],

  resenasGoogle: [
    { autor: 'Daniela R.', estrellas: 5, texto: 'El mejor croissant que he probado en la zona y el café está buenísimo. Volveré.', hace: 'hace 2 días' },
    { autor: 'Andrés M.', estrellas: 5, texto: 'Lugar tranquilo para trabajar, buen wifi y atención muy amable.', hace: 'hace 1 semana' },
  ],
}

/* Fotos de ejemplo para la pantalla de publicar (si no subes una propia). */
export const fotosEjemplo = [
  u('1495474472287-4d71bcdd2085', 1200),
  u('1484723091739-30a097e8f929', 1200),
  u('1497515114629-f71d768fd07c', 1200),
  u('1568254183919-78a4f43a2877', 1200),
]

export const categorias = [
  { id: 'promo', label: 'promoción' },
  { id: 'nuevo', label: 'nuevo en la carta' },
  { id: 'evento', label: 'evento' },
  { id: 'aviso', label: 'aviso' },
]

/* Publicaciones que ya aparecen en la web al abrir la demo. */
export const publicacionesIniciales = [
  {
    id: 'p-1',
    categoria: 'nuevo',
    titulo: 'llegó el pan de chocolate.',
    texto: 'masa madre con cacao y chispas de chocolate amargo. sale los viernes y sábados desde las 8:00.',
    foto: u('1568254183919-78a4f43a2877', 1200),
    vigencia: 'esta semana',
    fecha: 'hace 3 días',
  },
  {
    id: 'p-2',
    categoria: 'evento',
    titulo: 'catación de café, sábado 10:00.',
    texto: 'probamos tres cafés de origen y te contamos cómo prepararlos en casa. cupos limitados, reserva por whatsapp.',
    foto: u('1442512595331-e89e73853f31', 1200),
    vigencia: 'esta semana',
    fecha: 'hace 5 días',
  },
  {
    id: 'p-3',
    categoria: 'aviso',
    titulo: 'domingos abrimos desde las 8:00.',
    texto: 'nuevo horario de fin de semana para que el desayuno de domingo sea sin apuro.',
    foto: u('1554118811-1e0d58224f24', 1200),
    vigencia: 'este mes',
    fecha: 'hace 1 semana',
  },
]

/* MÉTRICAS DEL PANEL (de ejemplo) */
export const metricas = {
  googleVistas: { valor: 2140, cambio: 32 },
  webVisitas: { valor: 1284, cambio: 18 },
  pedidosWhatsapp: { valor: 137, cambio: 9 },
  comoLlegar: { valor: 96, cambio: 14 },
  llamadas: { valor: 41, cambio: -3 },
  busquedas: [
    { texto: 'cafetería cerca de mí', veces: 312 },
    { texto: 'panadería la j', veces: 204 },
    { texto: 'desayunos cerca', veces: 158 },
    { texto: 'casa olmo', veces: 97 },
  ],
}
