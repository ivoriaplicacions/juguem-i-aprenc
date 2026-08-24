import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Qué come cada uno? — la dieta de los animales.
   ¿Dónde vive? coloca al animal en su sitio; ésta explica de qué
   se alimenta, que es lo que de verdad explica por qué vive ahí.
   Es la primera idea de que en la naturaleza todo está unido.
   ============================================================ */

const CASOS = [
  { animal: 'vaca',     es: 'la vaca',      ca: 'la vaca',      come: 'brocoli',   comeEs: 'hierba y plantas', comeCa: 'herba i plantes' },
  { animal: 'raton',    es: 'el ratón',     ca: 'el ratolí',    come: 'pan',       comeEs: 'pan y semillas',   comeCa: 'pa i llavors' },
  { animal: 'abeja',    es: 'la abeja',     ca: "l'abella",     come: 'flor',      comeEs: 'el néctar de las flores', comeCa: 'el nèctar de les flors' },
  { animal: 'gato',     es: 'el gato',      ca: 'el gat',       come: 'leche',     comeEs: 'leche y pescado',  comeCa: 'llet i peix' },
  { animal: 'oveja',    es: 'la oveja',     ca: "l'ovella",     come: 'zanahoria', comeEs: 'verduras y hierba',comeCa: 'verdures i herba' },
  { animal: 'gallina',  es: 'la gallina',   ca: 'la gallina',   come: 'uvas',      comeEs: 'granos y fruta',   comeCa: 'grans i fruita' },
  { animal: 'elefante', es: 'el elefante',  ca: "l'elefant",    come: 'manzana',   comeEs: 'fruta y hojas',    comeCa: 'fruita i fulles' },
  { animal: 'oso',      es: 'el oso',       ca: "l'ós",         come: 'fresa',     comeEs: 'frutos del bosque',comeCa: 'fruits del bosc' }
]

/** Todo lo comestible del catálogo, para los distractores. */
const COMIDAS = ['brocoli', 'pan', 'flor', 'leche', 'zanahoria', 'uvas', 'manzana', 'fresa', 'platano', 'agua']

export default function QueCome({ onDone }) {
  const rounds = sample(CASOS, 6).map(c => {
    const otras = sample(COMIDAS.filter(x => x !== c.come), 2)
    return {
      prompt: { es: `¿Qué come ${c.es}?`, ca: `Què menja ${c.ca}?` },
      hero: { art: c.animal },
      options: shuffle([c.come, ...otras]).map(x => ({ key: x, art: x, ok: x === c.come }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
