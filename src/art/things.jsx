import { P } from './palette'

export const sol = () => (
  <g>
    <g stroke={P.yellow} strokeWidth="6" strokeLinecap="round">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <line key={i} x1={50 + Math.cos(a) * 28} y1={50 + Math.sin(a) * 28}
                     x2={50 + Math.cos(a) * 42} y2={50 + Math.sin(a) * 42} />
      })}
    </g>
    <circle cx="50" cy="50" r="26" fill={P.yellow} />
    <circle cx="42" cy="46" r="3.4" fill={P.ink} /><circle cx="58" cy="46" r="3.4" fill={P.ink} />
    <path d="M42 58 q8 8 16 0" stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
)
export const luna = () => (
  <g>
    <path d="M62 14 a38 38 0 1 0 24 56 a30 30 0 0 1 -24 -56Z" fill="#ffe08a" />
    <g fill="#f0c14b" opacity=".7"><circle cx="52" cy="40" r="6" /><circle cx="44" cy="60" r="4" /><circle cx="62" cy="62" r="5" /></g>
  </g>
)
export const nube = () => (
  <g fill={P.white} stroke={P.grey} strokeWidth="2">
    <circle cx="36" cy="56" r="16" /><circle cx="58" cy="48" r="20" /><circle cx="72" cy="60" r="14" />
    <rect x="34" y="58" width="40" height="16" rx="8" />
  </g>
)
export const estrella_cielo = () => (
  <g>
    <path d="M50 14 l10 26 28 2 -21 18 7 27 -24 -15 -24 15 7 -27 -21 -18 28 -2Z" fill={P.yellow} stroke="#e8b830" strokeWidth="2" />
  </g>
)
export const arbol = () => (
  <g>
    <rect x="44" y="56" width="12" height="34" rx="4" fill={P.brown} />
    <circle cx="50" cy="40" r="22" fill={P.leaf} />
    <circle cx="32" cy="52" r="15" fill="#5cb85c" /><circle cx="68" cy="52" r="15" fill="#5cb85c" />
    <circle cx="42" cy="34" r="5" fill={P.red} /><circle cx="60" cy="44" r="5" fill={P.red} />
  </g>
)
export const flor = () => (
  <g>
    <path d="M50 58 v32" stroke={P.leaf} strokeWidth="5" strokeLinecap="round" />
    <path d="M50 74 q16 -4 18 -16 q-16 0 -18 16Z" fill={P.leaf} />
    <g fill={P.pink}>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2
        return <ellipse key={i} cx={50 + Math.cos(a) * 16} cy={42 + Math.sin(a) * 16} rx="10" ry="10" />
      })}
    </g>
    <circle cx="50" cy="42" r="9" fill={P.yellow} />
  </g>
)
export const casa = () => (
  <g>
    <path d="M50 14 L88 46 H12Z" fill={P.red} />
    <rect x="22" y="46" width="56" height="42" fill={P.sand} stroke="#e0c9a6" strokeWidth="2" />
    <rect x="42" y="60" width="18" height="28" rx="2" fill={P.brown} />
    <circle cx="56" cy="74" r="2" fill={P.yellow} />
    <rect x="26" y="54" width="12" height="12" fill={P.sky} stroke={P.white} strokeWidth="2" />
    <rect x="64" y="54" width="12" height="12" fill={P.sky} stroke={P.white} strokeWidth="2" />
  </g>
)
export const coche = () => (
  <g>
    <path d="M14 66 q0 -12 10 -12 l8 -14 q2 -4 8 -4 h22 q6 0 8 4 l8 14 q10 0 10 12 v8 h-74Z" fill={P.blue} />
    <path d="M36 40 h12 v14 h-20Z" fill={P.sky} /><path d="M54 40 h10 l8 14 h-18Z" fill={P.sky} />
    <circle cx="30" cy="76" r="10" fill={P.ink} /><circle cx="70" cy="76" r="10" fill={P.ink} />
    <circle cx="30" cy="76" r="4" fill={P.grey} /><circle cx="70" cy="76" r="4" fill={P.grey} />
  </g>
)
export const avion = () => (
  <g>
    <path d="M10 54 q30 -12 66 -10 q16 1 14 8 q-2 7 -14 8 q-36 2 -66 -6Z" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <path d="M40 48 l-6 -22 h10 l14 20Z" fill={P.red} />
    <path d="M40 58 l-6 20 h10 l14 -18Z" fill="#d43f5e" />
    <circle cx="66" cy="52" r="3" fill={P.sky} /><circle cx="56" cy="52" r="3" fill={P.sky} />
  </g>
)
export const barco = () => (
  <g>
    <path d="M14 66 h72 l-10 18 h-52Z" fill={P.red} />
    <path d="M48 20 h4 v42 h-4Z" fill={P.brown} />
    <path d="M52 24 l24 16 -24 12Z" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <path d="M46 30 l-18 22 h18Z" fill={P.yellow} />
    <path d="M8 86 q10 -6 20 0 q10 6 20 0 q10 -6 20 0 q10 6 20 0" stroke={P.blue} strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>
)
export const pelota = () => (
  <g>
    <circle cx="50" cy="52" r="30" fill={P.white} stroke={P.ink} strokeWidth="2" />
    <path d="M50 30 l14 10 -5 17h-18l-5 -17Z" fill={P.ink} />
    <path d="M50 22 v8 M28 44 l12 4 M72 44 l-12 4 M40 74 l5 -17 M60 74 l-5 -17" stroke={P.ink} strokeWidth="2.6" />
  </g>
)
export const libro = () => (
  <g>
    <path d="M50 30 q-16 -10 -34 -6 v46 q18 -4 34 6Z" fill={P.blue} />
    <path d="M50 30 q16 -10 34 -6 v46 q-18 -4 -34 6Z" fill="#1499c9" />
    <path d="M50 30 v46" stroke={P.white} strokeWidth="3" />
    <g stroke={P.white} strokeWidth="2" opacity=".7"><path d="M24 38 h18 M24 48 h18 M58 38 h18 M58 48 h18" /></g>
  </g>
)
export const silla = () => (
  <g fill={P.brown}>
    <rect x="30" y="18" width="10" height="46" rx="3" /><rect x="60" y="18" width="10" height="46" rx="3" />
    <rect x="28" y="26" width="44" height="8" rx="3" />
    <rect x="24" y="56" width="52" height="10" rx="4" fill="#c98d5c" />
    <rect x="28" y="66" width="8" height="22" rx="3" /><rect x="64" y="66" width="8" height="22" rx="3" />
  </g>
)
export const mesa = () => (
  <g fill={P.brown}>
    <rect x="14" y="40" width="72" height="10" rx="4" fill="#c98d5c" />
    <rect x="22" y="50" width="8" height="38" rx="3" /><rect x="70" y="50" width="8" height="38" rx="3" />
  </g>
)
export const cama = () => (
  <g>
    <rect x="14" y="44" width="10" height="42" rx="3" fill={P.brown} />
    <rect x="76" y="54" width="10" height="32" rx="3" fill={P.brown} />
    <rect x="16" y="58" width="70" height="16" rx="5" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <path d="M40 58 h46 v16 h-46Z" fill={P.sky} />
    <rect x="20" y="50" width="20" height="12" rx="5" fill={P.white} stroke={P.grey} strokeWidth="2" />
  </g>
)
export const semaforo = ({ on = 'all' } = {}) => (
  <g>
    <rect x="34" y="10" width="32" height="66" rx="10" fill={P.dark} />
    <rect x="46" y="76" width="8" height="16" fill={P.dark} />
    <circle cx="50" cy="26" r="9" fill={P.red} opacity={on === 'all' || on === 'rojo' ? 1 : 0.18} />
    <circle cx="50" cy="44" r="9" fill={P.yellow} opacity={on === 'all' || on === 'amarillo' ? 1 : 0.18} />
    <circle cx="50" cy="62" r="9" fill={P.green} opacity={on === 'all' || on === 'verde' ? 1 : 0.18} />
  </g>
)
export const globo = () => (
  <g>
    <ellipse cx="50" cy="42" rx="24" ry="28" fill={P.red} />
    <path d="M46 70 h8 l-4 6Z" fill="#c9354f" />
    <path d="M50 76 q10 8 0 16 q-10 8 0 12" stroke={P.ink} strokeWidth="2" fill="none" />
    <ellipse cx="40" cy="32" rx="6" ry="9" fill={P.white} opacity=".4" transform="rotate(-20 40 32)" />
  </g>
)
export const regalo = () => (
  <g>
    <rect x="18" y="44" width="64" height="42" rx="6" fill={P.purple} />
    <rect x="14" y="34" width="72" height="14" rx="5" fill="#8046d6" />
    <rect x="44" y="34" width="12" height="52" fill={P.yellow} />
    <path d="M50 34 q-18 -18 -4 -18 q8 0 4 18Z M50 34 q18 -18 4 -18 q-8 0 -4 18Z" fill={P.yellow} />
  </g>
)
export const mochila = () => (
  <g>
    <rect x="24" y="30" width="52" height="56" rx="14" fill={P.green} />
    <path d="M36 34 q0 -16 14 -16 q14 0 14 16" stroke="#04a97c" strokeWidth="6" fill="none" />
    <rect x="32" y="56" width="36" height="22" rx="6" fill="#04a97c" />
    <rect x="44" y="62" width="12" height="6" rx="3" fill={P.yellow} />
  </g>
)
