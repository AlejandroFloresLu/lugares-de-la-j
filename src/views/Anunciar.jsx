import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Eye, MessageCircle, Search, Users } from 'lucide-react'
import { negocio } from '../data/negocio'
import { guia, planes } from '../data/guia'
import { usePublicaciones } from '../lib/publicaciones'
import { PanelShell } from '../components/PanelShell'
import { numero } from '../lib/utils'

/* ==========================================================================
   4 · ANUNCIAR — el local elige cómo aparecer en la guía (y paga por ello)
   ========================================================================== */
export function Anunciar() {
  const navigate = useNavigate()
  const { anuncio, setAnuncio, lista } = usePublicaciones()
  const [elegido, setElegido] = useState(anuncio === 'fundador' ? 'destacado' : anuncio)
  const [listo, setListo] = useState(false)
  const plan = planes.find((p) => p.id === elegido)
  const a = guia.audiencia

  // Estimado de ejemplo: vistas base de un local en la guía × el multiplicador del plan
  const base = 180
  const vistas = Math.round(base * (plan.extraVistas || 1))
  const clics = Math.round(vistas * 0.11)

  const activar = () => {
    setAnuncio(elegido)
    setListo(true)
  }

  return (
    <PanelShell>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-[30px] font-medium leading-tight tracking-[-0.02em] sm:text-[36px]">llega a más gente de la j.</h1>
        <p className="mt-1 max-w-2xl text-[15px] text-ink-2">
          la guía <span className="font-medium text-ink">{guia.nombre}</span> es donde vecinos y visitantes deciden dónde comer y comprar. elige cómo quieres aparecer.
        </p>

        {/* Audiencia de la guía */}
        <div className="mt-8 grid grid-cols-3 border-l border-t border-line">
          {[
            { icon: Users, v: a.personas, l: 'personas abrieron la guía este mes' },
            { icon: Search, v: a.busquedas, l: 'búsquedas dentro de la guía' },
            { icon: MessageCircle, v: a.clicsWhatsapp, l: 'mensajes enviados a locales' },
          ].map(({ icon: Icon, v, l }) => (
            <div key={l} className="border-b border-r border-line p-4 sm:p-5">
              <Icon size={16} className="text-ink-3" />
              <p className="mt-3 text-[26px] font-medium leading-none tracking-[-0.03em] tabular-nums sm:text-[34px]">{numero(v)}</p>
              <p className="mt-2 text-[12px] leading-snug text-ink-2 sm:text-[13px]">{l}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[12px] text-ink-3">números de ejemplo para la demo.</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Planes */}
          <div>
            <h2 className="text-[17px] font-medium">elige tu plan</h2>
            <div className="mt-4 grid gap-3">
              {planes.map((p) => {
                const sel = p.id === elegido
                const actual = p.id === anuncio
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setElegido(p.id)}
                    aria-pressed={sel}
                    className={`w-full border p-5 text-left transition-colors ${sel ? 'border-ink bg-white' : 'border-line hover:border-ink/50'}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="flex items-center gap-2 text-[18px] font-medium">
                        <span className={`flex size-5 items-center justify-center rounded-full border ${sel ? 'border-ink bg-ink text-paper' : 'border-line'}`}>
                          {sel && <Check size={12} />}
                        </span>
                        {p.nombre}
                        {actual && <span className="bg-paper-2 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ink-2">tu plan</span>}
                      </p>
                      <p className="text-[15px]">
                        <span className="text-[22px] font-medium tracking-[-0.02em]">{p.precio}</span> <span className="text-ink-3">{p.periodo}</span>
                      </p>
                    </div>
                    <p className="mt-2 pl-7 text-[14px] text-ink-2">{p.resumen}</p>
                    {sel && (
                      <ul className="mt-3 grid gap-1.5 pl-7 text-[13px] text-ink-2 sm:grid-cols-2">
                        {p.incluye.map((i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check size={13} className="mt-0.5 shrink-0 text-sage" /> {i}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Lo que podrías ganar */}
            <div className="mt-6 bg-paper-2 p-5">
              <p className="text-[13px] text-ink-2">con <span className="font-medium text-ink">{plan.nombre}</span>, un local como el tuyo podría tener al mes:</p>
              <div className="mt-3 flex flex-wrap gap-8">
                <p><span className="block text-[30px] font-medium leading-none tracking-[-0.03em] tabular-nums">{numero(vistas)}</span><span className="text-[12px] text-ink-2">vistas en la guía</span></p>
                <p><span className="block text-[30px] font-medium leading-none tracking-[-0.03em] tabular-nums">{numero(clics)}</span><span className="text-[12px] text-ink-2">clics a tu web o whatsapp</span></p>
              </div>
              <p className="mt-3 text-[11px] text-ink-3">estimado de ejemplo. los números reales los verás en tu panel.</p>
            </div>

            <button
              type="button"
              onClick={activar}
              disabled={elegido === anuncio}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-ink py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-paper hover:bg-olive-2 disabled:opacity-40 sm:w-auto sm:px-10"
            >
              {elegido === anuncio ? 'ya es tu plan' : elegido === 'fundador' ? 'volver a fundador' : <>activar {plan.nombre} <ArrowRight size={16} /></>}
            </button>
          </div>

          {/* Vista previa en la guía */}
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="eyebrow text-ink-3">así te verán en la guía</p>
            <div className="mt-3 overflow-hidden rounded-[28px] border-[6px] border-ink bg-paper shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
              <div className="border-b border-line px-4 py-3">
                <p className="text-[14px] font-semibold tracking-[-0.03em]">{guia.nombre}</p>
                <div className="mt-2 h-7 border border-line bg-white" />
              </div>
              <div className="space-y-3 p-3">
                <Previa plan={elegido} foto={lista[0]?.foto || negocio.fotos.portada} titulo={lista[0]?.titulo || negocio.frase} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {listo && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="anuncio-listo">
          <div className="rise w-full max-w-md bg-paper p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center bg-sage text-paper"><Check size={22} /></span>
            <h2 id="anuncio-listo" className="mt-5 text-[26px] font-medium leading-tight tracking-[-0.02em]">
              {elegido === 'fundador' ? 'listo, volviste a fundador.' : `¡tu anuncio ${plan.nombre} está activo!`}
            </h2>
            <p className="mt-2 text-[15px] text-ink-2">
              {elegido === 'portada'
                ? 'es lo primero que ve todo el que abre la guía.'
                : elegido === 'destacado'
                  ? `${negocio.nombre} ahora sale primero y con la etiqueta "destacado".`
                  : 'sigues apareciendo en la guía como local fundador.'}
            </p>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => navigate('/guia')} className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-ink text-[13px] font-semibold uppercase tracking-[0.12em] text-paper">
                verlo en la guía <ArrowRight size={15} />
              </button>
              <button type="button" onClick={() => setListo(false)} className="h-12 flex-1 border border-line text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-2">
                cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </PanelShell>
  )
}

/* Mini guía para la vista previa: resalta dónde aparece el local según el plan */
function Previa({ plan, foto, titulo }) {
  const fila = (nombre, resaltado, etiqueta) => (
    <div className={`flex items-center gap-2.5 p-1.5 ${resaltado ? 'bg-white ring-2 ring-clay' : ''}`}>
      <div className={`size-9 shrink-0 ${resaltado ? '' : 'bg-paper-3'}`}>
        {resaltado && <img src={foto} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium">{nombre}</p>
        {etiqueta ? <p className="text-[9.5px] font-semibold uppercase tracking-wider text-clay">{etiqueta}</p> : <div className="mt-1 h-1.5 w-16 bg-paper-3" />}
      </div>
    </div>
  )

  return (
    <>
      {/* Portada */}
      <div className={`relative h-[150px] overflow-hidden ${plan === 'portada' ? 'ring-2 ring-clay' : ''}`}>
        {plan === 'portada' ? (
          <>
            <img src={foto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <span className="absolute right-2 top-2 bg-black/45 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-paper">patrocinado</span>
            <div className="absolute bottom-0 left-0 p-3 text-paper">
              <p className="text-[9px] uppercase tracking-[0.14em] text-paper/75">{negocio.nombre}</p>
              <p className="mt-1 max-w-[200px] text-[15px] font-medium leading-tight">{titulo}</p>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-paper-3 text-[11px] text-ink-3">anuncio de otro local</div>
        )}
      </div>
      <p className="px-1 pt-1 text-[12px] font-medium">cerca de ti</p>
      {plan === 'destacado' ? (
        <>
          {fila(negocio.nombre, true, 'destacado')}
          {fila('otro local', false)}
          {fila('otro local', false)}
        </>
      ) : (
        <>
          {fila('otro local', false)}
          {fila('otro local', false)}
          {fila(negocio.nombre, plan === 'fundador', plan === 'fundador' ? 'fundador' : null)}
        </>
      )}
      <p className="flex items-center gap-1 px-1 pb-1 text-[10px] text-ink-3">
        <Eye size={11} /> la parte resaltada es tu anuncio
      </p>
    </>
  )
}
