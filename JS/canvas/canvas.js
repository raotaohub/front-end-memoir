let drawing = document.getElementById('drawing')
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  var ctx = canvas.getContext('2d')
  ctx.fillStyle = 'green'
  ctx.fillRect(10, 10, 100, 100)
}
