import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* Alfabetización emocional: ponerle nombre a lo que se siente es el primer
   paso para poder regularlo. Se trabajan siete emociones básicas y luego
   situaciones cotidianas asociadas a cada una. */
const EMOS = [
  { art: 'cara_feliz',       es: 'contento',   ca: 'content',   emoji: '😊' },
  { art: 'cara_triste',      es: 'triste',     ca: 'trist',     emoji: '😢' },
  { art: 'cara_enfadada',    es: 'enfadado',   ca: 'enfadat',   emoji: '😠' },
  { art: 'cara_asustada',    es: 'asustado',   ca: 'espantat',  emoji: '😨' },
  { art: 'cara_sorprendida', es: 'sorprendido',ca: 'sorprès',   emoji: '😲' },
  { art: 'cara_tranquila',   es: 'tranquilo',  ca: 'tranquil',  emoji: '😌' },
  { art: 'cara_cansada',     es: 'cansado',    ca: 'cansat',    emoji: '😴' }
]

const SITUACIONES = [
  { es: 'Es tu cumpleaños y vienen tus amigos. ¿Cómo te sientes?', ca: 'És el teu aniversari i vénen els amics. Com et sents?', emo: 'cara_feliz' },
  { es: 'Se te ha roto tu juguete favorito. ¿Cómo te sientes?',    ca: "S'ha trencat la teva joguina preferida. Com et sents?", emo: 'cara_triste' },
  { es: 'Alguien te quita la pelota sin pedirla. ¿Cómo te sientes?',ca: 'Algú et pren la pilota sense demanar-la. Com et sents?', emo: 'cara_enfadada' },
  { es: 'Oyes un trueno muy fuerte por la noche. ¿Cómo te sientes?',ca: 'Sents un tro molt fort a la nit. Com et sents?',        emo: 'cara_asustada' },
  { es: 'Has jugado toda la tarde y ya es de noche. ¿Cómo estás?',  ca: 'Has jugat tota la tarda i ja és de nit. Com estàs?',    emo: 'cara_cansada' },
  { es: 'Abres un regalo que no esperabas. ¿Cómo te sientes?',      ca: 'Obres un regal que no esperaves. Com et sents?',        emo: 'cara_sorprendida' }
]

export default function Emociones({ onDone }) {
  const nombrar = sample(EMOS, 4).map(t => ({
    prompt: { es: `¿Quién está ${t.es}?`, ca: `Qui està ${t.ca}?` },
    options: shuffle([t, ...sample(EMOS.filter(e => e.art !== t.art), 2)]).map(e => ({
      key: e.art, art: e.art, ok: e.art === t.art, label: { es: e.es, ca: e.ca }
    }))
  }))
  const situar = sample(SITUACIONES, 3).map(s => {
    const buena = EMOS.find(e => e.art === s.emo)
    return {
      prompt: { es: s.es, ca: s.ca },
      options: shuffle([buena, ...sample(EMOS.filter(e => e.art !== s.emo), 2)]).map(e => ({
        key: e.art, art: e.art, ok: e.art === s.emo, label: { es: e.es, ca: e.ca }
      }))
    }
  })
  return <ChoiceGame rounds={[...nombrar, ...situar]} onDone={onDone} />
}
