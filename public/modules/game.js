import { Player } from './player.js'
import { Enemy } from './enemy.js'
import { randomNumberBetween, distance } from './utility.js'
import { Missile } from './missile.js'

class Game {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.lastTime = Date.now()
    this.entities = []
  }

  spawnEnemy() {
    this.entities.push(
      new Enemy(
        this.entities.length % 2 === 0 ? 0 : this.width,
        randomNumberBetween(50, this.height - 100),
        this.entities.length % 2 === 0
          ? randomNumberBetween(100, 200)
          : randomNumberBetween(-100, -200),
        0,
        3
      )
    )
  }

  centerLine() {
    this.context.fillStyle = 'DarkSlateBlue'
    this.context.fillRect(this.width / 2 - 5, 0, 10, this.height)
    this.context.fillStyle = 'rgb(255,255,255)'
  }
  removeEnemy(i) {
    if (this.entities[i] instanceof Missile) {
      if (this.entities[i].velocity.dx > 0) {
        this.entities[0].missile = false
      } else if (this.entities[i].velocity.dx < 0) {
        this.entities[1].missile = false
      }
    }
    this.entities.splice(i, 1)
  }
  playerEnemyCollision(enemy, player) {
    if (
      distance(
        player.position.x,
        enemy.position.x,
        player.position.y + 9,
        enemy.position.y
      ) <
      enemy.radius + 10
    ) {
      player.position.y = this.height - 25
    }
  }
  playerMissileCollision(missile, player) {
    if (
      distance(
        player.position.x,
        missile.position.x,
        player.position.y + 9,
        missile.position.y
      ) < 14
    ) {
      player.position.y = this.height - 25
    }
  }
}

let gameObj = new Game()
gameObj.entities.push(
  new Player(
    150,
    gameObj.height - 25,
    0,
    200,
    'w',
    's',
    document.getElementById('scoreleft'),
    'a'
  )
)
gameObj.entities.push(
  new Player(
    450,
    gameObj.height - 25,
    0,
    200,
    'o',
    'l',
    document.getElementById('scoreright'),
    'k'
  )
)

let enemySpawnTimer = 0
export function tick() {
  let currentTime = Date.now()
  let deltaTime = (currentTime - gameObj.lastTime) / 1000
  gameObj.lastTime = currentTime
  enemySpawnTimer += deltaTime
  gameObj.context.clearRect(0, 0, gameObj.width, gameObj.height)

  gameObj.centerLine()

  if (enemySpawnTimer > 0.1) {
    gameObj.spawnEnemy()
    enemySpawnTimer = 0
  }
  if (gameObj.entities[0].moveArray[2]) {
    gameObj.entities.push(
      new Missile(
        gameObj.entities[0].position.x,
        gameObj.entities[0].position.y + 9,
        200,
        0
      )
    )
    gameObj.entities[0].moveArray[2] = false
  }
  if (gameObj.entities[1].moveArray[2]) {
    gameObj.entities.push(
      new Missile(
        gameObj.entities[1].position.x,
        gameObj.entities[1].position.y + 9,
        -200,
        0
      )
    )
    gameObj.entities[1].moveArray[2] = false
  }

  for (let i = 0; i < gameObj.entities.length; i++) {
    let entity = gameObj.entities[i]
    entity.tick(gameObj.context, deltaTime, gameObj.height, gameObj.width)

    if (entity.position.x < 0 || entity.position.x > gameObj.width) {
      gameObj.removeEnemy(i)
      i--
    }
  }

  for (let i = 2; i < gameObj.entities.length; i++) {
    let enemy = gameObj.entities[i]
    if (enemy instanceof Missile) {
      if (enemy.velocity.dx < 0) {
        gameObj.playerMissileCollision(enemy, gameObj.entities[0])
      } else if (enemy.velocity.dx > 0) {
        gameObj.playerMissileCollision(enemy, gameObj.entities[1])
      }
    } else {
      gameObj.playerEnemyCollision(enemy, gameObj.entities[0])
      gameObj.playerEnemyCollision(enemy, gameObj.entities[1])
    }
  }

  requestAnimationFrame(tick)
}

export default gameObj
