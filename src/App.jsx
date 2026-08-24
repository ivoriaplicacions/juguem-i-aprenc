import { useEffect, useMemo, useState } from 'react'
import { LangCtx, makeT } from './i18n'
import { load, save } from './lib/store'
import { unlockAudio } from './lib/sound'
import { unlockSpeech, usarVoz, usarVelocidad } from './lib/speech'
import Home from './screens/Home'
import World from './screens/World'
import Play from './screens/Play'
import Parents from './screens/Parents'

export default function App() {
  const [state, setState] = useState(load)
  const [nav, setNav] = useState({ screen: 'home' })

  // Guardado local y contador de minutos del día (para el panel de familias).
  useEffect(() => { save(state) }, [state])
  useEffect(() => {
    const hoy = new Date().toDateString()
    setState(s => (s.lastDay === hoy ? s : { ...s, lastDay: hoy, dailyMin: 0 }))
    const id = setInterval(() => setState(s => ({ ...s, dailyMin: (s.dailyMin || 0) + 1, minutes: (s.minutes || 0) + 1 })), 60000)
    return () => clearInterval(id)
  }, [])

  // El audio y la voz del navegador necesitan un primer gesto del usuario.
  useEffect(() => {
    const go = () => { unlockAudio(); unlockSpeech(); window.removeEventListener('pointerdown', go) }
    window.addEventListener('pointerdown', go)
    return () => window.removeEventListener('pointerdown', go)
  }, [])

  // La voz y la velocidad que haya elegido la familia.
  useEffect(() => {
    usarVoz('es', state.voz?.es)
    usarVoz('ca', state.voz?.ca)
  }, [state.voz])

  useEffect(() => { usarVelocidad(state.velocidad) }, [state.velocidad])

  const ctx = useMemo(() => ({ lang: state.lang, ...makeT(state.lang) }), [state.lang])

  const finish = (id, stars) => {
    setState(s => ({
      ...s,
      stars: s.stars + stars,
      done: { ...s.done, [id]: true },
      plays: { ...s.plays, [id]: (s.plays[id] || 0) + 1 }
    }))
    setNav(n => ({ screen: 'world', worldId: n.worldId }))
  }

  return (
    <LangCtx.Provider value={ctx}>
      <div className="app">
        {nav.screen === 'home' && (
          <Home state={state}
                onWorld={id => setNav({ screen: 'world', worldId: id })}
                onParents={() => setNav({ screen: 'parents' })}
                onLang={l => setState(s => ({ ...s, lang: l }))} />
        )}
        {nav.screen === 'world' && (
          <World id={nav.worldId} state={state}
                 onPlay={id => setNav({ screen: 'play', worldId: nav.worldId, actId: id })}
                 onBack={() => setNav({ screen: 'home' })} />
        )}
        {nav.screen === 'play' && (
          <Play id={nav.actId}
                onExit={() => setNav({ screen: 'world', worldId: nav.worldId })}
                onFinish={finish} />
        )}
        {nav.screen === 'parents' && (
          <Parents state={state} setState={setState} onBack={() => setNav({ screen: 'home' })} />
        )}
      </div>
    </LangCtx.Provider>
  )
}
