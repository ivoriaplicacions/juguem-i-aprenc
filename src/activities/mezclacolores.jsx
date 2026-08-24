import { useState } from 'react'
import { useLang } from '../i18n'
import { COLORS } from '../art/palette'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   La mezcla de colores — de dónde salen los demás.
   El arcoíris enseña a nombrarlos; ésta enseña que no son cosas
   sueltas, que unos nacen de otros. Es la primera vez que el
   niño ve una regla detrás de lo que hasta ahora era una lista,
   y en cuanto la descubre quiere probarla con las pinturas.

   Los dos colores se ven en pantalla junto al signo +: la mezcla
   hay que verla, no basta con oírla.
   ============================================================ */

/** Las tres mezclas primarias, las que de verdad se ven al pintar. */
const MEZCLAS = [
  { a: 'rojo', b: 'amarillo', sale: 'naranja' },
  { a: 'azul', b: 'amarillo', sale: 'verde' },
  { a: 'rojo', b: 'azul',     sale: 'morado' }
]

const col = (id) => COLORS.find(c => c.id === id)

/** Mancha de pintura grande y redonda. */
const Mancha = ({ hex, size = 108 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', background: hex,
    border: '5px solid #fff', boxShadow: 'var(--shadow)'
  }} />
)

const Signo = ({ children }) => (
  <b style={{ fontSize: 46, color: 'var(--muted)', lineHeight: 1 }}>{children}</b>
)

export default function MezclaColores({ onDone }) {
  const { lang, tx } = useLang()

  // Cada mezcla sale dos veces, con los colores en distinto orden,
  // para que se vea que da igual cuál se eche primero.
  const [rondas] = useState(() => shuffle(
    MEZCLAS.flatMap(m => [m, { a: m.b, b: m.a, sale: m.sale }])
  ).map(m => ({
    ...m,
    opciones: shuffle([
      col(m.sale),
      ...sample(COLORS.filter(c => c.id !== m.sale && c.id !== m.a && c.id !== m.b), 2)
    ])
  })))

  const [i, setI] = useState(0)
  const [salida, setSalida] = useState(null)
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => {
      if (i + 1 < rondas.length) { setSalida(null); setI(i + 1) } else onDone()
    }
  })

  const elegir = (c) => {
    const ok = c.id === r.sale
    if (ok) setSalida(c)
    speak(tx({ es: c.es, ca: c.ca }), lang)
    answer(c.id, ok)
  }

  return (
    <div className="stage">
      <Prompt text={{
        es: `Si mezclas ${col(r.a).es} y ${col(r.b).es}, ¿qué color sale?`,
        ca: `Si barreges ${col(r.a).ca} i ${col(r.b).ca}, quin color surt?`
      }} />

      <div className="board">
        {/* mancha + mancha = hueco */}
        <div className="options" style={{ gap: 14 }}>
          <Mancha hex={col(r.a).hex} />
          <Signo>+</Signo>
          <Mancha hex={col(r.b).hex} />
          <Signo>=</Signo>
          <div className={`slot ${salida ? 'filled' : ''}`}>
            {salida
              ? <Mancha hex={salida.hex} size={86} />
              : <span style={{ fontSize: 44, color: 'var(--muted)' }}>?</span>}
          </div>
        </div>

        <div className="options">
          {r.opciones.map(c => (
            <button key={c.id} className={`opt ${cls(c.id)}`} onClick={() => elegir(c)}>
              <Mancha hex={c.hex} size={88} />
              <b>{tx({ es: c.es, ca: c.ca })}</b>
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
