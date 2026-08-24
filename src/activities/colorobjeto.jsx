import ChoiceGame from '../engines/ChoiceGame'
import { COLORS } from '../art/palette'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿De qué color es? — de nombrar el color suelto (El arcoíris)
   a reconocerlo en una cosa de verdad. El color está a la vista
   en el dibujo, así que nunca es una adivinanza: se trata de
   ponerle nombre a lo que ya se ve.
   ============================================================ */

/* Sólo cosas cuyo dibujo tiene un color dominante indiscutible:
   si el dibujo dijera una cosa y la respuesta otra, el niño
   aprendería justo lo contrario de lo que queremos. */
const COSAS = [
  { art: 'sol',       color: 'amarillo', es: 'el sol',      ca: 'el sol' },
  { art: 'platano',   color: 'amarillo', es: 'el plátano',  ca: 'el plàtan' },
  { art: 'fresa',     color: 'rojo',     es: 'la fresa',    ca: 'la maduixa' },
  { art: 'manzana',   color: 'rojo',     es: 'la manzana',  ca: 'la poma' },
  { art: 'naranja',   color: 'naranja',  es: 'la naranja',  ca: 'la taronja' },
  { art: 'zanahoria', color: 'naranja',  es: 'la zanahoria',ca: 'la pastanaga' },
  { art: 'uvas',      color: 'morado',   es: 'las uvas',    ca: 'el raïm' },
  { art: 'brocoli',   color: 'verde',    es: 'el brócoli',  ca: 'el bròquil' },
  { art: 'coche',     color: 'azul',     es: 'el coche',    ca: 'el cotxe' },
  { art: 'libro',     color: 'azul',     es: 'el libro',    ca: 'el llibre' }
]

export default function ColorObjeto({ onDone }) {
  const rounds = shuffle(COSAS).slice(0, 6).map(cosa => {
    const bueno = COLORS.find(c => c.id === cosa.color)
    const otros = sample(COLORS.filter(c => c.id !== cosa.color), 2)
    return {
      prompt: { es: `¿De qué color es ${cosa.es}?`, ca: `De quin color és ${cosa.ca}?` },
      hero: { art: cosa.art },
      options: shuffle([bueno, ...otros]).map(c => ({
        key: c.id, swatch: c.hex, ok: c.id === cosa.color,
        label: { es: c.es, ca: c.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
