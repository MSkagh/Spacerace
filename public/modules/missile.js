import { Entity } from './entity.js'

export class Missile extends Entity {
  tick(context, deltaTime) {
    this.draw(context)
    this.movement(deltaTime)
  }
  draw(context) {
    context.strokeStyle = this.color
    context.beginPath()
    context.moveTo(this.position.x, this.position.y)
    if (this.velocity.dx > 0) {
      context.lineTo(this.position.x + 3, this.position.y)
      context.lineTo(this.position.x + 4, this.position.y + 1)
      context.lineTo(this.position.x + 3, this.position.y + 2)
      context.lineTo(this.position.x - 3, this.position.y + 2)
      context.lineTo(this.position.x - 4, this.position.y + 3)
      context.lineTo(this.position.x - 4, this.position.y - 1)
      context.lineTo(this.position.x - 3, this.position.y)
    } else {
      context.lineTo(this.position.x - 3, this.position.y)
      context.lineTo(this.position.x - 4, this.position.y + 1)
      context.lineTo(this.position.x - 3, this.position.y + 2)
      context.lineTo(this.position.x + 3, this.position.y + 2)
      context.lineTo(this.position.x + 4, this.position.y + 3)
      context.lineTo(this.position.x + 4, this.position.y - 1)
      context.lineTo(this.position.x + 3, this.position.y)
    }
    context.closePath()
    context.stroke()
  }
  movement(deltaTime) {
    this.position.x += this.velocity.dx * deltaTime
  }
}

/*
let rot = Math.PI / 2 * 3;
    let x = this.position.x;
    let y = this.position.y;
    let step = Math.PI / 5;

    context.strokeSyle = "#000";
    context.beginPath();
    context.moveTo(this.position.x, this.position.y - this.radius * 2)
    for (i = 0; i < 5; i++) {
        x = this.position.x + Math.cos(rot) * (this.radius * 2);
        y = this.position.y + Math.sin(rot) * (this.radius * 2);
        context.lineTo(x, y)
        rot += step

        x = this.position.x + Math.cos(rot) * this.radius;
        y = this.position.y + Math.sin(rot) * this.radius;
        context.lineTo(x, y)
        rot += step
    }
    context.lineTo(this.position.x, this.position.y - this.radius * 2)
    context.closePath();
    context.lineWidth=0.5;
    context.strokeStyle='blue';
    context.stroke();
    context.fillStyle='skyblue';
    context.fill();


*/
