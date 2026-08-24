import { useEffect, useRef, useState } from 'react'
import { Art, P } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'

/* ===========================================================
   "Respira conmigo" — autorregulación y calma.
   Una flor grande que se hincha 4 s (inspira), se mantiene 2 s
   (aguanta) y se deshincha 6 s (espira). Cinco respiraciones.
   No hay aciertos ni errores: sólo acompañar el ritmo.
   =========================================================== */

const RESPIRACIONES = 5

// Las tres fases del ciclo, con su duración en milisegundos.
const FASES = [
  { id: 'inspira', ms: 4000, art: 'flor', color: P.green,
    texto: { es: 'Coge aire por la nariz...', ca: "Agafa aire pel nas..." } },
  { id: 'aguanta', ms: 2000, art: 'cara_tranquila', color: P.yellow,
    texto: { es: 'Aguanta un poquito...', ca: 'Aguanta una miqueta...' } },
  { id: 'espira', ms: 6000, art: 'nube', color: P.sky,
    texto: { es: 'Suelta el aire por la boca...', ca: "Deixa anar l'aire per la boca..." } }
]

const TEXTOS = {
  fin: { es: 'Tu cuerpo está tranquilo y suave. ¡Qué bien se está así!',
         ca: 'El teu cos està tranquil i suau. Que bé s\'hi està!' },
  botonFin: { es: '🌼 Ya estoy en calma', ca: '🌼 Ja estic en calma' },
  quedan: { es: 'respiraciones', ca: 'respiracions' }
}

// Colores suaves de fondo para cada fase (nada estridente).
const FONDOS = { inspira: '#e6f7f0', aguanta: '#fff5dc', espira: '#e8f2fb' }

export default function Calma({ onDone }) {
  const { lang, tx } = useLang()
  const [ciclo, setCiclo] = useState(0)     // respiración actual (0..RESPIRACIONES)
  const [fase, setFase] = useState(0)       // índice dentro de FASES
  const [escala, setEscala] = useState(0.5) // 0.5 = pequeña, 1 = hinchada
  const [terminado, setTerminado] = useState(false)
  const raf = useRef(0)

  const f = FASES[fase]

  // Cada fase anima la escala de la flor con requestAnimationFrame, para
  // que el movimiento sea continuo y suave (sin saltos entre fases).
  useEffect(() => {
    if (terminado) return
    speak(tx(f.texto), lang)
    if (f.id === 'inspira') sfx.note(0)
    if (f.id === 'espira') sfx.note(2)

    const desde = f.id === 'inspira' ? 0.5 : f.id === 'espira' ? 1 : 1
    const hasta = f.id === 'inspira' ? 1 : f.id === 'espira' ? 0.5 : 1
    const inicio = performance.now()

    const paso = (ahora) => {
      const p = Math.min(1, (ahora - inicio) / f.ms)
      // Suavizado tipo "coseno": arranca y termina despacio, como el aliento.
      const s = (1 - Math.cos(p * Math.PI)) / 2
      setEscala(desde + (hasta - desde) * s)
      if (p < 1) { raf.current = requestAnimationFrame(paso); return }
      // Fin de fase: pasamos a la siguiente o cerramos la respiración.
      if (fase + 1 < FASES.length) setFase(fase + 1)
      else {
        const hechas = ciclo + 1
        if (hechas >= RESPIRACIONES) setTerminado(true)
        else { setCiclo(hechas); setFase(0) }
      }
    }
    raf.current = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf.current)
  }, [fase, ciclo, terminado]) // eslint-disable-line

  // Frase amable final: se dice en voz alta una sola vez.
  useEffect(() => {
    if (!terminado) return
    sfx.win()
    speak(tx(TEXTOS.fin), lang)
  }, [terminado]) // eslint-disable-line

  const quedan = RESPIRACIONES - ciclo - (terminado ? 1 : 0)

  return (
    <div className="stage">
      <Prompt text={terminado ? TEXTOS.fin : f.texto} auto={false} />

      <div className="board" style={{
        background: terminado ? '#eef7ee' : FONDOS[f.id],
        borderRadius: 'var(--radius)',
        transition: 'background 1.2s ease',
        padding: 18, width: '100%'
      }}>
        {/* La flor que respira: un halo suave y la ilustración de la fase. */}
        <div style={{
          width: 280, height: 280, display: 'grid', placeItems: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            width: 260, height: 260, borderRadius: '50%',
            background: 'rgba(255,255,255,.85)',
            boxShadow: `0 0 0 ${8 + escala * 16}px rgba(255,255,255,.45)`,
            transform: `scale(${terminado ? 0.9 : escala})`,
            // Sin transición CSS: la escala ya viene animada fotograma a fotograma.
            display: 'grid', placeItems: 'center'
          }}>
            <Art name={terminado ? 'cara_tranquila' : f.art} size={170} color={f.color} />
          </div>
        </div>

        {/* Palabra grande de la fase: inspira / aguanta / espira. */}
        {!terminado && (
          <b style={{ fontSize: 30, color: P.ink, letterSpacing: 1 }}>
            {tx({
              inspira: { es: 'INSPIRA', ca: 'INSPIRA' },
              aguanta: { es: 'AGUANTA', ca: 'AGUANTA' },
              espira: { es: 'ESPIRA', ca: 'ESPIRA' }
            }[f.id])}
          </b>
        )}

        {/* Cuántas respiraciones quedan, en pétalos. */}
        <div className="row" style={{ justifyContent: 'center', gap: 10 }}>
          {Array.from({ length: RESPIRACIONES }).map((_, i) => (
            <span key={i} style={{
              fontSize: 26, opacity: i < RESPIRACIONES - quedan ? 1 : 0.3,
              transition: 'opacity .6s'
            }}>🌸</span>
          ))}
        </div>
        {!terminado && (
          <small style={{ color: 'var(--muted)', fontWeight: 700, fontSize: 16 }}>
            {quedan} {tx(TEXTOS.quedan)}
          </small>
        )}

        {/* Al acabar, botón enorme para volver. Nunca se pierde ni se corre. */}
        {terminado && (
          <BigBtn variant="green" onClick={onDone}
            style={{ minHeight: 92, fontSize: 26, padding: '18px 40px' }}>
            {tx(TEXTOS.botonFin)}
          </BigBtn>
        )}
      </div>

      <Dots step={terminado ? RESPIRACIONES : ciclo} total={RESPIRACIONES} />
    </div>
  )
}
