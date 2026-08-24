import * as animals from './animals'
import * as food from './food'
import * as things from './things'
import * as faces from './faces'
import * as body from './body'
import * as misc from './misc'
import { numeroArt, letraArt } from './misc'
import { P } from './palette'

export { P } from './palette'
export { Shape, SHAPES, SHAPE_PATHS } from './shapes'

const REGISTRY = { ...animals, ...food, ...things, ...faces, ...body, ...misc }
delete REGISTRY.numeroArt
delete REGISTRY.letraArt

export const ART_NAMES = Object.keys(REGISTRY)

/**
 * <Art name="gato" size={120} />  — dibuja cualquier ilustración del juego.
 * Nombres especiales: "num:5" pinta el número 5, "let:A" pinta la letra A,
 * "sem:verde" pinta el semáforo con la luz verde encendida.
 */
export function Art({ name, size = 100, color = P.blue, className = '', style }) {
  let node = null
  if (typeof name === 'string' && name.startsWith('num:')) node = numeroArt(name.slice(4), color)
  else if (typeof name === 'string' && name.startsWith('let:')) node = letraArt(name.slice(4), color)
  else if (typeof name === 'string' && name.startsWith('sem:')) node = things.semaforo({ on: name.slice(4) })
  else {
    const fn = REGISTRY[name]
    node = fn ? fn({}) : null
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style}
         aria-hidden="true" focusable="false">
      {node}
    </svg>
  )
}
