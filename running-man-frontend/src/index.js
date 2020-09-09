document.addEventListener('DOMContentLoaded', () => {
    playGame()
    // let loggedIn = false
    // if (loggedIn === false) {
    //     const navBar = document.querySelector('.navbar')
    //     navBar.style.display = "none"
    // }
    // renderMenu()   
})
function playGame() {
  const scoreBoard = document.querySelector("#score")
const bottom = 150
const grid = document.querySelector('.grid')
const body = document.querySelector('body')
const alert = document.getElementById('alert')
const character = document.createElement("img")
const characterHeight = "150px"
character.style.height = characterHeight
character.style.position = "absolute"
character.style.left = "50px"
character.style.bottom = '0px'
character.src = 'assets/sprites/mario.gif'
document.body.append(character)

//control part
let isJumping = false
let gravity = 0.9
let isGameOver = false

function control(e) {
    if (e.keyCode === 32) {
        if (!isJumping) {
            isJumping = true
            jump()
        }
    }
}

document.addEventListener('keyup', control)

let position = 200
function jump() {
  let count = 0
  let timerId = setInterval(function () {
    //move down
    if (count === 15) {
      clearInterval(timerId)
      let downTimerId = setInterval(function () {
        if (count === 0) {
          clearInterval(downTimerId)
          isJumping = false
        }
        position -= 5
        count--
        position = position * gravity
        character.style.bottom = position + 'px'
      },20)

    }
    //move up
    position +=30
    count++
    position = position * gravity
    character.style.bottom = position + 'px'
  },20)
}
let score = 0

  let scoreInterval = setInterval(function(){
    scoreBoard.innerText = `SCORE: ${Math.round(score)}`
    score = score +=0.02
  },20)
function generateObstacles() {
  
 
  let randomTime = Math.random() * 4000
  let obstaclePosition = 2000
  const obstacle = document.createElement('div')
  if (!isGameOver) obstacle.classList.add('obstacle')
  grid.appendChild(obstacle)
  obstacle.style.left = obstaclePosition + 'px'

  let timerId = setInterval(function() {
    if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
      console.log(score)
      clearInterval(timerId)
      clearInterval(scoreInterval)
      alert.innerHTML = 'Game Over'
   
      isGameOver = true
      //remove all children
      body.removeChild(body.firstChild)
      while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
      }
      
    }
    obstaclePosition -=10
    obstacle.style.left = obstaclePosition + 'px'
  },20)
  if (!isGameOver) setTimeout(generateObstacles, randomTime)
}
generateObstacles()
}
