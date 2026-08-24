import { P } from './palette'

export const manzana = () => (
  <g>
    <path d="M50 26 q4 -12 16 -14 q-2 12 -14 15Z" fill={P.leaf} />
    <path d="M50 24 v8" stroke={P.brown} strokeWidth="4" strokeLinecap="round" />
    <path d="M50 32 q-26 -10 -30 20 q-3 30 30 34 q33 -4 30 -34 q-4 -30 -30 -20Z" fill={P.red} />
    <ellipse cx="36" cy="48" rx="7" ry="10" fill={P.white} opacity=".35" transform="rotate(-25 36 48)" />
  </g>
)
export const platano = () => (
  <g>
    <path d="M18 40 q6 44 56 42 q16 -2 8 -14 q-40 4 -50 -30 q-4 -10 -14 2Z" fill={P.yellow} />
    <path d="M22 42 q10 36 52 38" stroke="#e0ac1f" strokeWidth="3" fill="none" />
    <path d="M74 68 l12 -2 -4 10z" fill={P.brown} />
  </g>
)
export const uvas = () => (
  <g fill={P.purple}>
    <circle cx="50" cy="42" r="10" /><circle cx="36" cy="54" r="10" /><circle cx="64" cy="54" r="10" />
    <circle cx="50" cy="60" r="10" /><circle cx="38" cy="72" r="10" /><circle cx="62" cy="72" r="10" />
    <circle cx="50" cy="82" r="10" />
    <path d="M50 34 q0 -12 12 -16" stroke={P.brown} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M60 20 q14 -6 16 8 q-14 4 -16 -8Z" fill={P.leaf} />
  </g>
)
export const fresa = () => (
  <g>
    <path d="M50 34 q-30 0 -26 24 q4 28 26 32 q22 -4 26 -32 q4 -24 -26 -24Z" fill={P.red} />
    <path d="M34 30 h32 l-8 8 h-16Z" fill={P.leaf} />
    <path d="M50 22 v10" stroke={P.leaf} strokeWidth="4" strokeLinecap="round" />
    <g fill={P.yellow}><circle cx="42" cy="50" r="2.2" /><circle cx="58" cy="50" r="2.2" /><circle cx="50" cy="60" r="2.2" /><circle cx="38" cy="66" r="2.2" /><circle cx="62" cy="66" r="2.2" /><circle cx="50" cy="76" r="2.2" /></g>
  </g>
)
export const naranja = () => (
  <g>
    <circle cx="50" cy="56" r="30" fill={P.orange} />
    <circle cx="50" cy="56" r="22" fill="#ffb347" opacity=".5" />
    <path d="M50 26 v-8" stroke={P.brown} strokeWidth="4" strokeLinecap="round" />
    <path d="M52 20 q14 -8 18 4 q-14 6 -18 -4Z" fill={P.leaf} />
  </g>
)
export const sandia = () => (
  <g>
    <path d="M12 40 a38 38 0 0 0 76 0Z" fill={P.leaf} />
    <path d="M18 44 a32 32 0 0 0 64 0Z" fill={P.white} />
    <path d="M22 48 a28 28 0 0 0 56 0Z" fill={P.red} />
    <g fill={P.ink}><ellipse cx="40" cy="58" rx="2.4" ry="3.4" /><ellipse cx="60" cy="58" rx="2.4" ry="3.4" /><ellipse cx="50" cy="68" rx="2.4" ry="3.4" /></g>
  </g>
)
export const zanahoria = () => (
  <g>
    <path d="M50 88 L34 40 q16 -8 32 0Z" fill={P.orange} />
    <g stroke="#e07b39" strokeWidth="2.4"><path d="M38 52 h24 M41 64 h18 M44 74 h12" /></g>
    <path d="M50 40 q-4 -18 -16 -20 q2 16 16 20Z M50 40 q4 -18 16 -20 q-2 16 -16 20Z M50 38 q0 -20 0 -22" fill={P.leaf} stroke={P.leaf} strokeWidth="4" />
  </g>
)
export const brocoli = () => (
  <g>
    <path d="M42 60 h16 v26 h-16z" fill="#8bc34a" />
    <g fill={P.leaf}><circle cx="34" cy="48" r="14" /><circle cx="66" cy="48" r="14" /><circle cx="50" cy="38" r="16" /><circle cx="50" cy="56" r="15" /></g>
  </g>
)
export const pan = () => (
  <g>
    <path d="M16 56 q0 -24 34 -24 q34 0 34 24 v18 q0 8 -8 8 h-52 q-8 0 -8 -8Z" fill="#e0a458" />
    <path d="M24 56 q0 -16 26 -16 q26 0 26 16Z" fill="#f2c078" />
  </g>
)
export const leche = () => (
  <g>
    <path d="M32 34 h36 v46 q0 8 -8 8 h-20 q-8 0 -8 -8Z" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <path d="M38 20 h24 l6 14 h-36Z" fill={P.sky} />
    <rect x="34" y="52" width="32" height="18" rx="4" fill={P.blue} opacity=".85" />
  </g>
)
export const pastel = () => (
  <g>
    <path d="M50 16 v10" stroke={P.orange} strokeWidth="3" />
    <path d="M50 10 q6 6 0 8 q-6 -2 0 -8Z" fill={P.yellow} />
    <rect x="22" y="46" width="56" height="34" rx="6" fill={P.pink} />
    <path d="M22 52 q10 10 18 0 q10 10 18 0 q10 10 18 0 v-8 h-54Z" fill={P.white} />
    <rect x="22" y="62" width="56" height="6" fill="#f06292" opacity=".6" />
  </g>
)
export const agua = () => (
  <g>
    <path d="M36 22 h28 v10 q6 6 6 16 v34 q0 6 -6 6 h-28 q-6 0 -6 -6 v-34 q0 -10 6 -16Z" fill={P.sky} opacity=".6" stroke={P.blue} strokeWidth="2" />
    <path d="M30 58 h40 v24 q0 6 -6 6 h-28 q-6 0 -6 -6Z" fill={P.blue} opacity=".8" />
    <rect x="38" y="14" width="24" height="10" rx="3" fill={P.blue} />
  </g>
)
export const caramelo = () => (
  <g>
    <ellipse cx="50" cy="52" rx="20" ry="18" fill={P.pink} />
    <path d="M30 52 l-16 -12 v24Z" fill={P.purple} /><path d="M70 52 l16 -12 v24Z" fill={P.purple} />
    <path d="M42 44 q8 16 16 16" stroke={P.white} strokeWidth="4" fill="none" opacity=".7" />
  </g>
)
