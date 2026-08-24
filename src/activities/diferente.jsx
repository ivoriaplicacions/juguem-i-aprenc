import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample, pick } from '../lib/rnd'

/* ============================================================
   Busca el diferente — tres cosas iguales y una que no encaja.
   Obliga a comparar todas antes de decidir, que es justo lo que
   cuesta a esta edad: mirar el conjunto en vez de la primera
   que llama la atención.
   ============================================================ */

/* Familias en las que el intruso se nota, pero hay que mirar. */
const FAMILIAS = [
  { iguales: ['gato', 'perro', 'raton', 'oso'],        intrusos: ['manzana', 'coche', 'flor'] },
  { iguales: ['manzana', 'platano', 'fresa', 'uvas'],  intrusos: ['gato', 'pelota', 'casa'] },
  { iguales: ['sol', 'luna', 'nube', 'estrella_cielo'],intrusos: ['pez', 'silla', 'tambor'] },
  { iguales: ['coche', 'avion', 'barco'],              intrusos: ['oveja', 'pastel', 'flor'] },
  { iguales: ['tambor', 'guitarra', 'trompeta', 'piano'], intrusos: ['rana', 'pan', 'cama'] },
  { iguales: ['pato', 'gallina', 'pajaro'],            intrusos: ['libro', 'naranja', 'mesa'] }
]

export default function Diferente({ onDone }) {
  const rounds = shuffle(FAMILIAS).map(f => {
    const iguales = sample(f.iguales, 3)
    const intruso = pick(f.intrusos)
    return {
      prompt: { es: 'Toca el que es diferente', ca: 'Toca el que és diferent' },
      options: shuffle([
        ...iguales.map(a => ({ key: a, art: a, ok: false })),
        { key: intruso, art: intruso, ok: true }
      ])
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
