import { P } from './palette'

const Kid = ({ hi = null }) => {
  const on = (p) => (hi === p ? P.yellow : null)
  return (
    <g>
      <circle cx="50" cy="24" r="16" fill={on('cabeza') || P.skin} stroke={hi === 'cabeza' ? P.orange : 'none'} strokeWidth="3" />
      <path d="M34 20 a16 16 0 0 1 32 0 q-8 -8 -16 -6 q-10 2 -16 6Z" fill={P.brown} />
      <circle cx="44" cy="26" r="2.6" fill={on('ojos') ? P.red : P.ink} />
      <circle cx="56" cy="26" r="2.6" fill={on('ojos') ? P.red : P.ink} />
      <path d="M45 32 q5 4 10 0" stroke={on('boca') ? P.red : P.ink} strokeWidth={hi === 'boca' ? 4 : 2.4} fill="none" strokeLinecap="round" />
      <ellipse cx="34" cy="24" rx="3" ry="4.4" fill={on('orejas') || P.skin} />
      <ellipse cx="66" cy="24" rx="3" ry="4.4" fill={on('orejas') || P.skin} />
      <ellipse cx="50" cy="29" rx="2.4" ry="2" fill={on('nariz') ? P.red : '#e8b48f'} />
      <rect x="36" y="40" width="28" height="30" rx="8" fill={on('barriga') || P.blue} />
      <rect x="20" y="42" width="16" height="8" rx="4" fill={on('brazos') || P.skin} />
      <rect x="64" y="42" width="16" height="8" rx="4" fill={on('brazos') || P.skin} />
      <circle cx="20" cy="46" r="5" fill={on('manos') || P.skin} /><circle cx="80" cy="46" r="5" fill={on('manos') || P.skin} />
      <rect x="38" y="70" width="9" height="18" rx="4" fill={on('piernas') || P.skin} />
      <rect x="53" y="70" width="9" height="18" rx="4" fill={on('piernas') || P.skin} />
      <ellipse cx="42" cy="90" rx="7" ry="4" fill={on('pies') || P.red} />
      <ellipse cx="58" cy="90" rx="7" ry="4" fill={on('pies') || P.red} />
    </g>
  )
}
export const nino = () => <Kid />
export const nino_cabeza = () => <Kid hi="cabeza" />
export const nino_ojos = () => <Kid hi="ojos" />
export const nino_boca = () => <Kid hi="boca" />
export const nino_nariz = () => <Kid hi="nariz" />
export const nino_orejas = () => <Kid hi="orejas" />
export const nino_manos = () => <Kid hi="manos" />
export const nino_brazos = () => <Kid hi="brazos" />
export const nino_piernas = () => <Kid hi="piernas" />
export const nino_pies = () => <Kid hi="pies" />
export const nino_barriga = () => <Kid hi="barriga" />

export const saltar = () => (
  <g>
    <circle cx="50" cy="22" r="13" fill={P.skin} />
    <path d="M37 20 a13 13 0 0 1 26 0 q-8 -7 -13 -5 q-8 2 -13 5Z" fill={P.brown} />
    <circle cx="45" cy="23" r="2.2" fill={P.ink} /><circle cx="55" cy="23" r="2.2" fill={P.ink} />
    <path d="M45 29 q5 5 10 0" stroke={P.ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <rect x="38" y="36" width="24" height="26" rx="8" fill={P.green} />
    <path d="M40 40 L20 20 M60 40 L80 20" stroke={P.skin} strokeWidth="8" strokeLinecap="round" />
    <path d="M44 62 L30 82 M56 62 L70 82" stroke={P.skin} strokeWidth="8" strokeLinecap="round" />
    <path d="M14 66 q10 -8 20 0 M66 66 q10 -8 20 0" stroke={P.blue} strokeWidth="3" fill="none" opacity=".5" strokeLinecap="round" />
  </g>
)
export const aplaudir = () => (
  <g>
    <circle cx="50" cy="24" r="14" fill={P.skin} />
    <path d="M36 22 a14 14 0 0 1 28 0 q-8 -7 -14 -5 q-8 2 -14 5Z" fill={P.brown} />
    <circle cx="44" cy="25" r="2.4" fill={P.ink} /><circle cx="56" cy="25" r="2.4" fill={P.ink} />
    <path d="M44 31 q6 6 12 0" stroke={P.ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <rect x="36" y="40" width="28" height="30" rx="9" fill={P.purple} />
    <path d="M38 48 L48 54 M62 48 L52 54" stroke={P.skin} strokeWidth="8" strokeLinecap="round" />
    <g stroke={P.yellow} strokeWidth="3" strokeLinecap="round" opacity=".9"><path d="M50 44 v-6 M42 46 l-5 -5 M58 46 l5 -5" /></g>
    <rect x="38" y="70" width="10" height="18" rx="4" fill={P.skin} /><rect x="52" y="70" width="10" height="18" rx="4" fill={P.skin} />
  </g>
)
export const girar = () => (
  <g>
    <path d="M50 12 a34 34 0 1 1 -24 10" stroke={P.blue} strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M50 4 l12 8 -12 8Z" fill={P.blue} />
    <circle cx="50" cy="46" r="12" fill={P.skin} />
    <path d="M38 44 a12 12 0 0 1 24 0 q-8 -6 -12 -4 q-7 2 -12 4Z" fill={P.brown} />
    <circle cx="45" cy="47" r="2" fill={P.ink} /><circle cx="55" cy="47" r="2" fill={P.ink} />
    <rect x="40" y="58" width="20" height="22" rx="7" fill={P.orange} />
  </g>
)
export const tocar_suelo = () => (
  <g>
    <circle cx="50" cy="62" r="13" fill={P.skin} />
    <path d="M37 60 a13 13 0 0 1 26 0 q-8 -6 -13 -4 q-8 2 -13 4Z" fill={P.brown} />
    <circle cx="45" cy="63" r="2.2" fill={P.ink} /><circle cx="55" cy="63" r="2.2" fill={P.ink} />
    <rect x="38" y="30" width="24" height="26" rx="8" fill={P.red} />
    <path d="M42 74 L36 88 M58 74 L64 88" stroke={P.skin} strokeWidth="8" strokeLinecap="round" />
    <path d="M10 92 h80" stroke={P.brown} strokeWidth="5" strokeLinecap="round" />
  </g>
)
