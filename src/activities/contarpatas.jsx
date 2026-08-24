import { useState } from 'react'
import DragSort from '../engines/DragSort'
import { shuffle } from '../lib/rnd'

/* ============================================================
   ¿Cuántas patas tiene? — clasificar animales contándolas.
   Junta las dos cosas que este mundo y el de números trabajan
   por separado: hay que contar de verdad para poder clasificar.
   Y de paso aparece una idea bonita: los animales se parecen
   entre ellos por cosas que se pueden contar.
   ============================================================ */

const CAJAS = {
  dos:    { id: 'dos',    art: 'pajaro', label: { es: 'Dos patas', ca: 'Dues potes' } },
  cuatro: { id: 'cuatro', art: 'perro',  label: { es: 'Cuatro patas', ca: 'Quatre potes' } },
  ninguna:{ id: 'ninguna',art: 'pez',    label: { es: 'Sin patas', ca: 'Sense potes' } }
}

const RONDAS = [
  {
    prompt: { es: '¿Dos patas o cuatro? Cuenta bien', ca: 'Dues potes o quatre? Compta bé' },
    boxes: [CAJAS.dos, CAJAS.cuatro],
    items: [
      { id: 'pato',    art: 'pato',    box: 'dos',    label: { es: 'pato', ca: 'ànec' } },
      { id: 'gallina', art: 'gallina', box: 'dos',    label: { es: 'gallina', ca: 'gallina' } },
      { id: 'gato',    art: 'gato',    box: 'cuatro', label: { es: 'gato', ca: 'gat' } },
      { id: 'vaca',    art: 'vaca',    box: 'cuatro', label: { es: 'vaca', ca: 'vaca' } }
    ]
  },
  {
    prompt: { es: 'Ahora hay algunos que no tienen ninguna', ca: 'Ara n\'hi ha alguns que no en tenen cap' },
    boxes: [CAJAS.cuatro, CAJAS.ninguna],
    items: [
      { id: 'caballo', art: 'caballo', box: 'cuatro',  label: { es: 'caballo', ca: 'cavall' } },
      { id: 'oso',     art: 'oso',     box: 'cuatro',  label: { es: 'oso', ca: 'ós' } },
      { id: 'tortuga', art: 'tortuga', box: 'cuatro',  label: { es: 'tortuga', ca: 'tortuga' } },
      { id: 'pez',     art: 'pez',     box: 'ninguna', label: { es: 'pez', ca: 'peix' } }
    ]
  },
  {
    prompt: { es: 'Y ahora las tres cajas a la vez', ca: 'I ara les tres caixes alhora' },
    boxes: [CAJAS.dos, CAJAS.cuatro, CAJAS.ninguna],
    items: [
      { id: 'pajaro',   art: 'pajaro',   box: 'dos',     label: { es: 'pájaro', ca: 'ocell' } },
      { id: 'pato',     art: 'pato',     box: 'dos',     label: { es: 'pato', ca: 'ànec' } },
      { id: 'elefante', art: 'elefante', box: 'cuatro',  label: { es: 'elefante', ca: 'elefant' } },
      { id: 'pez',      art: 'pez',      box: 'ninguna', label: { es: 'pez', ca: 'peix' } }
    ]
  }
]

export default function ContarPatas({ onDone }) {
  const [rondas] = useState(() => RONDAS.map(r => ({ ...r, items: shuffle(r.items) })))
  return <DragSort rounds={rondas} onDone={onDone} />
}
