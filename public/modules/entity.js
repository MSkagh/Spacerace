import { Position, Velocity } from './component.js'

export class Entity {
  constructor(x, y, dx, dy) {
    this.position = new Position(x, y)
    this.velocity = new Velocity(dx, dy)
    this.color = 'rgb(255,255,255)'
  }
  tick() {}
  draw() {}
  movement() {}
}
