import { useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, sample, range } from '../lib/rnd'

/* ============================================================
   El número y su montón — unir la cifra con la cantidad.
   Cuenta conmigo va de la cantidad al número; esta va al revés,
   que es lo que de verdad cuesta: ver un 4 y saber cuánto es.
   Sin ese puente, el niño recita los números sin entenderlos.
   ============================================================ */

const COSAS = ['fresa', 'pelota', 'flor', 'estrella_cielo', 'mariposa', 'caramelo']

/** Seis números, de los fáciles a los que ya obligan a contar. */
const NUMEROS = [2, 3, 5, 4, 6, 7]

/** Montón de cosas para contar, dentro del botón. */
const Monton = ({ cosa, n }) => (
  <div style={{
    display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', alignItems: 'center',
    width: 150, minHeight: 120
  }}>
    {range(n).map(i => <Art key={i} name={cosa} size={44} />)}
  </div>
)

function crearRondas() {
  const cosas = shuffle(COSAS)
  return NUMEROS.map((n, k) => {
    // Distractores cercanos: si estuvieran lejos bastaría con mirar, no con contar.
    const cerca = range(8, 1).filter(x => x !== n && Math.abs(x - n) <= 2)
    return { n, cosa: cosas[k % cosas.length], opciones: shuffle([n, ...sample(cerca, 2)]) }
  })
}

export default function NumeroCantidad({ onDone }) {
  const { tx } = useLang()
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  return (
    <div className="stage">
      <Prompt text={{
        es: 'Mira el número y busca el montón que tiene esa cantidad',
        ca: 'Mira el número i busca el munt que en té aquesta quantitat'
      }} />

      <div className="board">
        <div className="rise" style={{ display: 'grid', placeItems: 'center' }}>
          <Art name={`num:${r.n}`} size={128} />
        </div>

        <div className="options">
          {r.opciones.map(n => (
            <button key={n} className={`opt ${cls(`m${n}`)}`}
              aria-label={tx({ es: 'montón', ca: 'munt' })}
              onClick={() => answer(`m${n}`, n === r.n)}>
              <Monton cosa={r.cosa} n={n} />
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
