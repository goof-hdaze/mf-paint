// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', () => {
  resize() // Resizes the canvas once the window loads
  document.addEventListener('mousedown', startPainting)
  document.addEventListener('mouseup', stopPainting)
  document.addEventListener('mousemove', sketch)
  window.addEventListener('resize', resize)
})

function loadRandomImg() {
  let bimages = [
    'base.png',
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
  ]
  let rand = Math.floor(Math.random() * 9)
  newImage = 'url(img/mif/' + bimages[rand] + ')'
  document.getElementById('canvas').style.backgroundImage = newImage
}

loadRandomImg()

const canvas = document.querySelector('#canvas')

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d')

// Resizes the canvas to the available size of the window.
function resize() {
  ctx.canvas.width = document.getElementById('canvas-wrap').offsetWidth
  ctx.canvas.height = window.innerHeight - 380
}

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 }

// This is the flag that we are going to use to
// trigger drawing
let paint = false
let paintcolor = 'black'
let paintsize = 6
let bgpattern = 'white.png'
let bgImage = 'url(img/' + bgpattern + ')'

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft
  coord.y = event.clientY - canvas.offsetTop
}
function getColor(data) {
  paintcolor = data.getAttribute('data-color')
  var elems = document.querySelector('.colorbtn.active')
  if (elems !== null) {
    elems.classList.remove('active')
  }
  data.className += ' active'
}

function getSize(data) {
  paintsize = data.getAttribute('data-size')
  var elems = document.querySelector('.drawbtn.active')
  if (elems !== null) {
    elems.classList.remove('active')
  }
  data.className += ' active'
}

function getBG(data) {
  bgpattern = data.getAttribute('data-bg')
  bgImage = 'url(img/bg/' + bgpattern + ')'
  document.getElementById('canvas-wrap').style.backgroundImage = bgImage
  var elems = document.querySelector('.bgbtn.active')
  if (elems !== null) {
    elems.classList.remove('active')
  }
  data.className += ' active'
}

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
  paint = true
  getPosition(event)
}
function stopPainting() {
  paint = false
}

function sketch(event) {
  if (!paint) return
  ctx.beginPath()

  ctx.lineWidth = paintsize

  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = 'round'

  ctx.strokeStyle = paintcolor

  // The cursor to start drawing
  // moves to this coordinate
  ctx.moveTo(coord.x, coord.y)

  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event)

  // A line is traced from start
  // coordinate to this coordinate
  ctx.lineTo(coord.x, coord.y)

  // Draws the line.
  ctx.stroke()
}
