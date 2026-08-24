import { useState } from 'react'
import DragSort from '../engines/DragSort'
import { shuffle } from '../lib/rnd'

/* ============================================================
   ¿Cómo se toca? — las familias de instrumentos.
   Repite el ritmo trabaja el oído; ésta trabaja el gesto: unos
   se soplan, otros se golpean y otros se tocan con los dedos.
   Es una clasificación que el niño puede comprobar imitando el
   movimiento con las manos, y ésa es la mejor manera de que se
   le quede: haciéndola con el cuerpo.
   ============================================================ */

const SOPLAR  = { id: 'soplar',  art: 'trompeta', label: { es: 'Se sopla', ca: 'Es bufa' } }
const GOLPEAR = { id: 'golpear', art: 'tambor',   label: { es: 'Se golpea', ca: 'Es colpeja' } }
const DEDOS   = { id: 'dedos',   art: 'piano',    label: { es: 'Con los dedos', ca: 'Amb els dits' } }

const RONDAS = [
  {
    prompt: { es: '¿Se sopla o se golpea?', ca: 'Es bufa o es colpeja?' },
    boxes: [SOPLAR, GOLPEAR],
    items: [
      { id: 'trompeta', art: 'trompeta', box: 'soplar',  label: { es: 'trompeta', ca: 'trompeta' } },
      { id: 'tambor',   art: 'tambor',   box: 'golpear', label: { es: 'tambor', ca: 'tambor' } },
      { id: 'maracas',  art: 'maracas',  box: 'golpear', label: { es: 'maracas', ca: 'maraques' } },
      { id: 'campana',  art: 'campana',  box: 'golpear', label: { es: 'campana', ca: 'campana' } }
    ]
  },
  {
    prompt: { es: 'Ahora con los dedos', ca: 'Ara amb els dits' },
    boxes: [DEDOS, GOLPEAR],
    items: [
      { id: 'piano',    art: 'piano',    box: 'dedos',   label: { es: 'piano', ca: 'piano' } },
      { id: 'guitarra', art: 'guitarra', box: 'dedos',   label: { es: 'guitarra', ca: 'guitarra' } },
      { id: 'tambor2',  art: 'tambor',   box: 'golpear', label: { es: 'tambor', ca: 'tambor' } },
      { id: 'maracas2', art: 'maracas',  box: 'golpear', label: { es: 'maracas', ca: 'maraques' } }
    ]
  },
  {
    prompt: { es: 'Y ahora las tres familias juntas', ca: 'I ara les tres famílies juntes' },
    boxes: [SOPLAR, GOLPEAR, DEDOS],
    items: [
      { id: 'trompeta3', art: 'trompeta', box: 'soplar',  label: { es: 'trompeta', ca: 'trompeta' } },
      { id: 'campana3',  art: 'campana',  box: 'golpear', label: { es: 'campana', ca: 'campana' } },
      { id: 'guitarra3', art: 'guitarra', box: 'dedos',   label: { es: 'guitarra', ca: 'guitarra' } }
    ]
  }
]

export default function Instrumentos({ onDone }) {
  const [rondas] = useState(() => RONDAS.map(r => ({ ...r, items: shuffle(r.items) })))
  return <DragSort rounds={rondas} onDone={onDone} />
}
