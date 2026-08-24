import { useEffect, useRef, useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle, range, pick } from '../lib/rnd'

/* ===========================================================
   Rompecabezas — el niño arrastra las piezas al hueco correcto.
   Truco de dibujo: cada pieza contiene la MISMA ilustración SVG
   completa dentro de un recuadro con overflow:hidden y un
   desplazamiento negativo, de forma que sólo se ve su trozo.
   Nunca se pierde: si sueltas mal, la pieza vuelve a la bandeja.
   =========================================================== */

// Tres rondas: primero 2x2 (4 piezas), luego 3x2 (6 piezas).
const ROUNDS = [
  { art: 'gato',    cols: 2, rows: 2, name: { es: 'el gato',      ca: 'el gat' } },
  { art: 'coche',   cols: 3, rows: 2, name: { es: 'el coche',     ca: 'el cotxe' } },
  { art: 'mariposa', cols: 3, rows: 2, name: { es: 'la mariposa', ca: 'la papallona' } }
]

/** Lado del tablero: cuadrado y divisible entre 2 y 3 para que las piezas encajen. */
function useBoardSize() {
  const calc = () => {
    const w = typeof window === 'undefined' ? 360 : window.innerWidth
    const h = typeof window === 'undefined' ? 640 : window.innerHeight
    const max = Math.min(w - 48, h * 0.42, 330)
    return Math.max(180, Math.floor(max / 6) * 6) // múltiplo de 6
  }
  const [size, setSize] = useState(calc)
  useEffect(() => {
    const on = () => setSize(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return size
}

export default function Puzzle({ onDone }) {
  const { lang, tx, t } = useLang()
  const B = useBoardSize()

  const [i, setI] = useState(0)
  const round = ROUNDS[i]
  const { cols, rows, art } = round
  const total = cols * rows
  const pw = B / cols
  const ph = B / rows

  const [placed, setPlaced] = useState([])          // ids ya colocados
  const [tray, setTray] = useState(() => shuffle(range(total))) // orden desordenado
  const [drag, setDrag] = useState(null)            // {id, x, y, dx, dy}
  const slotRefs = useRef({})                       // índice -> nodo DOM del hueco
  const busy = useRef(false)                        // evita dobles avances de ronda

  // Al cambiar de ronda, se reparten las piezas de nuevo.
  useEffect(() => {
    setPlaced([])
    setTray(shuffle(range(cols * rows)))
    setDrag(null)
    busy.current = false
  }, [i]) // eslint-disable-line

  /** Dibuja el trozo `id` de la ilustración (fila = id/cols, columna = id%cols). */
  const Piece = ({ id, w = pw, h = ph }) => {
    const c = id % cols
    const r = Math.floor(id / cols)
    return (
      <div style={{ width: w, height: h, overflow: 'hidden', position: 'relative', borderRadius: 10 }}>
        <div style={{ position: 'absolute', left: -c * w, top: -r * h, width: w * cols, height: h * rows }}>
          <Art name={art} size={w * cols} />
        </div>
      </div>
    )
  }

  // ---------- Arrastre con pointer events (ratón y dedo) ----------
  const onDown = (e, id) => {
    if (busy.current) return
    const el = e.currentTarget
    try { el.setPointerCapture(e.pointerId) } catch { /* algunos navegadores viejos */ }
    const r = el.getBoundingClientRect()
    setDrag({ id, x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top })
    sfx.tap()
  }

  const onMove = (e) => {
    if (!drag) return
    e.preventDefault()
    setDrag(d => (d ? { ...d, x: e.clientX, y: e.clientY } : d))
  }

  const onUp = () => {
    if (!drag) return
    const d = drag
    setDrag(null)
    // Centro de la pieza en el momento de soltarla.
    const cx = d.x - d.dx + pw / 2
    const cy = d.y - d.dy + ph / 2
    const slot = slotRefs.current[d.id]
    const tol = Math.max(pw, ph) * 0.95 // encaje generoso: basta con acercarse
    if (slot) {
      const r = slot.getBoundingClientRect()
      const dist = Math.hypot(cx - (r.left + r.width / 2), cy - (r.top + r.height / 2))
      if (dist < tol) { place(d.id); return }
    }
    // Ha caído lejos: ánimo y a intentarlo otra vez, sin penalización.
    sfx.wrong()
    speak(pick(t('tryAgain')), lang)
  }

  /** Coloca la pieza en su hueco y comprueba si la ronda está completa. */
  const place = (id) => {
    sfx.pop()
    const next = [...placed, id]
    setPlaced(next)
    setTray(tr => tr.filter(x => x !== id))
    if (next.length === total && !busy.current) {
      busy.current = true
      sfx.right()
      speak(pick(t('wellDone')), lang)
      setTimeout(() => {
        if (i + 1 < ROUNDS.length) setI(i + 1)
        else onDone()
      }, 1100)
    }
  }

  return (
    <div className="stage">
      <Prompt text={{
        es: `Arrastra las piezas y monta ${tx(round.name)}`,
        ca: `Arrossega les peces i munta ${tx(round.name)}`
      }} />

      <div className="board">
        {/* Tablero de huecos (siluetas) */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${cols}, ${pw}px)`,
          gridTemplateRows: `repeat(${rows}, ${ph}px)`, gap: 0,
          borderRadius: 22, overflow: 'hidden', background: '#fffdf8',
          boxShadow: 'var(--shadow)'
        }}>
          {range(total).map(id => {
            const ok = placed.includes(id)
            return (
              <div key={id} ref={el => (slotRefs.current[id] = el)}
                className={`slot ${ok ? 'filled' : ''}`}
                style={{ width: pw, height: ph, borderRadius: 12, padding: 0, overflow: 'hidden' }}>
                {ok && <Piece id={id} />}
              </div>
            )
          })}
        </div>

        {/* Bandeja de piezas sueltas */}
        <div className="row" style={{ justifyContent: 'center', minHeight: ph + 16 }}>
          {tray.map(id => (
            <div key={id} className="drag rise"
              style={{
                borderRadius: 14, boxShadow: 'var(--shadow)', background: '#fff',
                overflow: 'hidden', cursor: 'grab',
                opacity: drag && drag.id === id ? 0.25 : 1
              }}
              onPointerDown={e => onDown(e, id)}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}>
              <Piece id={id} />
            </div>
          ))}
        </div>
      </div>

      {/* Pieza fantasma que sigue al dedo o al ratón */}
      {drag && (
        <div className="drag" style={{
          position: 'fixed', left: drag.x - drag.dx, top: drag.y - drag.dy,
          pointerEvents: 'none', zIndex: 100, borderRadius: 14, overflow: 'hidden',
          background: '#fff', boxShadow: '0 10px 24px rgba(0,0,0,.28)',
          transform: 'scale(1.06)'
        }}>
          <Piece id={drag.id} />
        </div>
      )}

      <Dots step={i} total={ROUNDS.length} />
    </div>
  )
}
