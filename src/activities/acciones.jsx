import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Qué está haciendo? — los verbos.
   Vocabulario y ¿Qué es esto? trabajan los nombres; el niño de
   4-5 años suele tener muchos más nombres que verbos, y son los
   verbos los que le permiten construir frases enteras. Aquí se
   oye la acción y se busca a quien la está haciendo.
   ============================================================ */

const ACCIONES = [
  { art: 'saltar',        es: 'saltar',           ca: 'saltar' },
  { art: 'aplaudir',      es: 'aplaudir',         ca: 'aplaudir' },
  { art: 'girar',         es: 'dar vueltas',      ca: 'donar voltes' },
  { art: 'tocar_suelo',   es: 'tocar el suelo',   ca: 'tocar a terra' },
  { art: 'mano_lavar',    es: 'lavarse las manos',ca: 'rentar-se les mans' },
  { art: 'ducha',         es: 'ducharse',         ca: 'dutxar-se' },
  { art: 'cepillo_dientes', es: 'lavarse los dientes', ca: 'rentar-se les dents' },
  { art: 'peine',         es: 'peinarse',         ca: 'pentinar-se' },
  { art: 'cama',          es: 'dormir',           ca: 'dormir' },
  { art: 'libro',         es: 'leer un cuento',   ca: 'llegir un conte' }
]

export default function Acciones({ onDone }) {
  const rounds = sample(ACCIONES, 6).map(bueno => {
    const otras = sample(ACCIONES.filter(a => a.art !== bueno.art), 2)
    return {
      prompt: { es: `¿Quién está haciendo esto: ${bueno.es}?`, ca: `Qui està fent això: ${bueno.ca}?` },
      options: shuffle([bueno, ...otras]).map(a => ({
        key: a.art, art: a.art, ok: a.art === bueno.art,
        label: { es: a.es, ca: a.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
