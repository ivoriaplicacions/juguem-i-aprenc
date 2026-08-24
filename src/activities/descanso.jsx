import ChoiceGame from '../engines/ChoiceGame'
import { shuffle } from '../lib/rnd'

/* ============================================================
   Dormir bien — la rutina de irse a la cama.
   A los 4-5 años dormir poco se nota al día siguiente en todo:
   en el humor, en la atención y en las ganas de jugar. Aquí se
   repasa qué ayuda a coger el sueño y qué lo espanta, para que
   la hora de acostarse deje de ser una pelea.
   ============================================================ */

const CASOS = [
  {
    es: 'Falta poco para irte a dormir. ¿Qué ayuda a coger el sueño?',
    ca: 'Falta poc per anar a dormir. Què ajuda a agafar el son?',
    ok: { emoji: '📖', es: 'Un cuento tranquilo', ca: 'Un conte tranquil' },
    no: [{ emoji: '🤸', es: 'Saltar en la cama', ca: 'Saltar al llit' },
         { emoji: '📺', es: 'Una pantalla con luces', ca: 'Una pantalla amb llums' }]
  },
  {
    es: '¿Cómo se está mejor para dormir?',
    ca: 'Com s\'està millor per dormir?',
    ok: { emoji: '🌙', es: 'A oscuras y en silencio', ca: 'A les fosques i en silenci' },
    no: [{ emoji: '💡', es: 'Con toda la luz encendida', ca: 'Amb tot el llum encès' },
         { emoji: '🔊', es: 'Con música muy fuerte', ca: 'Amb música molt forta' }]
  },
  {
    es: '¿Qué tomas antes de acostarte?',
    ca: 'Què prens abans d\'anar al llit?',
    ok: { emoji: '🥛', es: 'Un vaso de leche', ca: 'Un got de llet' },
    no: [{ emoji: '🍫', es: 'Un montón de chocolate', ca: 'Un munt de xocolata' },
         { emoji: '🥤', es: 'Un refresco con burbujas', ca: 'Un refresc amb bombolles' }]
  },
  {
    es: 'Te has despertado de noche y no puedes dormir. ¿Qué haces?',
    ca: 'T\'has despertat de nit i no pots dormir. Què fas?',
    ok: { emoji: '🧸', es: 'Abrazo mi peluche y respiro despacio', ca: 'Abraço el meu peluix i respiro a poc a poc' },
    no: [{ emoji: '🎮', es: 'Me pongo a jugar', ca: 'Em poso a jugar' },
         { emoji: '🍪', es: 'Voy a la cocina a picar', ca: 'Vaig a la cuina a picar' }]
  },
  {
    es: 'Has dormido poquísimo. ¿Cómo te sientes al día siguiente?',
    ca: 'Has dormit poquíssim. Com et sents l\'endemà?',
    ok: { emoji: '😴', es: 'Cansado y de mal humor', ca: 'Cansat i de mal humor' },
    no: [{ emoji: '⚡', es: 'Con más fuerza que nunca', ca: 'Amb més força que mai' },
         { emoji: '🎉', es: 'Igual que siempre', ca: 'Igual que sempre' }]
  },
  {
    es: '¿A qué hora se va a la cama entre semana?',
    ca: "A quina hora s'ha d'anar al llit entre setmana?",
    ok: { emoji: '🕗', es: 'Siempre a la misma hora', ca: 'Sempre a la mateixa hora' },
    no: [{ emoji: '🌃', es: 'Cuando yo quiera', ca: 'Quan jo vulgui' },
         { emoji: '🌅', es: 'Cuando ya sale el sol', ca: 'Quan ja surt el sol' }]
  }
]

export default function Descanso({ onDone }) {
  const rounds = shuffle(CASOS).map(c => ({
    prompt: { es: c.es, ca: c.ca },
    options: shuffle([{ ...c.ok, ok: true }, ...c.no.map(n => ({ ...n, ok: false }))])
      .map((o, k) => ({ key: `o${k}${o.emoji}`, emoji: o.emoji, ok: !!o.ok, label: { es: o.es, ca: o.ca } }))
  }))
  return <ChoiceGame rounds={rounds} onDone={onDone} optionSize={84} />
}
