import { useMemo, useState } from 'react'
import { useLang } from '../i18n'
import { AREAS, ALL_ACTS } from '../data/curriculum'
import { BigBtn, IconBtn } from '../ui/kit'
import { reset as wipe } from '../lib/store'

/* Puerta para adultos: una suma sencilla que un niño de 4-5 años todavía
   no resuelve. Evita que entre solo a los ajustes sin poner contraseñas. */
function Gate({ onOk, onBack }) {
  const { t, tx } = useLang()
  const [a] = useState(() => 3 + Math.floor(Math.random() * 6))
  const [b] = useState(() => 4 + Math.floor(Math.random() * 6))
  const [v, setV] = useState('')
  const [err, setErr] = useState(false)
  return (
    <div className="center" style={{ padding: 24, gap: 20 }}>
      <div style={{ fontSize: 54 }}>🔒</div>
      <h2 style={{ margin: 0 }}>{t('parentGate')} {a} + {b}?</h2>
      <input className="field" inputMode="numeric" value={v} placeholder={t('parentGateHint')}
             onChange={e => { setV(e.target.value); setErr(false) }} style={{ maxWidth: 260, textAlign: 'center' }} />
      {err && <p style={{ color: 'var(--red)', fontWeight: 700 }}>{t('wrongGate')}</p>}
      <div className="row">
        <BigBtn variant="ghost" onClick={onBack}>⬅️ {t('back')}</BigBtn>
        <BigBtn variant="green" onClick={() => (Number(v) === a + b ? onOk() : setErr(true))}>{tx({ es: 'Entrar', ca: 'Entrar' })}</BigBtn>
      </div>
    </div>
  )
}

const TIPS = [
  { es: 'Juega a su lado: nombrar en voz alta lo que ve multiplica lo que aprende.', ca: 'Juga al seu costat: anomenar en veu alta el que veu multiplica el que aprèn.' },
  { es: 'Sesiones cortas, de 10 a 15 minutos. A esta edad la atención sostenida es breve.', ca: 'Sessions curtes, de 10 a 15 minuts. A aquesta edat l\'atenció sostinguda és breu.' },
  { es: 'Deja que se equivoque: aquí el error nunca resta ni bloquea, sólo invita a repetir.', ca: 'Deixa que s\'equivoqui: aquí l\'error mai resta ni bloqueja, només convida a repetir.' },
  { es: 'Lleva el juego al mundo real: contad escalones, buscad triángulos por la calle.', ca: 'Porta el joc al món real: compteu graons, busqueu triangles pel carrer.' },
  { es: 'Alterna mundos. Si sólo repite uno, propón tú otro para cubrir todas las áreas.', ca: 'Alterna mons. Si només en repeteix un, proposa-li\'n un altre per cobrir totes les àrees.' },
  { es: 'Las actividades de movimiento y respiración están pensadas para hacerlas juntos.', ca: 'Les activitats de moviment i respiració estan pensades per fer-les junts.' }
]

export default function Parents({ state, setState, onBack }) {
  const { lang, t, tx } = useLang()
  const [open, setOpen] = useState(false)

  const porArea = useMemo(() => AREAS.map(area => {
    const acts = ALL_ACTS.filter(a => a.areas.includes(area.id))
    const done = acts.filter(a => state.done[a.id]).length
    return { ...area, total: acts.length, done, pct: acts.length ? (done / acts.length) * 100 : 0 }
  }), [state.done])

  const totalDone = Object.keys(state.done).length

  if (!open) return <Gate onOk={() => setOpen(true)} onBack={onBack} />

  return (
    <>
      <div className="topbar">
        <IconBtn label={t('back')} onClick={onBack}>⬅️</IconBtn>
        <h1 className="title">{t('parentsTitle')}</h1>
      </div>

      <div style={{ overflowY: 'auto', paddingBottom: 24 }}>
        <div className="sheet">
          <h3>{t('progress')}</h3>
          {porArea.map(a => (
            <div className="rowline" key={a.id}>
              <span style={{ fontSize: 22 }}>{a.emoji}</span>
              <span className="name">{tx({ es: a.es, ca: a.ca })}</span>
              <span className="meter"><i style={{ width: `${a.pct}%`, background: a.pct >= 60 ? 'var(--green)' : a.pct > 0 ? 'var(--yellow)' : 'var(--line)' }} /></span>
              <span style={{ width: 46, textAlign: 'right', fontWeight: 800 }}>{a.done}/{a.total}</span>
            </div>
          ))}
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 14 }}>
            {tx({ es: 'Una barra corta no es un suspenso: sólo indica un campo que aún no ha explorado.',
                  ca: 'Una barra curta no és un suspens: només indica un camp que encara no ha explorat.' })}
          </p>
        </div>

        <div className="sheet">
          <h3>{tx({ es: 'Resumen', ca: 'Resum' })}</h3>
          <div className="row" style={{ gap: 24 }}>
            <div><b style={{ fontSize: 30 }}>{totalDone}</b><br /><small>{t('activitiesDone')}</small></div>
            <div><b style={{ fontSize: 30 }}>{state.stars}</b><br /><small>{t('stars')}</small></div>
            <div><b style={{ fontSize: 30 }}>{state.dailyMin}</b><br /><small>{t('timePlayed')} ({t('minutes')})</small></div>
          </div>
        </div>

        <div className="sheet">
          <h3>{t('language')}</h3>
          <div className="row">
            {['es', 'ca'].map(l => (
              <button key={l} className={`pill ${lang === l ? 'on' : ''}`}
                      onClick={() => setState(s => ({ ...s, lang: l }))}>
                {l === 'es' ? 'Castellano' : 'Català'}
              </button>
            ))}
          </div>
          <h3 style={{ marginTop: 18 }}>{t('childName')}</h3>
          <input className="field" value={state.name} maxLength={14}
                 onChange={e => setState(s => ({ ...s, name: e.target.value }))} />
        </div>

        <div className="sheet">
          <h3>{t('tipsTitle')}</h3>
          <ul className="tips">{TIPS.map((x, i) => <li key={i}>{tx(x)}</li>)}</ul>
        </div>

        <div className="sheet">
          <BigBtn variant="ghost" onClick={() => {
            if (window.confirm(t('resetAsk'))) { wipe(); window.location.reload() }
          }}>🗑️ {t('reset')}</BigBtn>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 12 }}>
            {tx({ es: 'Todo el progreso se guarda sólo en este dispositivo. El juego no envía datos, no tiene publicidad ni compras.',
                  ca: 'Tot el progrés es desa només en aquest dispositiu. El joc no envia dades, no té publicitat ni compres.' })}
          </p>
        </div>
      </div>
    </>
  )
}
