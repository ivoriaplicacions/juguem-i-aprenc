import ChoiceGame from '../engines/ChoiceGame'
import { shuffle } from '../lib/rnd'

/* ============================================================
   ¿Qué me ayuda a calmarme? — herramientas para la rabieta.
   Respira conmigo enseña a respirar; ésta enseña a elegir qué
   hacer cuando algo se tuerce. A los 4-5 años la emoción llega
   entera y de golpe: tener un par de salidas pensadas de
   antemano es la diferencia entre el enfado y el estallido.
   Ninguna respuesta se ridiculiza: la buena se celebra y ya.
   ============================================================ */

const CASOS = [
  {
    es: 'Estás muy enfadado y notas que vas a estallar. ¿Qué te ayuda?',
    ca: 'Estàs molt enfadat i notes que esclataràs. Què t\'ajuda?',
    ok: { emoji: '🫁', es: 'Respirar hondo y despacio', ca: 'Respirar fondo i a poc a poc' },
    no: [{ emoji: '🦶', es: 'Dar una patada a la silla', ca: 'Donar una puntada a la cadira' },
         { emoji: '📢', es: 'Chillar lo más fuerte que pueda', ca: 'Cridar tan fort com pugui' }]
  },
  {
    es: 'Estás triste y te apetece llorar. ¿Qué te ayuda?',
    ca: 'Estàs trist i tens ganes de plorar. Què t\'ajuda?',
    ok: { emoji: '🤗', es: 'Pedir un abrazo', ca: 'Demanar una abraçada' },
    no: [{ emoji: '🚪', es: 'Encerrarme y no hablar con nadie', ca: 'Tancar-me i no parlar amb ningú' },
         { emoji: '🙈', es: 'Hacer como que no pasa nada', ca: 'Fer veure que no passa res' }]
  },
  {
    es: 'Una cosa no te sale y te estás poniendo nervioso. ¿Qué te ayuda?',
    ca: 'Una cosa no et surt i t\'estàs posant nerviós. Què t\'ajuda?',
    ok: { emoji: '🙋', es: 'Pedir ayuda', ca: 'Demanar ajuda' },
    no: [{ emoji: '💥', es: 'Romperlo todo', ca: 'Trencar-ho tot' },
         { emoji: '😤', es: 'Decir que soy tonto', ca: 'Dir que sóc tonto' }]
  },
  {
    es: 'Tienes mucha rabia dentro del cuerpo. ¿Qué te ayuda?',
    ca: 'Tens molta ràbia dins del cos. Què t\'ajuda?',
    ok: { emoji: '💧', es: 'Beber agua y sentarme un rato', ca: 'Beure aigua i seure una estona' },
    no: [{ emoji: '👊', es: 'Pegar a quien tengo cerca', ca: 'Pegar a qui tinc a prop' },
         { emoji: '🗣️', es: 'Decir cosas feas', ca: 'Dir coses lletges' }]
  },
  {
    es: 'Estás asustado por un ruido de noche. ¿Qué te ayuda?',
    ca: 'Estàs espantat per un soroll a la nit. Què t\'ajuda?',
    ok: { emoji: '🧸', es: 'Llamar a un mayor y abrazar mi peluche', ca: 'Cridar un gran i abraçar el meu peluix' },
    no: [{ emoji: '🫣', es: 'Quedarme quieto sin decir nada', ca: 'Quedar-me quiet sense dir res' },
         { emoji: '🏃', es: 'Salir corriendo de casa', ca: 'Sortir corrents de casa' }]
  },
  {
    es: 'Ya estás más tranquilo después del enfado. ¿Qué toca ahora?',
    ca: 'Ja estàs més tranquil després d\'enfadar-te. Què toca ara?',
    ok: { emoji: '💬', es: 'Contar qué me ha pasado', ca: 'Explicar què m\'ha passat' },
    no: [{ emoji: '🤐', es: 'No contarlo nunca', ca: 'No explicar-ho mai' },
         { emoji: '😠', es: 'Volver a enfadarme', ca: 'Tornar-me a enfadar' }]
  }
]

export default function Calmarse({ onDone }) {
  const rounds = shuffle(CASOS).map(c => ({
    prompt: { es: c.es, ca: c.ca },
    options: shuffle([{ ...c.ok, ok: true }, ...c.no.map(n => ({ ...n, ok: false }))])
      .map((o, k) => ({ key: `o${k}${o.emoji}`, emoji: o.emoji, ok: !!o.ok, label: { es: o.es, ca: o.ca } }))
  }))
  return <ChoiceGame rounds={rounds} onDone={onDone} optionSize={84} />
}
