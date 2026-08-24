import { Art } from '../art'
import { useLang } from '../i18n'
import { WORLDS } from '../data/curriculum'
import { IconBtn } from '../ui/kit'
import { sfx } from '../lib/sound'
import { speak } from '../lib/speech'

/* Portada: los siete mundos. Cada tarjeta enseña cuánto se ha completado,
   sin números ni notas: sólo una barra que se llena. */
export default function Home({ state, onWorld, onParents }) {
  const { lang, t, tx } = useLang()
  const doneIn = (w) => w.acts.filter(a => state.done[a.id]).length

  return (
    <>
      <div className="topbar">
        <Art name="mascota" size={64} />
        <div>
          <h1 className="title">{state.name ? `${t('hello')} ${state.name}` : t('appName')}</h1>
          <p className="subtitle">{t('chooseWorld')}</p>
        </div>
        <div className="spacer" />
        <div className="starcount">⭐ {state.stars}</div>
        <IconBtn label={t('parents')} onClick={onParents}>👨‍👩‍👧</IconBtn>
      </div>

      <p className="dedication">
        <span className="heart" aria-hidden="true">💛</span>
        {t('dedication')}
      </p>

      <div className="worlds">
        {WORLDS.map(w => {
          const d = doneIn(w)
          return (
            <button key={w.id} className="world" style={{ background: w.color }}
              onClick={() => { sfx.tap(); speak(tx({ es: w.es, ca: w.ca }), lang); onWorld(w.id) }}>
              <span className="emoji">{w.emoji}</span>
              <h3>{tx({ es: w.es, ca: w.ca })}</h3>
              <small>{tx({ es: w.esSub, ca: w.caSub })}</small>
              <div className="bar"><i style={{ width: `${(d / w.acts.length) * 100}%` }} /></div>
              <small>{d} / {w.acts.length}</small>
            </button>
          )
        })}
      </div>
    </>
  )
}
