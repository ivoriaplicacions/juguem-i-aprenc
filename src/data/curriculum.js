/* ============================================================
   Mapa de desarrollo 4-5 años.
   Cada actividad declara las áreas que trabaja; el panel de
   familias suma el progreso por área para que se vea de un
   vistazo si algún campo se está quedando corto.
   ============================================================ */

export const AREAS = [
  { id: 'motricidad_fina',  emoji: '✋', es: 'Motricidad fina',            ca: 'Motricitat fina' },
  { id: 'motricidad_gruesa',emoji: '🤸', es: 'Motricidad gruesa',          ca: 'Motricitat grossa' },
  { id: 'lenguaje',         emoji: '💬', es: 'Lenguaje y vocabulario',     ca: 'Llenguatge i vocabulari' },
  { id: 'prelectura',       emoji: '🔤', es: 'Prelectura y escritura',     ca: 'Prelectura i escriptura' },
  { id: 'matematicas',      emoji: '🔢', es: 'Lógica y matemáticas',       ca: 'Lògica i matemàtiques' },
  { id: 'percepcion',       emoji: '👀', es: 'Percepción visual y espacio',ca: 'Percepció visual i espai' },
  { id: 'memoria',          emoji: '🧠', es: 'Memoria y atención',         ca: 'Memòria i atenció' },
  { id: 'emocional',        emoji: '💛', es: 'Desarrollo emocional',       ca: 'Desenvolupament emocional' },
  { id: 'social',           emoji: '🤝', es: 'Habilidades sociales',       ca: 'Habilitats socials' },
  { id: 'autonomia',        emoji: '🧼', es: 'Autonomía, hábitos y salud', ca: 'Autonomia, hàbits i salut' },
  { id: 'creatividad',      emoji: '🎨', es: 'Creatividad y música',       ca: 'Creativitat i música' },
  { id: 'entorno',          emoji: '🌍', es: 'Conocimiento del entorno',   ca: 'Coneixement de l\'entorn' }
]

export const WORLDS = [
  {
    id: 'formas', emoji: '🎨', color: '#9b5de5',
    es: 'Colores y Formas', ca: 'Colors i Formes',
    esSub: 'Mirar, comparar y encajar', caSub: 'Mirar, comparar i encaixar',
    acts: [
      { id: 'colores',  emoji: '🌈', es: 'El arcoíris',       ca: "L'arc de Sant Martí", esH: 'Reconocer y nombrar colores', caH: 'Reconèixer i anomenar colors', areas: ['percepcion', 'lenguaje'] },
      { id: 'formas',   emoji: '🔺', es: 'Formas mágicas',    ca: 'Formes màgiques',     esH: 'Círculo, cuadrado, triángulo…', caH: 'Cercle, quadrat, triangle…', areas: ['percepcion', 'matematicas'] },
      { id: 'patrones', emoji: '🔁', es: 'Sigue la serie',    ca: 'Segueix la sèrie',    esH: 'Descubrir el patrón que se repite', caH: 'Descobrir el patró que es repeteix', areas: ['matematicas', 'percepcion'] },
      { id: 'puzzle',   emoji: '🧩', es: 'Rompecabezas',      ca: 'Trencaclosques',      esH: 'Encajar las piezas', caH: 'Encaixar les peces', areas: ['percepcion', 'motricidad_fina'] },
      { id: 'espacial', emoji: '🧭', es: 'Arriba y abajo',    ca: 'A dalt i a baix',     esH: 'Dentro, fuera, encima, debajo', caH: 'Dins, fora, sobre, sota', areas: ['percepcion', 'lenguaje'] },
      { id: 'sombras',      emoji: '🌑', es: 'La sombra',           ca: "L'ombra",             esH: 'Reconocer por la silueta', caH: 'Reconèixer per la silueta', areas: ['percepcion', 'memoria'] },
      { id: 'colorobjeto',  emoji: '🎨', es: '¿De qué color es?',   ca: 'De quin color és?',   esH: 'El color de las cosas', caH: 'El color de les coses', areas: ['percepcion', 'lenguaje'] },
      { id: 'formasobjeto', emoji: '⭕', es: '¿Qué forma tiene?',   ca: 'Quina forma té?',     esH: 'La figura escondida en las cosas', caH: 'La figura amagada a les coses', areas: ['percepcion', 'matematicas'] },
      { id: 'diferente',    emoji: '🔍', es: 'Busca el diferente',  ca: 'Busca el diferent',   esH: 'Comparar y encontrar el intruso', caH: 'Comparar i trobar l\'intrús', areas: ['percepcion', 'memoria'] },
      { id: 'colocacolor',  emoji: '🧺', es: 'Cada color a su caja',ca: 'Cada color a la seva caixa', esH: 'Clasificar por color', caH: 'Classificar per color', areas: ['percepcion', 'matematicas'] }
    ]
  },
  {
    id: 'numeros', emoji: '🔢', color: '#118ab2',
    es: 'Números y Lógica', ca: 'Números i Lògica',
    esSub: 'Contar, comparar y ordenar', caSub: 'Comptar, comparar i ordenar',
    acts: [
      { id: 'contar',    emoji: '🍎', es: 'Cuenta conmigo',   ca: 'Compta amb mi',    esH: 'Contar del 1 al 10', caH: 'Comptar de l\'1 al 10', areas: ['matematicas'] },
      { id: 'sumar',     emoji: '➕', es: 'Sumas de fruta',   ca: 'Sumes de fruita',  esH: 'Juntar cantidades hasta 5', caH: 'Ajuntar quantitats fins a 5', areas: ['matematicas'] },
      { id: 'tamanos',   emoji: '📏', es: 'Grande o pequeño', ca: 'Gran o petit',     esH: 'Comparar tamaños y cantidades', caH: 'Comparar mides i quantitats', areas: ['matematicas', 'percepcion'] },
      { id: 'clasificar',emoji: '🗂️', es: 'Cada uno a su sitio', ca: 'Cadascú al seu lloc', esH: 'Clasificar por categorías', caH: 'Classificar per categories', areas: ['matematicas', 'entorno'] },
      { id: 'restar',         emoji: '👋', es: 'Se van volando',      ca: "Se'n van volant",     esH: 'Quitar cantidades hasta 5', caH: 'Treure quantitats fins a 5', areas: ['matematicas'] },
      { id: 'masmenos',       emoji: '⚖️', es: '¿Dónde hay más?',     ca: 'On n\'hi ha més?',    esH: 'Comparar dos cantidades', caH: 'Comparar dues quantitats', areas: ['matematicas', 'percepcion'] },
      { id: 'numerocantidad', emoji: '🔗', es: 'El número y su montón',ca: 'El número i el seu munt', esH: 'Unir la cifra con la cantidad', caH: 'Unir la xifra amb la quantitat', areas: ['matematicas'] },
      { id: 'quefalta',       emoji: '❓', es: '¿Qué número falta?',  ca: 'Quin número falta?',  esH: 'El orden de los números', caH: "L'ordre dels números", areas: ['matematicas', 'memoria'] },
      { id: 'ordenar',        emoji: '🪜', es: 'La escalera de números', ca: "L'escala de números", esH: 'Ordenar de pequeño a grande', caH: 'Ordenar de petit a gran', areas: ['matematicas', 'percepcion'] }
    ]
  },
  {
    id: 'palabras', emoji: '📚', color: '#06d6a0',
    es: 'Palabras y Letras', ca: 'Paraules i Lletres',
    esSub: 'Hablar, escuchar y leer', caSub: 'Parlar, escoltar i llegir',
    acts: [
      { id: 'vocabulario',  emoji: '🗣️', es: '¿Qué es esto?',   ca: 'Què és això?',     esH: 'Ampliar vocabulario', caH: 'Ampliar vocabulari', areas: ['lenguaje'] },
      { id: 'sonidoinicial',emoji: '👂', es: 'Suena igual',     ca: 'Sona igual',       esH: 'Conciencia fonológica', caH: 'Consciència fonològica', areas: ['prelectura', 'lenguaje'] },
      { id: 'letras',       emoji: '🔠', es: 'Caza la letra',   ca: 'Caça la lletra',   esH: 'Reconocer letras', caH: 'Reconèixer lletres', areas: ['prelectura'] },
      { id: 'silabas',      emoji: '👏', es: 'Palmas y sílabas',ca: 'Picades i síl·labes', esH: 'Segmentar palabras', caH: 'Segmentar paraules', areas: ['prelectura', 'lenguaje'] }
    ]
  },
  {
    id: 'emociones', emoji: '💛', color: '#ff8fab',
    es: 'Emociones y Amigos', ca: 'Emocions i Amics',
    esSub: 'Sentir, entender y convivir', caSub: 'Sentir, entendre i conviure',
    acts: [
      { id: 'emociones',  emoji: '😊', es: '¿Cómo se siente?', ca: 'Com se sent?',    esH: 'Identificar emociones', caH: 'Identificar emocions', areas: ['emocional', 'lenguaje'] },
      { id: 'situaciones',emoji: '🤝', es: '¿Qué hacemos?',    ca: 'Què fem?',        esH: 'Convivencia y empatía', caH: 'Convivència i empatia', areas: ['social', 'emocional'] },
      { id: 'calma',      emoji: '🫧', es: 'Respira conmigo',  ca: 'Respira amb mi',  esH: 'Autorregulación y calma', caH: 'Autoregulació i calma', areas: ['emocional', 'autonomia'] }
    ]
  },
  {
    id: 'naturaleza', emoji: '🌳', color: '#4caf50',
    es: 'Naturaleza y Mundo', ca: 'Natura i Món',
    esSub: 'Animales, tiempo y rutinas', caSub: 'Animals, temps i rutines',
    acts: [
      { id: 'animales', emoji: '🐮', es: 'Sonidos de la granja', ca: 'Sons de la granja', esH: 'Discriminación auditiva', caH: 'Discriminació auditiva', areas: ['entorno', 'memoria'] },
      { id: 'habitats', emoji: '🏞️', es: '¿Dónde vive?',        ca: 'On viu?',           esH: 'Animales y su hábitat', caH: 'Animals i el seu hàbitat', areas: ['entorno', 'matematicas'] },
      { id: 'rutinas',  emoji: '🕐', es: 'El día de Nino',      ca: 'El dia del Nino',   esH: 'Secuencias temporales', caH: 'Seqüències temporals', areas: ['entorno', 'autonomia'] },
      { id: 'tiempo',   emoji: '🌦️', es: '¿Qué tiempo hace?',   ca: 'Quin temps fa?',    esH: 'Meteorología y ropa', caH: 'Meteorologia i roba', areas: ['entorno', 'lenguaje'] }
    ]
  },
  {
    id: 'cuerpo', emoji: '🤸', color: '#f78c6b',
    es: 'Mi Cuerpo y Yo', ca: 'El Meu Cos i Jo',
    esSub: 'Moverme y cuidarme', caSub: 'Moure\'m i cuidar-me',
    acts: [
      { id: 'cuerpo',   emoji: '🧍', es: 'Partes del cuerpo',  ca: 'Parts del cos',    esH: 'Esquema corporal', caH: 'Esquema corporal', areas: ['motricidad_gruesa', 'lenguaje'] },
      { id: 'muevete',  emoji: '💃', es: '¡Muévete!',          ca: 'Mou-te!',          esH: 'Motricidad gruesa y ritmo', caH: 'Motricitat grossa i ritme', areas: ['motricidad_gruesa', 'memoria'] },
      { id: 'higiene',  emoji: '🪥', es: 'Me cuido solo',      ca: 'Em cuido sol',     esH: 'Hábitos e higiene', caH: 'Hàbits i higiene', areas: ['autonomia'] },
      { id: 'seguridad',emoji: '🚦', es: 'Seguro y sano',      ca: 'Segur i sa',       esH: 'Seguridad y comida sana', caH: 'Seguretat i menjar sa', areas: ['autonomia', 'entorno'] }
    ]
  },
  {
    id: 'arte', emoji: '🎵', color: '#ef476f',
    es: 'Arte y Música', ca: 'Art i Música',
    esSub: 'Crear, trazar y sonar', caSub: 'Crear, traçar i sonar',
    acts: [
      { id: 'dibujar', emoji: '🖍️', es: 'Pizarra mágica',   ca: 'Pissarra màgica', esH: 'Expresión libre', caH: 'Expressió lliure', areas: ['creatividad', 'motricidad_fina'] },
      { id: 'trazos',  emoji: '✏️', es: 'Sigue el camino',  ca: 'Segueix el camí', esH: 'Grafomotricidad y preescritura', caH: 'Grafomotricitat i preescriptura', areas: ['motricidad_fina', 'prelectura'] },
      { id: 'ritmo',   emoji: '🥁', es: 'Repite el ritmo',  ca: 'Repeteix el ritme', esH: 'Memoria auditiva y música', caH: 'Memòria auditiva i música', areas: ['creatividad', 'memoria'] },
      { id: 'memoria', emoji: '🃏', es: 'Busca la pareja',  ca: 'Busca la parella', esH: 'Memoria visual y atención', caH: 'Memòria visual i atenció', areas: ['memoria', 'percepcion'] }
    ]
  }
]

export const ALL_ACTS = WORLDS.flatMap(w => w.acts.map(a => ({ ...a, world: w.id, color: w.color })))
export const findAct = (id) => ALL_ACTS.find(a => a.id === id)
