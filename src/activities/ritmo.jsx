import { useEffect, useRef, useState } from 'react'
import { Art, P } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'

/* ===========================================================
   "Repite el ritmo" — memoria auditiva y secuencial.
   Cuatro pads grandes de colores, cada uno con un instrumento.
   Seis niveles: la secuencia crece de 2 a 6 toques.
   Nunca se pierde: si se equivoca, se repite la MISMA secuencia.
   =========================================================== */

// Los cuatro pads: color, instrumento y nota (índice para sfx.note).
const PADS = [
  { id: 0, color: P.red,    art: 'tambor',   nota: 0, es: 'tambor',   ca: 'tambor' },
  { id: 1, color: P.yellow, art: 'guitarra', nota: 2, es: 'guitarra', ca: 'guitarra' },
  { id: 2, color: P.green,  art: 'trompeta', nota: 4, es: 'trompeta', ca: 'trompeta' },
  { id: 3, color: P.purple, art: 'maracas',  nota: 5, es: 'maracas',  ca: 'maraques' }
]

// Longitud de la secuencia en cada uno de los 6 niveles.
const LARGOS = [2, 2, 3, 4, 5, 6]

const TEXTOS = {
  escucha: { es: 'Escucha bien el ritmo...', ca: 'Escolta bé el ritme...' },
  repite: { es: 'Ahora repítelo tú', ca: 'Ara repeteix-ho tu' },
  bien: { es: '¡Muy bien, lo has repetido!', ca: 'Molt bé, ho has repetit!' },
  otra: { es: 'No pasa nada, escúchalo otra vez', ca: 'No passa res, escolta-ho un altre cop' },
  boton: { es: '🔁 escuchar otra vez', ca: '🔁 escoltar un altre cop' }
}

/** Genera una secuencia de `n` pads al azar. */
const crearSecuencia = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * PADS.length))

export default function Ritmo({ onDone }) {
  const { lang, tx } = useLang()
  const [nivel, setNivel] = useState(0)
  const [secuencia, setSecuencia] = useState(() => crearSecuencia(LARGOS[0]))
  const [encendido, setEncendido] = useState(null) // pad iluminado durante la reproducción
  const [reproduciendo, setReproduciendo] = useState(true)
  const [paso, setPaso] = useState(0)              // cuántos toques lleva acertados el niño
  const temporizadores = useRef([])

  const programar = (fn, ms) => { temporizadores.current.push(setTimeout(fn, ms)) }
  const limpiar = () => { temporizadores.current.forEach(clearTimeout); temporizadores.current = [] }
  useEffect(() => limpiar, [])

  /** Reproduce la secuencia iluminando y sonando pad a pad. */
  function reproducir(sec = secuencia) {
    limpiar()
    setReproduciendo(true)
    setPaso(0)
    setEncendido(null)
    speak(tx(TEXTOS.escucha), lang)
    const RITMO = 640    // ms entre toques: pausado, para que dé tiempo a seguirlo
    const ESPERA = 1500  // deja terminar la frase hablada antes de sonar
    sec.forEach((id, i) => {
      programar(() => {
        setEncendido(id)
        sfx.note(PADS[id].nota)
      }, ESPERA + i * RITMO)
      programar(() => setEncendido(null), ESPERA + i * RITMO + RITMO * 0.6)
    })
    programar(() => {
      setReproduciendo(false)
      speak(tx(TEXTOS.repite), lang)
    }, ESPERA + sec.length * RITMO + 200)
  }

  // Al entrar y cada vez que cambia el nivel, se reproduce la secuencia.
  useEffect(() => { reproducir(secuencia) }, [secuencia]) // eslint-disable-line

  function tocar(id) {
    if (reproduciendo) return
    setEncendido(id)
    sfx.note(PADS[id].nota)
    programar(() => setEncendido(null), 260)

    if (secuencia[paso] === id) {
      // Acierto parcial: avanza. Si completa la secuencia, sube de nivel.
      const sig = paso + 1
      setPaso(sig)
      if (sig === secuencia.length) {
        setReproduciendo(true) // bloquea mientras celebramos
        programar(() => {
          sfx.right()
          speak(tx(TEXTOS.bien), lang)
        }, 300)
        programar(() => {
          const nuevoNivel = nivel + 1
          if (nuevoNivel >= LARGOS.length) { onDone(); return }
          setNivel(nuevoNivel)
          setSecuencia(crearSecuencia(LARGOS[nuevoNivel])) // dispara la reproducción
        }, 1500)
      }
    } else {
      // Error: no se pierde nada, simplemente se vuelve a escuchar lo mismo.
      programar(() => {
        sfx.wrong()
        speak(tx(TEXTOS.otra), lang)
      }, 220)
      programar(() => reproducir(secuencia), 1400)
    }
  }

  return (
    <div className="stage">
      <Prompt text={reproduciendo ? TEXTOS.escucha : TEXTOS.repite} auto={false} />

      <div className="board">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, minmax(140px, 168px))',
          gap: 18, justifyContent: 'center'
        }}>
          {PADS.map(p => {
            const on = encendido === p.id
            return (
              <button
                key={p.id}
                onClick={() => tocar(p.id)}
                aria-label={tx({ es: p.es, ca: p.ca })}
                disabled={reproduciendo}
                style={{
                  width: '100%', minWidth: 140, height: 150,   // muy por encima de 72 px
                  borderRadius: 30,
                  background: p.color,
                  boxShadow: on ? `0 0 0 8px #fff, 0 0 34px ${p.color}` : 'var(--shadow)',
                  display: 'grid', placeItems: 'center',
                  transform: on ? 'scale(1.07)' : 'scale(1)',
                  filter: on ? 'brightness(1.25)' : reproduciendo ? 'brightness(.92)' : 'none',
                  transition: 'transform .16s, filter .16s, box-shadow .16s'
                }}
              >
                <Art name={p.art} size={96} />
              </button>
            )
          })}
        </div>

        {/* Botón de ayuda: siempre disponible, nunca penaliza. */}
        <BigBtn variant="ghost" onClick={() => reproducir(secuencia)}>
          {tx(TEXTOS.boton)}
        </BigBtn>

        {/* Marcas de los toques ya acertados de la secuencia actual. */}
        <div className="row" style={{ justifyContent: 'center', gap: 8 }}>
          {secuencia.map((_, i) => (
            <span key={i} style={{
              width: 18, height: 18, borderRadius: '50%',
              background: i < paso ? 'var(--green)' : 'var(--line)',
              transition: 'background .2s'
            }} />
          ))}
        </div>
      </div>

      <Dots step={nivel} total={LARGOS.length} />
    </div>
  )
}
