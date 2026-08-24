export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const sample = (arr, n) => shuffle(arr).slice(0, n)
export const range = (n, from = 0) => Array.from({ length: n }, (_, i) => i + from)
/** Elige n elementos distintos de `arr` asegurando que `must` esté incluido. */
export const withCorrect = (arr, must, n) => {
  const others = sample(arr.filter(x => x !== must), Math.max(0, n - 1))
  return shuffle([must, ...others])
}
