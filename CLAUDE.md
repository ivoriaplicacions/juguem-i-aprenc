# Juguem i Aprenc

Juego educativo multiplataforma para niños y niñas de **4 y 5 años**, en
castellano y catalán. React 18 + Vite + Capacitor (web/PWA, Android, iOS y
escritorio con Electron). Sin backend, sin red, sin dependencias de UI.

## Comandos

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/ en la red local (probar en tablet)
npm run cap:sync   # build + sincroniza los proyectos nativos
npm run cap:android / npm run cap:ios
npm i -D electron && npm run desktop   # versión de escritorio
```

## Arquitectura

- `src/data/curriculum.js` — **fuente de verdad**: las 12 áreas de desarrollo,
  los 7 mundos y las 28 actividades. Cada actividad declara qué áreas trabaja;
  el panel de familias agrega el progreso a partir de aquí.
- `src/activities/<id>.jsx` — una actividad por fichero. Recibe `{ onDone }` y
  llama a `onDone()` una sola vez al terminar. **No** pinta su pantalla de fin:
  la celebración y las estrellas las gestiona `src/screens/Play.jsx`.
- `src/activities/index.js` — registro `id -> componente`.
- `src/engines/` — motores reutilizables: `ChoiceGame` (escucha y elige, cubre
  la mitad de las actividades) y `DragSort` (arrastrar y clasificar).
- `src/art/` — todas las ilustraciones son SVG escritos a mano en JSX, agrupados
  por familia. Se pintan con `<Art name="gato" size={120} />`. Nombres
  especiales: `num:5`, `let:A`, `sem:verde`.
- `src/ui/kit.jsx` — `Prompt` (consigna hablada), `Dots`, `Celebrate`,
  `useAnswer` (feedback de acierto/error), botones.
- `src/lib/` — `speech.js` (voz del sistema), `sound.js` (WebAudio sintetizado,
  cero ficheros de audio), `store.js` (progreso en localStorage), `rnd.js`.
- `src/i18n/index.js` — textos de interfaz. El contenido de cada actividad lleva
  sus propios textos.

## Reglas del proyecto (no negociables)

1. **Todo texto visible o hablado es un objeto `{es, ca}`** y se pinta con
   `tx()` de `useLang()`. Nunca cadenas sueltas en la interfaz.
2. **Nunca se pierde**: sin temporizadores que penalicen, sin vidas, sin
   puntuación negativa. El error da ánimo y otro intento.
3. **No hace falta saber leer**: cada consigna se dice en voz alta y va con
   dibujo o icono.
4. Objetivos táctiles de **72 px o más**, bien separados. Nada de gestos finos.
5. Arrastrar siempre con **pointer events** (`setPointerCapture`), clase `.drag`
   y `touch-action: none`. Debe funcionar con ratón y con dedo.
6. 5-8 rondas por actividad (sesiones de 2-4 minutos).
7. **Cero red**: sin analítica, sin publicidad, sin compras, sin CDN. Las
   ilustraciones y los sonidos se generan en el propio código.
8. Sin dependencias nuevas salvo necesidad real; sin TypeScript.

## Añadir una actividad

1. Escribe `src/activities/<id>.jsx` siguiendo `CONTRATO.md` (ahí está el
   contrato completo y el catálogo de ilustraciones disponibles).
2. Regístrala en `src/activities/index.js`.
3. Añádela a un mundo en `src/data/curriculum.js` con sus `areas`.

Aparece sola en el menú y en el progreso por área.

## Verificar antes de dar algo por bueno

`npm run build` y, si tocas actividades, recorrer las 28 en el navegador
comprobando que no hay errores en consola. Las áreas del panel de familias
deben seguir cuadrando con `curriculum.js`.
