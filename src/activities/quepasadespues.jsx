import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Y después qué pasa? — la causa y lo que viene detrás.
   Contar un cuento o explicar el día exige saber qué va antes y
   qué va después. Aquí sólo hay que dar un paso: se ve lo que
   pasa y se busca la consecuencia. Es el ladrillo con el que
   luego se construyen las historias enteras.
   ============================================================ */

const SECUENCIAS = [
  { antes: 'nube',            despues: 'lluvia',
    es: 'El cielo se llena de nubes', ca: 'El cel s\'omple de núvols' },
  { antes: 'cepillo_dientes', despues: 'cama',
    es: 'Se lava los dientes por la noche', ca: 'Es renta les dents a la nit' },
  { antes: 'mano_lavar',      despues: 'pan',
    es: 'Se lava las manos antes de sentarse a la mesa', ca: 'Es renta les mans abans de seure a taula' },
  { antes: 'regalo',          despues: 'cara_feliz',
    es: 'Le dan un regalo por su cumpleaños', ca: 'Li donen un regal pel seu aniversari' },
  { antes: 'luna',            despues: 'cara_cansada',
    es: 'Se hace de noche y ya es muy tarde', ca: 'Es fa de nit i ja és molt tard' },
  { antes: 'flor',            despues: 'abeja',
    es: 'Se abren las flores del jardín', ca: 'S\'obren les flors del jardí' }
]

/** Los desenlaces posibles, para usarlos también como distractores. */
const FINALES = [...new Set(SECUENCIAS.map(s => s.despues))]

export default function QuePasaDespues({ onDone }) {
  const rounds = shuffle(SECUENCIAS).map(s => {
    const otros = sample(FINALES.filter(f => f !== s.despues), 2)
    return {
      prompt: { es: `${s.es}. ¿Y después qué pasa?`, ca: `${s.ca}. I després què passa?` },
      hero: { art: s.antes },
      options: shuffle([s.despues, ...otros]).map(f => ({
        key: f, art: f, ok: f === s.despues
      }))
    }
  })
  return <ChoiceGame rounds={rounds} onDone={onDone} labels={false} />
}
