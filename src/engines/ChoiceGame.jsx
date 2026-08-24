import { useState } from 'react'
import { Art, Shape } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'

/** Dibuja el contenido de una opción: ilustración, forma, color, emoji o texto. */
export function OptionArt({ o, size = 96 }) {
  if (o.art) return <Art name={o.art} size={size} color={o.color} />
  if (o.shape) return <Shape id={o.shape} color={o.color} size={size} />
  if (o.swatch) return <div style={{ width: size * 0.8, height: size * 0.8, borderRadius: '50%', background: o.swatch, border: '4px solid #fff', boxShadow: '0 3px 8px rgba(0,0,0,.15)' }} />
  if (o.emoji) return <div style={{ fontSize: size * 0.72, lineHeight: 1 }}>{o.emoji}</div>
  if (o.text) return <div style={{ fontSize: size * 0.55, fontWeight: 900, color: o.color || 'var(--blue)' }}>{o.text}</div>
  return null
}

/**
 * Motor genérico "escucha y elige".
 * rounds: [{ prompt:{es,ca}, hero?, options:[{key, ok, label?, art|shape|swatch|emoji|text, color}], size?, labels? }]
 * Sirve para vocabulario, colores, formas, emociones, hábitos, seguridad…
 */
export default function ChoiceGame({ rounds, onDone, labels = true, optionSize = 104 }) {
  const { lang, tx } = useLang()
  const [i, setI] = useState(0)
  const r = rounds[i]
  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rounds.length ? setI(i + 1) : onDone())
  })

  return (
    <div className="stage">
      <Prompt text={r.prompt} />
      <div className="board">
        {r.hero && (
          <div className="rise" style={{ display: 'grid', placeItems: 'center' }}>
            <OptionArt o={r.hero} size={r.heroSize || 150} />
            {r.hero.label && <b style={{ fontSize: 20 }}>{tx(r.hero.label)}</b>}
          </div>
        )}
        <div className="options">
          {r.options.map(o => (
            <button key={o.key} className={`opt ${cls(o.key)}`}
              onClick={() => { if (o.label) speak(tx(o.label), lang); answer(o.key, !!o.ok) }}>
              <OptionArt o={o} size={(r.size || optionSize) * (o.scale || 1)} />
              {labels && o.label && <b>{tx(o.label)}</b>}
            </button>
          ))}
        </div>
      </div>
      <Dots step={i} total={rounds.length} />
    </div>
  )
}
