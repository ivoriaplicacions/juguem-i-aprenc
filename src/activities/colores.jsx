import ChoiceGame from '../engines/ChoiceGame'
import { COLORS } from '../art/palette'
import { shuffle, sample } from '../lib/rnd'

/* El arcoíris: escucha el color y tócalo. Seis colores básicos, cuatro
   opciones por ronda para que la elección sea real pero no abrumadora. */
export default function Colores({ onDone }) {
  const rounds = shuffle(COLORS).slice(0, 6).map(target => {
    const others = sample(COLORS.filter(c => c.id !== target.id), 3)
    return {
      prompt: { es: `Toca el color ${target.es}`, ca: `Toca el color ${target.ca}` },
      options: shuffle([target, ...others]).map(c => ({
        key: c.id, swatch: c.hex, ok: c.id === target.id,
        label: { es: c.es, ca: c.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
