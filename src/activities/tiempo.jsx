import { useState } from 'react'
import ChoiceGame from '../engines/ChoiceGame'
import { shuffle, sample } from '../lib/rnd'

/* ============================================================
   ¿Qué tiempo hace? — vocabulario del tiempo y sentido común.
   Dos tipos de ronda que se van alternando:
     (a) se ve una escena meteorológica y hay que nombrarla
         eligiendo entre 3 opciones;
     (b) se ve el tiempo y hay que elegir qué nos ponemos o
         llevamos (emojis grandes, porque no hay dibujos de ropa).
   Todo se oye además de verse y nunca se pierde.
   ============================================================ */

/* Los cinco tiempos que trabajamos: ilustración, nombre y emoji. */
const TIEMPOS = [
  { id: 'sol',    art: 'sol',    emoji: '☀️', nombre: { es: 'hace sol',   ca: 'fa sol' } },
  { id: 'lluvia', art: 'lluvia', emoji: '🌧️', nombre: { es: 'llueve',     ca: 'plou' } },
  { id: 'nieve',  art: 'nieve',  emoji: '❄️', nombre: { es: 'nieva',      ca: 'neva' } },
  { id: 'viento', art: 'viento', emoji: '🌬️', nombre: { es: 'hace viento', ca: 'fa vent' } },
  { id: 'nube',   art: 'nube',   emoji: '☁️', nombre: { es: 'está nublado', ca: 'està ennuvolat' } }
]

/* Qué nos ponemos con cada tiempo. Cada prenda es un emoji grande. */
const PRENDAS = [
  { id: 'gafas',    emoji: '🕶️', para: 'sol',    label: { es: 'las gafas de sol', ca: 'les ulleres de sol' } },
  { id: 'paraguas', emoji: '☂️', para: 'lluvia', label: { es: 'el paraguas',      ca: 'el paraigua' } },
  { id: 'abrigo',   emoji: '🧥', para: 'nieve',  label: { es: 'el abrigo',        ca: 'l’abric' } },
  { id: 'gorro',    emoji: '🧢', para: 'viento', label: { es: 'el gorro',         ca: 'la gorra' } },
  { id: 'botas',    emoji: '👢', para: 'lluvia', label: { es: 'las botas',        ca: 'les botes' } },
  { id: 'bufanda',  emoji: '🧣', para: 'nieve',  label: { es: 'la bufanda',       ca: 'la bufanda' } }
]

/** Ronda tipo (a): mira la escena y di qué tiempo hace. */
function rondaNombrar(t) {
  const otros = sample(TIEMPOS.filter(x => x.id !== t.id), 2)
  return {
    prompt: { es: '¿Qué tiempo hace hoy?', ca: 'Quin temps fa avui?' },
    hero: { art: t.art },
    heroSize: 170,
    options: shuffle([t, ...otros]).map(o => ({
      key: o.id, emoji: o.emoji, ok: o.id === t.id, label: o.nombre
    }))
  }
}

/** Ronda tipo (b): con este tiempo, ¿qué nos llevamos? */
function rondaPrenda(t) {
  const buena = sample(PRENDAS.filter(p => p.para === t.id), 1)[0]
  const malas = sample(PRENDAS.filter(p => p.para !== t.id && p.id !== buena.id), 2)
  return {
    prompt: { es: '¿Qué nos llevamos hoy?', ca: 'Què ens emportem avui?' },
    hero: { art: t.art, label: t.nombre },
    heroSize: 150,
    options: shuffle([buena, ...malas]).map(p => ({
      key: p.id, emoji: p.emoji, ok: p.id === buena.id, label: p.label
    }))
  }
}

/** Construye las 6 rondas alternando los dos formatos. */
function crearRondas() {
  // Sólo hay prendas para sol, lluvia, nieve y viento: de ahí salen las (b).
  const conPrenda = TIEMPOS.filter(t => PRENDAS.some(p => p.para === t.id))
  const paraNombrar = sample(TIEMPOS, 3)
  const paraPrenda = sample(conPrenda, 3)
  const rondas = []
  for (let k = 0; k < 3; k++) {
    rondas.push(rondaNombrar(paraNombrar[k]))
    rondas.push(rondaPrenda(paraPrenda[k]))
  }
  return rondas
}

export default function Tiempo({ onDone }) {
  // Se barajan una sola vez: si cambia el idioma, el juego no se reinicia.
  const [rounds] = useState(crearRondas)
  return <ChoiceGame rounds={rounds} onDone={onDone} optionSize={104} />
}
