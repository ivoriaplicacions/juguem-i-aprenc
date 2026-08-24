import { useLang } from '../i18n'
import { WORLDS } from '../data/curriculum'
import { IconBtn } from '../ui/kit'
import { sfx } from '../lib/sound'
import { speak } from '../lib/speech'

/* Menú de un mundo: las actividades como tarjetas grandes con su icono.
   La marca ✅ recuerda al niño lo que ya ha hecho, sin bloquear nada. */
export default function World({ id, state, onPlay, onBack }) {
  const { lang, t, tx } = useLang()
  const w = WORLDS.find(x => x.id === id)
  return (
    <>
      <div className="topbar">
        <IconBtn label={t('back')} onClick={onBack}>⬅️</IconBtn>
        <div>
          <h1 className="title">{w.emoji} {tx({ es: w.es, ca: w.ca })}</h1>
          <p className="subtitle">{tx({ es: w.esSub, ca: w.caSub })}</p>
        </div>
        <div className="spacer" />
        <div className="starcount">⭐ {state.stars}</div>
      </div>

      <div className="acts">
        {w.acts.map(a => (
          <button key={a.id} className="act"
            onClick={() => { sfx.tap(); speak(tx({ es: a.es, ca: a.ca }), lang); onPlay(a.id) }}>
            <span className="ico" style={{ background: w.color + '22' }}>{a.emoji}</span>
            <span>
              <b>{tx({ es: a.es, ca: a.ca })}</b>
              <span>{tx({ es: a.esH, ca: a.caH })}</span>
            </span>
            {state.done[a.id] && <span className="tick">✅</span>}
          </button>
        ))}
      </div>
    </>
  )
}
