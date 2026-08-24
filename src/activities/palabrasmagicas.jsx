import ChoiceGame from '../engines/ChoiceGame'
import { shuffle } from '../lib/rnd'

/* ============================================================
   Las palabras mágicas — hola, gracias, por favor, perdón, adiós.
   ¿Qué hacemos? trabaja qué hacer; ésta trabaja qué decir. Son
   cinco fórmulas cortas que abren casi todas las puertas de la
   convivencia, y a esta edad se aprenden por uso, repitiéndolas
   en la situación que toca.
   ============================================================ */

const CASOS = [
  {
    es: 'Llegas a casa de tu abuelo. ¿Qué dices?',
    ca: 'Arribes a casa del teu avi. Què dius?',
    ok: { emoji: '👋', es: '¡Hola!', ca: 'Hola!' },
    no: [{ emoji: '🤐', es: 'No digo nada', ca: 'No dic res' },
         { emoji: '😴', es: 'Tengo sueño', ca: 'Tinc son' }]
  },
  {
    es: 'Te dan la merienda que más te gusta. ¿Qué dices?',
    ca: 'Et donen el berenar que més t\'agrada. Què dius?',
    ok: { emoji: '💝', es: '¡Gracias!', ca: 'Gràcies!' },
    no: [{ emoji: '🙌', es: '¡Quiero más!', ca: 'En vull més!' },
         { emoji: '😐', es: 'Ya era hora', ca: 'Ja era hora' }]
  },
  {
    es: 'Necesitas que te alcancen el agua. ¿Qué dices?',
    ca: 'Necessites que t\'acostin l\'aigua. Què dius?',
    ok: { emoji: '🙏', es: '¿Me la pasas, por favor?', ca: 'Me la passes, si us plau?' },
    no: [{ emoji: '📢', es: '¡Dámela ya!', ca: 'Dóna-me-la ara!' },
         { emoji: '🤸', es: 'Me estiro y la cojo', ca: 'M\'estiro i l\'agafo' }]
  },
  {
    es: 'Sin querer le has pisado el pie a alguien. ¿Qué dices?',
    ca: 'Sense voler has trepitjat el peu a algú. Què dius?',
    ok: { emoji: '🙇', es: '¡Perdón!', ca: 'Perdó!' },
    no: [{ emoji: '😆', es: 'Me río', ca: 'Me\'n ric' },
         { emoji: '👉', es: 'Ha sido él', ca: 'Ha estat ell' }]
  },
  {
    es: 'Se acaba la tarde y te vas del parque. ¿Qué dices?',
    ca: 'S\'acaba la tarda i marxes del parc. Què dius?',
    ok: { emoji: '🖐️', es: '¡Adiós, hasta mañana!', ca: 'Adéu, fins demà!' },
    no: [{ emoji: '🏃', es: 'Me voy sin decir nada', ca: 'Me\'n vaig sense dir res' },
         { emoji: '😭', es: 'Lloro para quedarme', ca: 'Ploro per quedar-m\'hi' }]
  },
  {
    es: 'Un amigo te presta su juguete preferido. ¿Qué dices?',
    ca: 'Un amic et deixa la seva joguina preferida. Què dius?',
    ok: { emoji: '😊', es: '¡Gracias, lo cuidaré!', ca: 'Gràcies, en tindré cura!' },
    no: [{ emoji: '🏃', es: 'Salgo corriendo con él', ca: 'Surto corrents amb ella' },
         { emoji: '🤷', es: 'No me gusta mucho', ca: 'No m\'agrada gaire' }]
  }
]

export default function PalabrasMagicas({ onDone }) {
  const rounds = shuffle(CASOS).map(c => ({
    prompt: { es: c.es, ca: c.ca },
    options: shuffle([{ ...c.ok, ok: true }, ...c.no.map(n => ({ ...n, ok: false }))])
      .map((o, k) => ({ key: `o${k}${o.emoji}`, emoji: o.emoji, ok: !!o.ok, label: { es: o.es, ca: o.ca } }))
  }))
  return <ChoiceGame rounds={rounds} onDone={onDone} optionSize={84} />
}
