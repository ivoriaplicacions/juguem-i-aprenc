import { useState } from 'react'
import DragSort from '../engines/DragSort'
import { shuffle } from '../lib/rnd'

/* ============================================================
   Cada día o de vez en cuando — comer de todo, con medida.
   No hay comida "mala" ni comida prohibida: el pastel del
   cumpleaños también es fiesta. Lo que se aprende aquí es la
   frecuencia, que es la idea honesta y la que de verdad sirve:
   hay cosas de cada día y cosas de algún día.
   ============================================================ */

const CADA_DIA = { id: 'diario', art: 'manzana', label: { es: 'Cada día', ca: 'Cada dia' } }
const A_VECES  = { id: 'aveces', art: 'pastel',  label: { es: 'De vez en cuando', ca: 'De tant en tant' } }

const RONDAS = [
  {
    prompt: { es: '¿Qué comemos cada día y qué sólo de vez en cuando?', ca: 'Què mengem cada dia i què només de tant en tant?' },
    boxes: [CADA_DIA, A_VECES],
    items: [
      { id: 'platano',  art: 'platano',  box: 'diario', label: { es: 'plátano', ca: 'plàtan' } },
      { id: 'pan',      art: 'pan',      box: 'diario', label: { es: 'pan', ca: 'pa' } },
      { id: 'caramelo', art: 'caramelo', box: 'aveces', label: { es: 'caramelo', ca: 'caramel' } },
      { id: 'pastel',   art: 'pastel',   box: 'aveces', label: { es: 'pastel', ca: 'pastís' } }
    ]
  },
  {
    prompt: { es: 'Seguimos llenando la despensa', ca: 'Continuem omplint el rebost' },
    boxes: [CADA_DIA, A_VECES],
    items: [
      { id: 'zanahoria', art: 'zanahoria', box: 'diario', label: { es: 'zanahoria', ca: 'pastanaga' } },
      { id: 'brocoli',   art: 'brocoli',   box: 'diario', label: { es: 'brócoli', ca: 'bròquil' } },
      { id: 'leche',     art: 'leche',     box: 'diario', label: { es: 'leche', ca: 'llet' } },
      { id: 'uvas',      art: 'uvas',      box: 'diario', label: { es: 'uvas', ca: 'raïm' } },
      { id: 'pastelito', art: 'pastel',    box: 'aveces', label: { es: 'pastel', ca: 'pastís' } }
    ]
  },
  {
    prompt: { es: '¿Y qué es lo que no puede faltar nunca?', ca: 'I què és el que no pot faltar mai?' },
    boxes: [CADA_DIA, A_VECES],
    items: [
      { id: 'agua',     art: 'agua',     box: 'diario', label: { es: 'agua', ca: 'aigua' } },
      { id: 'naranja',  art: 'naranja',  box: 'diario', label: { es: 'naranja', ca: 'taronja' } },
      { id: 'fresa',    art: 'fresa',    box: 'diario', label: { es: 'fresa', ca: 'maduixa' } },
      { id: 'caramelo2',art: 'caramelo', box: 'aveces', label: { es: 'caramelo', ca: 'caramel' } }
    ]
  }
]

export default function Energia({ onDone }) {
  const [rondas] = useState(() => RONDAS.map(r => ({ ...r, items: shuffle(r.items) })))
  return <DragSort rounds={rondas} onDone={onDone} />
}
