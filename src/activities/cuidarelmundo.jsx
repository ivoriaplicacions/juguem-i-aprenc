import ChoiceGame from '../engines/ChoiceGame'
import { shuffle } from '../lib/rnd'

/* ============================================================
   Cuidar el mundo — pequeños gestos que sí están en su mano.
   A los 4-5 años no toca hablar del planeta en abstracto: toca
   cerrar el grifo, no tirar el papel al suelo y no arrancar la
   flor. Cosas concretas, de su tamaño, que puede hacer hoy.
   ============================================================ */

const CASOS = [
  {
    es: 'Te estás lavando los dientes. ¿Qué haces con el grifo?',
    ca: 'T\'estàs rentant les dents. Què fas amb l\'aixeta?',
    ok: { emoji: '🚰', es: 'Lo cierro mientras me cepillo', ca: 'La tanco mentre em raspallo' },
    no: [{ emoji: '💦', es: 'Lo dejo abierto todo el rato', ca: 'La deixo oberta tota l\'estona' },
         { emoji: '🌊', es: 'Lo abro más fuerte', ca: 'L\'obro més fort' }]
  },
  {
    es: 'Te has terminado la merienda y te queda el papel. ¿Qué haces?',
    ca: 'Has acabat el berenar i et queda el paper. Què fas?',
    ok: { emoji: '🗑️', es: 'Lo llevo a la papelera', ca: 'El porto a la paperera' },
    no: [{ emoji: '🌱', es: 'Lo tiro al suelo', ca: 'El llenço a terra' },
         { emoji: '🌬️', es: 'Lo dejo volar', ca: 'El deixo volar' }]
  },
  {
    es: 'Ves una flor preciosa en el parque. ¿Qué haces?',
    ca: 'Veus una flor preciosa al parc. Què fas?',
    ok: { emoji: '👀', es: 'La miro y la dejo crecer', ca: 'La miro i la deixo créixer' },
    no: [{ emoji: '✋', es: 'La arranco para llevármela', ca: 'L\'arrenco per endur-me-la' },
         { emoji: '🦶', es: 'La piso', ca: 'La trepitjo' }]
  },
  {
    es: 'Sales de la habitación y la luz está encendida. ¿Qué haces?',
    ca: 'Surts de l\'habitació i el llum està encès. Què fas?',
    ok: { emoji: '💡', es: 'La apago', ca: 'L\'apago' },
    no: [{ emoji: '🔆', es: 'La dejo encendida', ca: 'El deixo encès' },
         { emoji: '🕯️', es: 'Enciendo también las otras', ca: 'Encenc també els altres' }]
  },
  {
    es: 'Encuentras un caracol en el camino. ¿Qué haces?',
    ca: 'Trobes un cargol al camí. Què fas?',
    ok: { emoji: '🍃', es: 'Lo aparto con cuidado a la hierba', ca: 'L\'aparto amb compte a l\'herba' },
    no: [{ emoji: '👟', es: 'Sigo andando sin mirar', ca: 'Segueixo caminant sense mirar' },
         { emoji: '🪨', es: 'Le tiro una piedra', ca: 'Li tiro una pedra' }]
  },
  {
    es: 'Vais a comprar el pan aquí al lado. ¿Cómo vais?',
    ca: 'Aneu a comprar el pa aquí al costat. Com hi aneu?',
    ok: { emoji: '🚶', es: 'Andando', ca: 'A peu' },
    no: [{ emoji: '🚗', es: 'En coche', ca: 'En cotxe' },
         { emoji: '✈️', es: 'En avión', ca: 'En avió' }]
  }
]

export default function CuidarElMundo({ onDone }) {
  const rounds = shuffle(CASOS).map(c => ({
    prompt: { es: c.es, ca: c.ca },
    options: shuffle([{ ...c.ok, ok: true }, ...c.no.map(n => ({ ...n, ok: false }))])
      .map((o, k) => ({ key: `o${k}${o.emoji}`, emoji: o.emoji, ok: !!o.ok, label: { es: o.es, ca: o.ca } }))
  }))
  return <ChoiceGame rounds={rounds} onDone={onDone} optionSize={84} />
}
