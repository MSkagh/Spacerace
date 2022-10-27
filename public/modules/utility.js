export function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}

export function distance(x1, x2, y1, y2) {
  let dx = x2 - x1
  let dy = y2 - y1
  let distance = Math.sqrt(dx * dx + dy * dy)
  return distance
}
