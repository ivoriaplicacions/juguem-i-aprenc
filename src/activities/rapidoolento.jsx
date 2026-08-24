import { useEffect, useRef, useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle } from '../lib/rnd'

/* ============================================================
   ¿Rápido o lento? — el tempo.
   Junto con grave y agudo, es la otra mitad de lo que un niño
   puede oír antes de saber solfeo. Y tiene premio inmediato:
   en cuanto distingue el tempo, puede acompañarlo con el cuerpo,
   que es como se aprende música a esta edad.
   ============================================================ */

const CABALLO = { key: 'rapido', art: 'caballo', es: 'rápido, como el caballo', ca: 'ràpid, com el cavall' }
const TORTUGA = { key: 'lento',  art: 'tortuga', es: 'lento, como la tortuga',  ca: 'lent, com la tortuga' }

const crearRondas = () => shuffle(['rapido', 'lento', 'rapido', 'lento', 'rapido', 'lento'])

export default function RapidoOLento({ onDone }) {
  const { lang, tx } = useLang()
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const temporizadores = useRef([])
  const cual = rondas[i]

  /** Cinco golpes de tambor, juntos o muy separados. */
  const sonar = () => {
    temporizadores.current.forEach(clearTimeout)
    const paso = cual === 'rapido' ? 190 : 720
    temporizadores.current = [0, 1, 2, 3, 4].map(k => setTimeout(() => sfx.drum(), k * paso))
  }

  useEffect(() => {
    const id = setTimeout(sonar, 1400)
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
        es: 'Escucha el tambor. ¿Va rápido o lento?',
        ca: 'Escolta el tambor. Va ràpid o lent?'
      }} />

      <div className="board">
        <BigBtn variant="orange" onClick={sonar}>
          🥁 {tx({ es: 'Escuchar otra vez', ca: 'Escoltar un altre cop' })}
        </BigBtn>

        <div className="options">
          {[CABALLO, TORTUGA].map(o => (
            <button key={o.key} className={`opt ${cls(o.key)}`}
              onClick={() => { speak(tx({ es: o.es, ca: o.ca }), lang); answer(o.key, o.key === cual) }}>
              <Art name={o.art} size={120} />
              <b>{tx({ es: o.es, ca: o.ca })}</b>
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
