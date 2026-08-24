import ChoiceGame from '../engines/ChoiceGame'
import { P } from '../art'
import { shuffle, sample } from '../lib/rnd'

/* Conciencia fonológica: el paso previo imprescindible para leer.
   Cada palabra guarda su sonido inicial en los dos idiomas, porque
   "casa" empieza por /k/ en ambos pero "llave"/"clau" no. */
const PALABRAS = [
  { art: 'sol',      es: 'sol',      ca: 'sol',      is: 's', ic: 's' },
  { art: 'silla',    es: 'silla',    ca: 'cadira',   is: 's', ic: 'c' },
  { art: 'manzana',  es: 'manzana',  ca: 'poma',     is: 'm', ic: 'p' },
  { art: 'mesa',     es: 'mesa',     ca: 'taula',    is: 'm', ic: 't' },
  { art: 'pelota',   es: 'pelota',   ca: 'pilota',   is: 'p', ic: 'p' },
  { art: 'pato',     es: 'pato',     ca: 'ànec',     is: 'p', ic: 'a' },
  { art: 'casa',     es: 'casa',     ca: 'casa',     is: 'c', ic: 'c' },
  { art: 'coche',    es: 'coche',    ca: 'cotxe',    is: 'c', ic: 'c' },
  { art: 'luna',     es: 'luna',     ca: 'lluna',    is: 'l', ic: 'l' },
  { art: 'libro',    es: 'libro',    ca: 'llibre',   is: 'l', ic: 'l' },
  { art: 'tambor',   es: 'tambor',   ca: 'tambor',   is: 't', ic: 't' },
  { art: 'tortuga',  es: 'tortuga',  ca: 'tortuga',  is: 't', ic: 't' },
  { art: 'flor',     es: 'flor',     ca: 'flor',     is: 'f', ic: 'f' },
  { art: 'fresa',    es: 'fresa',    ca: 'maduixa',  is: 'f', ic: 'm' },
  { art: 'gato',     es: 'gato',     ca: 'gat',      is: 'g', ic: 'g' },
  { art: 'gallina',  es: 'gallina',  ca: 'gallina',  is: 'g', ic: 'g' }
]

export default function SonidoInicial({ onDone }) {
  // Se juega en la lengua activa; para que sea justo en ambas, cada ronda
  // toma una palabra "ancla" y busca otra que empiece igual en los DOS idiomas.
  const anclas = shuffle(PALABRAS).filter((p, i, arr) =>
    arr.some(q => q.art !== p.art && q.is === p.is && q.ic === p.ic))
  const rounds = anclas.slice(0, 6).map(a => {
    const pareja = shuffle(PALABRAS).find(q => q.art !== a.art && q.is === a.is && q.ic === a.ic)
    const otros = sample(PALABRAS.filter(q => q.is !== a.is && q.ic !== a.ic && q.art !== a.art), 2)
    return {
      prompt: {
        es: `${a.es.charAt(0).toUpperCase() + a.es.slice(1)}… ¿Qué empieza igual que ${a.es}?`,
        ca: `${a.ca.charAt(0).toUpperCase() + a.ca.slice(1)}… Què comença igual que ${a.ca}?`
      },
      hero: { art: a.art, label: { es: a.es, ca: a.ca } },
      heroSize: 130,
      options: shuffle([pareja, ...otros]).map(o => ({
        key: o.art, art: o.art, ok: o.art === pareja.art,
        color: P.blue, label: { es: o.es, ca: o.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
