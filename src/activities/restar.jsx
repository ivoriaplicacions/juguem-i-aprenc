import { useState } from 'react'
import { Art } from '../art'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, sample, range } from '../lib/rnd'

/* ============================================================
   Se van volando — quitar cantidades hasta 5.
   El complemento de Sumas de fruta: aquí había unos cuantos y
   algunos se marchan. Los que se van no desaparecen, se quedan
   pálidos y con la mano de adiós, para que el niño pueda ver a
   la vez lo que había y lo que queda: restar sin memoria.
   ============================================================ */

const BICHOS = ['mariposa', 'abeja', 'pajaro', 'pato', 'rana', 'pez']

/** Seis restas de dificultad creciente, siempre con resultado de 1 en adelante. */
const RESTAS = [[2, 1], [3, 1], [4, 1], [4, 2], [5, 2], [5, 3]]

function crearRondas() {
  const bichos = shuffle(BICHOS)
  return RESTAS.map(([hay, sevan], k) => {
    const quedan = hay - sevan
    const cerca = range(6, 1).filter(x => x !== quedan)
    return { hay, sevan, quedan, bicho: bichos[k % bichos.length], opciones: shuffle([quedan, ...sample(cerca, 2)]) }
  })
}

export default function Restar({ onDone }) {
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  return (
    <div className="stage">
      <Prompt text={{
        es: 'Unos se van volando. ¿Cuántos quedan?',
        ca: "Uns quants se'n van volant. Quants en queden?"
      }} />

      <div className="board">
        <div className="options" style={{ gap: 10, maxWidth: 560 }}>
          {range(r.hay).map(k => {
            const seVa = k >= r.quedan // los últimos son los que se marchan
            return (
              <div key={k} style={{ position: 'relative', opacity: seVa ? 0.28 : 1 }}>
                <Art name={r.bicho} size={72} />
                {seVa && (
                  <span style={{ position: 'absolute', top: -6, right: -6, fontSize: 26 }}>👋</span>
                )}
              </div>
            )
          })}
        </div>

        <div className="options">
          {r.opciones.map(n => (
            <button key={n} className={`opt ${cls(`n${n}`)}`} onClick={() => answer(`n${n}`, n === r.quedan)}>
              <Art name={`num:${n}`} size={96} />
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
