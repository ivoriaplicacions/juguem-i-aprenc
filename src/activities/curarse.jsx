import ChoiceGame from '../engines/ChoiceGame'
import { shuffle } from '../lib/rnd'

/* ============================================================
   Me he hecho daño — qué hacer cuando pasa algo.
   Seguro y sano enseña a evitar el peligro; ésta enseña qué
   hacer cuando ya ha ocurrido. La respuesta buena casi siempre
   es la misma y conviene que quede grabada: avisar a un mayor.
   Nada de dramatismo: hacerse un rasguño es parte de jugar.
   ============================================================ */

const CASOS = [
  {
    es: 'Te has caído y te has hecho un rasguño en la rodilla. ¿Qué haces?',
    ca: 'Has caigut i t\'has fet una esgarrapada al genoll. Què fas?',
    ok: { emoji: '🙋', es: 'Aviso a un mayor para que me cure', ca: 'Aviso un gran perquè em curi' },
    no: [{ emoji: '🤫', es: 'No digo nada y sigo jugando', ca: 'No dic res i segueixo jugant' },
         { emoji: '🩹', es: 'Me lo tapo con tierra', ca: 'Me\'l tapo amb terra' }]
  },
  {
    es: 'Un amigo se ha dado un golpe fuerte y llora. ¿Qué haces?',
    ca: 'Un amic s\'ha donat un cop fort i plora. Què fas?',
    ok: { emoji: '📣', es: 'Busco a un mayor y me quedo con él', ca: 'Busco un gran i em quedo amb ell' },
    no: [{ emoji: '🏃', es: 'Me voy a jugar a otro sitio', ca: 'Me\'n vaig a jugar a un altre lloc' },
         { emoji: '🤸', es: 'Le digo que se levante solo', ca: 'Li dic que s\'aixequi sol' }]
  },
  {
    es: 'Te duele mucho la barriga desde hace rato. ¿Qué haces?',
    ca: 'Et fa molt mal la panxa des de fa estona. Què fas?',
    ok: { emoji: '💬', es: 'Se lo cuento a papá o a mamá', ca: 'L\'hi explico al pare o a la mare' },
    no: [{ emoji: '🍬', es: 'Como caramelos a ver si se pasa', ca: 'Menjo caramels a veure si passa' },
         { emoji: '🙈', es: 'Aguanto y no lo digo', ca: 'Aguanto i no ho dic' }]
  },
  {
    es: 'Te has manchado la herida de barro. ¿Con qué se limpia?',
    ca: 'T\'has embrutat la ferida de fang. Amb què es neteja?',
    ok: { emoji: '💧', es: 'Con agua y jabón', ca: 'Amb aigua i sabó' },
    no: [{ emoji: '👕', es: 'Frotando con la camiseta', ca: 'Fregant amb la samarreta' },
         { emoji: '🍃', es: 'Con una hoja del suelo', ca: 'Amb una fulla de terra' }]
  },
  {
    es: 'Ya te han curado y te han puesto una tirita. ¿Qué haces?',
    ca: 'Ja t\'han curat i t\'han posat una tireta. Què fas?',
    ok: { emoji: '😊', es: 'La dejo puesta y sigo jugando', ca: 'La deixo posada i segueixo jugant' },
    no: [{ emoji: '🫳', es: 'Me la quito enseguida', ca: 'Me la trec de seguida' },
         { emoji: '💦', es: 'La mojo en el charco', ca: 'La mullo al bassal' }]
  },
  {
    es: 'Ves una botella con dibujos raros debajo del fregadero. ¿Qué haces?',
    ca: 'Veus una ampolla amb dibuixos estranys sota l\'aigüera. Què fas?',
    ok: { emoji: '🚫', es: 'No la toco y aviso a un mayor', ca: 'No la toco i avuso un gran' },
    no: [{ emoji: '👃', es: 'La huelo para ver qué es', ca: 'L\'olo per veure què és' },
         { emoji: '🥤', es: 'La pruebo un poquito', ca: 'La tasto una miqueta' }]
  }
]

export default function Curarse({ onDone }) {
  const rounds = shuffle(CASOS).map(c => ({
    prompt: { es: c.es, ca: c.ca },
    options: shuffle([{ ...c.ok, ok: true }, ...c.no.map(n => ({ ...n, ok: false }))])
      .map((o, k) => ({ key: `o${k}${o.emoji}`, emoji: o.emoji, ok: !!o.ok, label: { es: o.es, ca: o.ca } }))
  }))
  return <ChoiceGame rounds={rounds} onDone={onDone} optionSize={84} />
}
