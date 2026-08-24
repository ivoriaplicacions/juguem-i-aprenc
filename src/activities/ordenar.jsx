import { useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle, pick, range } from '../lib/rnd'

/* ============================================================
   La escalera de números — tocarlos del más pequeño al más
   grande. No hay que elegir entre opciones: hay que construir
   el orden entero, que es bastante más exigente. El número
   acertado sube a la escalera y ya no se puede tocar; si se
   toca otro, se anima y sigue ahí, sin perder nada.
   ============================================================ */

/** Cinco escaleras, cada vez con números más altos. */
const ESCALERAS = [
  [1, 2, 3], [2, 3, 4, 5], [1, 3, 5, 7],
  [4, 5, 6, 7], [2, 4, 6, 8, 10]
]

export default function Ordenar({ onDone }) {
  const { lang, t } = useLang()
  const [rondas] = useState(() => ESCALERAS.map(nums => ({ nums, mezclados: shuffle(nums) })))
  const [i, setI] = useState(0)
  const [puestos, setPuestos] = useState([])
  const r = rondas[i]

  const tocar = (n) => {
    if (puestos.includes(n)) return
    const toca = r.nums[puestos.length] // el siguiente que corresponde
    if (n !== toca) {
      sfx.wrong()
      speak(pick(t('tryAgain')), lang)
      return
    }
    const nuevos = [...puestos, n]
    sfx.right()
    setPuestos(nuevos)
    if (nuevos.length < r.nums.length) return
    // Escalera completa: un respiro y a la siguiente.
    speak(pick(t('wellDone')), lang)
    setTimeout(() => {
      if (i + 1 < rondas.length) { setPuestos([]); setI(i + 1) } else onDone()
    }, 900)
  }

  return (
    <div className="stage">
      <Prompt text={{
        es: 'Toca los números del más pequeño al más grande',
        ca: 'Toca els números del més petit al més gran'
      }} />

      <div className="board">
        {/* La escalera que se va montando */}
        <div className="options" style={{ gap: 10, minHeight: 118 }}>
          {range(r.nums.length).map(k => (
            <div key={k} className={`slot ${puestos[k] ? 'filled' : ''}`}>
              {puestos[k]
                ? <Art name={`num:${puestos[k]}`} size={80} />
                : <span style={{ fontSize: 38, color: 'var(--muted)' }}>?</span>}
            </div>
          ))}
        </div>

        {/* Los números por colocar, desordenados */}
        <div className="options">
          {r.mezclados.map(n => (
            puestos.includes(n) ? null : (
              <button key={n} className="opt rise"
                aria-label={String(n)}
                onClick={() => tocar(n)}>
                <Art name={`num:${n}`} size={92} />
              </button>
            )
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
