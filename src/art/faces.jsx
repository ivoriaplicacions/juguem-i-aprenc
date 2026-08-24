import { P } from './palette'

/* Caras de emociones: mismo rostro, distinta expresión, para que el niño
   compare sólo lo que importa (cejas, ojos y boca). */
const Head = ({ children, hair = P.brown }) => (
  <g>
    <path d="M22 42 a28 26 0 0 1 56 0 v6 a28 30 0 0 1 -56 0Z" fill={P.skin} />
    <path d="M20 44 a30 28 0 0 1 60 0 q-6 -6 -12 -4 q-8 -10 -22 -6 q-14 4 -18 12 q-5 -4 -8 -2Z" fill={hair} />
    <ellipse cx="20" cy="56" rx="5" ry="7" fill={P.skin} />
    <ellipse cx="80" cy="56" rx="5" ry="7" fill={P.skin} />
    {children}
  </g>
)

export const cara_feliz = () => (
  <Head>
    <g stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M32 46 q6 -5 12 -1 M56 45 q6 -4 12 1" />
    </g>
    <circle cx="38" cy="56" r="4.5" fill={P.ink} /><circle cx="62" cy="56" r="4.5" fill={P.ink} />
    <path d="M36 68 q14 14 28 0" stroke={P.ink} strokeWidth="3.4" fill="none" strokeLinecap="round" />
    <g opacity=".45"><ellipse cx="30" cy="66" rx="6" ry="4" fill={P.pink} /><ellipse cx="70" cy="66" rx="6" ry="4" fill={P.pink} /></g>
  </Head>
)
export const cara_triste = () => (
  <Head>
    <g stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M32 42 q6 4 12 6 M56 48 q6 -4 12 -6" />
    </g>
    <circle cx="38" cy="58" r="4.5" fill={P.ink} /><circle cx="62" cy="58" r="4.5" fill={P.ink} />
    <path d="M38 64 q2 10 0 14" stroke={P.blue} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M38 76 q12 -12 24 0" stroke={P.ink} strokeWidth="3.4" fill="none" strokeLinecap="round" />
  </Head>
)
export const cara_enfadada = () => (
  <Head>
    <g stroke={P.ink} strokeWidth="4" strokeLinecap="round"><path d="M32 42 l14 8 M68 42 l-14 8" /></g>
    <circle cx="38" cy="58" r="4.5" fill={P.ink} /><circle cx="62" cy="58" r="4.5" fill={P.ink} />
    <path d="M38 76 q12 -10 24 0" stroke={P.ink} strokeWidth="3.4" fill="none" strokeLinecap="round" />
    <g opacity=".5"><ellipse cx="28" cy="64" rx="7" ry="5" fill={P.red} /><ellipse cx="72" cy="64" rx="7" ry="5" fill={P.red} /></g>
  </Head>
)
export const cara_asustada = () => (
  <Head>
    <g stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round"><path d="M30 40 q8 -6 14 0 M56 40 q6 -6 14 0" /></g>
    <circle cx="38" cy="58" r="7" fill={P.white} stroke={P.ink} strokeWidth="2" />
    <circle cx="62" cy="58" r="7" fill={P.white} stroke={P.ink} strokeWidth="2" />
    <circle cx="38" cy="58" r="3.4" fill={P.ink} /><circle cx="62" cy="58" r="3.4" fill={P.ink} />
    <ellipse cx="50" cy="74" rx="7" ry="9" fill={P.ink} />
  </Head>
)
export const cara_sorprendida = () => (
  <Head>
    <g stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round"><path d="M31 38 q7 -5 13 -1 M56 37 q7 -4 13 1" /></g>
    <circle cx="38" cy="57" r="6" fill={P.ink} /><circle cx="62" cy="57" r="6" fill={P.ink} />
    <ellipse cx="50" cy="74" rx="9" ry="8" fill={P.ink} />
  </Head>
)
export const cara_tranquila = () => (
  <Head>
    <path d="M32 56 q6 6 12 0 M56 56 q6 6 12 0" stroke={P.ink} strokeWidth="3.4" fill="none" strokeLinecap="round" />
    <path d="M40 70 q10 6 20 0" stroke={P.ink} strokeWidth="3.2" fill="none" strokeLinecap="round" />
    <g opacity=".35"><ellipse cx="30" cy="66" rx="6" ry="4" fill={P.pink} /><ellipse cx="70" cy="66" rx="6" ry="4" fill={P.pink} /></g>
  </Head>
)
export const cara_cansada = () => (
  <Head>
    <path d="M31 52 q7 4 13 2 M56 54 q7 -3 13 -2" stroke={P.ink} strokeWidth="3.2" fill="none" strokeLinecap="round" />
    <path d="M32 60 q6 5 12 0 M56 60 q6 5 12 0" stroke={P.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="50" cy="74" rx="6" ry="7" fill={P.ink} />
    <text x="76" y="30" fontSize="16" fill={P.blue} fontFamily="sans-serif">z</text>
  </Head>
)

/* Mascota guía del juego: una nutria simpática llamada Nino / Nina */
export const mascota = () => (
  <g>
    <ellipse cx="50" cy="58" rx="30" ry="30" fill="#b98456" />
    <circle cx="26" cy="30" r="10" fill="#a5673f" /><circle cx="74" cy="30" r="10" fill="#a5673f" />
    <ellipse cx="50" cy="66" rx="20" ry="16" fill={P.sand} />
    <circle cx="40" cy="48" r="5" fill={P.ink} /><circle cx="60" cy="48" r="5" fill={P.ink} />
    <circle cx="41.6" cy="46.4" r="1.8" fill={P.white} /><circle cx="61.6" cy="46.4" r="1.8" fill={P.white} />
    <ellipse cx="50" cy="60" rx="6" ry="4.6" fill={P.ink} />
    <path d="M50 65 q-7 8 -12 1 M50 65 q7 8 12 1" stroke={P.ink} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <g opacity=".4"><ellipse cx="28" cy="62" rx="7" ry="5" fill={P.pink} /><ellipse cx="72" cy="62" rx="7" ry="5" fill={P.pink} /></g>
  </g>
)
