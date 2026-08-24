import ChoiceGame from '../engines/ChoiceGame'
import { SHAPES } from '../art'
import { P } from '../art/palette'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Qué forma tiene? — el paso siguiente a Formas mágicas: ya no
   se trata de reconocer un triángulo suelto, sino de ver la
   figura escondida dentro de una cosa cotidiana. Es el inicio
   de la abstracción geométrica.
   ============================================================ */

/* Cada cosa, con la forma que su dibujo enseña de verdad. */
const COSAS = [
  { art: 'pelota',         forma: 'circulo',    es: 'la pelota',   ca: 'la pilota' },
  { art: 'sol',            forma: 'circulo',    es: 'el sol',      ca: 'el sol' },
  { art: 'mesa',           forma: 'rectangulo', es: 'la mesa',     ca: 'la taula' },
  { art: 'regalo',         forma: 'cuadrado',   es: 'el regalo',   ca: 'el regal' },
  { art: 'estrella_cielo', forma: 'estrella',   es: 'la estrella', ca: "l'estrella" },
  { art: 'globo',          forma: 'ovalo',      es: 'el globo',    ca: 'el globus' }
]

export default function FormaObjeto({ onDone }) {
  const rounds = shuffle(COSAS).map(cosa => {
    const buena = SHAPES.find(s => s.id === cosa.forma)
    const otras = sample(SHAPES.filter(s => s.id !== cosa.forma), 2)
    return {
      prompt: { es: `¿Qué forma tiene ${cosa.es}?`, ca: `Quina forma té ${cosa.ca}?` },
      hero: { art: cosa.art },
      options: shuffle([buena, ...otras]).map(s => ({
        key: s.id, shape: s.id, color: P.blue, ok: s.id === cosa.forma,
        label: { es: s.es, ca: s.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
