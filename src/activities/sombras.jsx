import { useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   La sombra — se ve una silueta negra y hay que decir de quién
   es. Al quitar el color, el niño tiene que fijarse sólo en el
   contorno: es percepción de la forma global, más difícil que
   reconocer por color y muy buena para la atención visual.
   ============================================================ */

/* Siluetas bien distintas entre sí: si dos se parecen demasiado
   deja de ser un juego justo para un niño de cuatro años. */
const COSAS = [
  { art: 'gato',      es: 'el gato',     ca: 'el gat' },
  { art: 'pez',       es: 'el pez',      ca: 'el peix' },
  { art: 'elefante',  es: 'el elefante', ca: "l'elefant" },
  { art: 'arbol',     es: 'el árbol',    ca: "l'arbre" },
  { art: 'casa',      es: 'la casa',     ca: 'la casa' },
  { art: 'coche',     es: 'el coche',    ca: 'el cotxe' },
  { art: 'avion',     es: 'el avión',    ca: "l'avió" },
  { art: 'flor',      es: 'la flor',     ca: 'la flor' },
  { art: 'mariposa',  es: 'la mariposa', ca: 'la papallona' },
  { art: 'tortuga',   es: 'la tortuga',  ca: 'la tortuga' }
]

export default function Sombras({ onDone }) {
  const { lang, tx } = useLang()
  const [rondas] = useState(() => shuffle(COSAS).slice(0, 6).map(target => ({
    target,
    opciones: shuffle([target, ...sample(COSAS.filter(c => c.art !== target.art), 2)])
  })))
  const [i, setI] = useState(0)
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  return (
    <div className="stage">
      <Prompt text={{ es: '¿De quién es esta sombra?', ca: 'De qui és aquesta ombra?' }} />

      <div className="board">
        {/* La silueta: el mismo dibujo, pintado todo de negro. */}
        <div className="rise" style={{ filter: 'brightness(0)', opacity: 0.85 }}>
          <Art name={r.target.art} size={160} />
        </div>

        <div className="options">
          {r.opciones.map(o => (
            <button key={o.art} className={`opt ${cls(o.art)}`}
              onClick={() => { speak(tx({ es: o.es, ca: o.ca }), lang); answer(o.art, o.art === r.target.art) }}>
              <Art name={o.art} size={104} />
              <b>{tx({ es: o.es, ca: o.ca })}</b>
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
