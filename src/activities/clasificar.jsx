import { useState } from 'react'
import DragSort from '../engines/DragSort'
import { shuffle } from '../lib/rnd'

/* ============================================================
   Cada uno a su sitio — clasificar por categorías.
   Dos rondas con categorías distintas: primero animales y
   comida (dos cajas), después mar, granja y cielo (tres).
   Se arrastra con el dedo o con el ratón; si se falla, el
   elemento vuelve a la bandeja y se anima a probar otra vez.
   ============================================================ */

const RONDAS = [
  {
    prompt: { es: 'Lleva cada cosa a su caja: animales o comida', ca: 'Porta cada cosa a la seva caixa: animals o menjar' },
    boxes: [
      { id: 'animales', art: 'gato', label: { es: 'Animales', ca: 'Animals' } },
      { id: 'comida', art: 'manzana', label: { es: 'Comida', ca: 'Menjar' } }
    ],
    items: [
      { id: 'perro', art: 'perro', box: 'animales', label: { es: 'perro', ca: 'gos' } },
      { id: 'rana', art: 'rana', box: 'animales', label: { es: 'rana', ca: 'granota' } },
      { id: 'pajaro', art: 'pajaro', box: 'animales', label: { es: 'pájaro', ca: 'ocell' } },
      { id: 'platano', art: 'platano', box: 'comida', label: { es: 'plátano', ca: 'plàtan' } },
      { id: 'fresa', art: 'fresa', box: 'comida', label: { es: 'fresa', ca: 'maduixa' } },
      { id: 'pan', art: 'pan', box: 'comida', label: { es: 'pan', ca: 'pa' } }
    ]
  },
  {
    prompt: { es: '¿Dónde va cada uno? Al mar, a la granja o al cielo', ca: 'On va cadascú? Al mar, a la granja o al cel' },
    boxes: [
      { id: 'mar', art: 'mar', label: { es: 'Al mar', ca: 'Al mar' } },
      { id: 'granja', art: 'granja', label: { es: 'A la granja', ca: 'A la granja' } },
      { id: 'cielo', art: 'cielo', label: { es: 'Al cielo', ca: 'Al cel' } }
    ],
    items: [
      { id: 'pez', art: 'pez', box: 'mar', label: { es: 'pez', ca: 'peix' } },
      { id: 'barco', art: 'barco', box: 'mar', label: { es: 'barco', ca: 'vaixell' } },
      { id: 'vaca', art: 'vaca', box: 'granja', label: { es: 'vaca', ca: 'vaca' } },
      { id: 'gallina', art: 'gallina', box: 'granja', label: { es: 'gallina', ca: 'gallina' } },
      { id: 'avion', art: 'avion', box: 'cielo', label: { es: 'avión', ca: 'avió' } },
      { id: 'nube', art: 'nube', box: 'cielo', label: { es: 'nube', ca: 'núvol' } }
    ]
  }
]

export default function Clasificar({ onDone }) {
  // Barajamos el orden de los elementos para que no salga siempre igual.
  const [rondas] = useState(() => RONDAS.map(r => ({ ...r, items: shuffle(r.items) })))
  return <DragSort rounds={rondas} onDone={onDone} />
}
