import { useLang } from '../i18n'
import ChoiceGame from '../engines/ChoiceGame'
import { P } from '../art'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Con qué letra empieza? — el puente entre el dibujo y la letra.
   Caza la letra va de letra a letra y Suena igual de sonido a
   sonido; ésta une las dos orillas, que es exactamente el paso
   que abre la lectura. Cada palabra guarda su inicial en las dos
   lenguas, porque "manzana" empieza por M pero "poma" por P.
   ============================================================ */

const PALABRAS = [
  { art: 'sol',     es: 'sol',     ca: 'sol',     ls: 'S', lc: 'S' },
  { art: 'luna',    es: 'luna',    ca: 'lluna',   ls: 'L', lc: 'L' },
  { art: 'manzana', es: 'manzana', ca: 'poma',    ls: 'M', lc: 'P' },
  { art: 'pelota',  es: 'pelota',  ca: 'pilota',  ls: 'P', lc: 'P' },
  { art: 'tambor',  es: 'tambor',  ca: 'tambor',  ls: 'T', lc: 'T' },
  { art: 'elefante',es: 'elefante',ca: 'elefant', ls: 'E', lc: 'E' },
  { art: 'oso',     es: 'oso',     ca: 'ós',      ls: 'O', lc: 'O' },
  { art: 'arbol',   es: 'árbol',   ca: 'arbre',   ls: 'A', lc: 'A' },
  { art: 'silla',   es: 'silla',   ca: 'cadira',  ls: 'S', lc: 'C' },
  { art: 'mesa',    es: 'mesa',    ca: 'taula',   ls: 'M', lc: 'T' },
  { art: 'uvas',    es: 'uvas',    ca: 'raïm',    ls: 'U', lc: 'R' },
  { art: 'raton',   es: 'ratón',   ca: 'ratolí',  ls: 'R', lc: 'R' },
  { art: 'casa',    es: 'casa',    ca: 'casa',    ls: 'C', lc: 'C' }
]

/** El abecedario que se usa a los 4-5 años: vocales y consonantes frecuentes. */
const ABECEDARIO = ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'L', 'S', 'T', 'C', 'R']
const COLORES = [P.red, P.blue, P.green, P.purple, P.orange]

export default function PrimeraLetra({ onDone }) {
  const { lang } = useLang()

  const rounds = sample(PALABRAS, 6).map(p => {
    const letra = lang === 'ca' ? p.lc : p.ls
    const otras = sample(ABECEDARIO.filter(l => l !== letra), 2)
    return {
      prompt: {
        es: `${p.es}. ¿Con qué letra empieza?`,
        ca: `${p.ca}. Amb quina lletra comença?`
      },
      hero: { art: p.art },
      options: shuffle([letra, ...otras]).map((l, k) => ({
        key: l, art: `let:${l}`, color: COLORES[k % COLORES.length],
        ok: l === letra
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
