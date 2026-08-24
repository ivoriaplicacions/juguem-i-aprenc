import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ¿Dónde vive? Clasificar seres vivos por su medio: primera idea de
   ecosistema y de que cada animal necesita un sitio distinto. */
const LUGARES = {
  mar:    { art: 'mar',    es: 'en el mar',      ca: 'al mar' },
  granja: { art: 'granja', es: 'en la granja',   ca: 'a la granja' },
  bosque: { art: 'bosque', es: 'en el bosque',   ca: 'al bosc' },
  cielo:  { art: 'cielo',  es: 'por el cielo',   ca: 'pel cel' },
  casa:   { art: 'casa',   es: 'en casa',        ca: 'a casa' }
}
const ANIMALES = [
  { art: 'pez',      es: 'el pez',      ca: 'el peix',      donde: 'mar' },
  { art: 'tortuga',  es: 'la tortuga',  ca: 'la tortuga',   donde: 'mar' },
  { art: 'vaca',     es: 'la vaca',     ca: 'la vaca',      donde: 'granja' },
  { art: 'oveja',    es: 'la oveja',    ca: "l'ovella",     donde: 'granja' },
  { art: 'gallina',  es: 'la gallina',  ca: 'la gallina',   donde: 'granja' },
  { art: 'cerdo',    es: 'el cerdo',    ca: 'el porc',      donde: 'granja' },
  { art: 'caballo',  es: 'el caballo',  ca: 'el cavall',    donde: 'granja' },
  { art: 'oso',      es: 'el oso',      ca: "l'ós",         donde: 'bosque' },
  { art: 'rana',     es: 'la rana',     ca: 'la granota',   donde: 'bosque' },
  { art: 'raton',    es: 'el ratón',    ca: 'el ratolí',    donde: 'bosque' },
  { art: 'pajaro',   es: 'el pájaro',   ca: "l'ocell",      donde: 'cielo' },
  { art: 'mariposa', es: 'la mariposa', ca: 'la papallona', donde: 'cielo' },
  { art: 'abeja',    es: 'la abeja',    ca: "l'abella",     donde: 'cielo' },
  { art: 'gato',     es: 'el gato',     ca: 'el gat',       donde: 'casa' },
  { art: 'perro',    es: 'el perro',    ca: 'el gos',       donde: 'casa' }
]

export default function Habitats({ onDone }) {
  const rounds = sample(ANIMALES, 7).map(a => {
    const otros = sample(Object.keys(LUGARES).filter(l => l !== a.donde), 2)
    return {
      prompt: { es: `¿Dónde vive ${a.es}?`, ca: `On viu ${a.ca}?` },
      hero: { art: a.art, label: { es: a.es, ca: a.ca } },
      heroSize: 130,
      options: shuffle([a.donde, ...otros]).map(id => ({
        key: id, art: LUGARES[id].art, ok: id === a.donde,
        label: { es: LUGARES[id].es, ca: LUGARES[id].ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
