import { useEffect, useRef, useState } from 'react'
import { Art, P } from '../art'
import { useLang } from '../i18n'
import { Prompt, BigBtn, IconBtn } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'

/* ===========================================================
   Pizarra mágica — dibujo libre con el dedo o el ratón.
   Colores, tres grosores, goma, borrar todo, sellos con
   ilustraciones del juego y guardado en PNG.
   No hay reto ni fin: el niño toca "Ya está" cuando quiere.
   =========================================================== */

// Ocho colores de la paleta del juego (más el negro tinta).
const COLORES = [P.red, P.orange, P.yellow, P.green, P.blue, P.purple, P.pink, P.ink]

// Tres grosores muy diferenciados.
const GROSORES = [
  { id: 's', w: 8,  emoji: '·' },
  { id: 'm', w: 18, emoji: '●' },
  { id: 'l', w: 34, emoji: '⬤' }
]

// Sellos disponibles: se estampan como imagen a partir del SVG.
const SELLOS = ['sol', 'estrella_cielo', 'flor', 'nube', 'mariposa', 'pelota']

export default function Dibujar({ onDone }) {
  const { lang, tx } = useLang()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)

  const [color, setColor] = useState(P.blue)
  const [grosor, setGrosor] = useState(GROSORES[1])
  const [goma, setGoma] = useState(false)
  const [sello, setSello] = useState(null)      // nombre del sello activo o null
  const selloRefs = useRef({})                  // nombre -> nodo que contiene el <svg>
  const imgCache = useRef({})                   // nombre -> HTMLImageElement ya cargada

  // ---------- Lienzo: tamaño del contenedor y densidad de pantalla ----------
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = Math.max(120, wrap.clientWidth)
      const h = Math.max(120, wrap.clientHeight)
      // Se conserva lo dibujado copiando el lienzo anterior.
      let copia = null
      if (canvas.width > 0 && canvas.height > 0) {
        copia = document.createElement('canvas')
        copia.width = canvas.width; copia.height = canvas.height
        copia.getContext('2d').drawImage(canvas, 0, 0)
      }
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, w, h)
      if (copia) ctx.drawImage(copia, 0, 0, w, h)
      ctxRef.current = ctx
    }

    resize()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    if (ro) ro.observe(wrap)
    window.addEventListener('resize', resize)
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', resize) }
  }, [])

  /** Coordenadas del puntero dentro del lienzo, en píxeles CSS. */
  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  // ---------- Sellos: SVG -> imagen -> lienzo ----------
  const estampar = (name, x, y) => {
    const ctx = ctxRef.current
    if (!ctx) return
    const dibuja = (img) => {
      const s = 130
      try { ctx.drawImage(img, x - s / 2, y - s / 2, s, s) } catch { /* imagen no válida */ }
    }
    const cache = imgCache.current[name]
    if (cache) { dibuja(cache); sfx.pop(); return }
    const host = selloRefs.current[name]
    const svg = host && host.querySelector('svg')
    if (!svg) return
    try {
      const txt = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([txt], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.onload = () => { imgCache.current[name] = img; dibuja(img); sfx.pop(); URL.revokeObjectURL(url) }
      img.onerror = () => URL.revokeObjectURL(url)
      img.src = url
    } catch { /* si el navegador no deja serializar, el sello simplemente no sale */ }
  }

  // ---------- Trazo ----------
  const onDown = (e) => {
    const ctx = ctxRef.current
    if (!ctx) return
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
    const p = pos(e)
    if (sello) { estampar(sello, p.x, p.y); return }
    drawing.current = true
    last.current = p
    // Un punto suelto para que un simple toque también pinte.
    ctx.beginPath()
    ctx.fillStyle = goma ? '#fff' : color
    ctx.arc(p.x, p.y, (goma ? grosor.w * 2 : grosor.w) / 2, 0, Math.PI * 2)
    ctx.fill()
  }

  const onMove = (e) => {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = ctxRef.current
    const p = pos(e)
    ctx.strokeStyle = goma ? '#fff' : color
    ctx.lineWidth = goma ? grosor.w * 2 : grosor.w
    ctx.beginPath()
    ctx.moveTo(last.current.x, last.current.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
  }

  const onUp = () => { drawing.current = false; last.current = null }

  const borrarTodo = () => {
    const ctx = ctxRef.current
    const c = canvasRef.current
    if (!ctx || !c) return
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, c.clientWidth, c.clientHeight)
    sfx.drum()
    speak(tx({ es: '¡Pizarra limpia!', ca: 'Pissarra neta!' }), lang)
  }

  /** Descarga el dibujo como PNG. Envuelto en try/catch: en algunos
      navegadores empotrados la descarga no está permitida. */
  const guardar = () => {
    try {
      const url = canvasRef.current.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'dibujo.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      sfx.right()
    } catch {
      sfx.wrong()
    }
  }

  const elegirColor = (c) => { setColor(c); setGoma(false); setSello(null); sfx.tap() }

  return (
    <div className="stage">
      <Prompt text={{ es: '¡Dibuja lo que quieras!', ca: 'Dibuixa el que vulguis!' }} />

      {/* Paleta de colores */}
      <div className="row" style={{ justifyContent: 'center' }}>
        {COLORES.map(c => (
          <button key={c} aria-label="color"
            className={`swatch ${!goma && !sello && color === c ? 'on' : ''}`}
            style={{ background: c }}
            onClick={() => elegirColor(c)} />
        ))}
      </div>

      {/* Grosores, goma y borrar */}
      <div className="row" style={{ justifyContent: 'center' }}>
        {GROSORES.map(g => (
          <IconBtn key={g.id} label={tx({ es: 'grosor', ca: 'gruix' })}
            onClick={() => { setGrosor(g); setSello(null) }}>
            <span style={{
              fontSize: 10 + g.w, lineHeight: 1,
              color: grosor.id === g.id ? 'var(--blue)' : 'var(--muted)'
            }}>●</span>
          </IconBtn>
        ))}
        <IconBtn label={tx({ es: 'goma', ca: 'goma' })}
          onClick={() => { setGoma(!goma); setSello(null) }}>
          <span style={{ filter: goma ? 'none' : 'grayscale(1)' }}>🧽</span>
        </IconBtn>
        <IconBtn label={tx({ es: 'borrar todo', ca: 'esborrar-ho tot' })} onClick={borrarTodo}>🗑️</IconBtn>
        <IconBtn label={tx({ es: 'guardar', ca: 'desar' })} onClick={guardar}>💾</IconBtn>
      </div>

      {/* Sellos */}
      <div className="row" style={{ justifyContent: 'center' }}>
        {SELLOS.map(n => (
          <button key={n} aria-label={n}
            onClick={() => { setSello(sello === n ? null : n); setGoma(false); sfx.tap() }}
            style={{
              width: 72, height: 72, borderRadius: 22, background: '#fff',
              boxShadow: 'var(--shadow)', display: 'grid', placeItems: 'center',
              outline: sello === n ? '4px solid var(--ink)' : 'none', outlineOffset: 2
            }}>
            <Art name={n} size={52} />
          </button>
        ))}
      </div>

      {/* Lienzo */}
      <div ref={wrapRef} className="canvasWrap grow" style={{ minHeight: 220 }}>
        <canvas ref={canvasRef} className="drag" style={{ display: 'block', cursor: 'crosshair' }}
          onPointerDown={onDown} onPointerMove={onMove}
          onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp} />
      </div>

      <div className="row" style={{ justifyContent: 'center' }}>
        <BigBtn variant="green" onClick={onDone}>✅ {tx({ es: 'Ya está', ca: 'Ja està' })}</BigBtn>
      </div>

      {/* Copias ocultas de los SVG: sirven de origen para los sellos */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}>
        {SELLOS.map(n => (
          <span key={n} ref={el => (selloRefs.current[n] = el)}>
            <Art name={n} size={130} />
          </span>
        ))}
      </div>
    </div>
  )
}
