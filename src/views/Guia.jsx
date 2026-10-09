import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, MapPin, Search, Star } from 'lucide-react'
import { negocio } from '../data/negocio'
import { categoriasGuia, guia, locales, portadaPorDefecto } from '../data/guia'
import { usePublicaciones } from '../lib/publicaciones'
import { abiertoAhora } from '../lib/utils'

/* ==========================================================================
   5 · LA GUÍA "LUGARES DE LA J" — lo que ve el cliente final
   Aquí se ven los anuncios: portada, destacados y promos de hoy.
   ========================================================================== */

const minutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
function abierto(l) {
  if (l.id === 'casa-olmo') return abiertoAhora()
  const d = new Date()
  const ahora = d.getHours() * 60 + d.getMinutes()
  const a = minutos(l.abre)
  let c = minutos(l.cierra)
  if (c <= a) c += 24 * 60
  return (ahora >= a && ahora < c) || (ahora + 24 * 60 >= a && ahora + 24 * 60 < c)
}

export function Guia() {
  const { lista, anuncio } = usePublicaciones()
  const [cat, setCat] = useState('todo')
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = `${guia.nombre} · qué hacer hoy en ${guia.sector}`
  }, [])

  // casa olmo entra a la guía con sus datos reales de la demo y su última publicación
  const olmo = useMemo(() => {
    const ultima = lista[0]
    return {
      id: 'casa-olmo',
      nombre: negocio.nombre,
      categoria: 'cafe',
      tipo: negocio.tipo,
      foto: negocio.fotos.portada,
      rating: negocio.google.rating,
      distancia: '150 m',
      fundador: true,
      destacado: anuncio === 'destacado',
      web: '/web',
      promo: ultima ? { titulo: ultima.titulo, texto: ultima.texto, foto: ultima.foto } : null,
    }
  }, [lista, anuncio])

  const todos = useMemo(() => [olmo, ...locales], [olmo])

  const portada =
    anuncio === 'portada'
      ? {
          local: olmo,
          titulo: lista[0]?.titulo || negocio.frase,
          texto: lista[0]?.texto || negocio.descripcion,
          foto: lista[0]?.foto || negocio.fotos.portada,
        }
      : { local: locales.find((l) => l.id === portadaPorDefecto.localId), ...portadaPorDefecto }

  const promos = todos
    .filter((l) => l.promo)
    .sort((a, b) => Number(b.destacado) - Number(a.destacado))

  const filtrados = todos
    .filter((l) => cat === 'todo' || l.categoria === cat)
    .filter((l) => !q || `${l.nombre} ${l.tipo}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => Number(b.destacado) - Number(a.destacado))

  const destacados = todos.filter((l) => l.destacado)

  return (
    <div className="min-h-dvh bg-paper pb-28 text-ink">
      {/* Cabecera */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[20px] font-semibold leading-tight tracking-[-0.03em]">{guia.nombre}</p>
            <p className="flex items-center gap-1 text-[12px] text-ink-3">
              <MapPin size={12} /> {todos.length} locales en {guia.sector}
            </p>
          </div>
          <label className="relative order-last w-full sm:order-none sm:w-[340px]">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="¿qué se te antoja? café, tacos, barbería…"
              aria-label="Buscar en la guía"
              className="h-11 w-full border border-line bg-white pl-10 pr-3 text-[15px] outline-none placeholder:text-ink-3 focus:border-ink"
            />
          </label>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ANUNCIO DE PORTADA */}
        <section aria-label="Anuncio" className="pt-6">
          <Portada {...portada} />
        </section>

        {/* Categorías */}
        <nav aria-label="Categorías" className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {categoriasGuia.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={`h-10 shrink-0 border px-4 text-[14px] ${cat === c.id ? 'border-ink bg-ink text-paper' : 'border-line text-ink-2 hover:border-ink'}`}
            >
              {c.label}
            </button>
          ))}
        </nav>

        {/* PROMOS DE HOY */}
        {cat === 'todo' && !q && (
          <section className="mt-12">
            <div className="flex items-end justify-between">
              <h2 className="text-[26px] font-medium tracking-[-0.02em]">promos de hoy.</h2>
              <span className="text-[13px] text-ink-3">{promos.length} activas</span>
            </div>
            <div className="-mx-5 mt-5 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0">
              {promos.map((l) => (
                <Tarjeta key={l.id} local={l} className="w-[250px] shrink-0 snap-start">
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
                    <img src={l.promo.foto || l.foto} alt="" className="h-full w-full object-cover" loading="lazy" />
                    {l.destacado && <Etiqueta>destacado</Etiqueta>}
                  </div>
                  <p className="mt-3 text-[15px] font-medium leading-snug">{l.promo.titulo}</p>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-ink-2">{l.promo.texto}</p>
                  <p className="mt-2 text-[12px] font-medium text-ink-3">{l.nombre}</p>
                </Tarjeta>
              ))}
            </div>
          </section>
        )}

        {/* DESTACADOS */}
        {cat === 'todo' && !q && destacados.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[26px] font-medium tracking-[-0.02em]">destacados en la j.</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {destacados.map((l) => (
                <Tarjeta key={l.id} local={l} className={l.id === 'casa-olmo' ? 'rise' : ''}>
                  <div className="relative aspect-[16/9] overflow-hidden bg-paper-3">
                    <img src={l.foto} alt={l.nombre} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                    <Etiqueta>destacado</Etiqueta>
                    <div className="absolute bottom-0 left-0 p-4 text-paper">
                      <p className="text-[20px] font-medium leading-tight">{l.nombre}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-paper/80">
                        {l.tipo} · <Star size={12} className="fill-[#e8a33d] text-[#e8a33d]" /> {l.rating} · {l.distancia}
                      </p>
                    </div>
                  </div>
                </Tarjeta>
              ))}
            </div>
          </section>
        )}

        {/* TODOS LOS LOCALES */}
        <section className="mt-12">
          <h2 className="text-[26px] font-medium tracking-[-0.02em]">{cat === 'todo' && !q ? 'cerca de ti.' : `${filtrados.length} resultados.`}</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {filtrados.map((l) => {
              const ab = abierto(l)
              return (
                <li key={l.id}>
                  <Tarjeta local={l} className="flex items-center gap-4 py-3.5">
                    <img src={l.foto} alt="" className="size-16 shrink-0 object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-x-2 text-[15px] font-medium">
                        {l.nombre}
                        {l.destacado && <span className="text-[11px] font-semibold uppercase tracking-wider text-clay">destacado</span>}
                        {l.fundador && <BadgeCheck size={15} className="text-sage" aria-label="local fundador" />}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-ink-2">
                        {l.tipo} · <Star size={12} className="fill-[#e8a33d] text-[#e8a33d]" /> {l.rating} · {l.distancia}
                      </p>
                      <p className={`mt-0.5 text-[12px] ${ab ? 'text-sage' : 'text-ink-3'}`}>{ab ? 'abierto ahora' : 'cerrado ahora'}</p>
                    </div>
                    {l.web ? (
                      <span className="hidden items-center gap-1 text-[13px] font-medium sm:inline-flex">ver web <ArrowRight size={14} /></span>
                    ) : (
                      <span className="hidden text-[12px] text-ink-3 sm:inline">web pronto</span>
                    )}
                  </Tarjeta>
                </li>
              )
            })}
            {filtrados.length === 0 && <li className="py-8 text-center text-[14px] text-ink-3">no encontramos nada con eso. prueba otra palabra.</li>}
          </ul>
          <p className="mt-3 flex items-center gap-1.5 text-[12px] text-ink-3">
            <BadgeCheck size={13} className="text-sage" /> local fundador de {guia.nombre}
          </p>
        </section>

        {/* Para negocios */}
        <section className="mt-16 bg-olive p-6 text-paper sm:p-8">
          <p className="eyebrow text-paper/60">¿tienes un local en la j?</p>
          <p className="mt-3 max-w-xl text-[24px] font-medium leading-tight tracking-[-0.02em]">súmate como local fundador y aparece aquí gratis el primer año.</p>
          <Link to="/panel/anunciar" className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]">
            ver cómo anunciar <ArrowRight size={15} />
          </Link>
        </section>
      </main>
    </div>
  )
}

/* ---------------------------------------------------------------------- */
function Tarjeta({ local, className = '', children }) {
  if (local.web) {
    return (
      <Link to={local.web} className={`group block ${className}`}>
        {children}
      </Link>
    )
  }
  return <div className={className}>{children}</div>
}

function Etiqueta({ children }) {
  return (
    <span className="absolute left-3 top-3 bg-paper/95 px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-clay">
      {children}
    </span>
  )
}

function Portada({ local, titulo, texto, foto }) {
  const contenido = (
    <div className="group relative min-h-[300px] overflow-hidden bg-olive sm:min-h-[380px]">
      <img src={foto} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <span className="absolute right-3 top-3 bg-black/45 px-2 py-1 text-[10.5px] font-medium uppercase tracking-[0.14em] text-paper/90 backdrop-blur">
        patrocinado
      </span>
      <div className="relative flex min-h-[300px] max-w-xl flex-col justify-end p-6 pt-12 text-paper sm:min-h-[380px] sm:p-10">
        <p className="eyebrow text-paper/75">{local?.nombre} · {local?.tipo}</p>
        <p className="mt-3 text-[32px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[44px]">{titulo}</p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-paper/80">{texto}</p>
        <span className="mt-6 inline-flex h-11 w-fit items-center gap-2 bg-paper px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
          {local?.web ? 'ver su web' : 'ver promo'} <ArrowRight size={15} />
        </span>
      </div>
    </div>
  )
  return local?.web ? <Link to={local.web} className="block rise">{contenido}</Link> : contenido
}
