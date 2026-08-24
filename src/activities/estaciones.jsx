import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   Las cuatro estaciones — el año da vueltas.
   ¿Qué tiempo hace? habla del día de hoy; ésta habla del año
   entero, que es un tiempo mucho más largo del que un niño de
   cinco años puede tener en la cabeza de golpe. Se aprende por
   las señales: la nieve, las flores, el sol fuerte, el viento.
   ============================================================ */

const ESTACIONES = [
  { id: 'invierno',  art: 'nieve',  es: 'el invierno',  ca: "l'hivern" },
  { id: 'primavera', art: 'flor',   es: 'la primavera', ca: 'la primavera' },
  { id: 'verano',    art: 'sol',    es: 'el verano',    ca: "l'estiu" },
  { id: 'otono',     art: 'viento', es: 'el otoño',     ca: 'la tardor' }
]

const PISTAS = [
  { id: 'invierno',  es: 'Hace mucho frío y todo se cubre de blanco', ca: 'Fa molt fred i tot es cobreix de blanc' },
  { id: 'primavera', es: 'Se abren las flores y salen las mariposas', ca: 'S\'obren les flors i surten les papallones' },
  { id: 'verano',    es: 'Aprieta el calor y vamos a la playa',       ca: 'Estreny la calor i anem a la platja' },
  { id: 'otono',     es: 'Sopla el viento y caen las hojas',          ca: 'Bufa el vent i cauen les fulles' },
  { id: 'invierno',  es: 'Nos ponemos gorro, bufanda y guantes',      ca: 'Ens posem gorro, bufanda i guants' },
  { id: 'verano',    es: 'Los días son larguísimos y anochece tarde', ca: 'Els dies són llarguíssims i es fa fosc tard' }
]

export default function Estaciones({ onDone }) {
  const rounds = shuffle(PISTAS).map(p => {
    const buena = ESTACIONES.find(e => e.id === p.id)
    const otras = sample(ESTACIONES.filter(e => e.id !== p.id), 2)
    return {
      prompt: { es: `${p.es}. ¿Qué estación es?`, ca: `${p.ca}. Quina estació és?` },
      options: shuffle([buena, ...otras]).map(e => ({
        key: e.id, art: e.art, ok: e.id === p.id, label: { es: e.es, ca: e.ca }
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
