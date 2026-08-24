import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Lo contrario — parejas de opuestos.
   Entender que "frío" sólo significa algo comparado con "calor"
   es un salto grande: el niño deja de nombrar cosas sueltas y
   empieza a relacionarlas. Sólo parejas que se ven en el dibujo,
   nada de opuestos abstractos.
   ============================================================ */

const PAREJAS = [
  { a: { art: 'sol',            es: 'el día',       ca: 'el dia' },
    b: { art: 'luna',           es: 'la noche',     ca: 'la nit' } },
  { a: { art: 'cara_feliz',     es: 'contento',     ca: 'content' },
    b: { art: 'cara_triste',    es: 'triste',       ca: 'trist' } },
  { a: { art: 'sol',            es: 'el calor',     ca: 'la calor' },
    b: { art: 'nieve',          es: 'el frío',      ca: 'el fred' } },
  { a: { art: 'cara_tranquila', es: 'tranquilo',    ca: 'tranquil' },
    b: { art: 'cara_enfadada',  es: 'enfadado',     ca: 'enfadat' } },
  { a: { art: 'saltar',         es: 'despierto',    ca: 'despert' },
    b: { art: 'cama',           es: 'dormido',      ca: 'adormit' } },
  { a: { art: 'cara_cansada',   es: 'cansado',      ca: 'cansat' },
    b: { art: 'aplaudir',       es: 'con fuerza',   ca: 'amb força' } }
]

/** Todos los dibujos disponibles como distractores. */
const TODOS = PAREJAS.flatMap(p => [p.a, p.b])

export default function Contrarios({ onDone }) {
  const rounds = shuffle(PAREJAS).map(par => {
    // A veces se pregunta por un lado de la pareja y a veces por el otro.
    const [pista, contrario] = Math.random() < 0.5 ? [par.a, par.b] : [par.b, par.a]
    const otros = sample(
      TODOS.filter(x => x.art !== contrario.art && x.art !== pista.art), 2
    )
    return {
      prompt: { es: `¿Qué es lo contrario de ${pista.es}?`, ca: `Què és el contrari de ${pista.ca}?` },
      hero: { art: pista.art },
      options: shuffle([contrario, ...otros]).map(o => ({
        key: o.art + o.es, art: o.art, ok: o.art === contrario.art,
        label: { es: o.es, ca: o.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
