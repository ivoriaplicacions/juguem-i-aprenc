import { useEffect, useState } from 'react'
import { Art } from '../art'
import { useLang } from '../i18n'
import { Prompt, Dots, BigBtn, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'
import { sfx } from '../lib/sound'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Sonidos de la granja — discriminación auditiva.
   Suena un sonido sintetizado (sfx.animal) seguido de la
   onomatopeya hablada, y el niño elige entre 3 animales cuál
   lo ha hecho. Hay un botón grande para repetir el sonido
   tantas veces como quiera. Nunca se pierde ni hay reloj.
   ============================================================ */

/* Cada animal tiene su ilustración, su nombre {es,ca}, su onomatopeya {es,ca}
   y un número que da color al sonido sintetizado (sfx.animal(n)):
   cuanto mayor es n, más agudo suena. */
const ANIMALES = [
  { id: 'vaca',    n: 1,  nombre: { es: 'la vaca',    ca: 'la vaca' },    onoma: { es: 'muuu',        ca: 'muuu' } },
  { id: 'perro',   n: 5,  nombre: { es: 'el perro',   ca: 'el gos' },     onoma: { es: 'guau guau',   ca: 'bup bup' } },
  { id: 'gato',    n: 9,  nombre: { es: 'el gato',    ca: 'el gat' },     onoma: { es: 'miau',        ca: 'mèu' } },
  { id: 'pato',    n: 7,  nombre: { es: 'el pato',    ca: 'l’ànec' },     onoma: { es: 'cuac cuac',   ca: 'cuac cuac' } },
  { id: 'oveja',   n: 3,  nombre: { es: 'la oveja',   ca: 'l’ovella' },   onoma: { es: 'beee',        ca: 'beee' } },
  { id: 'pajaro',  n: 12, nombre: { es: 'el pájaro',  ca: 'l’ocell' },    onoma: { es: 'pío pío',     ca: 'piu piu' } },
  { id: 'cerdo',   n: 2,  nombre: { es: 'el cerdo',   ca: 'el porc' },    onoma: { es: 'oink oink',   ca: 'oink oink' } },
  { id: 'gallina', n: 10, nombre: { es: 'la gallina', ca: 'la gallina' }, onoma: { es: 'quiquiriquí', ca: 'quiquiriquic' } },
  { id: 'rana',    n: 0,  nombre: { es: 'la rana',    ca: 'la granota' }, onoma: { es: 'croac',       ca: 'croac' } }
]

const RONDAS = 7

export default function Animales({ onDone }) {
  const { lang, tx } = useLang()

  /* Preparamos las 7 rondas una sola vez: un animal protagonista y dos
     despistes distintos, todo barajado. */
  const [rondas] = useState(() =>
    sample(ANIMALES, RONDAS).map(target => ({
      target,
      opciones: shuffle([target, ...sample(ANIMALES.filter(a => a.id !== target.id), 2)])
    }))
  )

  const [i, setI] = useState(0)
  const r = rondas[i]

  const { answer, cls } = useAnswer({
    onRight: () => (i + 1 < rondas.length ? setI(i + 1) : onDone())
  })

  /** Reproduce el sonido del animal y, justo después, su onomatopeya hablada. */
  const sonar = () => {
    sfx.animal(r.target.n)
    setTimeout(() => speak(tx(r.target.onoma), lang, { factor: 0.88, pitch: 1.35 }), 620)
  }

  // Al entrar en cada ronda suena solo, después de que se lea la consigna.
  useEffect(() => {
    const id = setTimeout(sonar, 2000)
    return () => clearTimeout(id)
  }, [i]) // eslint-disable-line

  const elegir = (a) => {
    // Al tocar decimos el nombre del animal: acierte o no, aprende la palabra.
    speak(tx(a.nombre), lang)
    setTimeout(() => answer(a.id, a.id === r.target.id), 420)
  }

  return (
    <div className="stage">
      <Prompt text={{
        es: '¿Qué animal hace este sonido? Escucha bien',
        ca: 'Quin animal fa aquest so? Escolta bé'
      }} />

      <div className="board">
        {/* Botón grande para volver a escuchar cuantas veces haga falta */}
        <BigBtn variant="purple" onClick={sonar} style={{ minHeight: 84, fontSize: 24 }}>
          🔊 {tx({ es: 'Escuchar otra vez', ca: 'Escoltar un altre cop' })}
        </BigBtn>

        {/* Los tres animales candidatos */}
        <div className="options">
          {r.opciones.map(a => (
            <button key={a.id} className={`opt ${cls(a.id)}`}
              style={{ minWidth: 132, minHeight: 132 }}
              onClick={() => elegir(a)}>
              <Art name={a.id} size={104} />
              <b>{tx(a.nombre)}</b>
            </button>
          ))}
        </div>
      </div>

      <Dots step={i} total={rondas.length} />
    </div>
  )
}
