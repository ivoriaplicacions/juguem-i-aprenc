/* Sonidos sintetizados con WebAudio: sin ficheros externos, así el juego
   pesa poco y suena igual en todas las plataformas. */
let ctx = null
const get = () => {
  if (typeof window === 'undefined') return null
  if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) ctx = new AC() }
  if (ctx && ctx.state === 'suspended') ctx.resume()
  return ctx
}
export const unlockAudio = () => get()

function tone(freq, start, dur, type = 'sine', gain = 0.18) {
  const c = get(); if (!c) return
  const o = c.createOscillator(), g = c.createGain()
  o.type = type; o.frequency.value = freq
  g.gain.setValueAtTime(0, c.currentTime + start)
  g.gain.linearRampToValueAtTime(gain, c.currentTime + start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur)
  o.connect(g); g.connect(c.destination)
  o.start(c.currentTime + start); o.stop(c.currentTime + start + dur + 0.05)
}

export const sfx = {
  tap:    () => tone(660, 0, 0.09, 'triangle', 0.12),
  right:  () => { tone(523, 0, 0.14); tone(659, 0.1, 0.14); tone(784, 0.2, 0.3) },
  wrong:  () => { tone(300, 0, 0.16, 'sine', 0.12); tone(230, 0.13, 0.22, 'sine', 0.12) },
  win:    () => [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.11, 0.35, 'triangle', 0.16)),
  pop:    () => tone(880, 0, 0.07, 'square', 0.08),
  drum:   () => tone(120, 0, 0.18, 'sine', 0.3),
  note:   (n = 0) => tone([262, 294, 330, 349, 392, 440, 494, 523][n % 8], 0, 0.35, 'triangle', 0.2),
  animal: (n = 0) => { tone(200 + n * 40, 0, 0.2, 'sawtooth', 0.09); tone(150 + n * 30, 0.18, 0.25, 'sawtooth', 0.07) }
}
