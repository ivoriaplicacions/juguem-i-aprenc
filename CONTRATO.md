# Contrato para escribir actividades

Cada actividad vive en `src/activities/<id>.jsx` y exporta por defecto un
componente React:

```jsx
export default function MiActividad({ onDone }) { ... }
```

`onDone()` se llama UNA vez cuando el niño termina (el marco exterior ya
muestra la celebración con estrellas y vuelve al menú: la actividad NO debe
mostrar su propia pantalla de fin).

## Qué hay disponible

```jsx
import { Art, Shape, SHAPES, P } from '../art'     // ilustraciones SVG y paleta
import { COLORS } from '../art/palette'
import { useLang } from '../i18n'                  // const { lang, t, tx } = useLang()
import { Prompt, Dots, BigBtn, IconBtn, useAnswer } from '../ui/kit'
import { speak } from '../lib/speech'              // speak(texto, lang)
import { sfx } from '../lib/sound'                 // sfx.tap/right/wrong/win/pop/drum/note(n)/animal(n)
import { shuffle, pick, sample, range, withCorrect } from '../lib/rnd'
import ChoiceGame from '../engines/ChoiceGame'
```

- `tx({es:'hola', ca:'hola'})` devuelve el texto en el idioma activo.
  **Todos los textos visibles y hablados deben ser objetos `{es, ca}`.**
- `<Art name="gato" size={120} />` dibuja una ilustración.
  Nombres especiales: `num:5` (número), `let:A` (letra), `sem:verde` (semáforo).
- `<Shape id="circulo" color={P.red} size={100} />`.
- `useAnswer({onRight})` da feedback inmediato: `answer(key, ok)` y `cls(key)`
  para añadir la clase `good`/`bad` al botón.

## Estructura visual esperada

```jsx
<div className="stage">
  <Prompt text={{es:'...', ca:'...'}} />
  <div className="board"> ...el juego... </div>
  <Dots step={i} total={N} />
</div>
```

Clases CSS ya definidas: `.stage .prompt .board .options .opt (.good .bad .dim)
.dots .slot (.filled) .swatch (.on) .big (.green .pink .purple .orange .ghost)
.iconbtn .canvasWrap .row .center .grow .rise .drag`.

## Reglas de diseño irrenunciables (niños de 4-5 años)

1. Objetivos táctiles de **72 px o más**, muy separados.
2. **Nunca se pierde**: el error no resta, no hay tiempo límite, no hay muerte.
   Se anima y se vuelve a intentar.
3. Entre 5 y 8 rondas por actividad: sesiones de 2-3 minutos.
4. La consigna se **oye** además de leerse (el niño aún no lee).
5. Nada de texto imprescindible para jugar: siempre hay icono o dibujo.
6. Arrastrar debe funcionar con **pointer events** (ratón y dedo), con
   `touch-action:none` en el elemento arrastrable (clase `.drag`).
7. Sin publicidad, sin enlaces externos, sin nada que salga del dispositivo.

## Ilustraciones disponibles (`<Art name="…">`)

animales: gato, perro, vaca, oveja, pato, leon, rana, abeja, pez, pajaro,
elefante, raton, cerdo, gallina, tortuga, mariposa, oso, caballo
comida: manzana, platano, uvas, fresa, naranja, sandia, zanahoria, brocoli,
pan, leche, pastel, agua, caramelo
cosas: sol, luna, nube, estrella_cielo, arbol, flor, casa, coche, avion,
barco, pelota, libro, silla, mesa, cama, semaforo, globo, regalo, mochila
caras: cara_feliz, cara_triste, cara_enfadada, cara_asustada,
cara_sorprendida, cara_tranquila, cara_cansada, mascota
cuerpo: nino, nino_cabeza, nino_ojos, nino_boca, nino_nariz, nino_orejas,
nino_manos, nino_brazos, nino_piernas, nino_pies, nino_barriga,
saltar, aplaudir, girar, tocar_suelo
higiene: cepillo_dientes, jabon, ducha, peine, toalla, wc, mano_lavar
música: tambor, guitarra, trompeta, piano, maracas, campana
lugares: mar, granja, bosque, cielo, ciudad
tiempo: lluvia, nieve, viento
