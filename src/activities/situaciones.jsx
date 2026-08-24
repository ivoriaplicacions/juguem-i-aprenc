import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* Convivencia y empatía: qué hacemos cuando pasa algo con otros.
   No hay respuestas "malas" ridiculizadas: la opción correcta se refuerza
   y las otras simplemente no encajan. */
const CASOS = [
  {
    es: 'Un amigo se ha caído en el patio. ¿Qué haces?',
    ca: 'Un amic ha caigut al pati. Què fas?',
    ok: { emoji: '🤗', es: 'Le ayudo a levantarse', ca: "L'ajudo a aixecar-se" },
    no: [{ emoji: '🏃', es: 'Me voy corriendo', ca: "Me'n vaig corrents" },
         { emoji: '😆', es: 'Me río de él', ca: "Me'n ric" }]
  },
  {
    es: 'Quieres el juguete que tiene otro niño. ¿Qué haces?',
    ca: 'Vols la joguina que té un altre nen. Què fas?',
    ok: { emoji: '🙋', es: 'Se lo pido por favor', ca: 'L\'hi demano si us plau' },
    no: [{ emoji: '✊', es: 'Se lo quito', ca: 'L\'hi prenc' },
         { emoji: '😭', es: 'Lloro y grito', ca: 'Ploro i crido' }]
  },
  {
    es: 'Has terminado de jugar con los bloques. ¿Qué haces?',
    ca: 'Has acabat de jugar amb els blocs. Què fas?',
    ok: { emoji: '🧺', es: 'Los recojo', ca: 'Els recullo' },
    no: [{ emoji: '🌪️', es: 'Los dejo por el suelo', ca: 'Els deixo per terra' },
         { emoji: '🦶', es: 'Les doy una patada', ca: 'Els dono una puntada' }]
  },
  {
    es: 'Alguien te da un regalo. ¿Qué dices?',
    ca: 'Algú et fa un regal. Què dius?',
    ok: { emoji: '💝', es: '¡Gracias!', ca: 'Gràcies!' },
    no: [{ emoji: '🤐', es: 'No digo nada', ca: 'No dic res' },
         { emoji: '😕', es: 'No me gusta', ca: 'No m\'agrada' }]
  },
  {
    es: 'Un niño nuevo está solo y no juega con nadie. ¿Qué haces?',
    ca: 'Un nen nou està sol i no juga amb ningú. Què fas?',
    ok: { emoji: '👋', es: 'Le invito a jugar', ca: "El convido a jugar" },
    no: [{ emoji: '🙈', es: 'Hago como que no le veo', ca: 'Faig veure que no el veig' },
         { emoji: '🤫', es: 'Hablo de él en secreto', ca: 'Parlo d\'ell en secret' }]
  },
  {
    es: 'Estás en la mesa y quieres el agua que está lejos. ¿Qué haces?',
    ca: 'Ets a taula i vols l\'aigua que és lluny. Què fas?',
    ok: { emoji: '🙏', es: 'Pido que me la pasen', ca: 'Demano que me la passin' },
    no: [{ emoji: '🤸', es: 'Me subo a la mesa', ca: 'Em pujo a la taula' },
         { emoji: '📢', es: 'Grito muy fuerte', ca: 'Crido molt fort' }]
  }
]

export default function Situaciones({ onDone }) {
  const rounds = sample(CASOS, 6).map(c => ({
    prompt: { es: c.es, ca: c.ca },
    size: 76,
    options: shuffle([{ ...c.ok, ok: true }, ...c.no]).map((o, k) => ({
      key: (o.es || '') + k, emoji: o.emoji, ok: !!o.ok, label: { es: o.es, ca: o.ca }
    }))
  }))
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
