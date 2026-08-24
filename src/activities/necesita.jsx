import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Qué necesita? — de la emoción al cuidado.
   Reconocer que alguien está cansado es la mitad; la otra mitad
   es saber qué hacer con eso. Aquí se ve una cara o una escena y
   se busca lo que hace falta: la cama, el agua, la comida, el
   abrazo. Cuidar de otro empieza por darse cuenta.
   ============================================================ */

const CASOS = [
  { cara: 'cara_cansada', bueno: 'cama',
    es: 'Ha jugado todo el día y se le cierran los ojos. ¿Qué necesita?',
    ca: 'Ha jugat tot el dia i se li tanquen els ulls. Què necessita?' },
  { cara: 'cara_triste',  bueno: 'mascota',
    es: 'Está triste y no quiere jugar. ¿Qué le sentaría bien?',
    ca: 'Està trist i no vol jugar. Què li aniria bé?' },
  { cara: 'nino_barriga', bueno: 'pan',
    es: 'Le suena la barriga y hace rato que no come. ¿Qué necesita?',
    ca: 'Li sona la panxa i fa estona que no menja. Què necessita?' },
  { cara: 'saltar',       bueno: 'agua',
    es: 'Ha corrido mucho y tiene la boca seca. ¿Qué necesita?',
    ca: 'Ha corregut molt i té la boca seca. Què necessita?' },
  { cara: 'mano_lavar',   bueno: 'jabon',
    es: 'Viene del parque con las manos sucias. ¿Qué necesita?',
    ca: 'Ve del parc amb les mans brutes. Què necessita?' },
  { cara: 'nino_cabeza',  bueno: 'peine',
    es: 'Se acaba de levantar y lleva el pelo revuelto. ¿Qué necesita?',
    ca: 'Acaba de llevar-se i porta els cabells esbullats. Què necessita?' }
]

const COSAS = ['cama', 'mascota', 'pan', 'agua', 'jabon', 'peine', 'pelota', 'libro']

export default function Necesita({ onDone }) {
  const rounds = shuffle(CASOS).map(c => {
    const otras = sample(COSAS.filter(x => x !== c.bueno), 2)
    return {
      prompt: { es: c.es, ca: c.ca },
      hero: { art: c.cara },
      options: shuffle([c.bueno, ...otras]).map(x => ({
        key: x, art: x, ok: x === c.bueno
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
