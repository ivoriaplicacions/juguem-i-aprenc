import { createContext, useContext } from 'react'

export const STRINGS = {
  es: {
    appName: 'Juguem i Aprenc',
    tagline: 'Juega y aprende, 4 y 5 años',
    play: 'Jugar',
    back: 'Atrás',
    again: 'Otra vez',
    next: 'Siguiente',
    exit: 'Salir',
    listen: 'Escuchar otra vez',
    hello: '¡Hola!',
    chooseWorld: '¿A qué quieres jugar hoy?',
    stars: 'estrellas',
    wellDone: ['¡Muy bien!', '¡Genial!', '¡Fantástico!', '¡Lo has conseguido!', '¡Qué crack!'],
    tryAgain: ['Casi... prueba otra vez', 'Mira bien, inténtalo de nuevo', 'No pasa nada, prueba otra'],
    finished: '¡Actividad completada!',
    youWon: 'Has ganado',
    parents: 'Familias',
    parentsTitle: 'Espacio de familias',
    progress: 'Progreso por área de desarrollo',
    resetAsk: '¿Borrar todo el progreso?',
    reset: 'Empezar de cero',
    language: 'Idioma',
    childName: 'Nombre del niño o la niña',
    timePlayed: 'Tiempo jugado hoy',
    minutes: 'min',
    activitiesDone: 'Actividades completadas',
    tipsTitle: 'Cómo acompañar el juego',
    close: 'Cerrar',
    parentGate: 'Para familias: ¿cuánto es',
    parentGateHint: 'Escribe el resultado',
    wrongGate: 'No es correcto',
    start: 'Empezar',
    tapToStart: 'Toca para empezar',
    areas: 'Áreas que trabaja'
  },
  ca: {
    appName: 'Juguem i Aprenc',
    tagline: 'Juga i aprèn, 4 i 5 anys',
    play: 'Jugar',
    back: 'Enrere',
    again: 'Un altre cop',
    next: 'Següent',
    exit: 'Sortir',
    listen: 'Escoltar un altre cop',
    hello: 'Hola!',
    chooseWorld: 'A què vols jugar avui?',
    stars: 'estrelles',
    wellDone: ['Molt bé!', 'Genial!', 'Fantàstic!', "Ho has aconseguit!", 'Ets un crac!'],
    tryAgain: ['Gairebé... torna-ho a provar', 'Mira-ho bé i torna-ho a provar', 'No passa res, prova una altra'],
    finished: 'Activitat completada!',
    youWon: 'Has guanyat',
    parents: 'Famílies',
    parentsTitle: 'Espai de famílies',
    progress: "Progrés per àrea de desenvolupament",
    resetAsk: 'Vols esborrar tot el progrés?',
    reset: 'Començar de nou',
    language: 'Idioma',
    childName: 'Nom del nen o la nena',
    timePlayed: 'Temps jugat avui',
    minutes: 'min',
    activitiesDone: 'Activitats completades',
    tipsTitle: 'Com acompanyar el joc',
    close: 'Tancar',
    parentGate: 'Per a famílies: quant és',
    parentGateHint: 'Escriu el resultat',
    wrongGate: 'No és correcte',
    start: 'Començar',
    tapToStart: 'Toca per començar',
    areas: 'Àrees que treballa'
  }
}

export const LangCtx = createContext({ lang: 'es', t: (k) => k, tx: (o) => '' })
export const useLang = () => useContext(LangCtx)

export function makeT(lang) {
  const dict = STRINGS[lang] || STRINGS.es
  const t = (k) => dict[k] ?? STRINGS.es[k] ?? k
  /** tx({es:'...', ca:'...'}) devuelve el texto en el idioma activo */
  const tx = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.es ?? ''))
  return { t, tx }
}
