import {GlowParticle} from "./glowParticles"

const COLORS = [
  { r: 45, g: 74, b: 227 },
  { r: 255, g: 74, b: 45 },
  { r: 54, g: 235, b: 84 },  
]

class App {
  constructor() {
    this.canvas = document.createElement("canvas")
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")

    this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1

    this.totalParticles = 18
    this.particles = []
    this.maxRadius = 900
    this.minRadius = 400

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