/* Voz del juego. Usa la síntesis de voz del sistema (funciona en web, iOS y
   Android vía WebView). Si el dispositivo no tiene voces, el juego sigue
   funcionando: todo lleva también texto e icono. */
let voices = []
const refresh = () => { try { voices = window.speechSynthesis.getVoices() || [] } catch { voices = [] } }
if (typeof window !== 'undefined' && window.speechSynthesis) {
  refresh()
  window.speechSynthesis.onvoiceschanged = refresh
}

const LOCALE = { es: 'es-ES', ca: 'ca-ES' }

export function speak(text, lang = 'es', { rate = 0.92, pitch = 1.15 } = {}) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const loc = LOCALE[lang] || LOCALE.es
    u.lang = loc
    const v = voices.find(x => x.lang === loc) ||
              voices.find(x => x.lang && x.lang.startsWith(loc.slice(0, 2))) ||
              voices.find(x => x.lang && x.lang.startsWith('es'))
    if (v) u.voice = v
    u.rate = rate; u.pitch = pitch; u.volume = 1
    window.speechSynthesis.speak(u)
  } catch { /* sin voz, no pasa nada */ }
}
export function stopSpeaking() {
  try { window.speechSynthesis.cancel() } catch {}
}
