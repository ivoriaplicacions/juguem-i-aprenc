/* Comprueba que toda actividad llame a dibujos y formas que existen de verdad.
   Un nombre mal escrito no rompe la compilación: sale un hueco en blanco en
   mitad del juego, que es justo lo que no queremos que descubra el niño.

   Uso: npm run comprobar */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const FAMILIAS = ['animals', 'food', 'things', 'faces', 'body', 'misc']

/** Nombres de dibujo publicados por src/art/. */
const catalogo = new Set()
for (const familia of FAMILIAS) {
  const src = readFileSync(join('src/art', familia + '.jsx'), 'utf8')
  for (const m of src.matchAll(/export const (\w+)\s*=/g)) catalogo.add(m[1])
}
catalogo.delete('numeroArt')
catalogo.delete('letraArt')

/** Ids de forma geométrica válidos. */
const formas = new Set(
  [...readFileSync('src/art/shapes.jsx', 'utf8').matchAll(/id: '(\w+)'/g)].map(m => m[1])
)

/** Los prefijos que Art resuelve por su cuenta: num:5, let:A, sem:verde. */
const especial = (n) => n.startsWith('num:') || n.startsWith('let:') || n.startsWith('sem:')

const problemas = []
for (const fichero of readdirSync('src/activities').filter(f => f.endsWith('.jsx'))) {
  const src = readFileSync(join('src/activities', fichero), 'utf8')

  const dibujos = new Set()
  for (const m of src.matchAll(/\bart:\s*'([^']+)'/g)) dibujos.add(m[1])
  for (const m of src.matchAll(/name="([^"{]+)"/g)) dibujos.add(m[1])

  for (const n of dibujos) {
    if (!especial(n) && !catalogo.has(n)) problemas.push(`${fichero}: no existe el dibujo "${n}"`)
  }
  for (const m of src.matchAll(/shape:\s*'([^']+)'/g)) {
    if (!formas.has(m[1])) problemas.push(`${fichero}: no existe la forma "${m[1]}"`)
  }
}

if (problemas.length) {
  for (const p of problemas) console.error('✗ ' + p)
  console.error(`\n${problemas.length} referencia(s) rota(s).`)
  process.exit(1)
}
console.log(`✓ Todos los dibujos y formas existen (${catalogo.size} en el catálogo).`)
