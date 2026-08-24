import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* Esquema corporal: saber dónde está cada parte del cuerpo y cómo se llama.
   Las opciones son el mismo niño con una parte resaltada, así el niño tiene
   que mirar la diferencia y no el dibujo entero. */
const PARTES = [
  { art: 'nino_cabeza',  es: 'la cabeza',  ca: 'el cap' },
  { art: 'nino_ojos',    es: 'los ojos',   ca: 'els ulls' },
  { art: 'nino_boca',    es: 'la boca',    ca: 'la boca' },
  { art: 'nino_nariz',   es: 'la nariz',   ca: 'el nas' },
  { art: 'nino_orejas',  es: 'las orejas', ca: 'les orelles' },
  { art: 'nino_manos',   es: 'las manos',  ca: 'les mans' },
  { art: 'nino_brazos',  es: 'los brazos', ca: 'els braços' },
  { art: 'nino_piernas', es: 'las piernas',ca: 'les cames' },
  { art: 'nino_pies',    es: 'los pies',   ca: 'els peus' },
  { art: 'nino_barriga', es: 'la barriga', ca: 'la panxa' }
]

export default function Cuerpo({ onDone }) {
  const rounds = sample(PARTES, 8).map(t => ({
    prompt: { es: `¿Dónde están ${t.es}? Tócalas también en tu cuerpo`,
              ca: `On són ${t.ca}? Toca-les també al teu cos` },
    size: 110,
    options: shuffle([t, ...sample(PARTES.filter(p => p.art !== t.art), 2)]).map(p => ({
      key: p.art, art: p.art, ok: p.art === t.art, label: { es: p.es, ca: p.ca }
    }))
  }))
  return <ChoiceGame rounds={rounds} onDone={onDone} />
}
