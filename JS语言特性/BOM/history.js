const history = window.history
console.log(
  '%chistory------------------------------------------',
  'color: red ;font-size:18px'
)

console.log(window.history)

for (const key in history) {
  console.log(key, history[key])
}
