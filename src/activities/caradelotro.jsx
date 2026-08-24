import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Cómo se siente el otro? — ponerse en su lugar.
   ¿Cómo se siente? pregunta por uno mismo; ésta pregunta por el
   de enfrente, y a veces por lo que ha sentido alguien por culpa
   de lo que YO he hecho. Ese giro es el nacimiento de la empatía
   y no llega solo: hay que practicarlo.
   ============================================================ */

const CARAS = [
  { art: 'cara_feliz',       es: 'contento',    ca: 'content' },
  { art: 'cara_triste',      es: 'triste',      ca: 'trist' },
  { art: 'cara_enfadada',    es: 'enfadado',    ca: 'enfadat' },
  { art: 'cara_asustada',    es: 'asustado',    ca: 'espantat' },
  { art: 'cara_sorprendida', es: 'sorprendido', ca: 'sorprès' },
  { art: 'cara_tranquila',   es: 'tranquilo',   ca: 'tranquil' }
]

const CASOS = [
  { emo: 'cara_triste',
    es: 'Le has quitado el juguete a tu amigo. ¿Cómo se siente él?',
    ca: 'Has pres la joguina al teu amic. Com se sent ell?' },
  { emo: 'cara_feliz',
    es: 'Has invitado a jugar al niño que estaba solo. ¿Cómo se siente?',
    ca: 'Has convidat a jugar el nen que estava sol. Com se sent?' },
  { emo: 'cara_enfadada',
    es: 'Te has colado delante de una niña que esperaba su turno. ¿Cómo se siente ella?',
    ca: "T'has colat davant d'una nena que esperava el seu torn. Com se sent ella?" },
  { emo: 'cara_asustada',
    es: 'Le has dado un susto a tu hermano por detrás. ¿Cómo se siente?',
    ca: 'Has espantat el teu germà per darrere. Com se sent?' },
  { emo: 'cara_sorprendida',
    es: 'Le has preparado un dibujo sin que lo supiera. ¿Cómo se siente?',
    ca: 'Li has preparat un dibuix sense que ho sabés. Com se sent?' },
  { emo: 'cara_feliz',
    es: 'Has compartido tu merienda con quien no tenía. ¿Cómo se siente?',
    ca: 'Has compartit el teu berenar amb qui no en tenia. Com se sent?' }
]

export default function CaraDelOtro({ onDone }) {
  const rounds = shuffle(CASOS).map(c => {
    const buena = CARAS.find(x => x.art === c.emo)
    const otras = sample(CARAS.filter(x => x.art !== c.emo), 2)
    return {
      prompt: { es: c.es, ca: c.ca },
      options: shuffle([buena, ...otras]).map(x => ({
        key: x.art, art: x.art, ok: x.art === c.emo, label: { es: x.es, ca: x.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
