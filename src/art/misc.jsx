import { P } from './palette'

/* --- Higiene y hábitos --- */
export const cepillo_dientes = () => (
  <g>
    <rect x="20" y="52" width="52" height="10" rx="5" fill={P.blue} transform="rotate(-20 46 57)" />
    <rect x="66" y="36" width="18" height="12" rx="4" fill={P.white} stroke={P.grey} strokeWidth="2" transform="rotate(-20 75 42)" />
    <g stroke={P.green} strokeWidth="3" strokeLinecap="round" transform="rotate(-20 75 42)">
      <path d="M68 36 v-8 M73 35 v-8 M78 34 v-8 M83 33 v-8" />
    </g>
  </g>
)
export const jabon = () => (
  <g>
    <rect x="24" y="50" width="52" height="30" rx="10" fill={P.pink} />
    <ellipse cx="40" cy="58" rx="10" ry="5" fill={P.white} opacity=".5" />
    <g fill={P.white} opacity=".8"><circle cx="34" cy="30" r="8" /><circle cx="50" cy="22" r="10" /><circle cx="64" cy="32" r="7" /></g>
  </g>
)
export const ducha = () => (
  <g>
    <path d="M20 12 h6 v20 q0 6 6 6 h20" stroke={P.grey} strokeWidth="6" fill="none" />
    <path d="M50 32 h22 l-6 12 h-10Z" fill={P.blue} />
    <g stroke={P.sky} strokeWidth="3" strokeLinecap="round"><path d="M54 50 v14 M60 50 v20 M66 50 v14" /></g>
  </g>
)
export const peine = () => (
  <g>
    <rect x="20" y="34" width="60" height="14" rx="6" fill={P.purple} />
    <g fill={P.purple}>{Array.from({length:8}).map((_,i)=><rect key={i} x={24+i*7} y="48" width="4" height="20" rx="2" />)}</g>
  </g>
)
export const toalla = () => (
  <g>
    <path d="M24 22 h52 q6 0 6 6 v50 q0 6 -6 6 h-52 q-6 0 -6 -6 v-50 q0 -6 6 -6Z" fill={P.yellow} />
    <rect x="18" y="46" width="64" height="10" fill={P.orange} />
    <rect x="18" y="60" width="64" height="6" fill={P.orange} opacity=".6" />
  </g>
)
export const wc = () => (
  <g>
    <path d="M28 44 h44 v14 q0 16 -22 20 q-22 -4 -22 -20Z" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <rect x="34" y="18" width="32" height="26" rx="4" fill={P.white} stroke={P.grey} strokeWidth="2" />
    <rect x="44" y="24" width="12" height="5" rx="2" fill={P.grey} />
    <rect x="36" y="80" width="28" height="8" rx="4" fill={P.grey} />
  </g>
)
export const mano_lavar = () => (
  <g>
    <path d="M34 84 v-26 q0 -8 6 -8 q6 0 6 8 v-14 q0 -8 6 -8 q6 0 6 8 v-4 q0 -8 6 -8 q6 0 6 8 v22 q0 22 -18 22Z" fill={P.skin} stroke="#e0a87f" strokeWidth="2" />
    <g fill={P.sky} opacity=".8"><circle cx="28" cy="34" r="7" /><circle cx="42" cy="24" r="9" /><circle cx="58" cy="20" r="6" /></g>
  </g>
)

/* --- Instrumentos musicales --- */
export const tambor = () => (
  <g>
    <ellipse cx="50" cy="42" rx="30" ry="12" fill="#f2e3c6" stroke={P.brown} strokeWidth="2" />
    <path d="M20 42 v22 a30 12 0 0 0 60 0 v-22" fill={P.red} />
    <path d="M22 46 l18 22 M78 46 l-18 22 M50 44 v26" stroke={P.yellow} strokeWidth="3" />
    <path d="M14 20 l14 16 M86 20 l-14 16" stroke={P.brown} strokeWidth="4" strokeLinecap="round" />
    <circle cx="14" cy="20" r="5" fill={P.brown} /><circle cx="86" cy="20" r="5" fill={P.brown} />
  </g>
)
export const guitarra = () => (
  <g>
    <path d="M46 12 h8 v40 h-8Z" fill={P.brown} />
    <rect x="42" y="6" width="16" height="10" rx="3" fill={P.ink} />
    <ellipse cx="50" cy="66" rx="26" ry="24" fill="#d9a066" />
    <ellipse cx="50" cy="52" rx="18" ry="14" fill="#c98d5c" />
    <circle cx="50" cy="62" r="9" fill={P.ink} />
    <g stroke={P.white} strokeWidth="1.4" opacity=".8"><path d="M46 20 v60 M50 20 v60 M54 20 v60" /></g>
  </g>
)
export const trompeta = () => (
  <g>
    <path d="M78 34 l14 -10 v50 l-14 -10Z" fill={P.yellow} />
    <rect x="24" y="42" width="56" height="16" rx="8" fill="#f2c14e" />
    <g fill={P.orange}><rect x="38" y="30" width="8" height="14" rx="3" /><rect x="52" y="30" width="8" height="14" rx="3" /><rect x="66" y="30" width="8" height="14" rx="3" /></g>
    <circle cx="22" cy="50" r="8" fill={P.yellow} />
  </g>
)
export const piano = () => (
  <g>
    <rect x="12" y="36" width="76" height="34" rx="5" fill={P.white} stroke={P.ink} strokeWidth="2" />
    <g stroke={P.ink} strokeWidth="2">{[24,36,48,60,72].map(x=><path key={x} d={`M${x} 36 v34`} />)}</g>
    <g fill={P.ink}>{[19,31,55,67,79].map(x=><rect key={x} x={x} y="36" width="8" height="20" rx="2" />)}</g>
  </g>
)
export const maracas = () => (
  <g>
    <ellipse cx="34" cy="36" rx="14" ry="16" fill={P.orange} />
    <rect x="30" y="50" width="8" height="30" rx="4" fill={P.brown} />
    <ellipse cx="68" cy="42" rx="14" ry="16" fill={P.green} />
    <rect x="64" y="56" width="8" height="26" rx="4" fill={P.brown} />
    <g fill={P.white} opacity=".5"><circle cx="30" cy="32" r="4" /><circle cx="64" cy="38" r="4" /></g>
  </g>
)
export const campana = () => (
  <g>
    <path d="M30 66 q0 -34 20 -34 q20 0 20 34Z" fill={P.yellow} />
    <rect x="24" y="66" width="52" height="8" rx="4" fill="#e0ac1f" />
    <circle cx="50" cy="80" r="6" fill="#e0ac1f" />
    <rect x="46" y="22" width="8" height="10" rx="4" fill={P.brown} />
  </g>
)

/* --- Lugares / hábitats --- */
export const mar = () => (
  <g>
    <rect x="6" y="20" width="88" height="30" fill={P.sky} />
    <rect x="6" y="50" width="88" height="34" fill={P.blue} />
    <path d="M6 50 q12 -8 22 0 q12 8 22 0 q12 -8 22 0 q10 8 22 0" stroke={P.white} strokeWidth="3" fill="none" opacity=".7" />
    <circle cx="76" cy="32" r="9" fill={P.yellow} />
    <path d="M26 70 q8 -8 16 0 q-8 8 -16 0Z" fill={P.orange} />
  </g>
)
export const granja = () => (
  <g>
    <rect x="6" y="60" width="88" height="26" fill="#8bc34a" />
    <path d="M28 60 V40 l22 -14 22 14 v20Z" fill={P.red} />
    <rect x="42" y="46" width="16" height="14" fill={P.white} />
    <rect x="10" y="70" width="10" height="16" fill={P.brown} />
    <circle cx="76" cy="30" r="8" fill={P.yellow} />
  </g>
)
export const bosque = () => (
  <g>
    <rect x="6" y="66" width="88" height="20" fill="#7cb342" />
    <g><rect x="24" y="50" width="8" height="20" fill={P.brown} /><circle cx="28" cy="42" r="16" fill={P.leaf} /></g>
    <g><rect x="60" y="46" width="10" height="24" fill={P.brown} /><circle cx="65" cy="36" r="20" fill="#2e7d32" /></g>
    <circle cx="46" cy="60" r="8" fill="#8bc34a" />
  </g>
)
export const cielo = () => (
  <g>
    <rect x="6" y="14" width="88" height="72" rx="8" fill={P.sky} />
    <circle cx="30" cy="34" r="12" fill={P.yellow} />
    <g fill={P.white}><circle cx="60" cy="42" r="12" /><circle cx="74" cy="46" r="9" /><rect x="58" y="42" width="20" height="10" rx="5" /></g>
  </g>
)
export const ciudad = () => (
  <g>
    <rect x="6" y="74" width="88" height="12" fill={P.grey} />
    <rect x="14" y="34" width="20" height="40" fill={P.blue} />
    <rect x="40" y="20" width="22" height="54" fill={P.purple} />
    <rect x="68" y="44" width="18" height="30" fill={P.orange} />
    <g fill={P.yellow}>{[[18,40],[26,40],[18,52],[26,52],[46,28],[54,28],[46,44],[54,44],[72,50],[80,50]].map(([x,y],i)=><rect key={i} x={x} y={y} width="6" height="8" />)}</g>
  </g>
)

/* --- Meteorología / tiempo --- */
export const lluvia = () => (
  <g>
    <g fill={P.grey}><circle cx="38" cy="38" r="14" /><circle cx="58" cy="32" r="18" /><rect x="36" y="38" width="34" height="14" rx="7" /></g>
    <g stroke={P.blue} strokeWidth="4" strokeLinecap="round"><path d="M36 60 l-4 14 M50 62 l-4 16 M64 60 l-4 14" /></g>
  </g>
)
export const nieve = () => (
  <g>
    <g fill={P.white} stroke={P.grey} strokeWidth="2"><circle cx="40" cy="36" r="13" /><circle cx="60" cy="30" r="17" /><rect x="38" y="36" width="34" height="13" rx="6" /></g>
    <g stroke={P.sky} strokeWidth="3" strokeLinecap="round">
      {[36,50,64].map((x,i)=><g key={i} transform={`translate(${x},${66+i*4})`}><path d="M0 -6 v12 M-5 -3 l10 6 M5 -3 l-10 6" /></g>)}
    </g>
  </g>
)
export const viento = () => (
  <g stroke={P.blue} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".8">
    <path d="M14 38 h40 a8 8 0 1 0 -8 -8" />
    <path d="M14 54 h52 a8 8 0 1 1 -8 8" />
    <path d="M20 70 h30 a7 7 0 1 0 -7 -7" />
  </g>
)

/* --- Números escritos --- */
export const numeroArt = (n, color) => (
  <g>
    <circle cx="50" cy="50" r="38" fill={color} opacity=".18" />
    <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          fontSize="52" fontWeight="800" fill={color} fontFamily="Baloo, Verdana, sans-serif">{n}</text>
  </g>
)
export const letraArt = (l, color) => (
  <g>
    <rect x="14" y="14" width="72" height="72" rx="20" fill={color} opacity=".18" />
    <text x="50" y="52" textAnchor="middle" dominantBaseline="central"
          fontSize="50" fontWeight="800" fill={color} fontFamily="Baloo, Verdana, sans-serif">{l}</text>
  </g>
)
