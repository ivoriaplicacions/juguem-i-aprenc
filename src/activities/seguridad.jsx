import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* Seguridad vial básica y alimentación saludable: dos aprendizajes de salud
   que a los 4-5 años ya se pueden razonar con imágenes. */
const SEMAFORO = [
  {
    prompt: { es: 'El semáforo está en ROJO. ¿Qué hacemos?', ca: 'El semàfor està en VERMELL. Què fem?' },
    hero: { art: 'sem:rojo' }, heroSize: 150, size: 80,
    options: shuffle([
      { key: 'parar', emoji: '✋', ok: true, label: { es: 'Nos paramos', ca: 'Ens aturem' } },
      { key: 'cruzar', emoji: '🏃', label: { es: 'Cruzamos', ca: 'Creuem' } },
      { key: 'correr', emoji: '🚴', label: { es: 'Corremos', ca: 'Correm' } }
    ])
  },
  {
    prompt: { es: 'El semáforo está en VERDE. ¿Qué hacemos?', ca: 'El semàfor està en VERD. Què fem?' },
    hero: { art: 'sem:verde' }, heroSize: 150, size: 80,
    options: shuffle([
      { key: 'cruzar', emoji: '🚶', ok: true, label: { es: 'Cruzamos mirando', ca: 'Creuem mirant' } },
      { key: 'parar', emoji: '✋', label: { es: 'Nos quedamos quietos', ca: 'Ens quedem quiets' } },
      { key: 'jugar', emoji: '⚽', label: { es: 'Jugamos en la calle', ca: 'Juguem al carrer' } }
    ])
  },
  {
    prompt: { es: '¿Qué nos ponemos en el coche?', ca: 'Què ens posem al cotxe?' },
    size: 80,
    options: shuffle([
      { key: 'cinturon', emoji: '💺', ok: true, label: { es: 'El cinturón', ca: 'El cinturó' } },
      { key: 'gorro', emoji: '🎩', label: { es: 'Un sombrero', ca: 'Un barret' } },
      { key: 'gafas', emoji: '🕶️', label: { es: 'Unas gafas', ca: 'Unes ulleres' } }
    ])
  },
  {
    prompt: { es: '¿Cómo cruzamos la calle?', ca: 'Com creuem el carrer?' },
    size: 80,
    options: shuffle([
      { key: 'mano', emoji: '🤝', ok: true, label: { es: 'De la mano de un adulto', ca: 'De la mà d\'un adult' } },
      { key: 'solo', emoji: '🏃', label: { es: 'Corriendo solo', ca: 'Corrent sol' } },
      { key: 'movil', emoji: '📱', label: { es: 'Mirando el móvil', ca: 'Mirant el mòbil' } }
    ])
  }
]

const SANO = ['manzana', 'platano', 'zanahoria', 'brocoli', 'leche', 'pan', 'agua', 'naranja', 'fresa', 'sandia']
const CAPRICHO = ['pastel', 'caramelo']
const NOMBRES = {
  manzana: { es: 'manzana', ca: 'poma' }, platano: { es: 'plátano', ca: 'plàtan' },
  zanahoria: { es: 'zanahoria', ca: 'pastanaga' }, brocoli: { es: 'brócoli', ca: 'bròquil' },
  leche: { es: 'leche', ca: 'llet' }, pan: { es: 'pan', ca: 'pa' }, agua: { es: 'agua', ca: 'aigua' },
  naranja: { es: 'naranja', ca: 'taronja' }, fresa: { es: 'fresa', ca: 'maduixa' },
  sandia: { es: 'sandía', ca: 'síndria' }, pastel: { es: 'pastel', ca: 'pastís' },
  caramelo: { es: 'caramelo', ca: 'caramel' }
}

export default function Seguridad({ onDone }) {
  const comida = sample(CAPRICHO, 2).map(dulce => ({
    prompt: { es: '¿Qué es mejor comer cada día?', ca: 'Què és millor menjar cada dia?' },
    options: shuffle([
      ...sample(SANO, 2).map(s => ({ key: s, art: s, ok: true, label: NOMBRES[s] })),
      { key: dulce, art: dulce, label: NOMBRES[dulce] }
    ])
  }))
  return <ChoiceGame rounds={[...sample(SEMAFORO, 4), ...comida]} onDone={onDone} />
}
