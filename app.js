import { GlowParticle } from "./glowParticle.js"

const COLORS = [
  { r: 9, g: 87, b: 195 },
  { r: 239, g: 66, b: 111 },
  { r: 25, g: 203, b: 87 },
  { r: 144, g: 224, b: 255 },
  { r: 255, g: 51, b: 61 },
]

class App {
  constructor() {
    this.canvas = document.createElement("canvas")
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")

    this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1

    this.totalParticles = 10
    this.particles = []
    this.maxRadius = 1800
    this.minRadius = 300

    window.addEventListener("resize", this.resize.bind(this), false)
    this.resize()

    window.requestAnimationFrame(this.animate.bind(this))
  }
  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio)

    this.ctx.globalCompositeOperation = "saturation"

    this.crateParticles()
  }

  crateParticles() {
    let curColor = 0
    this.particles = []

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius, COLORS[curColor]
      )
      
      if (++curColor >= COLORS.length) {
        curColor = 0
      }

      this.particles[i] = item
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i]
      item.animate(this.ctx, this.stageWidth, this.stageHeight)
    }
  }
}

window.onload = () => {
  new App()
}