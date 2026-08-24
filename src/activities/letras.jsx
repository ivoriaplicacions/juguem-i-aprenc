import ChoiceGame from '../engines/ChoiceGame'
import { P } from '../art'
import { shuffle, sample } from '../lib/rnd'

/* Reconocimiento de letras mayúsculas: las vocales primero, que son las que
   se trabajan a los 4 años, y algunas consonantes muy frecuentes. */
const LETRAS = ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'L', 'S', 'T']
const COLORES = [P.red, P.blue, P.green, P.purple, P.orange]

export default function Letras({ onDone }) {
  const rounds = sample(LETRAS, 7).map((target, i) => {
    const otras = sample(LETRAS.filter(l => l !== target), i < 3 ? 2 : 3)
    return {
      prompt: { es: `Busca la letra ${target}`, ca: `Busca la lletra ${target}` },
      options: shuffle([target, ...otras]).map((l, k) => ({
        key: l, art: `let:${l}`, color: COLORES[k % COLORES.length],
        ok: l === target, label: { es: l, ca: l }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
