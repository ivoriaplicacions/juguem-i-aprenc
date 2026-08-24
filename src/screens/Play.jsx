import { useState } from 'react'
import { useLang } from '../i18n'
import { findAct } from '../data/curriculum'
import { ACTIVITIES } from '../activities'
import { IconBtn, Celebrate } from '../ui/kit'
import { stopSpeaking } from '../lib/speech'

/* Marco de juego: cabecera mínima (salir y título), la actividad y, al
   terminar, la celebración con estrellas. La actividad sólo se preocupa
   de su juego; el premio y la vuelta al menú se gestionan aquí. */
export default function Play({ id, onExit, onFinish }) {
  const { t, tx } = useLang()
  const act = findAct(id)
  const Game = ACTIVITIES[id]
  const [won, setWon] = useState(false)

  if (!Game) return <div className="center"><p>…</p></div>

  return (
    <>
      <div className="topbar">
        <IconBtn label={t('exit')} onClick={() => { stopSpeaking(); onExit() }}>🏠</IconBtn>
        <h1 className="title">{act.emoji} {tx({ es: act.es, ca: act.ca })}</h1>
      </div>
      {!won && <Game key={id} onDone={() => setWon(true)} />}
      {won && <Celebrate stars={3} onDone={() => { stopSpeaking(); onFinish(id, 3) }} />}
    </>
  )
}
