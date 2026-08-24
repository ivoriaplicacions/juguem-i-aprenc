/* Progreso local del niño. Nada sale del dispositivo: sin cuentas, sin red. */
const KEY = 'juguem.v1'
const EMPTY = {
  lang: 'es', name: '', stars: 0, done: {}, plays: {},
  minutes: 0, lastDay: null, dailyMin: 0,
  // Voz elegida por la familia para cada lengua (voiceURI). null = automática.
  voz: { es: null, ca: null },
  // Velocidad del habla: un id de VELOCIDADES en lib/speech.js.
  velocidad: 'media'
}

export function load() {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) || '{}') } }
  catch { return { ...EMPTY } }
}
export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
}
export function reset() { try { localStorage.removeItem(KEY) } catch {} }
