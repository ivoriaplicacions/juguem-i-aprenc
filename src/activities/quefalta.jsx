import { useState } from 'react'
import { Art } from '../art'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, sample, range } from '../lib/rnd'

/* ============================================================
   ¿Qué número falta? — la recta numérica con un hueco.
   Saber contar seguido no es lo mismo que saber qué va entre el
   2 y el 4. Este hueco obliga a pensar el orden, no a recitarlo,
   y prepara el terreno para sumar y restar de cabeza.
   ============================================================ */

/** Tiras de cuatro números seguidos y la posición del hueco. */
const TIRAS = [
  { desde: 1, hueco: 1 }, { desde: 2, hueco: 2 }, { desde: 3, hueco: 1 },
  { desde: 4, hueco: 2 }, { desde: 5, hueco: 1 }, { desde: 6, hueco: 2 }
]

function crearRondas() {
  return shuffle(TIRAS).map(({ desde, hueco }) => {
    const tira = range(4, desde)          // p. ej. [3,4,5,6]
    const falta = tira[hueco]
    const cerca = range(10, 1).filter(x => x !== falta && Math.abs(x - falta) <= 3)
    return { tira, hueco, falta, opciones: shuffle([falta, ...sample(cerca, 2)]) }
  })
}

export default function QueFalta({ onDone }) {
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const [puesto, setPuesto] = useState(null) // el número colocado al acertar
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => {
      if (i + 1 < rondas.length) { setPuesto(null); setI(i + 1) } else onDone()
    }
  })

  const elegir = (n) => {
    const ok = n === r.falta
    if (ok) setPuesto(n)
    answer(`n${n}`, ok)
  }

  return (
    <div className="stage">
      <Prompt text={{
        es: 'Falta un número. ¿Cuál es?',
        ca: 'Falta un número. Quin és?'
      }} />

      <div className="board">
        {/* La tira de números con su hueco */}
        <div className="options" style={{ gap: 10 }}>
          {r.tira.map((n, k) => (
            k === r.hueco
              ? <div key={k} className={`slot ${puesto ? 'filled' : ''}`}>
                  {puesto
                    ? <Art name={`num:${puesto}`} size={86} />
                    : <span style={{ fontSize: 44, color: 'var(--muted)' }}>?</span>}
                </div>
              : <Art key={k} name={`num:${n}`} size={92} />
          ))}
        </div>

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
