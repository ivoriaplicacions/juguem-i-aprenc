import { useEffect, useRef, useState } from 'react'
import { Art, P } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle } from '../lib/rnd'

/* ===========================================================
   "¡Muévete!" — motricidad gruesa guiada por la mascota.
   Ocho acciones físicas. Una cuenta atrás visual y amable
   (un círculo que se vacía) marca el ritmo, pero NUNCA hace
   perder: al acabar aparece un botón enorme "¡Hecho!".
   =========================================================== */

const ACCIONES = [
  { id: 'saltar',    art: 'saltar',      color: P.orange, seg: 7,
    texto: { es: '¡Salta 3 veces!', ca: 'Salta 3 vegades!' } },
  { id: 'girar',     art: 'girar',       color: P.purple, seg: 6,
    texto: { es: 'Gira como un tornillo', ca: "Gira com un cargol" } },
  { id: 'suelo',     art: 'tocar_suelo', color: P.blue,   seg: 6,
    texto: { es: 'Toca el suelo con las manos', ca: 'Toca el terra amb les mans' } },
  { id: 'aplaudir',  art: 'aplaudir',    color: P.pink,   seg: 7,
    texto: { es: '¡Aplaude 5 veces!', ca: 'Aplaudeix 5 vegades!' } },
  { id: 'elefante',  art: 'elefante',    color: P.green,  seg: 8,
    texto: { es: 'Camina como un elefante', ca: "Camina com un elefant" } },
  { id: 'puntillas', art: 'nino',        color: P.yellow, seg: 6,
    texto: { es: 'Ponte de puntillas, muy alto', ca: 'Posa\'t de puntetes, ben amunt' } },
  { id: 'nariz',     art: 'nino_nariz',  color: P.red,    seg: 6,
    texto: { es: 'Tócate la nariz', ca: 'Toca\'t el nas' } },
  { id: 'estatua',   art: 'mascota',     color: P.blue,   seg: 8,
    texto: { es: 'Quédate quieto como una estatua', ca: 'Queda\'t quiet com una estàtua' } }
]

const TEXTOS = {
  hecho: { es: '¡Hecho!', ca: 'Fet!' },
  animo: { es: '¡Muy bien! Ya puedes seguir', ca: 'Molt bé! Ja pots continuar' },
  espera: { es: 'Hazlo mientras el círculo se vacía', ca: 'Fes-ho mentre el cercle es buida' }
}

const R = 86                    // radio del círculo de la cuenta atrás
const PERIMETRO = 2 * Math.PI * R

export default function Muevete({ onDone }) {
  const { lang, tx } = useLang()
  // Barajamos, pero la estatua se guarda para el final (calma antes de acabar).
  const [acciones] = useState(
    () => [...shuffle(ACCIONES.filter(a => a.id !== 'estatua')), ACCIONES.find(a => a.id === 'estatua')]
  )

  const [i, setI] = useState(0)
  const [restante, setRestante] = useState(acciones[0].seg)
  const [listo, setListo] = useState(false)   // true cuando la cuenta atrás termina
  const raf = useRef(0)

  const accion = acciones[i]

  // Cuenta atrás fluida con requestAnimationFrame (no es un límite: sólo marca el ritmo).
  useEffect(() => {
    setListo(false)
    setRestante(accion.seg)
    speak(tx(accion.texto), lang)
    const inicio = performance.now()
    const total = accion.seg * 1000
    let ultimoSeg = accion.seg

    const paso = (ahora) => {
      const queda = Math.max(0, total - (ahora - inicio))
      setRestante(queda / 1000)
      const seg = Math.ceil(queda / 1000)
      if (seg !== ultimoSeg && seg > 0) { ultimoSeg = seg; sfx.pop() } // tic-tac suave
      if (queda > 0) raf.current = requestAnimationFrame(paso)
      else { sfx.drum(); setListo(true) }
    }
    raf.current = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf.current)
  }, [i]) // eslint-disable-line

  function siguiente() {
    sfx.right()
    speak(tx(TEXTOS.animo), lang)
    if (i + 1 >= acciones.length) onDone()
    else setI(i + 1)
  }

  const fraccion = restante / accion.seg          // 1 → lleno, 0 → vacío
  const segundos = Math.ceil(restante)

  return (
    <div className="stage">
      <Prompt text={accion.texto} auto={false} />

      <div className="board">
        {/* Ilustración de la acción, siempre visible y grande. */}
        <div className="rise" key={accion.id} style={{ display: 'grid', placeItems: 'center' }}>
          <Art name={accion.art} size={150} color={accion.color} />
        </div>

        {/* Cuenta atrás: un círculo que se vacía poco a poco. */}
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r={R} fill="#fffdf8" stroke="var(--line)" strokeWidth="16" />
            <circle
              cx="100" cy="100" r={R} fill="none"
              stroke={listo ? P.green : accion.color} strokeWidth="16" strokeLinecap="round"
              strokeDasharray={PERIMETRO}
              strokeDashoffset={PERIMETRO * (1 - fraccion)}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
            fontSize: listo ? 56 : 62, fontWeight: 900,
            color: listo ? P.green : accion.color
          }}>
            {listo ? '👏' : segundos}
          </div>
        </div>

        {/* Botón enorme: sólo se activa al terminar la cuenta, pero nada se pierde. */}
        {listo
          ? <BigBtn variant="green" onClick={siguiente}
              style={{ minHeight: 92, fontSize: 28, padding: '18px 44px' }}>
              {tx(TEXTOS.hecho)}
            </BigBtn>
          : <p style={{ color: 'var(--muted)', fontWeight: 700, fontSize: 17, margin: 0 }}>
              {tx(TEXTOS.espera)}
            </p>}
      </div>

      <Dots step={i} total={acciones.length} />
    </div>
  )
}
