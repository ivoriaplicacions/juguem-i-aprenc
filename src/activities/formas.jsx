import ChoiceGame from '../engines/ChoiceGame'
import { SHAPES } from '../art/shapes'
import { COLORS } from '../art/palette'
import { shuffle, sample, pick } from '../lib/rnd'

/* Formas mágicas: primero se nombra la forma; en las últimas rondas hay que
   fijarse a la vez en la forma Y el color (atención selectiva). */
export default function Formas({ onDone }) {
  const base = shuffle(SHAPES).slice(0, 6)
  const rounds = base.map((target, i) => {
    const dobleAtributo = i >= 4
    const color = pick(COLORS)
    const otras = sample(SHAPES.filter(s => s.id !== target.id), 3)
    const opts = shuffle([target, ...otras]).map(s => ({
      key: s.id, shape: s.id,
      color: dobleAtributo ? (s.id === target.id ? color.hex : pick(COLORS).hex) : pick(COLORS).hex,
      ok: s.id === target.id, label: { es: s.es, ca: s.ca }
    }))
    return {
      prompt: dobleAtributo
        ? { es: `Busca el ${target.es} de color ${color.es}`, ca: `Busca el ${target.ca} de color ${color.ca}` }
        : { es: `¿Dónde está el ${target.es}?`, ca: `On és el ${target.ca}?` },
      options: opts
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
