import { useState } from 'react'
import DragSort from '../engines/DragSort'
import { COLORS } from '../art/palette'
import { shuffle } from '../lib/rnd'

/* ============================================================
   Cada color a su caja — clasificar por color, no por lo que es.
   Cuesta más de lo que parece: hay que ignorar que la fresa es
   fruta y el globo un juguete, y fijarse sólo en el color. Es el
   primer ejercicio de cambiar de criterio, base del pensamiento
   flexible.
   ============================================================ */

const col = (id) => COLORS.find(c => c.id === id)

/** Caja de color, con su mancha y su nombre en las dos lenguas. */
const caja = (id) => {
  const c = col(id)
  return { id, swatch: c.hex, label: { es: c.es, ca: c.ca } }
}

const RONDAS = [
  {
    prompt: { es: 'Lleva cada cosa a su color', ca: 'Porta cada cosa al seu color' },
    boxes: [caja('rojo'), caja('amarillo')],
    items: [
      { id: 'fresa',   art: 'fresa',   box: 'rojo',      label: { es: 'fresa', ca: 'maduixa' } },
      { id: 'globo',   art: 'globo',   box: 'rojo',      label: { es: 'globo', ca: 'globus' } },
      { id: 'sol',     art: 'sol',     box: 'amarillo',  label: { es: 'sol', ca: 'sol' } },
      { id: 'platano', art: 'platano', box: 'amarillo',  label: { es: 'plátano', ca: 'plàtan' } }
    ]
  },
  {
    prompt: { es: 'Ahora, azul y naranja', ca: 'Ara, blau i taronja' },
    boxes: [caja('azul'), caja('naranja')],
    items: [
      { id: 'coche',     art: 'coche',     box: 'azul',    label: { es: 'coche', ca: 'cotxe' } },
      { id: 'libro',     art: 'libro',     box: 'azul',    label: { es: 'libro', ca: 'llibre' } },
      { id: 'naranja',   art: 'naranja',   box: 'naranja', label: { es: 'naranja', ca: 'taronja' } },
      { id: 'zanahoria', art: 'zanahoria', box: 'naranja', label: { es: 'zanahoria', ca: 'pastanaga' } }
    ]
  },
  {
    prompt: { es: 'Y ahora tres colores a la vez', ca: 'I ara tres colors alhora' },
    boxes: [caja('rojo'), caja('verde'), caja('morado')],
    items: [
      { id: 'manzana', art: 'manzana', box: 'rojo',   label: { es: 'manzana', ca: 'poma' } },
      { id: 'brocoli', art: 'brocoli', box: 'verde',  label: { es: 'brócoli', ca: 'bròquil' } },
      { id: 'uvas',    art: 'uvas',    box: 'morado', label: { es: 'uvas', ca: 'raïm' } }
    ]
  }
]

export default function ColocaColor({ onDone }) {
  const [rondas] = useState(() => RONDAS.map(r => ({ ...r, items: shuffle(r.items) })))
  return <DragSort rounds={rondas} onDone={onDone} />
}
