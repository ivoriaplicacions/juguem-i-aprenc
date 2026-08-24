import { useState } from 'react'
import { P } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Arriba y abajo — nociones espaciales.
   Se dibuja una escena muy simple (una caja o una mesa y una
   pelota colocada en cierta posición) y se alternan dos formatos:
     (a) se ve UNA escena y el niño elige la palabra correcta
         entre 3;
     (b) se oye la consigna ("la pelota DEBAJO de la mesa") y el
         niño toca cuál de las 3 escenas es.
   8 rondas, sin reloj y sin perder nunca.
   ============================================================ */

/* --- Definición de las ocho relaciones espaciales ------------------------
   mueble: sobre qué se apoya la escena ('caja' o 'mesa').
   evita:  relaciones demasiado parecidas visualmente, que nunca se usan
           como despiste de esta (para que la respuesta sea siempre clara). */
const RELACIONES = [
  { id: 'dentro',    mueble: 'caja', emoji: '📦', evita: [],
    palabra: { es: 'dentro',     ca: 'dins' },
    frase:   { es: 'dentro de la caja',       ca: 'dins de la caixa' } },
  { id: 'fuera',     mueble: 'caja', emoji: '🚪', evita: ['al_lado'],
    palabra: { es: 'fuera',      ca: 'fora' },
    frase:   { es: 'fuera de la caja',        ca: 'fora de la caixa' } },
  { id: 'izquierda', mueble: 'caja', emoji: '⬅️', evita: ['al_lado'],
    palabra: { es: 'a la izquierda', ca: 'a l’esquerra' },
    frase:   { es: 'a la izquierda de la caja', ca: 'a l’esquerra de la caixa' } },
  { id: 'derecha',   mueble: 'caja', emoji: '➡️', evita: ['al_lado'],
    palabra: { es: 'a la derecha',  ca: 'a la dreta' },
    frase:   { es: 'a la derecha de la caja',  ca: 'a la dreta de la caixa' } },
  { id: 'encima',    mueble: 'mesa', emoji: '⬆️', evita: [],
    palabra: { es: 'encima',     ca: 'a sobre' },
    frase:   { es: 'encima de la mesa',       ca: 'a sobre de la taula' } },
  { id: 'debajo',    mueble: 'mesa', emoji: '⬇️', evita: ['delante'],
    palabra: { es: 'debajo',     ca: 'a sota' },
    frase:   { es: 'debajo de la mesa',       ca: 'a sota de la taula' } },
  { id: 'delante',   mueble: 'mesa', emoji: '👉', evita: ['debajo'],
    palabra: { es: 'delante',    ca: 'davant' },
    frase:   { es: 'delante de la mesa',      ca: 'davant de la taula' } },
  { id: 'al_lado',   mueble: 'mesa', emoji: '↔️', evita: ['derecha', 'izquierda', 'fuera'],
    palabra: { es: 'al lado',    ca: 'al costat' },
    frase:   { es: 'al lado de la mesa',      ca: 'al costat de la taula' } }
]

const REL = Object.fromEntries(RELACIONES.map(r => [r.id, r]))

/* --- La escena dibujada -------------------------------------------------
   Un único componente SVG que recibe la relación y coloca la pelota.
   viewBox fijo de 200x150 para que todas las escenas encajen igual. */

/** Dónde va el centro de la pelota (y su radio) en cada relación. */
const POS = {
  dentro:    { x: 100, y: 92,  r: 17, detras: true },  // detrás del frontal de la caja
  fuera:     { x: 156, y: 52,  r: 17 },
  izquierda: { x: 26,  y: 111, r: 17 },
  derecha:   { x: 174, y: 111, r: 17 },
  encima:    { x: 100, y: 41,  r: 17 },
  debajo:    { x: 100, y: 111, r: 17 },
  delante:   { x: 100, y: 106, r: 22 },                // más grande: está más cerca
  al_lado:   { x: 174, y: 111, r: 17 }
}

/** La pelota, siempre igual: roja con un brillo blanco. */
const Pelota = ({ p }) => (
  <g>
    <ellipse cx={p.x} cy={128} rx={p.r * 0.8} ry={4} fill="rgba(0,0,0,.12)" />
    <circle cx={p.x} cy={p.y} r={p.r} fill={P.red} />
    <circle cx={p.x - p.r * 0.32} cy={p.y - p.r * 0.34} r={p.r * 0.24} fill="rgba(255,255,255,.65)" />
  </g>
)

/**
 * <EscenaEspacial rel="debajo" size={150} />
 * Dibuja la caja o la mesa y la pelota en la posición que toca.
 */
export function EscenaEspacial({ rel, size = 150 }) {
  const r = REL[rel]
  const p = POS[rel]
  const caja = r.mueble === 'caja'

  return (
    <svg viewBox="0 0 200 150" width={size} height={size * 0.75}
      aria-hidden="true" focusable="false">
      {/* Suelo */}
      <line x1="4" y1="128" x2="196" y2="128" stroke={P.grey} strokeWidth="6" strokeLinecap="round" />

      {caja ? (
        <>
          {/* Caja abierta: pared del fondo, pelota (si va dentro) y frontal */}
          <rect x="66" y="70" width="68" height="58" rx="5" fill="#d9a066" />
          <rect x="66" y="70" width="68" height="10" rx="4" fill="#c1874c" />
          {p.detras && <Pelota p={p} />}
          <rect x="62" y="94" width="76" height="34" rx="5" fill={P.brown} />
          <rect x="62" y="94" width="76" height="6" rx="3" fill="#8c5633" />
        </>
      ) : (
        <>
          {/* Mesa: tablero y dos patas */}
          <rect x="40" y="58" width="120" height="14" rx="6" fill={P.brown} />
          <rect x="48" y="72" width="13" height="56" rx="5" fill="#8c5633" />
          <rect x="139" y="72" width="13" height="56" rx="5" fill="#8c5633" />
        </>
      )}

      {/* La pelota va delante de todo salvo cuando está dentro de la caja */}
      {!p.detras && <Pelota p={p} />}
    </svg>
  )
}

/* --- Construcción de las rondas ---------------------------------------- */

/**
 * Elige 2 despistes válidos: ni la propia relación ni las que se le parecen
 * demasiado. Si `mismoMueble` es cierto, todos usan la misma caja o mesa, para
 * que en las rondas de tocar escenas no se acierte sólo por el mueble.
 */
const despistes = (rel, mismoMueble) =>
  sample(RELACIONES.filter(x =>
    x.id !== rel.id &&
    !rel.evita.includes(x.id) &&
    (!mismoMueble || x.mueble === rel.mueble)
  ), 2)

/**
 * Ronda tipo 'palabra': una escena arriba y 3 palabras abajo.
 * Ronda tipo 'escena':  la consigna hablada y 3 escenas para tocar.
 */
function crearRondas() {
  // Las ocho relaciones, en orden aleatorio, una por ronda.
  return shuffle(RELACIONES).map((rel, k) => {
    const tipo = k % 2 === 0 ? 'palabra' : 'escena'
    return { tipo, rel, opciones: shuffle([rel, ...despistes(rel, tipo === 'escena')]) }
  })
}

export default function Espacial({ onDone }) {
  const { tx } = useLang()
  // Se crean una sola vez: cambiar de idioma no reinicia la partida.
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  const elegir = (o) => answer(o.id, o.id === r.rel.id)

  // La consigna cambia según el formato de la ronda.
  const consigna = r.tipo === 'palabra'
    ? { es: '¿Dónde está la pelota?', ca: 'On és la pilota?' }
    : {
        es: `Toca el dibujo donde la pelota está ${tx(r.rel.frase)}`,
        ca: `Toca el dibuix on la pilota és ${tx(r.rel.frase)}`
      }

  return (
    <div className="stage">
      <Prompt text={consigna} />

      <div className="board">
        {/* Formato (a): una sola escena grande arriba */}
        {r.tipo === 'palabra' && (
          <div className="rise" style={{ display: 'grid', placeItems: 'center' }}>
            <EscenaEspacial rel={r.rel.id} size={240} />
          </div>
        )}

        <div className="options">
          {r.opciones.map(o => (
            <button key={o.id} className={`opt ${cls(o.id)}`}
              style={{ minWidth: 132, minHeight: 108 }}
              onClick={() => elegir(o)}>
              {r.tipo === 'palabra' ? (
                // Palabra + flecha, para quien aún no lee
                <>
                  <div style={{ fontSize: 44, lineHeight: 1 }}>{o.emoji}</div>
                  <b style={{ fontSize: 20 }}>{tx(o.palabra)}</b>
                </>
              ) : (
                // Tres escenas entre las que elegir
                <EscenaEspacial rel={o.id} size={168} />
              )}
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
