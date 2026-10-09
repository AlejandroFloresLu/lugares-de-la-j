import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Instagram, MapPin, Menu, MessageCircle, Navigation, Phone, Star, X } from 'lucide-react'
import { negocio } from '../data/negocio'
import { usePublicaciones } from '../lib/publicaciones'
import { PostCard } from '../components/PostCard'
import {
  abiertoAhora,
  hoy,
  mapaComoLlegar,
  mapaEmbed,
  mapaFicha,
  mapaResena,
  precio,
  whatsapp,
} from '../lib/utils'

/* ==========================================================================
   1 · LA WEB DEL LOCAL
   ========================================================================== */
export function Web() {
  const n = negocio
  const { lista, ultima } = usePublicaciones()
  const { search } = useLocation()
  const abierto = abiertoAhora()
  const h = hoy()

  useEffect(() => {
    document.title = `${n.nombre} · ${n.tipo}`
  }, [n.nombre, n.tipo])

  // Al llegar desde "ver en mi web", baja hasta la publicación nueva
  useEffect(() => {
    if (search.includes('nuevo')) {
      const t = setTimeout(() => document.getElementById('novedades')?.scrollIntoView({ behavior: 'smooth' }), 250)
      return () => clearTimeout(t)
    }
  }, [search])

  return (
    <div className="min-h-dvh bg-paper pb-24 text-ink">
      {/* Cinta superior */}
      <div className="bg-olive px-4 py-2 text-center text-[12px] text-paper/85">
        {abierto ? 'abierto ahora' : 'cerrado ahora'} · hoy de {h.abre} a {h.cierra} ·{' '}
        <a href={whatsapp(`Hola ${n.nombre} 👋 quiero hacer un pedido`)} target="_blank" rel="noreferrer" className="underline underline-offset-2">
          pide por whatsapp
        </a>
      </div>

      {/* Portada a sangre */}
      <header className="relative h-[86svh] min-h-[560px] w-full overflow-hidden bg-olive">
        <img src={n.fotos.portada} alt={`Mesa de ${n.nombre}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/55" />
        <Nav />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20">
          <p className="eyebrow text-paper/80">{n.tipo} · {n.sector}</p>
          <h1 className="mt-3 max-w-[14ch] text-[44px] font-medium leading-[1.02] tracking-[-0.02em] text-paper sm:text-[68px]">
            {n.frase}
          </h1>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#carta" className="inline-flex h-11 items-center bg-paper px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink hover:bg-white">
              ver la carta
            </a>
            <a
              href={mapaComoLlegar()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-paper/70 px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-paper hover:bg-paper/10"
            >
              <Navigation size={14} /> cómo llegar
            </a>
          </div>
        </div>
      </header>

      {/* Valores, banda oliva */}
      <section className="bg-olive text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-3 sm:px-8 sm:py-20">
          {n.valores.map((v) => (
            <div key={v.titulo} className="sm:text-center">
              <h2 className="text-[15px] font-semibold">{v.titulo}</h2>
              <p className="mt-2 max-w-[30ch] text-[14px] leading-relaxed text-paper/70 sm:mx-auto">{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Novedades */}
      <section id="novedades" className="mx-auto max-w-6xl scroll-mt-6 px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-ink-3">novedades</p>
            <h2 className="mt-2 text-[32px] font-medium tracking-[-0.02em] sm:text-[40px]">lo nuevo esta semana.</h2>
          </div>
          <a href={`https://instagram.com/${n.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 text-[13px] text-ink-2 hover:text-ink sm:inline-flex">
            <Instagram size={15} /> {n.instagram}
          </a>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lista.slice(0, 3).map((p) => (
            <PostCard key={p.id} post={p} destacada={p.id === ultima} />
          ))}
        </div>
      </section>

      {/* Carta */}
      <section id="carta" className="mx-auto max-w-6xl scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
        <p className="eyebrow text-ink-3">la carta</p>
        <h2 className="mt-2 text-[32px] font-medium tracking-[-0.02em] sm:text-[40px]">para hoy.</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tile grande con foto */}
          <a href={whatsapp(`Hola ${n.nombre} 👋 quiero pedir un desayuno`)} target="_blank" rel="noreferrer" className="group relative col-span-1 min-h-[360px] overflow-hidden bg-paper-3 sm:col-span-2 sm:row-span-2">
            <img src={n.fotos.desayunos} alt="Desayuno de la casa" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-paper">
              <p className="eyebrow text-paper/80">hasta las 11:00</p>
              <p className="mt-2 flex items-center gap-2 text-[22px] font-medium">desayunos completos <ArrowRight size={20} /></p>
            </div>
          </a>
          {n.carta.map((item) => (
            <div key={item.id} className="group flex flex-col">
              <div className="aspect-square overflow-hidden bg-paper-2">
                <img src={item.foto} alt={item.nombre} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col pt-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-medium leading-snug">{item.nombre}</h3>
                  <span className="shrink-0 text-[14px] tabular-nums">{precio(item.precio)}</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-3">{item.detalle}</p>
                <a
                  href={whatsapp(`Hola ${n.nombre} 👋 quiero pedir: ${item.nombre} (${precio(item.precio)})`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-fit items-center gap-1 border-b border-ink/30 pb-0.5 text-[12px] font-semibold uppercase tracking-[0.12em] hover:border-ink"
                >
                  pedir <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          ))}
          {/* Cierre de la grilla: ocupa el hueco que queda al lado de los 2 últimos */}
          <a
            href={whatsapp(`Hola ${n.nombre} 👋 ¿me pasan la carta completa?`)}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-[220px] flex-col justify-between bg-olive p-6 text-paper sm:col-span-2"
          >
            <p className="eyebrow text-paper/60">¿buscas algo más?</p>
            <div>
              <p className="max-w-[22ch] text-[24px] font-medium leading-tight tracking-[-0.02em]">pide la carta completa y te respondemos al momento.</p>
              <p className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]">
                escríbenos por whatsapp <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Foto + historia */}
      <section id="nosotros" className="mt-28 grid sm:mt-36 sm:grid-cols-2">
        <div className="relative min-h-[380px] bg-paper-3 sm:min-h-[560px]">
          <img src={n.fotos.interior} alt={`Interior de ${n.nombre}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex items-center bg-paper-2 px-6 py-16 sm:px-14">
          <div className="max-w-md">
            <p className="eyebrow text-ink-3">nosotros</p>
            <h2 className="mt-3 text-[30px] font-medium leading-tight tracking-[-0.02em] sm:text-[36px]">un rincón de la j para quedarse.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{n.descripcion}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <img src={n.fotos.barra} alt="Barra de café" className="aspect-square w-full object-cover" loading="lazy" />
              <img src={n.fotos.mesa} alt="Mesa junto a la ventana" className="aspect-square w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Visítanos + Google */}
      <Visitanos />

      <Footer />
    </div>
  )
}

/* ---------------------------------------------------------------------- */
function Nav() {
  const [abierto, setAbierto] = useState(false)
  const n = negocio
  const links = [
    ['carta', '#carta'],
    ['novedades', '#novedades'],
    ['nosotros', '#nosotros'],
    ['visítanos', '#visitanos'],
  ]
  return (
    <nav className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-paper sm:px-8">
        <div className="hidden gap-7 text-[13px] sm:flex">
          {links.map(([l, href]) => (
            <a key={l} href={href} className="opacity-85 hover:opacity-100">{l}</a>
          ))}
        </div>
        <span className="text-[20px] font-semibold tracking-[-0.03em] sm:absolute sm:left-1/2 sm:-translate-x-1/2">{n.nombre}</span>
        <div className="flex items-center gap-4 text-[13px]">
          <a href={whatsapp(`Hola ${n.nombre} 👋 quiero hacer un pedido`)} target="_blank" rel="noreferrer" className="hidden opacity-85 hover:opacity-100 sm:inline">
            pedir
          </a>
          <button type="button" aria-label="Abrir menú" onClick={() => setAbierto(true)} className="p-1 sm:hidden">
            <Menu size={22} />
          </button>
        </div>
      </div>
      {abierto && (
        <div className="fixed inset-0 z-40 bg-paper px-5 py-5 text-ink sm:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[20px] font-semibold tracking-[-0.03em]">{n.nombre}</span>
            <button type="button" aria-label="Cerrar menú" onClick={() => setAbierto(false)} className="p-1">
              <X size={22} />
            </button>
          </div>
          <div className="mt-12 flex flex-col gap-5 text-[30px] font-medium tracking-[-0.02em]">
            {links.map(([l, href]) => (
              <a key={l} href={href} onClick={() => setAbierto(false)}>{l}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

/* ---------------------------------------------------------------------- */
function Estrellas({ valor, size = 14 }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${valor} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(valor) ? 'fill-[#e8a33d] text-[#e8a33d]' : 'text-line'} />
      ))}
    </span>
  )
}

function GoogleG({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.2l7.8 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.8l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.8 6.1C6.6 42.6 14.6 48 24 48z" />
    </svg>
  )
}

function Visitanos() {
  const n = negocio
  const h = hoy()
  return (
    <section id="visitanos" className="mx-auto max-w-6xl scroll-mt-6 px-5 pt-24 sm:px-8 sm:pt-32">
      <p className="eyebrow text-ink-3">visítanos</p>
      <h2 className="mt-2 text-[32px] font-medium tracking-[-0.02em] sm:text-[40px]">estamos en la j.</h2>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col gap-8">
          {/* Google: calificación y reseñas */}
          <div className="border border-line bg-white/60 p-6">
            <div className="flex items-center gap-3">
              <GoogleG />
              <span className="text-[13px] font-medium text-ink-2">reseñas en google</span>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-[44px] font-medium leading-none tracking-[-0.03em]">{n.google.rating.toFixed(1)}</span>
              <div className="pb-1">
                <Estrellas valor={n.google.rating} />
                <p className="mt-1 text-[12px] text-ink-3">{n.google.resenas} reseñas</p>
              </div>
            </div>
            <div className="mt-6 space-y-5 border-t border-line pt-5">
              {n.resenasGoogle.map((r) => (
                <figure key={r.autor}>
                  <Estrellas valor={r.estrellas} size={12} />
                  <blockquote className="mt-1.5 text-[14px] leading-relaxed text-ink-2">“{r.texto}”</blockquote>
                  <figcaption className="mt-1 text-[12px] text-ink-3">{r.autor} · {r.hace}</figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mapaResena()} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center bg-ink px-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper hover:bg-olive-2">
                dejar una reseña
              </a>
              <a href={mapaFicha()} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1.5 border border-ink/25 px-4 text-[12px] font-semibold uppercase tracking-[0.12em] hover:border-ink">
                ver todas <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Horario y contacto */}
          <div>
            <ul className="divide-y divide-line border-y border-line text-[14px]">
              {n.horario.map((d, i) => (
                <li key={d.dia} className={`flex justify-between py-2.5 ${i === h.indice ? 'font-semibold text-ink' : 'text-ink-2'}`}>
                  <span>{d.dia}{i === h.indice ? ' · hoy' : ''}</span>
                  <span className="tabular-nums">{d.abre} — {d.cierra}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 text-[14px] text-ink-2">
              <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {n.direccion}</p>
              <p className="flex items-center gap-2"><Phone size={16} className="shrink-0" /> <a href={`tel:${n.telefono.replace(/\s/g, '')}`} className="hover:text-ink">{n.telefono}</a></p>
            </div>
          </div>
        </div>

        {/* Mapa real de Google */}
        <div className="flex flex-col">
          <div className="relative min-h-[380px] flex-1 overflow-hidden bg-paper-3">
            <iframe
              title={`Mapa de ${n.nombre}`}
              src={mapaEmbed()}
              className="absolute inset-0 h-full w-full grayscale-[35%] sepia-[12%]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a href={mapaFicha()} target="_blank" rel="noreferrer" className="absolute left-4 top-4 flex items-center gap-3 bg-paper px-4 py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]">
              <GoogleG className="size-4" />
              <span>
                <span className="block text-[14px] font-semibold leading-tight">{n.nombre}</span>
                <span className="block text-[12px] text-ink-3">{n.google.rating.toFixed(1)} ★ · abrir en google maps</span>
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3">
            <a href={mapaComoLlegar()} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 bg-ink text-[12px] font-semibold uppercase tracking-[0.12em] text-paper hover:bg-olive-2">
              <Navigation size={15} /> cómo llegar
            </a>
            <a href={whatsapp(`Hola ${n.nombre} 👋`)} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 border border-ink/25 text-[12px] font-semibold uppercase tracking-[0.12em] hover:border-ink">
              <MessageCircle size={15} /> whatsapp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const n = negocio
  return (
    <footer className="mt-28 bg-olive text-paper/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 text-[13px] sm:grid-cols-[1.5fr_1fr_1fr] sm:px-8">
        <div>
          <p className="text-[22px] font-semibold tracking-[-0.03em] text-paper">{n.nombre}</p>
          <p className="mt-2 max-w-xs leading-relaxed">{n.tipo} en {n.sector}. {n.direccion}.</p>
        </div>
        <div className="space-y-2">
          <a href="#carta" className="block hover:text-paper">carta</a>
          <a href="#novedades" className="block hover:text-paper">novedades</a>
          <a href="#visitanos" className="block hover:text-paper">visítanos</a>
        </div>
        <div className="space-y-2">
          <a href={whatsapp(`Hola ${n.nombre} 👋`)} target="_blank" rel="noreferrer" className="block hover:text-paper">whatsapp</a>
          <a href={`https://instagram.com/${n.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="block hover:text-paper">instagram</a>
          <a href={mapaFicha()} target="_blank" rel="noreferrer" className="block hover:text-paper">google maps</a>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-[12px] text-paper/50 sm:px-8">
          <span>© {new Date().getFullYear()} {n.nombre}</span>
          <Link to="/panel" className="hover:text-paper">parte de lugares de la j · acceso dueños</Link>
        </div>
      </div>
    </footer>
  )
}
