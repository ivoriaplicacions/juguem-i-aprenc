import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* Autonomía y hábitos: elegir la herramienta adecuada para cada cuidado.
   Es contenido de salud, pero sobre todo de "puedo hacerlo yo solo". */
const CASOS = [
  { es: '¿Con qué te lavas los dientes?', ca: 'Amb què et rentes les dents?', ok: 'cepillo_dientes' },
  { es: '¿Con qué te lavas las manos?',   ca: 'Amb què et rentes les mans?',  ok: 'jabon' },
  { es: '¿Con qué te secas?',             ca: 'Amb què t\'eixugues?',         ok: 'toalla' },
  { es: '¿Con qué te peinas?',            ca: 'Amb què et pentines?',         ok: 'peine' },
  { es: '¿Dónde te duchas?',              ca: 'On et dutxes?',                ok: 'ducha' },
  { es: '¿Dónde haces pipí?',             ca: 'On fas pipí?',                 ok: 'wc' },
  { es: '¿Qué haces antes de comer?',     ca: 'Què fas abans de menjar?',     ok: 'mano_lavar' },
  { es: '¿Dónde duermes por la noche?',   ca: 'On dorms a la nit?',           ok: 'cama' }
]
const NOMBRES = {
  cepillo_dientes: { es: 'el cepillo', ca: 'el raspall' },
  jabon:  { es: 'el jabón',  ca: 'el sabó' },
  toalla: { es: 'la toalla', ca: 'la tovallola' },
  peine:  { es: 'el peine',  ca: 'la pinta' },
  ducha:  { es: 'la ducha',  ca: 'la dutxa' },
  wc:     { es: 'el váter',  ca: 'el vàter' },
  mano_lavar: { es: 'lavarme las manos', ca: 'rentar-me les mans' },
  cama:   { es: 'la cama',   ca: 'el llit' },
  pastel: { es: 'el pastel', ca: 'el pastís' },
  pelota: { es: 'la pelota', ca: 'la pilota' },
  libro:  { es: 'el libro',  ca: 'el llibre' },
  mochila:{ es: 'la mochila',ca: 'la motxilla' }
}
const DISTRACTORES = ['pastel', 'pelota', 'libro', 'mochila', 'peine', 'toalla', 'jabon', 'cama']

export default function Higiene({ onDone }) {
  const rounds = sample(CASOS, 7).map(c => {
    const otros = sample(DISTRACTORES.filter(d => d !== c.ok), 2)
    return {
      prompt: { es: c.es, ca: c.ca },
      options: shuffle([c.ok, ...otros]).map(id => ({
        key: id, art: id, ok: id === c.ok, label: NOMBRES[id]
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
