import { useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle, sample, range } from '../lib/rnd'

/* ============================================================
   Cuenta conmigo — contar del 1 al 10.
   El niño TOCA cada objeto: suena un pop, aparece el número
   encima y se oye en voz alta. Después elige la tarjeta con
   el número total entre tres. Nunca se pierde: si falla, se
   le anima y puede volver a intentarlo.
   ============================================================ */

/** Los números hablados, siempre como objetos {es, ca}. */
const NUM = {
  1: { es: 'uno', ca: 'un' }, 2: { es: 'dos', ca: 'dos' }, 3: { es: 'tres', ca: 'tres' },
  4: { es: 'cuatro', ca: 'quatre' }, 5: { es: 'cinco', ca: 'cinc' }, 6: { es: 'seis', ca: 'sis' },
  7: { es: 'siete', ca: 'set' }, 8: { es: 'ocho', ca: 'vuit' }, 9: { es: 'nueve', ca: 'nou' },
  10: { es: 'diez', ca: 'deu' }
}

/** Objetos que se pueden contar (todos iguales dentro de una ronda). */
const OBJETOS = ['manzana', 'pelota', 'flor', 'pez', 'estrella_cielo', 'globo', 'fresa', 'mariposa']

/** Cantidades crecientes: seis rondas de menos a más. */
const CANTIDADES = [2, 3, 4, 6, 8, 10]

/** Prepara las seis rondas: cantidad, dibujo y tres números para elegir. */
function crearRondas() {
  const dibujos = shuffle(OBJETOS)
  return CANTIDADES.map((n, k) => {
    // Los distractores son números cercanos, para que haya que contar de verdad.
    const cerca = range(10, 1).filter(x => x !== n && Math.abs(x - n) <= 3)
    return { n, art: dibujos[k % dibujos.length], opciones: shuffle([n, ...sample(cerca, 2)]) }
  })
}

export default function Contar({ onDone }) {
  const { lang, tx } = useLang()
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const [tocados, setTocados] = useState([]) // índices en el orden en que se han contado
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => {
      if (i + 1 < rondas.length) { setTocados([]); setI(i + 1) } else onDone()
    }
  })

  /** Contar un objeto: suena, se marca con su número y se dice en voz alta. */
  const contar = (idx) => {
    if (tocados.includes(idx)) return // ya contado, no se cuenta dos veces
    const siguiente = tocados.length + 1
    setTocados([...tocados, idx])
    sfx.pop()
    speak(tx(NUM[siguiente]), lang)
  }

  /** Comprobar el número elegido. Al fallar solo se anima (useAnswer ya habla). */
  const elegir = (n) => answer(`n${n}`, n === r.n)

  const numero = (idx) => tocados.indexOf(idx) + 1 // 0 si aún no se ha tocado

  return (
    <div className="stage">
      <Prompt
        text={{ es: 'Toca cada dibujo para contarlo. ¿Cuántos hay?', ca: 'Toca cada dibuix per comptar-lo. Quants n\'hi ha?' }}
        extra={<b style={{ fontSize: 24 }}>{tocados.length > 0 ? tocados.length : ''}</b>}
      />

      <div className="board">
        {/* Los objetos que hay que contar, en una fila que hace wrap */}
        <div className="options" style={{ gap: 12 }}>
          {range(r.n).map(idx => {
            const marca = numero(idx)
            return (
              <button key={idx} className="opt rise"
                style={{ minWidth: 0, padding: 8, position: 'relative', borderColor: marca ? 'var(--green)' : 'transparent' }}
                aria-label={tx({ es: 'contar', ca: 'comptar' })}
                onClick={() => contar(idx)}>
                <Art name={r.art} size={r.n > 6 ? 68 : 84} />
                {marca > 0 && (
                  <span style={{
                    position: 'absolute', top: -8, right: -8, width: 38, height: 38, borderRadius: '50%',
                    background: 'var(--green)', color: '#fff', fontSize: 20, fontWeight: 900,
                    display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow)'
                  }}>{marca}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Las tres tarjetas de número */}
        <div className="options">
          {r.opciones.map(n => (
            <button key={n} className={`opt ${cls(`n${n}`)}`}
              onClick={() => elegir(n)}>
              <Art name={`num:${n}`} size={96} />
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
