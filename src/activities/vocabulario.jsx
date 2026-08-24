import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* Vocabulario por campos semánticos: el adulto oye la palabra, el niño la
   asocia al dibujo. Se mezclan familias para que no valga adivinar. */
const BANCO = [
  { art: 'gato',     es: 'el gato',      ca: 'el gat' },
  { art: 'perro',    es: 'el perro',     ca: 'el gos' },
  { art: 'casa',     es: 'la casa',      ca: 'la casa' },
  { art: 'coche',    es: 'el coche',     ca: 'el cotxe' },
  { art: 'arbol',    es: 'el árbol',     ca: "l'arbre" },
  { art: 'flor',     es: 'la flor',      ca: 'la flor' },
  { art: 'sol',      es: 'el sol',       ca: 'el sol' },
  { art: 'luna',     es: 'la luna',      ca: 'la lluna' },
  { art: 'libro',    es: 'el libro',     ca: 'el llibre' },
  { art: 'pelota',   es: 'la pelota',    ca: 'la pilota' },
  { art: 'silla',    es: 'la silla',     ca: 'la cadira' },
  { art: 'mesa',     es: 'la mesa',      ca: 'la taula' },
  { art: 'cama',     es: 'la cama',      ca: 'el llit' },
  { art: 'manzana',  es: 'la manzana',   ca: 'la poma' },
  { art: 'platano',  es: 'el plátano',   ca: 'el plàtan' },
  { art: 'pan',      es: 'el pan',       ca: 'el pa' },
  { art: 'leche',    es: 'la leche',     ca: 'la llet' },
  { art: 'mochila',  es: 'la mochila',   ca: 'la motxilla' },
  { art: 'avion',    es: 'el avión',     ca: "l'avió" },
  { art: 'barco',    es: 'el barco',     ca: 'el vaixell' },
  { art: 'mariposa', es: 'la mariposa',  ca: 'la papallona' },
  { art: 'pez',      es: 'el pez',       ca: 'el peix' }
]

export default function Vocabulario({ onDone }) {
  const rounds = sample(BANCO, 7).map(target => {
    const otros = sample(BANCO.filter(x => x.art !== target.art), 3)
    return {
      prompt: { es: `Toca ${target.es}`, ca: `Toca ${target.ca}` },
      options: shuffle([target, ...otros]).map(o => ({
        key: o.art, art: o.art, ok: o.art === target.art,
        label: { es: o.es, ca: o.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
