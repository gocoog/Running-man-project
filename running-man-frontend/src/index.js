document.addEventListener('DOMContentLoaded', () => {
    
    let loggedIn = false
    if (loggedIn === false) {
        const navBar = document.querySelector('.navbar')
        navBar.style.display = "none"
    }
    renderMenu()   
})

const bottom = 150

const character = document.createElement("img")
const characterHeight = "150px"
character.style.height = characterHeight
character.style.position = "absolute"
character.style.left = "50px"
character.style.bottom = `${bottom+20}px`
character.src = 'assets/sprites/mario.gif'
document.body.append(character)

//control part
let isJumping = false

function control(e) {
    if (e.keyCode === 32) {
        if (!isJumping) {
            isJumping = true
            jump()
        }
    }
}

document.addEventListener('keyup', control)

function jump() {
    let position = 150
    let timerId = setInterval(function () {
        //move up
        console.log('up')
        position +=40

    },30)
}