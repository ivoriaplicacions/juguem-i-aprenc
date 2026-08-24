import { useState } from 'react'
import { Art } from '../art'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { shuffle, pick, range } from '../lib/rnd'

/* Comparación: grande / pequeño y muchos / pocos.
   Es la base de la medida y de la noción de cantidad. */
const COSAS = ['manzana', 'pelota', 'flor', 'arbol', 'casa', 'coche', 'gato', 'pez', 'globo', 'mariposa']

function crearRondas() {
  const r = []
  for (const modo of ['grande', 'pequeno']) {
    for (let k = 0; k < 2; k++) {
      const art = pick(COSAS)
      const escalas = shuffle([56, 92, 132])
      const objetivo = modo === 'grande' ? Math.max(...escalas) : Math.min(...escalas)
      r.push({
        tipo: 'tamano', art, escalas, objetivo,
        prompt: modo === 'grande'
          ? { es: '¿Cuál es el más GRANDE?', ca: 'Quin és el més GRAN?' }
          : { es: '¿Cuál es el más PEQUEÑO?', ca: 'Quin és el més PETIT?' }
      })
    }
  }
  for (const modo of ['mas', 'menos']) {
    for (let k = 0; k < 2; k++) {
      const art = pick(COSAS)
      const a = 2 + Math.floor(Math.random() * 3)
      const b = a + 2 + Math.floor(Math.random() * 3)
      r.push({
        tipo: 'cantidad', art, grupos: shuffle([a, b]),
        objetivo: modo === 'mas' ? b : a,
        prompt: modo === 'mas'
          ? { es: '¿Dónde hay MÁS?', ca: "On n'hi ha MÉS?" }
          : { es: '¿Dónde hay MENOS?', ca: "On n'hi ha MENYS?" }
      })
    }
  }
  return shuffle(r)
}

export default function Tamanos({ onDone }) {
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const r = rondas[i]
  const { answer, cls } = useAnswer({ onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone()) })

  return (
    <div className="stage">
      <Prompt text={r.prompt} />
      <div className="board">
        <div className="options">
          {r.tipo === 'tamano'
            ? r.escalas.map((s, k) => (
                <button key={k} className={`opt ${cls('t' + k)}`} onClick={() => answer('t' + k, s === r.objetivo)}
                        style={{ minHeight: 150, justifyContent: 'center' }}>
                  <Art name={r.art} size={s} />
                </button>
              ))
            : r.grupos.map((n, k) => (
                <button key={k} className={`opt ${cls('c' + k)}`} onClick={() => answer('c' + k, n === r.objetivo)}
                        style={{ maxWidth: 220, minHeight: 150 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                    {range(n).map(j => <Art key={j} name={r.art} size={52} />)}
                  </div>
                </button>
              ))}
        </div>
      </div>
      <Dots step={i} total={rondas.length} />
    </div>
  )
}
