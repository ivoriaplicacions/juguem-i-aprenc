import { useMemo, useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle, sample } from '../lib/rnd'

/* Segmentación silábica: se dan palmas al decir la palabra y se cuenta
   cuántas ha habido. Prepara la lectura mucho antes que las letras. */
const PALABRAS = [
  { art: 'sol',      es: ['sol'],                   ca: ['sol'] },
  { art: 'pan',      es: ['pan'],                   ca: ['pa'] },
  { art: 'gato',     es: ['ga', 'to'],              ca: ['gat'] },
  { art: 'casa',     es: ['ca', 'sa'],              ca: ['ca', 'sa'] },
  { art: 'luna',     es: ['lu', 'na'],              ca: ['llu', 'na'] },
  { art: 'flor',     es: ['flor'],                  ca: ['flor'] },
  { art: 'pelota',   es: ['pe', 'lo', 'ta'],        ca: ['pi', 'lo', 'ta'] },
  { art: 'manzana',  es: ['man', 'za', 'na'],       ca: ['po', 'ma'] },
  { art: 'mariposa', es: ['ma', 'ri', 'po', 'sa'],  ca: ['pa', 'pa', 'llo', 'na'] },
  { art: 'elefante', es: ['e', 'le', 'fan', 'te'],  ca: ['e', 'le', 'fant'] },
  { art: 'mochila',  es: ['mo', 'chi', 'la'],       ca: ['mot', 'xi', 'lla'] },
  { art: 'zanahoria',es: ['za', 'na', 'ho', 'ria'], ca: ['pas', 'ta', 'na', 'ga'] }
]

export default function Silabas({ onDone }) {
  const { lang, tx } = useLang()
  const [rondas] = useState(() => sample(PALABRAS, 6))
  const [i, setI] = useState(0)
  const [palmas, setPalmas] = useState(0)
  const r = rondas[i]
  const silabas = r[lang] || r.es
  const { answer, cls } = useAnswer({
    onRight: () => { setPalmas(0); i + 1 < rondas.length ? setI(i + 1) : onDone() }
  })

  // Dice la palabra sílaba a sílaba con una palmada en cada una.
  const palmear = () => {
    setPalmas(0)
    silabas.forEach((s, k) => setTimeout(() => {
      sfx.drum(); setPalmas(k + 1); speak(s, lang, { rate: 0.8 })
    }, k * 620))
  }

  // Tres opciones estables por ronda: la correcta y dos vecinas.
  const opciones = useMemo(() => {
    const n = silabas.length
    const otras = [1, 2, 3, 4].filter(x => x !== n).sort((a, b) => Math.abs(a - n) - Math.abs(b - n)).slice(0, 2)
    return shuffle([n, ...otras])
  }, [i, lang]) // eslint-disable-line

  return (
    <div className="stage">
      <Prompt text={{ es: '¿Cuántas palmas tiene la palabra?', ca: 'Quantes picades té la paraula?' }} />
      <div className="board">
        <div className="center">
          <Art name={r.art} size={140} />
          <b style={{ fontSize: 26 }}>{silabas.join(' - ')}</b>
          <div style={{ fontSize: 34, minHeight: 42 }}>{'👏'.repeat(palmas)}</div>
          <BigBtn variant="orange" onClick={palmear}>👏 {tx({ es: 'Dar palmas', ca: 'Picar de mans' })}</BigBtn>
        </div>
        <div className="options">
          {opciones.map(n => (
            <button key={n} className={`opt ${cls(n)}`} onClick={() => answer(n, n === silabas.length)}>
              <Art name={`num:${n}`} size={92} />
            </button>
          ))}
        </div>
      </div>
      <Dots step={i} total={rondas.length} />
    </div>
  )
}
