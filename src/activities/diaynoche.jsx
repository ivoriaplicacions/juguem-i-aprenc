import { useState } from 'react'
import DragSort from '../engines/DragSort'
import { shuffle } from '../lib/rnd'

/* ============================================================
   De día o de noche — ordenar el mundo en dos mitades.
   El día y la noche son el primer reloj que entiende un niño:
   antes que las horas, aprende que hay cosas de sol y cosas de
   luna. Sirve de percha para todo lo demás que venga después.
   ============================================================ */

const DIA   = { id: 'dia',   art: 'sol',  label: { es: 'De día', ca: 'De dia' } }
const NOCHE = { id: 'noche', art: 'luna', label: { es: 'De noche', ca: 'De nit' } }

const RONDAS = [
  {
    prompt: { es: '¿Qué pasa de día y qué pasa de noche?', ca: 'Què passa de dia i què passa de nit?' },
    boxes: [DIA, NOCHE],
    items: [
      { id: 'mochila', art: 'mochila', box: 'dia',   label: { es: 'ir a la escuela', ca: "anar a l'escola" } },
      { id: 'pelota',  art: 'pelota',  box: 'dia',   label: { es: 'jugar en el parque', ca: 'jugar al parc' } },
      { id: 'cama',    art: 'cama',    box: 'noche', label: { es: 'dormir', ca: 'dormir' } },
      { id: 'estrella_cielo', art: 'estrella_cielo', box: 'noche', label: { es: 'ver las estrellas', ca: 'veure les estrelles' } }
    ]
  },
  {
    prompt: { es: 'Sigue: ¿sol o luna?', ca: 'Continua: sol o lluna?' },
    boxes: [DIA, NOCHE],
    items: [
      { id: 'mariposa', art: 'mariposa', box: 'dia',   label: { es: 'las mariposas vuelan', ca: 'les papallones volen' } },
      { id: 'flor',     art: 'flor',     box: 'dia',   label: { es: 'las flores se abren', ca: 'les flors s\'obren' } },
      { id: 'cara_cansada', art: 'cara_cansada', box: 'noche', label: { es: 'entra el sueño', ca: 'entra la son' } },
      { id: 'nube',     art: 'nube',     box: 'dia',   label: { es: 'se ven las nubes', ca: 'es veuen els núvols' } }
    ]
  }
]

export default function DiaYNoche({ onDone }) {
  const [rondas] = useState(() => RONDAS.map(r => ({ ...r, items: shuffle(r.items) })))
  return <DragSort rounds={rondas} onDone={onDone} />
}
