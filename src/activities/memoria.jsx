import { useEffect, useRef, useState } from 'react'
import { Art, P } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle, sample } from '../lib/rnd'

/* ===========================================================
   "Busca la pareja" — memoria clásica con ilustraciones.
   Tres rondas: 6, 8 y 12 cartas (3, 4 y 6 parejas).
   Nunca se pierde: no hay contador de fallos ni tiempo.
   =========================================================== */

// Dibujos alegres y bien diferenciados entre sí.
const BARAJA = [
  'gato', 'perro', 'pato', 'rana', 'abeja', 'pez',
  'mariposa', 'sol', 'luna', 'flor', 'estrella_cielo', 'pelota',
  'manzana', 'platano', 'fresa', 'coche'
]

// Colores de fondo del dorso de las cartas, para que la mesa sea alegre.
const DORSOS = [P.blue, P.purple, P.pink, P.orange, P.green, P.red]

// Número de parejas de cada ronda.
const RONDAS = [3, 4, 6]

const TEXTOS = {
  consigna: { es: 'Busca las parejas iguales', ca: 'Busca les parelles iguals' },
  bien: { es: '¡Una pareja!', ca: 'Una parella!' },
  animo: { es: 'Casi... prueba con otra', ca: 'Gairebé... prova amb una altra' },
  ronda: { es: 'Otra vez, ahora con más cartas', ca: 'Un altre cop, ara amb més cartes' }
}

/** Crea el mazo barajado de una ronda: cada dibujo aparece dos veces. */
function crearMazo(parejas) {
  const dibujos = sample(BARAJA, parejas)
  const cartas = []
  dibujos.forEach((art, n) => {
    cartas.push({ id: `${art}-a`, art, n })
    cartas.push({ id: `${art}-b`, art, n })
  })
  return shuffle(cartas)
}

export default function Memoria({ onDone }) {
  const { lang, tx } = useLang()
  const [ronda, setRonda] = useState(0)
  const [mazo, setMazo] = useState(() => crearMazo(RONDAS[0]))
  const [abiertas, setAbiertas] = useState([])   // ids destapados ahora mismo (0, 1 o 2)
  const [halladas, setHalladas] = useState([])   // ids ya emparejados (se quedan boca arriba)
  const bloqueado = useRef(false)                // evita destapar una tercera carta
  const temporizadores = useRef([])

  // Limpia los temporizadores pendientes al desmontar o cambiar de ronda.
  const programar = (fn, ms) => { temporizadores.current.push(setTimeout(fn, ms)) }
  useEffect(() => () => temporizadores.current.forEach(clearTimeout), [])

  const estaVisible = (c) => abiertas.includes(c.id) || halladas.includes(c.id)

  function tocar(carta) {
    if (bloqueado.current) return
    if (estaVisible(carta)) return          // ya está boca arriba: no hace nada
    sfx.pop()
    const nuevas = [...abiertas, carta.id]
    setAbiertas(nuevas)
    if (nuevas.length < 2) return

    // Con dos cartas destapadas comprobamos si son iguales.
    bloqueado.current = true
    const [a, b] = nuevas.map(id => mazo.find(c => c.id === id))
    if (a.art === b.art) {
      programar(() => {
        sfx.right()
        speak(tx(TEXTOS.bien), lang)
        const todas = [...halladas, a.id, b.id]
        setHalladas(todas)
        setAbiertas([])
        bloqueado.current = false
        // ¿Ronda completa?
        if (todas.length === mazo.length) programar(() => siguienteRonda(), 900)
      }, 320)
    } else {
      // Se vuelven a tapar solas tras 900 ms, con un sonido suave y ánimo.
      programar(() => {
        sfx.wrong()
        speak(tx(TEXTOS.animo), lang)
        setAbiertas([])
        bloqueado.current = false
      }, 900)
    }
  }

  function siguienteRonda() {
    const sig = ronda + 1
    if (sig >= RONDAS.length) { onDone(); return }
    setRonda(sig)
    setMazo(crearMazo(RONDAS[sig]))
    setHalladas([])
    setAbiertas([])
    bloqueado.current = false
    speak(tx(TEXTOS.ronda), lang)
  }

  // Cartas grandes, pero algo más pequeñas cuando hay doce en la mesa.
  const lado = mazo.length > 8 ? 112 : 132
  const columnas = mazo.length <= 6 ? 3 : mazo.length <= 8 ? 4 : 4

  return (
    <div className="stage">
      <Prompt text={TEXTOS.consigna} />

      <div className="board">
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columnas}, ${lado}px)`,
          gap: 14,
          justifyContent: 'center'
        }}>
          {mazo.map(carta => {
            const visible = estaVisible(carta)
            const hallada = halladas.includes(carta.id)
            return (
              <button
                key={carta.id}
                onClick={() => tocar(carta)}
                aria-label={visible ? carta.art : 'carta'}
                style={{
                  width: lado, height: lado,          // objetivo táctil muy por encima de 72 px
                  padding: 0, background: 'none',
                  perspective: 700,
                  opacity: hallada ? 0.92 : 1,
                  transition: 'opacity .3s'
                }}
              >
                {/* Contenedor que gira: dorso delante, dibujo detrás. */}
                <div style={{
                  position: 'relative', width: '100%', height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform .45s cubic-bezier(.4,1.6,.5,1)',
                  transform: visible ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}>
                  {/* Dorso */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 26,
                    background: DORSOS[carta.n % DORSOS.length],
                    boxShadow: 'var(--shadow)',
                    display: 'grid', placeItems: 'center',
                    fontSize: lado * 0.42, color: '#fff',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'
                  }}>?</div>
                  {/* Cara con la ilustración */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 26,
                    background: 'var(--card)',
                    boxShadow: 'var(--shadow)',
                    border: `5px solid ${hallada ? 'var(--green)' : 'transparent'}`,
                    display: 'grid', placeItems: 'center',
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'
                  }}>
                    <Art name={carta.art} size={lado * 0.72} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <Dots step={ronda} total={RONDAS.length} />
    </div>
  )
}
