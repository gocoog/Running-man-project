document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.length < 1){
      renderMenu() 
  } else {
    let retrievedUser = localStorage.getItem('user');
    showUser(JSON.parse(retrievedUser))
  }

      
})

const body = document.querySelector('body')

function playGame(user) {
  //control part
  let gameBody = `
  <p id="score"></p>
  <div id ="game-container" class="game-container">
  <h2 id="alert"></h2>
   <div class="grid">
      <div class="character"></div>
  </div>
</div> `
body.innerHTML = gameBody
const scoreBoard = document.querySelector("#score")
const bottom = 150
const grid = document.querySelector('.grid')

const alert = document.getElementById('alert')
let docBody = document.querySelector('body')
const character = document.createElement("img")
const characterHeight = "150px"
character.style.height = characterHeight
character.style.position = "absolute"
character.style.left = "50px"
character.style.bottom = '0px'
character.src = 'assets/sprites/mario.gif'
  
  document.body.append(character)
  let gameUser = user
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
    score = score += 1
    scoreBoard.innerText = `SCORE: ${Math.round(score)}`
  },1000)
 
  function generateObstacles() {
    
    let randomTime = Math.random() * 4000
    let obstaclePosition = 2000
    const obstacle = document.createElement('div')
    if (!isGameOver) obstacle.classList.add('obstacle')
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px'

    let timerId = setInterval(function() {
      if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId)
        alert.innerHTML = `<span class="red">G</span><span class="blue">a</span><span class="yellow">m</span><span class="blue">e</span> <br><span class="green">O</span><span class="blue">v</span><span class="green">e</span><span class="red">r</span>`
        isGameOver = true
        //remove all children

        while (grid.firstChild) {
          grid.removeChild(grid.lastChild)
        }
        clearInterval(scoreInterval)
      }
      obstaclePosition -=10
      obstacle.style.left = obstaclePosition + 'px'
    },20)
    if (isGameOver){
      persistScore(score, gameUser)
      userPlayAgain(gameUser)
    }
    if (!isGameOver) setTimeout(generateObstacles, randomTime)
  }
  generateObstacles()
}

const persistScore = (score, user) => {
  let data = {
    "score": {
    "score": score,
    "user_id": user.id
  }
}
  fetch('http://localhost:3000/scores', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }) .then(response => response.json())
  .then(json => console.log(json))
}

const userPlayAgain = (user) => {
  let gameUser = user
  let playAgainButton = document.createElement('button')
  playAgainButton.innerText = "Play Again"
  playAgainButton.setAttribute('id', 'play-again')
  
  let logoutButton = document.createElement('button')
  logoutButton.innerText = "Logout"
  logoutButton.setAttribute('id', 'logout')
  playAgainButton.addEventListener('click', (e) => {
    document.getElementById('play-again').remove()
    document.getElementById('logout').remove()
    alert.innerHTML = ""
    playGame(gameUser)
  })

  let userPageButton = document.createElement('button')
  userPageButton.innerText = 'Go back to scores page'
  userPageButton.addEventListener('click', () => {
    let retrievedUser = localStorage.getItem('user');
    showUser(JSON.parse(retrievedUser))
  })

  logoutButton.addEventListener('click', () => {
    localStorage.clear()
    renderMenu() 
  })
  let menuDiv = document.createElement('div')
  menuDiv.setAttribute('class', 'menu')
  menuDiv.append(playAgainButton, userPageButton, logoutButton)
  body.appendChild(menuDiv)


}