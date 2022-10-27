import { tick } from './modules/game.js'
import gameObj from './modules/game.js'

addEventListener('keydown', (e) => {
  gameObj.entities[0].handleKeyDown(e)
  gameObj.entities[1].handleKeyDown(e)
})
addEventListener('keyup', (e) => {
  gameObj.entities[0].handleKeyUp(e)
  gameObj.entities[1].handleKeyUp(e)
})
tick()
