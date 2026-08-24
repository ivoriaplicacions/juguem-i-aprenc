import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { Prompt, Dots } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { pick } from '../lib/rnd'

/* ===========================================================
   Sigue el camino — grafomotricidad.
   Cada ronda dibuja un camino punteado formado por puntos de
   control en coordenadas normalizadas (0..1). Cuando el dedo
   pasa cerca de un punto se marca (pop). Al marcar el 85% de
   los puntos la ronda se supera. Nunca se pierde ni hay reloj.
   =========================================================== */

// ---------- Generadores de caminos (listas de puntos 0..1) ----------
const muestrear = (n, f) => Array.from({ length: n }, (_, i) => f(i / (n - 1)))

const linea = muestrear(14, u => [0.08 + u * 0.84, 0.5])
const ola = muestrear(26, u => [0.08 + u * 0.84, 0.5 - Math.sin(u * Math.PI * 2) * 0.28])
const zigzag = muestrear(25, u => {
  const x = 0.08 + u * 0.84
  const s = (u * 4) % 1                   // diente de sierra
  const sube = Math.floor(u * 4) % 2 === 0
  return [x, sube ? 0.78 - s * 0.56 : 0.22 + s * 0.56]
})
const circulo = muestrear(28, u => [
  0.5 + Math.sin(u * Math.PI * 2) * 0.33,
  0.5 - Math.cos(u * Math.PI * 2) * 0.36
])
// Letra L: baja y luego a la derecha (dos tramos, un solo trazo).
const letraL = [
  ...muestrear(11, u => [0.3, 0.12 + u * 0.64]),
  ...muestrear(9, u => [0.3 + u * 0.42, 0.76])
]
// Letra O: óvalo empezando arriba.
const letraO = muestrear(26, u => [
  0.5 + Math.sin(u * Math.PI * 2) * 0.26,
  0.46 - Math.cos(u * Math.PI * 2) * 0.34
])
// Letra A: dos diagonales y la barra (tres trazos separados).
const letraA = [
  muestrear(11, u => [0.5 - u * 0.22, 0.14 + u * 0.68]),
  muestrear(11, u => [0.5 + u * 0.22, 0.14 + u * 0.68]),
  muestrear(6, u => [0.36 + u * 0.28, 0.6])
]

/** Cada ronda: subcaminos (lista de listas de puntos) + consigna. */
const ROUNDS = [
  { paths: [linea],   prompt: { es: 'Sigue el camino recto con el dedo', ca: 'Segueix el camí recte amb el dit' } },
  { paths: [ola],     prompt: { es: 'Sigue las olas del mar',            ca: 'Segueix les ones del mar' } },
  { paths: [zigzag],  prompt: { es: 'Sube y baja por la montaña',        ca: 'Puja i baixa per la muntanya' } },
  { paths: [letraL],  prompt: { es: 'Repasa la letra L',                 ca: 'Repassa la lletra L' } },
  { paths: [letraO],  prompt: { es: 'Repasa la letra O',                 ca: 'Repassa la lletra O' } },
  { paths: [circulo], prompt: { es: 'Da la vuelta al círculo',           ca: 'Dona la volta al cercle' } },
  { paths: letraA,    prompt: { es: 'Repasa la letra A',                 ca: 'Repassa la lletra A' } }
]

const META = 0.85 // porcentaje de puntos necesario para superar la ronda

export default function Trazos({ onDone }) {
  const { lang, tx, t } = useLang()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const sizeRef = useRef({ w: 320, h: 320 })

  const [i, setI] = useState(0)
  const round = ROUNDS[i]

  const puntos = useRef([])     // [{x, y, done, sub}] en píxeles CSS
  const trazo = useRef([])      // trazo libre del niño (para pintarlo)
  const dibujando = useRef(false)
  const busy = useRef(false)    // ronda ya superada, esperando a la siguiente
  const [hechos, setHechos] = useState(0)

  // ---------- Preparar lienzo y puntos ----------
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = Math.max(160, wrap.clientWidth)
      const h = Math.max(160, wrap.clientHeight)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctxRef.current = ctx
      sizeRef.current = { w, h }
      reparte(w, h)
      pinta()
    }

    /** Convierte los puntos normalizados de la ronda a píxeles. */
    const reparte = (w, h) => {
      const lista = []
      round.paths.forEach((sub, s) => sub.forEach(([nx, ny]) => {
        lista.push({ x: nx * w, y: ny * h, done: false, sub: s })
      }))
      puntos.current = lista
      trazo.current = []
    }

    resize()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    if (ro) ro.observe(wrap)
    window.addEventListener('resize', resize)
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', resize) }
  }, [i]) // eslint-disable-line

  // Al cambiar de ronda se reinicia el contador.
  useEffect(() => { setHechos(0); busy.current = false }, [i])

  // ---------- Pintado ----------
  const pinta = () => {
    const ctx = ctxRef.current
    if (!ctx) return
    const { w, h } = sizeRef.current
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)

    const puntosSub = (s) => puntos.current.filter(p => p.sub === s)

    // Camino punteado gris, un trazo por subcamino.
    ctx.setLineDash([12, 14])
    ctx.lineWidth = 26
    ctx.strokeStyle = '#efe4d3'
    round.paths.forEach((_, s) => {
      const ps = puntosSub(s)
      if (!ps.length) return
      ctx.beginPath()
      ps.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
      ctx.stroke()
    })
    ctx.setLineDash([])

    // Puntos de control: verdes cuando ya se han pisado.
    puntos.current.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.done ? 8 : 6, 0, Math.PI * 2)
      ctx.fillStyle = p.done ? '#06d6a0' : '#cfc4b0'
      ctx.fill()
    })

    // Salida de cada subcamino, bien visible.
    round.paths.forEach((_, s) => {
      const ps = puntosSub(s)
      if (!ps.length) return
      const p = ps[0]
      ctx.beginPath()
      ctx.arc(p.x, p.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = '#ffd166'
      ctx.fill()
      ctx.fillStyle = '#33313b'
      ctx.font = 'bold 20px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('▶', p.x, p.y)
    })

    // Trazo del niño encima, en morado.
    if (trazo.current.length > 1) {
      ctx.strokeStyle = '#9b5de5'
      ctx.lineWidth = 10
      ctx.beginPath()
      trazo.current.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
      ctx.stroke()
    }
  }

  // ---------- Interacción ----------
  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  /** Distancia de un punto al segmento a-b (para no saltarse puntos si el dedo va rápido). */
  const distSeg = (p, a, b) => {
    const vx = b.x - a.x, vy = b.y - a.y
    const len = vx * vx + vy * vy
    let u = len ? ((p.x - a.x) * vx + (p.y - a.y) * vy) / len : 0
    u = Math.max(0, Math.min(1, u))
    return Math.hypot(p.x - (a.x + vx * u), p.y - (a.y + vy * u))
  }

  /** Marca los puntos que ha tocado el recorrido a->b. */
  const marca = (a, b) => {
    if (busy.current) return
    const tol = 28
    let nuevos = 0
    puntos.current.forEach(p => {
      if (!p.done && distSeg(p, a, b) < tol) { p.done = true; nuevos++ }
    })
    if (!nuevos) return
    sfx.pop()
    const total = puntos.current.length
    const done = puntos.current.filter(p => p.done).length
    setHechos(done)
    if (done / total >= META && !busy.current) {
      busy.current = true
      sfx.right()
      speak(pick(t('wellDone')), lang)
      setTimeout(() => {
        if (i + 1 < ROUNDS.length) setI(i + 1)
        else onDone()
      }, 1100)
    }
  }

  const onDown = (e) => {
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
    dibujando.current = true
    const p = pos(e)
    trazo.current = [p]
    marca(p, p)
    pinta()
  }

  const onMove = (e) => {
    if (!dibujando.current) return
    e.preventDefault()
    const p = pos(e)
    const prev = trazo.current[trazo.current.length - 1] || p
    trazo.current.push(p)
    marca(prev, p)
    pinta()
  }

  const onUp = () => {
    dibujando.current = false
    // El trazo libre se borra al levantar el dedo, pero los puntos ya marcados se quedan.
    trazo.current = []
    pinta()
  }

  // Repintar cuando cambia el progreso (por si React re-renderiza).
  useEffect(() => { pinta() }, [hechos]) // eslint-disable-line

  const total = puntos.current.length || 1

  return (
    <div className="stage">
      <Prompt text={round.prompt} extra={
        <b style={{ fontSize: 20 }}>{Math.round((hechos / total) * 100)}%</b>
      } />

      <div ref={wrapRef} className="canvasWrap grow" style={{ minHeight: 260 }}>
        <canvas ref={canvasRef} className="drag" style={{ display: 'block', cursor: 'crosshair' }}
          onPointerDown={onDown} onPointerMove={onMove}
          onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp} />
      </div>

      <Dots step={i} total={ROUNDS.length} />
    </div>
  )
}
