# Juguem i Aprenc 🎈

Juego educativo **multiplataforma** para niños y niñas de **4 y 5 años**, en
**castellano y catalán**, con 28 actividades que cubren todas las áreas del
desarrollo infantil de esa etapa.

Todo funciona **sin conexión**, **sin publicidad**, **sin compras** y **sin
enviar ni un dato fuera del dispositivo**. El progreso se guarda en local.

▶️ **Jugar ahora: <https://ivoriaplicacions.github.io/juguem-i-aprenc/>**

---

## Qué trabaja (y dónde)

| Área de desarrollo | Actividades |
|---|---|
| ✋ Motricidad fina | Rompecabezas, Pizarra mágica, Sigue el camino |
| 🤸 Motricidad gruesa | Partes del cuerpo, ¡Muévete! |
| 💬 Lenguaje y vocabulario | ¿Qué es esto?, El arcoíris, Suena igual, ¿Qué tiempo hace?, Arriba y abajo, Partes del cuerpo |
| 🔤 Prelectura y escritura | Suena igual, Caza la letra, Palmas y sílabas, Sigue el camino |
| 🔢 Lógica y matemáticas | Cuenta conmigo, Sumas de fruta, Grande o pequeño, Cada uno a su sitio, Sigue la serie, Formas mágicas, ¿Dónde vive? |
| 👀 Percepción visual y espacio | El arcoíris, Formas mágicas, Sigue la serie, Rompecabezas, Arriba y abajo, Grande o pequeño, Busca la pareja |
| 🧠 Memoria y atención | Busca la pareja, Repite el ritmo, Sonidos de la granja, ¡Muévete! |
| 💛 Desarrollo emocional | ¿Cómo se siente?, ¿Qué hacemos?, Respira conmigo |
| 🤝 Habilidades sociales | ¿Qué hacemos? |
| 🧼 Autonomía, hábitos y salud | Me cuido solo, Seguro y sano, El día de Nino, Respira conmigo |
| 🎨 Creatividad y música | Pizarra mágica, Repite el ritmo |
| 🌍 Conocimiento del entorno | Sonidos de la granja, ¿Dónde vive?, El día de Nino, ¿Qué tiempo hace?, Cada uno a su sitio, Seguro y sano |

El **espacio de familias** (candado con una suma, para que no entre el niño)
muestra el progreso por área: si una barra está corta, es un campo que aún no
ha explorado, no un suspenso.

## Los siete mundos

🎨 Colores y Formas · 🔢 Números y Lógica · 📚 Palabras y Letras ·
💛 Emociones y Amigos · 🌳 Naturaleza y Mundo · 🤸 Mi Cuerpo y Yo · 🎵 Arte y Música

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
