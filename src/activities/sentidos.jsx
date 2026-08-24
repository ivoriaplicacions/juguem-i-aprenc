import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Los cinco sentidos — para qué sirve cada parte.
   Partes del cuerpo enseña a nombrarlas; ésta enseña qué hace
   cada una. Saber que se oye con las orejas y se huele con la
   nariz parece obvio de mayor, pero es justo el tipo de cosa
   que un niño de cuatro años está terminando de ordenar.
   ============================================================ */

const PARTES = [
  { art: 'nino_ojos',   es: 'los ojos',   ca: 'els ulls' },
  { art: 'nino_orejas', es: 'las orejas', ca: 'les orelles' },
  { art: 'nino_nariz',  es: 'la nariz',   ca: 'el nas' },
  { art: 'nino_boca',   es: 'la boca',    ca: 'la boca' },
  { art: 'nino_manos',  es: 'las manos',  ca: 'les mans' }
]

const CASOS = [
  { parte: 'nino_ojos',   es: '¿Con qué miras los colores del arcoíris?', ca: 'Amb què mires els colors de l\'arc de Sant Martí?' },
  { parte: 'nino_orejas', es: '¿Con qué escuchas la música y los pájaros?', ca: 'Amb què escoltes la música i els ocells?' },
  { parte: 'nino_nariz',  es: '¿Con qué hueles el pan recién hecho?', ca: 'Amb què olores el pa acabat de fer?' },
  { parte: 'nino_boca',   es: '¿Con qué notas si algo está dulce o salado?', ca: 'Amb què notes si una cosa és dolça o salada?' },
  { parte: 'nino_manos',  es: '¿Con qué notas si algo pincha o es blandito?', ca: 'Amb què notes si una cosa punxa o és toveta?' },
  { parte: 'nino_ojos',   es: '¿Con qué ves si tu amigo se está riendo?', ca: 'Amb què veus si el teu amic està rient?' }
]

export default function Sentidos({ onDone }) {
  const rounds = shuffle(CASOS).map(c => {
    const buena = PARTES.find(p => p.art === c.parte)
    const otras = sample(PARTES.filter(p => p.art !== c.parte), 2)
    return {
      prompt: { es: c.es, ca: c.ca },
      options: shuffle([buena, ...otras]).map(p => ({
        key: p.art, art: p.art, ok: p.art === c.parte, label: { es: p.es, ca: p.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
