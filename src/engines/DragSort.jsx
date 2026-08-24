import { useEffect, useRef, useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { pick } from '../lib/rnd'

/* ============================================================
   Motor "arrastra y clasifica".
   El niño arrastra cada elemento a la caja que le toca.
   El arrastre usa pointer events + setPointerCapture, así que
   funciona igual con ratón y con el dedo (la clase .drag pone
   touch-action:none para que el dedo no haga scroll).

   rounds: [{
     prompt: {es, ca},
     boxes:  [{ id, label:{es,ca}, art }],
     items:  [{ id, art, box }]      // box = id de la caja correcta
   }]
   ============================================================ */
export default function DragSort({ rounds, onDone }) {
  const { lang, t, tx } = useLang()
  const [i, setI] = useState(0)
  const [colocados, setColocados] = useState({}) // { itemId: boxId }
  const [arrastre, setArrastre] = useState(null) // { id, dx, dy }
  const cajasRef = useRef({})  // id de caja -> nodo DOM, para saber dónde se suelta
  const inicio = useRef(null)  // posición del puntero al empezar a arrastrar
  const bloqueado = useRef(false)

  const r = rounds[i]
  const pendientes = r.items.filter(it => !colocados[it.id])

  /* Cuando ya está todo colocado, pasamos de ronda (o terminamos). */
  useEffect(() => {
    if (pendientes.length > 0 || bloqueado.current) return
    bloqueado.current = true
    const id = setTimeout(() => {
      bloqueado.current = false
      if (i + 1 < rounds.length) { setColocados({}); setI(i + 1) } else onDone()
    }, 900)
    return () => { clearTimeout(id); bloqueado.current = false }
  }, [pendientes.length, i]) // eslint-disable-line

  /* ---------- arrastre con pointer events ---------- */

  const abajo = (e, item) => {
    if (colocados[item.id]) return
    e.currentTarget.setPointerCapture(e.pointerId)
    inicio.current = { x: e.clientX, y: e.clientY }
    setArrastre({ id: item.id, dx: 0, dy: 0 })
    sfx.tap()
  }

  const mover = (e, item) => {
    if (!arrastre || arrastre.id !== item.id || !inicio.current) return
    setArrastre({ id: item.id, dx: e.clientX - inicio.current.x, dy: e.clientY - inicio.current.y })
  }

  /** ¿Sobre qué caja se ha soltado el dedo/ratón? */
  const cajaBajo = (x, y) => {
    for (const caja of r.boxes) {
      const nodo = cajasRef.current[caja.id]
      if (!nodo) continue
      const b = nodo.getBoundingClientRect()
      if (x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) return caja
    }
    return null
  }

  const arriba = (e, item) => {
    if (!arrastre || arrastre.id !== item.id) return
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* ya liberado */ }
    const destino = cajaBajo(e.clientX, e.clientY)
    setArrastre(null)          // en cualquier caso, el elemento vuelve a su sitio…
    inicio.current = null
    if (!destino) return       // soltado fuera: ni premio ni castigo
    if (destino.id === item.box) {
      // …y si acierta, se queda dentro de la caja.
      sfx.right()
      speak(pick(t('wellDone')), lang)
      setColocados(c => ({ ...c, [item.id]: destino.id }))
    } else {
      sfx.wrong()
      speak(pick(t('tryAgain')), lang)
    }
  }

  return (
    <div className="stage">
      <Prompt text={r.prompt} />

      <div className="board" style={{ justifyContent: 'flex-start', width: '100%' }}>
        {/* Las cajas-categoría */}
        <div className="row" style={{ justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
          {r.boxes.map(caja => (
            <div key={caja.id} ref={el => { cajasRef.current[caja.id] = el }}
              style={{
                flex: '1 1 200px', maxWidth: 320, minHeight: 190, padding: 12,
                background: 'var(--card)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)',
                border: '5px dashed var(--line)', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6
              }}>
              <Art name={caja.art} size={64} />
              <b style={{ fontSize: 18 }}>{tx(caja.label)}</b>
              {/* Lo que ya se ha clasificado bien */}
              <div className="row" style={{ justifyContent: 'center', gap: 8 }}>
                {r.items.filter(it => colocados[it.id] === caja.id).map(it => (
                  <div key={it.id} className="rise"><Art name={it.art} size={56} /></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* La bandeja con lo que queda por colocar */}
        <div className="options" style={{ gap: 14, minHeight: 130 }}>
          {r.items.map(item => {
            if (colocados[item.id]) return null
            const act = arrastre && arrastre.id === item.id
            return (
              <div key={item.id} className="drag opt"
                role="button" aria-label={tx(item.label || { es: 'pieza', ca: 'peça' })}
                onPointerDown={e => abajo(e, item)}
                onPointerMove={e => mover(e, item)}
                onPointerUp={e => arriba(e, item)}
                onPointerCancel={e => arriba(e, item)}
                style={{
                  minWidth: 104, minHeight: 104, justifyContent: 'center', cursor: 'grab',
                  transform: act ? `translate(${arrastre.dx}px, ${arrastre.dy}px) scale(1.08)` : 'none',
                  transition: act ? 'none' : 'transform .18s ease-out',
                  zIndex: act ? 20 : 1, position: 'relative', touchAction: 'none'
                }}>
                <Art name={item.art} size={78} />
              </div>
            )
          })}
        </div>
      </div>

      <Dots step={i} total={rounds.length} />
    </div>
  )
}
