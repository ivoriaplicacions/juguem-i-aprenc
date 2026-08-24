/* ============================================================
   La voz del juego.

   Usa la síntesis del sistema (web, iOS y Android vía WebView).
   Tres cosas que no son obvias y que aquí se resuelven:

   1. Elegir voz. Coger la primera del idioma es un error: macOS
      instala un puñado de voces de broma (Eddy, Flo, Grandma,
      Rocko…) que salen antes que la buena por orden de lista.
      Aquí se puntúan y gana la mejor, o la que elija la familia.
   2. No pisarse. Antes se llamaba a cancel() antes de cada frase,
      y eso mata lo que estuviera sonando: al contar fruta sólo se
      oía el último número. Ahora sólo interrumpe quien lo pide
      (la consigna nueva); el resto se encola en el navegador, que
      ya las reproduce una detrás de otra.
   3. Esperar a que existan. getVoices() llega vacío al arrancar
      en casi todos los navegadores; lo que se pida antes de eso
      se guarda y sale en cuanto la lista está lista.
   ============================================================ */

const LOCALE = { es: 'es-ES', ca: 'ca-ES' }

/* Voces de broma que macOS y iOS instalan de serie. Suenan
   deformadas a propósito: nunca deben ser la voz por defecto. */
const NOVEDAD = new Set([
  'albert', 'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos',
  'good news', 'jester', 'organ', 'superstar', 'trinoids', 'whisper',
  'wobble', 'zarvox', 'eddy', 'flo', 'grandma', 'grandpa', 'reed',
  'rocko', 'sandy', 'shelley', 'junior', 'kathy', 'princess', 'ralph',
  'bruce', 'fred', 'deranged', 'hysterical', 'wario', 'bahh'
])

/* Las variantes de alta calidad se anuncian en el nombre. */
const BUENA = /enhanced|premium|neural|siri|natural|mejorada|millorada/i

let voces = []
let preferida = { es: null, ca: null }   // voiceURI elegido por la familia
const cola = []                          // frases esperando a que haya voces
let vigilante = null

const hay = () => typeof window !== 'undefined' && !!window.speechSynthesis

/** El nombre sin el paréntesis del idioma: "Eddy (espanyol…)" -> "eddy". */
const base = (nombre) => String(nombre || '').split('(')[0].trim().toLowerCase()

function cargar() {
  if (!hay()) return
  try { voces = window.speechSynthesis.getVoices() || [] } catch { voces = [] }
  if (voces.length && cola.length) {
    const espera = cola.splice(0, cola.length)
    espera.forEach(f => f())
  }
}

if (hay()) {
  cargar()
  // onvoiceschanged puede dispararse varias veces; addEventListener no pisa
  // un handler que hubiera puesto otro módulo.
  window.speechSynthesis.addEventListener?.('voiceschanged', cargar)
  if (!window.speechSynthesis.addEventListener) window.speechSynthesis.onvoiceschanged = cargar
}

/** Lista de voces utilizables para un idioma, de mejor a peor. */
export function vocesDe(lang) {
  const loc = LOCALE[lang] || LOCALE.es
  const raiz = loc.slice(0, 2)
  return voces
    .filter(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(raiz))
    .map(v => ({ voz: v, punt: puntuar(v, loc) }))
    .sort((a, b) => b.punt - a.punt)
    .map(x => x.voz)
}

function puntuar(v, loc) {
  const lang = (v.lang || '').replace('_', '-')
  let p = 0
  if (lang.toLowerCase() === loc.toLowerCase()) p += 100   // es-ES antes que es-MX
  if (BUENA.test(v.name)) p += 40
  if (NOVEDAD.has(base(v.name))) p -= 200                  // fuera las de broma
  if (v.default) p += 5
  return p
}

/** La voz que toca para este idioma: la elegida por la familia, o la mejor. */
function elegir(lang) {
  const lista = vocesDe(lang)
  if (!lista.length) return null
  const uri = preferida[lang]
  return (uri && lista.find(v => v.voiceURI === uri)) || lista[0]
}

/** Guarda la preferencia de la familia (voiceURI, o null para automática). */
export function usarVoz(lang, voiceURI) {
  preferida = { ...preferida, [lang]: voiceURI || null }
}

/* ---------- que no se corte sola ---------- */

/* Chrome deja de hablar solo si una frase pasa de unos segundos.
   Un resume() periódico mientras hay algo sonando lo evita. */
function vigilar() {
  if (vigilante) return
  vigilante = setInterval(() => {
    if (!hay()) return
    const s = window.speechSynthesis
    if (s.speaking && !s.paused) { try { s.resume() } catch { /* da igual */ } }
    if (!s.speaking && !s.pending) { clearInterval(vigilante); vigilante = null }
  }, 5000)
}

/**
 * Dice un texto. Por defecto espera su turno, para que dos frases
 * seguidas se oigan las dos. Con `{ interrumpe: true }` calla lo que
 * hubiera y habla ya: es lo que quiere una consigna nueva.
 * Con `{ voz }` se fuerza una voz concreta sin cambiar la preferencia,
 * que es lo que necesita el botón de probar del panel de familias.
 */
export function speak(text, lang = 'es', opciones = {}) {
  const { rate = 0.92, pitch = 1.1, interrumpe = false, voz = null } = opciones
  if (!text || !hay()) return

  // Todavía no hay lista de voces: se guarda y sale al llegar.
  if (!voces.length) {
    if (cola.length < 4) cola.push(() => speak(text, lang, opciones))
    cargar()
    return
  }

  try {
    const s = window.speechSynthesis
    if (interrumpe) s.cancel()

    const u = new SpeechSynthesisUtterance(String(text))
    u.lang = LOCALE[lang] || LOCALE.es
    const v = voz || elegir(lang)
    if (v) { u.voice = v; u.lang = v.lang }
    u.rate = rate
    u.pitch = pitch
    u.volume = 1
    s.speak(u)
    vigilar()
  } catch { /* sin voz, el juego sigue: todo lleva dibujo */ }
}

/** Corta lo que esté sonando y vacía la cola (al salir de una actividad). */
export function stopSpeaking() {
  cola.length = 0
  if (!hay()) return
  try { window.speechSynthesis.cancel() } catch { /* da igual */ }
}

/**
 * iOS y Safari no dejan hablar hasta que ha habido un gesto del usuario.
 * Se llama en el primer toque, junto al desbloqueo del audio.
 */
export function unlockSpeech() {
  if (!hay()) return
  try {
    const u = new SpeechSynthesisUtterance('')
    u.volume = 0
    window.speechSynthesis.speak(u)
  } catch { /* da igual */ }
  cargar()
}
