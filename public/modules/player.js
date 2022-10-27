import { Entity } from './entity.js'
export class Player extends Entity {
  constructor(x, y, dx, dy, keyUp, keyDown, scoreContainer, shootKey) {
    super(x, y, dx, dy)
    this.moveArray = [false, false, false]
    this.keyUp = keyUp
    this.keyDown = keyDown
    this.score = 0
    this.scoreContainer = scoreContainer
    this.missile = false
    this.shootKey = shootKey
  }
  tick(context, deltaTime, height) {
    this.draw(context)
    this.movement(deltaTime, height)
    this.resetAndScore(height)
  }

  draw(context) {
    context.beginPath()
    context.strokeStyle = this.color
    //First Half
    context.moveTo(this.position.x, this.position.y)
    context.lineTo(this.position.x - 5, this.position.y + 5)
    context.lineTo(this.position.x - 1, this.position.y + 5)
    context.lineTo(this.position.x - 1, this.position.y + 9)
    context.lineTo(this.position.x - 7, this.position.y + 15)
    context.lineTo(this.position.x - 4, this.position.y + 15)
    context.lineTo(this.position.x - 4, this.position.y + 18)
    context.lineTo(this.position.x - 1, this.position.y + 18)
    context.lineTo(this.position.x - 1, this.position.y + 15)
    context.lineTo(this.position.x + 1, this.position.y + 15)
    context.lineTo(this.position.x, this.position.y + 15)
    //Second Half
    context.moveTo(this.position.x, this.position.y)
    context.lineTo(this.position.x + 5, this.position.y + 5)
    context.lineTo(this.position.x + 1, this.position.y + 5)
    context.lineTo(this.position.x + 1, this.position.y + 9)
    context.lineTo(this.position.x + 7, this.position.y + 15)
    context.lineTo(this.position.x + 4, this.position.y + 15)
    context.lineTo(this.position.x + 4, this.position.y + 18)
    context.lineTo(this.position.x + 1, this.position.y + 18)
    context.lineTo(this.position.x + 1, this.position.y + 15)
    context.lineTo(this.position.x - 1, this.position.y + 15)
    context.lineTo(this.position.x, this.position.y + 15)
    //Using moveTo and closePath to prevent bleeding into other drawings
    context.moveTo(this.position.x, this.position.y)
    context.closePath()
    context.stroke()

    if (this.moveArray[0]) {
      context.beginPath()
      context.fillStyle = 'rgb(255,255,255)'
      context.moveTo(this.position.x - 2, this.position.y + 18)
      context.lineTo(this.position.x - 5, this.position.y + 20)
      context.lineTo(this.position.x + 1, this.position.y + 20)
      context.closePath()
      context.fill()

      context.beginPath()
      context.moveTo(this.position.x + 2, this.position.y + 18)
      context.lineTo(this.position.x + 5, this.position.y + 20)
      context.lineTo(this.position.x + 1, this.position.y + 20)
      context.closePath()
      context.fill()
    }
  }

  movement(deltaTime, height) {
    if (this.moveArray[0]) {
      this.position.y -= this.velocity.dy * deltaTime
    }
    if (this.moveArray[1] && this.position.y + 20 < height) {
      this.position.y += this.velocity.dy * deltaTime
    }
  }
  handleKeyDown(e) {
    if (e.key === this.keyUp) {
      this.moveArray[0] = true
    }
    if (e.key === this.keyDown) {
      this.moveArray[1] = true
    }
    if (e.key === this.shootKey && this.missile === false) {
      this.moveArray[2] = true
      this.missile = true
    }
  }

  handleKeyUp(e) {
    if (e.key === this.keyUp) {
      this.moveArray[0] = false
    }
    if (e.key === this.keyDown) {
      this.moveArray[1] = false
    }
  }

  resetAndScore(height) {
    if (this.position.y < 0) {
      this.position.y = height - 25
      this.score++
    }
    this.scoreContainer.innerHTML = this.score
  }
}
