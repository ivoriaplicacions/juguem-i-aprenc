import { useEffect, useRef, useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn, useAnswer } from '../ui/kit'
import { sfx } from '../lib/sound'
import { shuffle, sample, range } from '../lib/rnd'

/* ============================================================
   ¿Cuántos golpes suenan? — contar con los oídos.
   Cuenta conmigo se cuenta con los ojos y con el dedo; aquí no
   hay nada que tocar ni que mirar. Hay que retener los golpes
   mientras suenan y contarlos por dentro, que es bastante más
   difícil y es justo lo que hace falta para aprender a leer.
   Se puede repetir tantas veces como se quiera.
   ============================================================ */

/** Golpes de menos a más, que es como conviene subir. */
const CANTIDADES = [2, 3, 2, 4, 3, 5]

export default function CuantosSuenan({ onDone }) {
  const { tx } = useLang()
  const [rondas] = useState(() => CANTIDADES.map(n => ({
    n,
    opciones: shuffle([n, ...sample(range(6, 1).filter(x => x !== n && Math.abs(x - n) <= 2), 2)])
  })))
  const [i, setI] = useState(0)
  const [sonando, setSonando] = useState(false)
  const temporizadores = useRef([])
  const r = rondas[i]

  const sonar = () => {
    temporizadores.current.forEach(clearTimeout)
    setSonando(true)
    temporizadores.current = range(r.n).map(k => setTimeout(() => sfx.drum(), k * 620))
    temporizadores.current.push(setTimeout(() => setSonando(false), r.n * 620 + 200))
  }

  useEffect(() => {
    const id = setTimeout(sonar, 1500)
    return () => {
      clearTimeout(id)
      temporizadores.current.forEach(clearTimeout)
    }
  }, [i]) // eslint-disable-line

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  return (
    <div className="stage">
      <Prompt text={{
        es: 'Escucha con atención. ¿Cuántos golpes suenan?',
        ca: 'Escolta amb atenció. Quants cops sonen?'
      }} />

      <div className="board">
        {/* Mientras suena, el tambor late: así se sabe que hay que escuchar. */}
        <div style={{
          transform: sonando ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform .2s', display: 'grid', placeItems: 'center'
        }}>
          <Art name="tambor" size={130} />
        </div>

        <BigBtn variant="orange" onClick={sonar}>
          🔊 {tx({ es: 'Escuchar otra vez', ca: 'Escoltar un altre cop' })}
        </BigBtn>

        <div className="options">
          {r.opciones.map(n => (
            <button key={n} className={`opt ${cls(`n${n}`)}`}
              onClick={() => answer(`n${n}`, n === r.n)}>
              <Art name={`num:${n}`} size={92} />
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
