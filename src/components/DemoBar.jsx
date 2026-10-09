import { NavLink } from 'react-router-dom'

/* Barra flotante para guiar la demo: 1 web → 2 panel → 3 publicar. */
const pasos = [
  { to: '/web', n: '1', label: 'su web' },
  { to: '/panel', n: '2', label: 'su panel', end: true },
  { to: '/panel/publicar', n: '3', label: 'publicar' },
]

export function DemoBar() {
  return (
    <nav
      aria-label="Pasos de la demo"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-ink/90 p-1 text-[13px] text-paper shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur">
        {pasos.map((p) => (
          <NavLink
            key={p.to}
            to={p.to}
            end={p.end}
            className={({ isActive }) =>
              `flex h-9 items-center gap-2 rounded-full px-3.5 transition-colors ${
                isActive ? 'bg-paper text-ink' : 'text-paper/75 hover:text-paper'
              }`
            }
          >
            <span className="text-[11px] font-semibold opacity-60">{p.n}</span>
            <span className="font-medium">{p.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
