import { Entity } from './entity.js'

export class Enemy extends Entity {
  constructor(x, y, dx, dy, radius) {
    super(x, y, dx, dy)
    this.radius = radius
  }

  tick(context, deltaTime) {
    this.draw(context)
    this.movement(deltaTime)
  }

  draw(context) {
    context.fillSyle = this.color
    context.beginPath()
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    context.closePath()
    context.fill()
  }

  movement(deltaTime) {
    this.position.x += this.velocity.dx * deltaTime
  }
}
