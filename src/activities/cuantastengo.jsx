import ChoiceGame from '../engines/ChoiceGame'
import { P } from '../art'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Cuántos tengo? — contar sobre el propio cuerpo.
   Contar fresas es abstracto; contarse los dedos, no. El cuerpo
   está siempre a mano y es el primer material de matemáticas
   que tiene un niño. Además fija de paso una idea útil: unas
   cosas vienen de dos en dos y otras van solas.
   ============================================================ */

const CASOS = [
  { parte: 'nino_ojos',    n: 2,  es: '¿Cuántos ojos tienes?',    ca: 'Quants ulls tens?' },
  { parte: 'nino_nariz',   n: 1,  es: '¿Cuántas narices tienes?', ca: 'Quants nassos tens?' },
  { parte: 'nino_orejas',  n: 2,  es: '¿Cuántas orejas tienes?',  ca: 'Quantes orelles tens?' },
  { parte: 'nino_manos',   n: 2,  es: '¿Cuántas manos tienes?',   ca: 'Quantes mans tens?' },
  { parte: 'nino_piernas', n: 2,  es: '¿Cuántas piernas tienes?', ca: 'Quantes cames tens?' },
  { parte: 'nino_boca',    n: 1,  es: '¿Cuántas bocas tienes?',   ca: 'Quantes boques tens?' }
]

export default function CuantasTengo({ onDone }) {
  const rounds = shuffle(CASOS).map(c => {
    const otros = sample([1, 2, 3, 4, 5].filter(x => x !== c.n), 2)
    return {
      prompt: { es: c.es, ca: c.ca },
      hero: { art: c.parte },
      options: shuffle([c.n, ...otros]).map(n => ({
        key: `n${n}`, art: `num:${n}`, color: P.blue, ok: n === c.n
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
