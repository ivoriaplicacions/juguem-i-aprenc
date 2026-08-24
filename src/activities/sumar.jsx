import { useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, sample, range } from '../lib/rnd'

/* ============================================================
   Sumas de fruta — juntar cantidades hasta 5.
   Se ven dos platos con fruta, un + entre ellos y un =.
   El niño elige el resultado entre tres números. La idea de
   "juntar" se ve: los dos platos y el hueco del total en fila.
   ============================================================ */

/** Frutas con las que se hacen las sumas. */
const FRUTAS = ['manzana', 'fresa', 'naranja', 'platano', 'uvas', 'sandia']

/** Seis sumas de dificultad creciente, todas con resultado hasta 5. */
const SUMAS = [[1, 1], [2, 1], [1, 3], [2, 2], [3, 2], [2, 3]]

/** Plato con las frutas dentro: la cantidad se ve de un vistazo. */
function Plato({ fruta, n }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 26, boxShadow: 'var(--shadow)',
      padding: 12, minWidth: 128, minHeight: 128,
      display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', justifyContent: 'center'
    }}>
      {range(n).map(i => <Art key={i} name={fruta} size={54} />)}
    </div>
  )
}

/** El signo + o = , bien grande para que se lea sin saber leer. */
const Signo = ({ children }) => (
  <b style={{ fontSize: 46, color: 'var(--muted)', lineHeight: 1 }}>{children}</b>
)

/** Prepara las seis rondas con su fruta y sus tres opciones de número. */
function crearRondas() {
  const frutas = shuffle(FRUTAS)
  return SUMAS.map(([a, b], k) => {
    const total = a + b
    // Distractores cercanos entre 1 y 6, para que haya que contar de verdad.
    const cerca = range(6, 1).filter(x => x !== total)
    return { a, b, total, fruta: frutas[k % frutas.length], opciones: shuffle([total, ...sample(cerca, 2)]) }
  })
}

export default function Sumar({ onDone }) {
  const { tx } = useLang()
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const [total, setTotal] = useState(null) // número colocado en el hueco al acertar
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => {
      if (i + 1 < rondas.length) { setTotal(null); setI(i + 1) } else onDone()
    }
  })

  const elegir = (n) => {
    const ok = n === r.total
    if (ok) setTotal(n)
    answer(`n${n}`, ok)
  }

  return (
    <div className="stage">
      <Prompt text={{
        es: 'Junta las dos frutas. ¿Cuántas hay en total?',
        ca: 'Ajunta les dues fruites. Quantes n\'hi ha en total?'
      }} />

      <div className="board">
        {/* La suma: plato + plato = hueco */}
        <div className="options" style={{ gap: 12 }} aria-label={tx({ es: 'suma', ca: 'suma' })}>
          <Plato fruta={r.fruta} n={r.a} />
          <Signo>+</Signo>
          <Plato fruta={r.fruta} n={r.b} />
          <Signo>=</Signo>
          <div className={`slot ${total ? 'filled' : ''}`}>
            {total
              ? <Art name={`num:${total}`} size={86} />
              : <span style={{ fontSize: 44, color: 'var(--muted)' }}>?</span>}
          </div>
        </div>

        {/* Los tres números para elegir */}
        <div className="options">
          {r.opciones.map(n => (
            <button key={n} className={`opt ${cls(`n${n}`)}`} onClick={() => elegir(n)}>
              <Art name={`num:${n}`} size={96} />
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
