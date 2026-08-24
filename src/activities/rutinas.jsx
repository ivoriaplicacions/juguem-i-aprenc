import { useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle } from '../lib/rnd'

/* ============================================================
   El día de Nino — ordenar secuencias temporales.
   Se ven 4 escenas desordenadas de una rutina y el niño las
   coloca en orden TOCÁNDOLAS una a una: la primera que toca va
   al hueco 1, la siguiente al hueco 2, etc.
   Si toca la que no toca: sacudida, ánimo hablado y a seguir.
   Nunca se pierde, no hay reloj y nada se bloquea.
   ============================================================ */

/* Las cuatro secuencias. El orden del array ES el orden correcto. */
const SECUENCIAS = [
  {
    id: 'manana',
    titulo: { es: 'La mañana de Nino', ca: 'El matí del Nino' },
    pasos: [
      { id: 'levantarse', art: 'cama',    label: { es: 'se levanta',      ca: 'es lleva' } },
      { id: 'desayunar',  art: 'leche',   label: { es: 'desayuna',        ca: 'esmorza' } },
      { id: 'mochila',    art: 'mochila', label: { es: 'coge la mochila', ca: 'agafa la motxilla' } },
      { id: 'cole',       art: 'casa',    label: { es: 'va al cole',      ca: 'va a l’escola' } }
    ]
  },
  {
    id: 'noche',
    titulo: { es: 'La noche de Nino', ca: 'La nit del Nino' },
    pasos: [
      { id: 'dientes', art: 'cepillo_dientes', label: { es: 'se lava los dientes', ca: 'es renta les dents' } },
      { id: 'pijama',  art: 'luna',            label: { es: 'se pone el pijama',   ca: 'es posa el pijama' } },
      { id: 'cuento',  art: 'libro',           label: { es: 'un cuento',           ca: 'un conte' } },
      { id: 'dormir',  art: 'cama',            label: { es: 'a dormir',            ca: 'a dormir' } }
    ]
  },
  {
    id: 'bano',
    titulo: { es: 'Nino se lava', ca: 'El Nino es renta' },
    pasos: [
      { id: 'ducha',   art: 'ducha',           label: { es: 'se ducha',           ca: 'es dutxa' } },
      { id: 'toalla',  art: 'toalla',          label: { es: 'se seca',            ca: 's’asseca' } },
      { id: 'peine',   art: 'peine',           label: { es: 'se peina',           ca: 'es pentina' } },
      { id: 'dientes', art: 'cepillo_dientes', label: { es: 'se lava los dientes', ca: 'es renta les dents' } }
    ]
  },
  {
    id: 'tarde',
    titulo: { es: 'La tarde de Nino', ca: 'La tarda del Nino' },
    pasos: [
      { id: 'sol',    art: 'sol',    label: { es: 'sale el sol',   ca: 'surt el sol' } },
      { id: 'comer',  art: 'pan',    label: { es: 'come',          ca: 'menja' } },
      { id: 'jugar',  art: 'pelota', label: { es: 'juega',         ca: 'juga' } },
      { id: 'luna',   art: 'luna',   label: { es: 'llega la noche', ca: 'arriba la nit' } }
    ]
  }
]

/** Una escena de la rutina: dibujo grande + etiqueta corta. */
function Escena({ paso, size = 96 }) {
  const { tx } = useLang()
  return (
    <>
      <Art name={paso.art} size={size} />
      <b>{tx(paso.label)}</b>
    </>
  )
}

export default function Rutinas({ onDone }) {
  const { lang, tx } = useLang()
  const [i, setI] = useState(0)                       // secuencia actual
  // Barajamos las escenas una sola vez por secuencia (useState perezoso).
  const [barajadas, setBarajadas] = useState(() => shuffle(SECUENCIAS[0].pasos))
  const [colocadas, setColocadas] = useState([])      // ids ya puestos, en orden

  const sec = SECUENCIAS[i]
  const total = sec.pasos.length

  // useAnswer da el feedback inmediato (verde/rojo, sonido y voz de ánimo).
  // Aquí sólo lo usamos para marcar la escena tocada; el avance lo llevamos
  // nosotros porque hay que colocar cuatro escenas antes de pasar de ronda.
  const { answer, cls } = useAnswer({ delay: 500 })

  /** Pasa a la siguiente secuencia o termina la actividad. */
  const siguiente = () => {
    if (i + 1 < SECUENCIAS.length) {
      setColocadas([])
      setBarajadas(shuffle(SECUENCIAS[i + 1].pasos))
      setI(i + 1)
    } else {
      onDone()
    }
  }

  const tocar = (paso) => {
    if (colocadas.includes(paso.id)) return          // ya está colocada
    const esperado = sec.pasos[colocadas.length]     // la que toca ahora
    const ok = paso.id === esperado.id
    answer(paso.id, ok)
    if (!ok) return                                  // se anima y se reintenta
    const nuevas = [...colocadas, paso.id]
    setColocadas(nuevas)
    // Tras el "¡muy bien!" decimos en voz alta lo que acaba de pasar,
    // para reforzar el vocabulario de la rutina.
    setTimeout(() => speak(tx(paso.label), lang), 900)
    if (nuevas.length === total) {
      sfx.win()
      setTimeout(siguiente, 1200)
    }
  }

  return (
    <div className="stage">
      <Prompt text={{
        es: `${tx(sec.titulo)}: toca las escenas por orden, ¿qué pasa primero?`,
        ca: `${tx(sec.titulo)}: toca les escenes per ordre, què passa primer?`
      }} />

      <div className="board">
        {/* Fila de huecos: se van llenando de izquierda a derecha */}
        <div className="options" style={{ gap: 10 }}>
          {sec.pasos.map((_, k) => {
            const puesto = colocadas[k] && sec.pasos.find(p => p.id === colocadas[k])
            return (
              <div key={k} className={`slot ${puesto ? 'filled' : ''}`}
                style={{ flexDirection: 'column', gap: 2 }}>
                {puesto
                  ? <Art name={puesto.art} size={66} />
                  : <span style={{ fontSize: 34, fontWeight: 900, color: 'var(--muted)' }}>{k + 1}</span>}
              </div>
            )
          })}
        </div>

        {/* Escenas desordenadas: objetivos táctiles bien grandes */}
        <div className="options">
          {barajadas.map(p => {
            const ya = colocadas.includes(p.id)
            return (
              <button key={p.id}
                className={`opt ${cls(p.id)} ${ya ? 'dim' : ''}`}
                style={{ minWidth: 124, minHeight: 124 }}
                disabled={ya}
                onClick={() => tocar(p)}>
                <Escena paso={p} />
              </button>
            )
          })}
        </div>
      </div>

      <Dots step={i} total={SECUENCIAS.length} />
    </div>
  )
}
