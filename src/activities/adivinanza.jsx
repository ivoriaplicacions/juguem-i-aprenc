import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Adivina qué es — escuchar una pista entera y deducir.
   Aquí no hay nada que mirar hasta el final: el niño tiene que
   sostener la frase en la cabeza, entenderla y sólo entonces
   buscar. Es comprensión oral de verdad, no reconocimiento, y
   es lo que más se parece a escuchar un cuento.
   ============================================================ */

const ADIVINANZAS = [
  { art: 'vaca',     es: 'Tiene cuatro patas, da leche y hace muuu',        ca: 'Té quatre potes, fa llet i fa muuu' },
  { art: 'sol',      es: 'Sale de día, calienta y es amarillo',             ca: 'Surt de dia, escalfa i és groc' },
  { art: 'pez',      es: 'Vive en el agua y nada todo el día',              ca: "Viu a l'aigua i neda tot el dia" },
  { art: 'arbol',    es: 'Es muy alto, tiene hojas y vive en el bosque',    ca: 'És molt alt, té fulles i viu al bosc' },
  { art: 'avion',    es: 'Vuela muy alto y lleva a la gente de viaje',      ca: 'Vola molt amunt i porta la gent de viatge' },
  { art: 'cama',     es: 'Es blandita y duermes en ella cada noche',        ca: 'És toveta i hi dorms cada nit' },
  { art: 'abeja',    es: 'Es pequeña, vuela entre flores y hace zzzz',      ca: 'És petita, vola entre flors i fa zzzz' },
  { art: 'zanahoria',es: 'Es naranja, crece bajo tierra y le gusta al conejo', ca: 'És taronja, creix sota terra i agrada al conill' },
  { art: 'luna',     es: 'Sale de noche y brilla en el cielo oscuro',       ca: 'Surt de nit i brilla al cel fosc' },
  { art: 'tortuga',  es: 'Lleva su casa encima y camina muy despacio',      ca: 'Porta la casa a sobre i camina molt a poc a poc' }
]

export default function Adivinanza({ onDone }) {
  const rounds = sample(ADIVINANZAS, 6).map(bueno => {
    const otras = sample(ADIVINANZAS.filter(a => a.art !== bueno.art), 2)
    return {
      prompt: { es: `${bueno.es}. ¿Qué es?`, ca: `${bueno.ca}. Què és?` },
      options: shuffle([bueno, ...otras]).map(a => ({
        key: a.art, art: a.art, ok: a.art === bueno.art
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
