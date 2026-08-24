import { P } from './palette'

/* Ojos y bocas reutilizables: la misma "cara amable" en todos los animales. */
const Eyes = ({ x = 50, y = 48, d = 16, r = 4 }) => (
  <g>
    <circle cx={x - d / 2} cy={y} r={r} fill={P.ink} />
    <circle cx={x + d / 2} cy={y} r={r} fill={P.ink} />
    <circle cx={x - d / 2 + 1.4} cy={y - 1.4} r={r / 3} fill={P.white} />
    <circle cx={x + d / 2 + 1.4} cy={y - 1.4} r={r / 3} fill={P.white} />
  </g>
)
const Smile = ({ x = 50, y = 62, w = 12 }) => (
  <path d={`M${x - w} ${y} q${w} ${w * 0.8} ${w * 2} 0`} stroke={P.ink} strokeWidth="3"
        fill="none" strokeLinecap="round" />
)
const Blush = ({ x = 50, y = 60, d = 34 }) => (
  <g opacity=".45">
    <ellipse cx={x - d / 2} cy={y} rx="6" ry="4" fill={P.pink} />
    <ellipse cx={x + d / 2} cy={y} rx="6" ry="4" fill={P.pink} />
  </g>
)

export const gato = () => (
  <g>
    <path d="M28 40 L24 18 L44 30 Z" fill={P.orange} />
    <path d="M72 40 L76 18 L56 30 Z" fill={P.orange} />
    <path d="M30 40 L28 26 L40 33 Z" fill={P.pink} />
    <path d="M70 40 L72 26 L60 33 Z" fill={P.pink} />
    <circle cx="50" cy="55" r="30" fill={P.orange} />
    <Eyes y="50" d="20" />
    <path d="M50 60 l-5 4 h10 z" fill={P.pink} />
    <path d="M50 64 q-6 7 -11 2 M50 64 q6 7 11 2" stroke={P.ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <g stroke={P.ink} strokeWidth="2" strokeLinecap="round">
      <path d="M34 62 H18 M34 66 H20 M66 62 H82 M66 66 H80" />
    </g>
  </g>
)

export const perro = () => (
  <g>
    <ellipse cx="24" cy="48" rx="10" ry="18" fill={P.brown} />
    <ellipse cx="76" cy="48" rx="10" ry="18" fill={P.brown} />
    <circle cx="50" cy="54" r="30" fill="#d9a066" />
    <ellipse cx="50" cy="66" rx="18" ry="14" fill={P.sand} />
    <Eyes y="46" d="22" />
    <ellipse cx="50" cy="60" rx="7" ry="5" fill={P.ink} />
    <path d="M50 65 v6 M50 71 q-7 5 -11 -1 M50 71 q7 5 11 -1" stroke={P.ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
  </g>
)

export const vaca = () => (
  <g>
    <path d="M18 40 q-8 -8 2 -12 q10 -2 12 8 Z" fill={P.grey} />
    <path d="M82 40 q8 -8 -2 -12 q-10 -2 -12 8 Z" fill={P.grey} />
    <ellipse cx="50" cy="52" rx="32" ry="28" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <path d="M30 34 q10 -6 14 6 q-10 8 -14 -6Z" fill={P.ink} />
    <ellipse cx="50" cy="70" rx="18" ry="13" fill={P.pink} />
    <Eyes y="46" d="22" />
    <circle cx="43" cy="70" r="3.2" fill="#e07a9a" />
    <circle cx="57" cy="70" r="3.2" fill="#e07a9a" />
  </g>
)

export const oveja = () => (
  <g>
    <g fill={P.white} stroke={P.grey} strokeWidth="2">
      <circle cx="32" cy="46" r="14" /><circle cx="68" cy="46" r="14" />
      <circle cx="50" cy="36" r="15" /><circle cx="38" cy="64" r="14" /><circle cx="62" cy="64" r="14" />
      <circle cx="50" cy="54" r="16" />
    </g>
    <ellipse cx="50" cy="54" rx="15" ry="14" fill={P.ink} />
    <ellipse cx="30" cy="52" rx="7" ry="4" fill={P.ink} transform="rotate(-20 30 52)" />
    <ellipse cx="70" cy="52" rx="7" ry="4" fill={P.ink} transform="rotate(20 70 52)" />
    <circle cx="44" cy="52" r="3.4" fill={P.white} /><circle cx="56" cy="52" r="3.4" fill={P.white} />
  </g>
)

export const pato = () => (
  <g>
    <ellipse cx="56" cy="66" rx="28" ry="22" fill={P.yellow} />
    <circle cx="36" cy="40" r="18" fill={P.yellow} />
    <path d="M20 40 q-14 3 0 9 q8 1 8 -5 Z" fill={P.orange} />
    <circle cx="38" cy="35" r="4" fill={P.ink} />
    <circle cx="39.4" cy="33.6" r="1.4" fill={P.white} />
    <path d="M50 60 q14 -8 22 4 q-12 10 -22 -4Z" fill="#f2b705" />
    <path d="M46 86 l-6 8 M62 86 l6 8" stroke={P.orange} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const leon = () => (
  <g>
    <g fill={P.orange}>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <circle key={i} cx={50 + Math.cos(a) * 30} cy={52 + Math.sin(a) * 30} r="11" />
      })}
    </g>
    <circle cx="50" cy="52" r="26" fill={P.yellow} />
    <Eyes y="46" d="20" />
    <path d="M50 56 l-5 4 h10 z" fill={P.brown} />
    <Smile y="64" w="9" />
  </g>
)

export const rana = () => (
  <g>
    <ellipse cx="50" cy="60" rx="32" ry="26" fill={P.green} />
    <circle cx="32" cy="30" r="13" fill={P.green} />
    <circle cx="68" cy="30" r="13" fill={P.green} />
    <circle cx="32" cy="30" r="8" fill={P.white} /><circle cx="68" cy="30" r="8" fill={P.white} />
    <circle cx="33" cy="31" r="4.5" fill={P.ink} /><circle cx="67" cy="31" r="4.5" fill={P.ink} />
    <path d="M32 64 q18 16 36 0" stroke={P.ink} strokeWidth="3.4" fill="none" strokeLinecap="round" />
    <ellipse cx="50" cy="74" rx="16" ry="9" fill="#8ce99a" opacity=".7" />
  </g>
)

export const abeja = () => (
  <g>
    <ellipse cx="38" cy="34" rx="14" ry="10" fill={P.sky} opacity=".8" transform="rotate(-25 38 34)" />
    <ellipse cx="64" cy="34" rx="14" ry="10" fill={P.sky} opacity=".8" transform="rotate(25 64 34)" />
    <ellipse cx="50" cy="58" rx="26" ry="22" fill={P.yellow} />
    <path d="M38 42 q12 30 24 0" stroke={P.ink} strokeWidth="7" fill="none" opacity=".9" />
    <path d="M30 60 h40" stroke={P.ink} strokeWidth="7" opacity=".9" />
    <path d="M42 30 q-4 -12 -10 -14 M58 30 q4 -12 10 -14" stroke={P.ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <circle cx="42" cy="52" r="3" fill={P.ink} /><circle cx="58" cy="52" r="3" fill={P.ink} />
  </g>
)

export const pez = () => (
  <g>
    <path d="M78 50 l18 -14 v28 z" fill={P.orange} />
    <ellipse cx="46" cy="50" rx="34" ry="24" fill={P.orange} />
    <path d="M40 26 q8 -12 16 -2" stroke={P.red} strokeWidth="6" fill="none" strokeLinecap="round" />
    <circle cx="28" cy="44" r="5" fill={P.white} /><circle cx="28" cy="44" r="2.6" fill={P.ink} />
    <path d="M22 56 q8 8 16 2" stroke={P.ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <g fill={P.yellow} opacity=".7"><circle cx="52" cy="44" r="6" /><circle cx="64" cy="52" r="6" /><circle cx="52" cy="60" r="6" /></g>
  </g>
)

export const pajaro = () => (
  <g>
    <ellipse cx="50" cy="56" rx="26" ry="24" fill={P.sky} />
    <ellipse cx="60" cy="58" rx="14" ry="11" fill={P.white} opacity=".8" transform="rotate(20 60 58)" />
    <path d="M24 52 l-12 4 12 5 z" fill={P.yellow} />
    <circle cx="38" cy="46" r="4.4" fill={P.ink} /><circle cx="39.4" cy="44.6" r="1.5" fill={P.white} />
    <path d="M42 82 l-4 10 M58 82 l4 10" stroke={P.orange} strokeWidth="4" strokeLinecap="round" />
    <path d="M64 34 q10 -6 8 -14" stroke={P.blue} strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>
)

export const elefante = () => (
  <g>
    <ellipse cx="26" cy="46" rx="16" ry="18" fill="#a3b1c6" />
    <ellipse cx="74" cy="46" rx="16" ry="18" fill="#a3b1c6" />
    <ellipse cx="50" cy="50" rx="26" ry="26" fill="#8fa3bf" />
    <path d="M42 68 q-4 22 10 22 q10 0 8 -10" stroke="#8fa3bf" strokeWidth="12" fill="none" strokeLinecap="round" />
    <Eyes y="44" d="20" r="4" />
    <Blush y="56" d="42" />
  </g>
)

export const raton = () => (
  <g>
    <circle cx="28" cy="34" r="14" fill={P.grey} />
    <circle cx="72" cy="34" r="14" fill={P.grey} />
    <circle cx="28" cy="34" r="8" fill={P.pink} /><circle cx="72" cy="34" r="8" fill={P.pink} />
    <circle cx="50" cy="56" r="26" fill="#b0bec5" />
    <Eyes y="52" d="18" />
    <circle cx="50" cy="64" r="4" fill={P.pink} />
    <g stroke={P.ink} strokeWidth="1.8" strokeLinecap="round"><path d="M40 66 H22 M40 70 H24 M60 66 H78 M60 70 H76" /></g>
  </g>
)

export const cerdo = () => (
  <g>
    <path d="M26 34 l4 16 14 -6 z" fill={P.pink} />
    <path d="M74 34 l-4 16 -14 -6 z" fill={P.pink} />
    <circle cx="50" cy="56" r="28" fill={P.pink} />
    <ellipse cx="50" cy="62" rx="14" ry="11" fill="#f7a1b6" />
    <circle cx="45" cy="62" r="3" fill={P.ink} /><circle cx="55" cy="62" r="3" fill={P.ink} />
    <Eyes y="46" d="22" />
  </g>
)

export const gallina = () => (
  <g>
    <ellipse cx="50" cy="62" rx="26" ry="24" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <circle cx="50" cy="34" r="16" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <path d="M44 20 q4 -8 8 0 q4 -8 8 0 q-8 4 -16 0Z" fill={P.red} />
    <path d="M34 36 l-8 4 8 4z" fill={P.yellow} />
    <circle cx="46" cy="32" r="3.4" fill={P.ink} />
    <path d="M42 86 l-4 8 M58 86 l4 8" stroke={P.yellow} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const tortuga = () => (
  <g>
    <ellipse cx="76" cy="58" rx="12" ry="11" fill={P.leaf} />
    <circle cx="79" cy="55" r="3" fill={P.ink} />
    <path d="M20 74 h56 q6 0 6 -6 a28 22 0 0 0 -68 0 q0 6 6 6Z" fill="#2e7d32" />
    <g fill={P.leaf} stroke="#1b5e20" strokeWidth="1.5">
      <circle cx="50" cy="52" r="9" /><circle cx="32" cy="62" r="8" /><circle cx="68" cy="62" r="8" />
      <circle cx="40" cy="44" r="7" /><circle cx="60" cy="44" r="7" />
    </g>
    <path d="M28 74 v8 M68 74 v8" stroke={P.leaf} strokeWidth="8" strokeLinecap="round" />
  </g>
)

export const mariposa = () => (
  <g>
    <ellipse cx="30" cy="40" rx="18" ry="16" fill={P.purple} transform="rotate(-20 30 40)" />
    <ellipse cx="70" cy="40" rx="18" ry="16" fill={P.purple} transform="rotate(20 70 40)" />
    <ellipse cx="32" cy="68" rx="14" ry="13" fill={P.pink} />
    <ellipse cx="68" cy="68" rx="14" ry="13" fill={P.pink} />
    <ellipse cx="50" cy="54" rx="6" ry="24" fill={P.ink} />
    <path d="M46 32 q-6 -10 -12 -12 M54 32 q6 -10 12 -12" stroke={P.ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <circle cx="30" cy="40" r="5" fill={P.yellow} /><circle cx="70" cy="40" r="5" fill={P.yellow} />
  </g>
)

export const oso = () => (
  <g>
    <circle cx="26" cy="30" r="13" fill={P.brown} /><circle cx="74" cy="30" r="13" fill={P.brown} />
    <circle cx="26" cy="30" r="7" fill="#c98d5c" /><circle cx="74" cy="30" r="7" fill="#c98d5c" />
    <circle cx="50" cy="56" r="30" fill={P.brown} />
    <ellipse cx="50" cy="66" rx="16" ry="12" fill="#e0b183" />
    <Eyes y="48" d="22" />
    <ellipse cx="50" cy="61" rx="6" ry="4.4" fill={P.ink} />
    <Smile y="68" w="8" />
  </g>
)

export const caballo = () => (
  <g>
    <path d="M34 26 l2 12 10 -4z" fill={P.brown} /><path d="M66 26 l-2 12 -10 -4z" fill={P.brown} />
    <path d="M30 30 q-6 26 4 40" stroke={P.ink} strokeWidth="8" fill="none" strokeLinecap="round" />
    <ellipse cx="52" cy="56" rx="24" ry="28" fill="#c07b4a" />
    <ellipse cx="54" cy="76" rx="16" ry="12" fill="#e0b183" />
    <circle cx="46" cy="72" r="3" fill={P.ink} /><circle cx="62" cy="72" r="3" fill={P.ink} />
    <Eyes y="48" d="22" />
  </g>
)
