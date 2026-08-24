# Juguem i Aprenc 🎈

Juego educativo **multiplataforma** para niños y niñas de **4 y 5 años**, en
**castellano y catalán**, con 63 actividades que cubren todas las áreas del
desarrollo infantil de esa etapa.

Todo funciona **sin conexión**, **sin publicidad**, **sin compras** y **sin
enviar ni un dato fuera del dispositivo**. El progreso se guarda en local.

▶️ **Jugar ahora: <https://ivoriaplicacions.github.io/juguem-i-aprenc/>**

---

## Qué trabaja (y dónde)

Una misma actividad suele trabajar dos áreas, así que la suma de esta columna
es mayor que 63.

| Área de desarrollo | Nº | Algunos ejemplos |
|---|--:|---|
| ✋ Motricidad fina | 3 | Rompecabezas, Pizarra mágica, Sigue el camino |
| 🤸 Motricidad gruesa | 4 | ¡Muévete!, ¿Cuántos tengo?, ¿Rápido o lento? |
| 💬 Lenguaje y vocabulario | 18 | ¿Qué es esto?, Adivina qué es, Lo contrario, ¿Qué está haciendo? |
| 🔤 Prelectura y escritura | 5 | Suena igual, Caza la letra, ¿Con qué letra empieza? |
| 🔢 Lógica y matemáticas | 17 | Cuenta conmigo, Se van volando, La escalera de números |
| 👀 Percepción visual y espacio | 17 | La sombra, Busca el diferente, ¿Qué forma tiene? |
| 🧠 Memoria y atención | 10 | Busca la pareja, Repite el ritmo, ¿Cuántos golpes suenan? |
| 💛 Desarrollo emocional | 7 | ¿Cómo se siente el otro?, ¿Qué me ayuda a calmarme? |
| 🤝 Habilidades sociales | 6 | ¿Qué hacemos?, Las palabras mágicas, ¿Qué necesita? |
| 🧼 Autonomía, hábitos y salud | 9 | Me cuido solo, Dormir bien, Me he hecho daño |
| 🎨 Creatividad y música | 6 | Pizarra mágica, La mezcla de colores, ¿Grave o agudo? |
| 🌍 Conocimiento del entorno | 15 | ¿Dónde vive?, ¿Qué come cada uno?, Las cuatro estaciones |

El **espacio de familias** (candado con una suma, para que no entre el niño)
muestra el progreso por área: si una barra está corta, es un campo que aún no
ha explorado, no un suspenso.

## Los siete mundos

🎨 Colores y Formas (10) · 🔢 Números y Lógica (9) · 📚 Palabras y Letras (9) ·
💛 Emociones y Amigos (8) · 🌳 Naturaleza y Mundo (9) · 🤸 Mi Cuerpo y Yo (9) ·
🎵 Arte y Música (9)

## Principios de diseño

- **Nunca se pierde.** No hay tiempo límite, ni vidas, ni puntuación negativa.
  El error da ánimo y otra oportunidad.
- **No hace falta saber leer.** Toda consigna se dice en voz alta y va con dibujo.
- **Dedos pequeños.** Nada por debajo de 72 px, mucha separación, sin gestos finos.
- **Sesiones cortas.** 5-8 rondas por actividad: entre 2 y 4 minutos.
- **Ilustración propia.** Todos los dibujos son SVG vectoriales incluidos en el
  código: escalan sin pérdida, pesan poco y se pueden retocar (`src/art/`).

## Poner en marcha

```bash
npm install
npm run dev          # navegador, http://localhost:5173
npm run build        # genera dist/
npm run preview      # sirve dist/ en red local (para probar en la tablet)
```

### Android

```bash
npm run cap:add:android
npm run cap:android      # compila, sincroniza y abre Android Studio
```

### iOS / iPadOS (requiere macOS y Xcode)

```bash
npm run cap:add:ios
npm run cap:ios
```

### Escritorio (Windows / macOS / Linux)

```bash
npm i -D electron
npm run desktop
```

### Web / PWA

El contenido de `dist/` es estático: súbelo a cualquier hosting. Incluye
manifest e iconos, así que se puede "añadir a la pantalla de inicio" y se abre
a pantalla completa.

Cada push a `master` lo publica solo en GitHub Pages
(<https://ivoriaplicacions.github.io/juguem-i-aprenc/>) mediante
`.github/workflows/deploy.yml`.

## Estructura

```
src/
  art/          ilustraciones SVG (animales, comida, caras, cuerpo, objetos…)
  activities/   una carpeta = una actividad (28)
  engines/      motores reutilizables (elegir, arrastrar y clasificar)
  screens/      portada, mundo, juego y espacio de familias
  ui/kit.jsx    botones, consigna hablada, celebración, feedback
  lib/          voz, sonido sintetizado, progreso local, azar
  data/curriculum.js   mapa de mundos, actividades y áreas de desarrollo
i18n/           textos de interfaz en castellano y catalán
```

## Añadir una actividad nueva

1. Crea `src/activities/mi-actividad.jsx` siguiendo `CONTRATO.md`.
2. Regístrala en `src/activities/index.js`.
3. Añádela a un mundo en `src/data/curriculum.js` indicando qué áreas trabaja.

Aparecerá sola en el menú y en el panel de familias.

`npm run comprobar` valida que todos los dibujos y formas que nombran las
actividades existan de verdad en `src/art/`; se ejecuta solo antes de cada
build. Un nombre mal escrito no rompe la compilación: deja un hueco en blanco
en mitad del juego.
