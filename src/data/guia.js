/* ==========================================================================
   FASE 3 · LA GUÍA "LUGARES DE LA J" Y LOS ANUNCIOS
   --------------------------------------------------------------------------
   Los locales de aquí son de EJEMPLO (nombres inventados). Cuando un local
   real se sume (ej. Chorigol), agrégalo a `locales` con sus datos reales.
   El local "casa olmo" sale de data/negocio.js y es el que compra anuncios
   en la demo.
   ========================================================================== */

const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

export const guia = {
  nombre: 'lugares de la j',
  sector: 'la j',
  // Números de la guía que se muestran al local en "anunciar" (de ejemplo)
  audiencia: {
    personas: 3480,
    busquedas: 1920,
    clicsWhatsapp: 610,
  },
}

export const categoriasGuia = [
  { id: 'todo', label: 'todo' },
  { id: 'comer', label: 'comer' },
  { id: 'cafe', label: 'café' },
  { id: 'dulce', label: 'dulce' },
  { id: 'servicios', label: 'servicios' },
  { id: 'mercado', label: 'mercado' },
]

/* Locales de ejemplo de la guía */
export const locales = [
  {
    id: 'smash-j',
    nombre: 'smash burger j',
    categoria: 'comer',
    tipo: 'hamburguesas',
    foto: u('1568901346375-23c9450c58cd'),
    rating: 4.7,
    distancia: '120 m',
    abre: '12:00',
    cierra: '23:00',
    fundador: true,
    destacado: false,
    promo: { titulo: 'combo smash + papas $6.50', texto: 'todos los días de 12:00 a 16:00.' },
  },
  {
    id: 'don-lucho',
    nombre: 'parrilla don lucho',
    categoria: 'comer',
    tipo: 'parrilla',
    foto: u('1544025162-d76694265947'),
    rating: 4.8,
    distancia: '250 m',
    abre: '12:00',
    cierra: '22:00',
    fundador: true,
    destacado: true, // ejemplo de local que ya paga "destacado"
    promo: { titulo: 'costillas para 2 a $14', texto: 'viernes y sábado, con 2 bebidas.' },
  },
  {
    id: 'forno-22',
    nombre: 'forno 22',
    categoria: 'comer',
    tipo: 'pizzería',
    foto: u('1513104890138-7c749659a591'),
    rating: 4.6,
    distancia: '300 m',
    abre: '17:00',
    cierra: '23:00',
    fundador: false,
    destacado: false,
    promo: null,
  },
  {
    id: 'taqueria-patio',
    nombre: 'taquería el patio',
    categoria: 'comer',
    tipo: 'tacos',
    foto: u('1565299585323-38d6b0865b47'),
    rating: 4.5,
    distancia: '400 m',
    abre: '18:00',
    cierra: '00:00',
    fundador: true,
    destacado: false,
    promo: { titulo: 'martes de tacos 3x2', texto: 'en todos los tacos de la carta.' },
  },
  {
    id: 'nube',
    nombre: 'heladería nube',
    categoria: 'dulce',
    tipo: 'helados artesanales',
    foto: u('1497034825429-c343d7c6a68f'),
    rating: 4.9,
    distancia: '180 m',
    abre: '11:00',
    cierra: '21:00',
    fundador: true,
    destacado: false,
    promo: { titulo: 'segunda bola a mitad de precio', texto: 'de lunes a jueves.' },
  },
  {
    id: 'barberia-norte',
    nombre: 'barbería norte',
    categoria: 'servicios',
    tipo: 'barbería',
    foto: u('1585747860715-2ba37e788b70'),
    rating: 4.8,
    distancia: '220 m',
    abre: '09:00',
    cierra: '20:00',
    fundador: false,
    destacado: false,
    promo: null,
  },
  {
    id: 'fruteria-j',
    nombre: 'frutería la j',
    categoria: 'mercado',
    tipo: 'frutas y verduras',
    foto: u('1488459716781-31db52582fe9'),
    rating: 4.6,
    distancia: '90 m',
    abre: '06:30',
    cierra: '19:00',
    fundador: true,
    destacado: false,
    promo: null,
  },
]

/* Anuncio de portada por defecto (cuando casa olmo no ha comprado portada) */
export const portadaPorDefecto = {
  localId: 'smash-j',
  titulo: 'la smash más jugosa de la j.',
  texto: 'combo smash + papas a $6.50 al mediodía.',
  foto: u('1568901346375-23c9450c58cd', 1600),
}

/* ==========================================================================
   PLANES DE ANUNCIO
   👉 Los precios son de EJEMPLO. Decide los reales antes de mostrarlos.
   ========================================================================== */
export const planes = [
  {
    id: 'fundador',
    nombre: 'fundador',
    precio: 'gratis',
    periodo: 'primer año',
    resumen: 'aparece en la guía con tu web, horario y promos.',
    incluye: ['ficha en la guía', 'tus promos en "promos de hoy"', 'sello de local fundador'],
    extraVistas: 0,
  },
  {
    id: 'destacado',
    nombre: 'destacado',
    precio: '$10',
    periodo: 'al mes',
    resumen: 'sales primero en tu categoría y en las promos del día.',
    incluye: ['todo lo de fundador', 'primer lugar en tu categoría', 'tu promo arriba en "promos de hoy"', 'etiqueta "destacado"'],
    extraVistas: 2.4, // multiplicador de ejemplo
  },
  {
    id: 'portada',
    nombre: 'portada',
    precio: '$5',
    periodo: 'por semana',
    resumen: 'el anuncio grande que ve todo el que abre la guía.',
    incluye: ['banner a pantalla completa al abrir la guía', 'botón directo a tu web o whatsapp', 'reporte de vistas y clics'],
    extraVistas: 4.1,
  },
]
