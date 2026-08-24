import { useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, range } from '../lib/rnd'

/* ============================================================
   ¿Dónde hay más? — comparar dos cantidades de un vistazo.
   Las primeras rondas se ven a simple vista; las últimas se
   parecen tanto que hay que contar. Se pregunta a veces por el
   montón grande y a veces por el pequeño, para que el niño
   escuche la consigna en vez de contestar siempre igual.
   ============================================================ */

const COSAS = ['manzana', 'pelota', 'flor', 'estrella_cielo', 'globo', 'caramelo']

/** Parejas de menos a más difícil: primero muy distintas, luego casi iguales. */
const PAREJAS = [[1, 4], [2, 5], [3, 6], [4, 6], [3, 4], [5, 6]]

/** Montón de cosas dentro de una tarjeta grande y fácil de tocar. */
function Monton({ cosa, n }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', alignItems: 'center',
      minWidth: 150, minHeight: 150, maxWidth: 210
    }}>
      {range(n).map(i => <Art key={i} name={cosa} size={52} />)}
    </div>
  )
}

function crearRondas() {
  const cosas = shuffle(COSAS)
  return PAREJAS.map(([a, b], k) => {
    const masEsDerecha = Math.random() < 0.5
    const pediMas = k % 2 === 0 // alternamos la pregunta
    return {
      cosa: cosas[k % cosas.length],
      izq: masEsDerecha ? a : b,
      der: masEsDerecha ? b : a,
      pediMas
    }
  })
}

export default function MasMenos({ onDone }) {
  const { tx } = useLang()
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  /** El lado bueno depende de si se ha pedido el montón grande o el pequeño. */
  const ladoBueno = r.pediMas
    ? (r.izq > r.der ? 'izq' : 'der')
    : (r.izq < r.der ? 'izq' : 'der')

  const texto = r.pediMas
    ? { es: 'Toca el montón donde hay MÁS', ca: 'Toca el munt on hi ha MÉS' }
    : { es: 'Toca el montón donde hay MENOS', ca: 'Toca el munt on hi ha MENYS' }

  return (
    <div className="stage">
      <Prompt text={texto} />

      <div className="board">
        <div className="options" style={{ gap: 22 }}>
          {['izq', 'der'].map(lado => (
            <button key={lado} className={`opt ${cls(lado)}`}
              aria-label={tx({ es: 'montón', ca: 'munt' })}
              onClick={() => answer(lado, lado === ladoBueno)}>
              <Monton cosa={r.cosa} n={lado === 'izq' ? r.izq : r.der} />
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
