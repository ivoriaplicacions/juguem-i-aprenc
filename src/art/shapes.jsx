import { P } from './palette'

export const SHAPE_PATHS = {
  circulo: <circle cx="50" cy="50" r="34" />,
  cuadrado: <rect x="18" y="18" width="64" height="64" rx="6" />,
  triangulo: <path d="M50 14 L86 82 H14Z" />,
  rectangulo: <rect x="10" y="28" width="80" height="44" rx="6" />,
  estrella: <path d="M50 12 l11 25 27 2 -21 18 7 27 -24 -15 -24 15 7 -27 -21 -18 27 -2Z" />,
  corazon: <path d="M50 84 C10 58 16 24 38 24 c7 0 11 4 12 8 1 -4 5 -8 12 -8 22 0 28 34 -12 60Z" />,
  ovalo: <ellipse cx="50" cy="50" rx="36" ry="26" />,
  rombo: <path d="M50 12 L84 50 L50 88 L16 50Z" />
}

export const SHAPES = [
  { id: 'circulo',    es: 'círculo',    ca: 'cercle' },
  { id: 'cuadrado',   es: 'cuadrado',   ca: 'quadrat' },
  { id: 'triangulo',  es: 'triángulo',  ca: 'triangle' },
  { id: 'rectangulo', es: 'rectángulo', ca: 'rectangle' },
  { id: 'estrella',   es: 'estrella',   ca: 'estrella' },
  { id: 'corazon',    es: 'corazón',    ca: 'cor' },
  { id: 'ovalo',      es: 'óvalo',      ca: 'oval' },
  { id: 'rombo',      es: 'rombo',      ca: 'rombe' }
]

export function Shape({ id, color = P.blue, size = 100 }) {
  const node = SHAPE_PATHS[id] || SHAPE_PATHS.circulo
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g fill={color} stroke="rgba(0,0,0,.12)" strokeWidth="2">{node}</g>
    </svg>
  )
}
