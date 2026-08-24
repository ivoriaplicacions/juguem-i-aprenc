import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { pick } from '../lib/rnd'

/** Botón grande y redondo con icono. */
export const IconBtn = ({ children, onClick, label }) => (
  <button className="iconbtn" aria-label={label} onClick={() => { sfx.tap(); onClick && onClick() }}>{children}</button>
)

export const BigBtn = ({ children, onClick, variant = '', style }) => (
  <button className={`big ${variant}`} style={style} onClick={() => { sfx.tap(); onClick && onClick() }}>{children}</button>
)

/** Habla un texto {es,ca} y lo repite al tocar el altavoz. */
export function Prompt({ text, extra, auto = true }) {
  const { lang, tx } = useLang()
  // La consigna manda: calla lo que hubiera sonando y habla ya.
  const say = () => speak(tx(text), lang, { interrumpe: true })
  useEffect(() => { if (auto) { const id = setTimeout(say, 320); return () => clearTimeout(id) } },
    [tx(text), lang]) // eslint-disable-line
  return (
    <div className="prompt rise">
      <button className="iconbtn" aria-label="Escuchar" onClick={say} style={{ boxShadow: 'none', background: '#f4efe6' }}>🔊</button>
      <p>{tx(text)}</p>
      {extra}
    </div>
  )
}

export const Dots = ({ step, total }) => (
  <div className="dots">{Array.from({ length: total }).map((_, i) => <i key={i} className={i < step ? 'on' : ''} />)}</div>
)

/** Lluvia de confeti al acertar una actividad entera. */
export function Confetti() {
  const cols = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#9b5de5', '#ff8fab']
  return (
    <div className="confetti">
      {Array.from({ length: 40 }).map((_, i) => (
        <i key={i} style={{
          left: `${Math.random() * 100}%`, top: `-${Math.random() * 20 + 5}%`,
          background: cols[i % cols.length], animationDelay: `${Math.random() * 0.7}s`
        }} />
      ))}
    </div>
  )
}

/** Pantalla de celebración al terminar una actividad. */
export function Celebrate({ stars = 3, onDone }) {
  const { t, lang, tx } = useLang()
  const msg = useRef(pick(t('wellDone')))
  useEffect(() => { sfx.win(); speak(msg.current + ' ' + tx({ es: 'Has ganado tres estrellas', ca: 'Has guanyat tres estrelles' }), lang) }, []) // eslint-disable-line
  return (
    <div className="celebrate">
      <Confetti />
      <div className="center">
        <div style={{ fontSize: 78 }}>{'⭐'.repeat(stars)}</div>
        <h2>{msg.current}</h2>
        <p style={{ fontSize: 20, color: 'var(--muted)', fontWeight: 700 }}>{t('finished')}</p>
        <BigBtn variant="green" onClick={onDone}>👍 {t('next')}</BigBtn>
      </div>
    </div>
  )
}

/**
 * Reacción inmediata a un toque: verde y sonido al acertar,
 * rojo suave y ánimo al fallar. Nunca penaliza ni bloquea.
 */
export function useAnswer({ onRight, delay = 900 }) {
  const { lang, t } = useLang()
  const [mark, setMark] = useState(null) // {key, ok}
  const busy = useRef(false)
  const answer = (key, ok) => {
    if (busy.current) return
    busy.current = true
    setMark({ key, ok })
    if (ok) { sfx.right(); speak(pick(t('wellDone')), lang) }
    else { sfx.wrong(); speak(pick(t('tryAgain')), lang) }
    setTimeout(() => {
      setMark(null); busy.current = false
      if (ok) onRight && onRight()
    }, ok ? delay : 700)
  }
  const cls = (key) => (mark && mark.key === key ? (mark.ok ? 'good' : 'bad') : '')
  return { answer, cls, mark, locked: () => busy.current }
}
