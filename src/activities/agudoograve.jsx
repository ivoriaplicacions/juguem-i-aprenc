import { useEffect, useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle } from '../lib/rnd'

/* ============================================================
   ¿Grave o agudo? — la altura del sonido.
   Es la primera distinción musical que un niño puede hacer sin
   saber nada de música, pero necesita un asidero concreto: el
   oso suena grave y el pájaro agudo. Con esa pareja en la
   cabeza, la nota deja de ser "un ruido" y pasa a tener sitio.
   El sonido se puede repetir todas las veces que haga falta.
   ============================================================ */

const OSO    = { key: 'grave', art: 'oso',    es: 'grave, como el oso',     ca: 'greu, com l\'ós' }
const PAJARO = { key: 'agudo', art: 'pajaro', es: 'agudo, como el pájaro',  ca: 'agut, com l\'ocell' }

/** Ocho rondas alternando, pero en orden imprevisible. */
const crearRondas = () => shuffle(['grave', 'agudo', 'grave', 'agudo', 'grave', 'agudo'])

export default function AgudoOGrave({ onDone }) {
  const { lang, tx } = useLang()
  const [rondas] = useState(crearRondas)
  const [i, setI] = useState(0)
  const cual = rondas[i]

  const sonar = () => sfx.note(cual === 'grave' ? 0 : 7)

  // Al entrar en cada ronda suena solo, tras un respiro para no pisar la consigna.
  useEffect(() => {
    const id = setTimeout(sonar, 1400)
    return () => clearTimeout(id)
  }, [i]) // eslint-disable-line

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  return (
    <div className="stage">
      <Prompt text={{
        es: 'Escucha el sonido. ¿Es grave o agudo?',
        ca: 'Escolta el so. És greu o agut?'
      }} />

      <div className="board">
        <BigBtn variant="purple" onClick={sonar}>
          🔊 {tx({ es: 'Escuchar otra vez', ca: 'Escoltar un altre cop' })}
        </BigBtn>

        <div className="options">
          {[OSO, PAJARO].map(o => (
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
