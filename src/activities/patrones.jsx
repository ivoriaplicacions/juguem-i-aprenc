import { useState } from 'react'
import { Art, Shape, P } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Sigue la serie — descubrir el patrón que se repite.
   Se ve una fila de 5 o 6 elementos con el último hueco vacío
   (.slot) y el niño elige entre 3 opciones cuál continúa.
   Dificultad creciente: AB → AAB → ABC.
   ============================================================ */

/** Un elemento de la serie puede ser una forma de color o una ilustración. */
const Elem = ({ e, size = 84 }) =>
  e.shape
    ? <Shape id={e.shape} color={e.color} size={size} />
    : <Art name={e.art} size={size} />

/* Piezas disponibles: formas de colores muy contrastados… */
const PIEZAS = [
  { id: 'circ-rojo', shape: 'circulo', color: P.red },
  { id: 'cuad-azul', shape: 'cuadrado', color: P.blue },
  { id: 'tri-amar', shape: 'triangulo', color: P.yellow },
  { id: 'est-morada', shape: 'estrella', color: P.purple },
  { id: 'cor-rosa', shape: 'corazon', color: P.pink },
  { id: 'rom-verde', shape: 'rombo', color: P.green }
]
/* …e ilustraciones, para que las series no sean siempre geométricas. */
const DIBUJOS = [
  { id: 'sol', art: 'sol' }, { id: 'luna', art: 'luna' },
  { id: 'flor', art: 'flor' }, { id: 'pelota', art: 'pelota' },
  { id: 'manzana', art: 'manzana' }, { id: 'estrella_cielo', art: 'estrella_cielo' }
]

/** Plan de las 6 rondas: patrón, longitud total y de dónde salen las piezas. */
const PLAN = [
  { patron: 'AB', largo: 5, banco: PIEZAS },
  { patron: 'AB', largo: 6, banco: DIBUJOS },
  { patron: 'AAB', largo: 6, banco: PIEZAS },
  { patron: 'AAB', largo: 6, banco: DIBUJOS },
  { patron: 'ABC', largo: 6, banco: PIEZAS },
  { patron: 'ABC', largo: 6, banco: DIBUJOS }
]

/** Construye una ronda: la serie visible, el hueco final y las 3 opciones. */
function crearRonda({ patron, largo, banco }) {
  const distintas = new Set(patron).size
  // Elegimos tantas piezas distintas como letras tenga el patrón, más una
  // pieza extra que sirve de despiste entre las opciones.
  const elegidas = sample(banco, distintas + 1)
  const mapa = {}
  Array.from(new Set(patron)).forEach((letra, k) => { mapa[letra] = elegidas[k] })
  const despiste = elegidas[distintas]

  const serie = Array.from({ length: largo }, (_, i) => mapa[patron[i % patron.length]])
  const solucion = serie[largo - 1]
  const visibles = serie.slice(0, largo - 1) // el último queda como hueco

  // Opciones: la correcta más dos piezas equivocadas (las otras letras del
  // patrón y, si hacen falta, la pieza de despiste).
  const erroneas = [...Object.values(mapa).filter(e => e.id !== solucion.id), despiste]
  const opciones = shuffle([solucion, ...sample(erroneas, 2)])

  return { visibles, solucion, opciones }
}

export default function Patrones({ onDone }) {
  const [rondas] = useState(() => PLAN.map(crearRonda))
  const [i, setI] = useState(0)
  const [lleno, setLleno] = useState(null) // pieza colocada en el hueco al acertar
  const { tx } = useLang()
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => {
      if (i + 1 < rondas.length) { setLleno(null); setI(i + 1) } else onDone()
    }
  })

  const elegir = (o) => {
    const ok = o.id === r.solucion.id
    if (ok) setLleno(o)
    answer(o.id, ok)
  }

  return (
    <div className="stage">
      <Prompt text={{ es: '¿Qué viene ahora? Mira la serie', ca: 'Què ve ara? Mira la sèrie' }} />

      <div className="board">
        {/* La serie, en una fila que hace wrap para caber en pantallas pequeñas */}
        <div className="options" style={{ gap: 10 }} aria-label={tx({ es: 'serie', ca: 'sèrie' })}>
          {r.visibles.map((e, k) => (
            <div key={k} className="slot filled rise" style={{ animationDelay: `${k * 0.05}s` }}>
              <Elem e={e} />
            </div>
          ))}
          {/* El hueco vacío: se rellena al acertar */}
          <div className={`slot ${lleno ? 'filled' : ''}`}>
            {lleno ? <Elem e={lleno} /> : <span style={{ fontSize: 44, color: 'var(--muted)' }}>?</span>}
          </div>
        </div>

        {/* Las tres opciones */}
        <div className="options">
          {r.opciones.map(o => (
            <button key={o.id} className={`opt ${cls(o.id)}`} onClick={() => elegir(o)}>
              <Elem e={o} size={92} />
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
