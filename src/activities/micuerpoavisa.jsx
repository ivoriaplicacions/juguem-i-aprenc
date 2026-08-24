import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Mi cuerpo me avisa — dónde se nota cada cosa.
   Antes de saber decir "estoy nervioso", el niño nota el corazón
   rápido. Aprender a leer esas señales del cuerpo es lo que le
   permitirá parar a tiempo, y es el paso previo a cualquier
   estrategia de calma.
   ============================================================ */

const PARTES = [
  { art: 'nino_barriga', es: 'la barriga', ca: 'la panxa' },
  { art: 'nino_ojos',    es: 'los ojos',   ca: 'els ulls' },
  { art: 'nino_manos',   es: 'las manos',  ca: 'les mans' },
  { art: 'nino_boca',    es: 'la boca',    ca: 'la boca' },
  { art: 'nino_piernas', es: 'las piernas',ca: 'les cames' },
  { art: 'nino_cabeza',  es: 'la cabeza',  ca: 'el cap' }
]

const SENALES = [
  { parte: 'nino_barriga', es: 'Hace rato que no comes y te suena por dentro. ¿Qué parte te avisa?',
    ca: 'Fa estona que no menges i et sona per dins. Quina part t\'avisa?' },
  { parte: 'nino_ojos',    es: 'Es muy tarde y se te cierran solos. ¿Qué parte te avisa?',
    ca: 'És molt tard i se\'t tanquen sols. Quina part t\'avisa?' },
  { parte: 'nino_manos',   es: 'Estás nervioso y no paras de moverlas. ¿Qué parte te avisa?',
    ca: 'Estàs nerviós i no pares de moure-les. Quina part t\'avisa?' },
  { parte: 'nino_boca',    es: 'Has corrido mucho y la notas muy seca. ¿Qué parte te avisa?',
    ca: 'Has corregut molt i la notes molt seca. Quina part t\'avisa?' },
  { parte: 'nino_piernas', es: 'Has andado toda la tarde y te pesan. ¿Qué parte te avisa?',
    ca: 'Has caminat tota la tarda i et pesen. Quina part t\'avisa?' },
  { parte: 'nino_cabeza',  es: 'Hay mucho ruido y te empieza a doler. ¿Qué parte te avisa?',
    ca: 'Hi ha molt soroll i et comença a fer mal. Quina part t\'avisa?' }
]

export default function MiCuerpoAvisa({ onDone }) {
  const rounds = shuffle(SENALES).map(s => {
    const buena = PARTES.find(p => p.art === s.parte)
    const otras = sample(PARTES.filter(p => p.art !== s.parte), 2)
    return {
      prompt: { es: s.es, ca: s.ca },
      options: shuffle([buena, ...otras]).map(p => ({
        key: p.art, art: p.art, ok: p.art === s.parte, label: { es: p.es, ca: p.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
