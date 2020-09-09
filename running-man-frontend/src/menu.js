const renderMenu = () => {
    //menuContainer.innerHTML = ""
    let page = `
    <div class="menu">
    <form class="new-game-form">
      <h3>Welcome to Running man!</h3>
      <h3>Please login!</h3>
      <input
          type="text"
          name="email_address"
          value=""
          placeholder="Enter email address"
          class="input-text"
        />
        <br />
        <input
          type="text"
          name="password"
          value=""
          placeholder="Enter password"
          class="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Login"
          class="submit"
        />
    </form>
  <br>
    <button class="create-users"> Create New User!</button>
    <br><br>
    </div>
    `


    body.innerHTML = page
    const menuContainer = document.querySelector(".menu")
    let userLogin = document.querySelector('.new-game-form')
    userLogin.addEventListener('submit', event => {
        handleForm(event)
    })
    let userCreate = document.querySelector('.create-users')
    userCreate.addEventListener('click', () => {
      createNewUser()
    })
}

const handleForm = (event) => {
    event.preventDefault();
    let data = {
        "login":{
        "email_address": event.target.email_address.value,
        "password": event.target.password.value
        }
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => showUser(json))
}

showUser = (user) => {
  if(user === {error: "User not found"} || user.name === undefined){
    renderMenu()
    let errorMessage = document.createElement('p')
    errorMessage.innerText = "User not found. Please create a new user!"
    const menuContainer = document.querySelector(".menu")
    menuContainer.appendChild(errorMessage)
    
  } else {
    let loggedin = true
  let gameUser = user
  const userName = document.createElement('h3')
  userName.innerText = user.name 
  let menuDiv = document.querySelector('body')
  //menuDiv.removeChild(menuDiv.lastChild)
  menuDiv.appendChild(userName)
  let noMenu = document.querySelector('.menu').innerHTML = ""
  let playGameButton = document.createElement('button')
  playGameButton.innerText = "Play Game"
  menuDiv.appendChild(playGameButton)
  playGameButton.addEventListener('click', () =>{
    playGame(gameUser)
    //menuDiv.removeChild(playGameButton)
  })
  let editUserButton = document.createElement('button')
  editUserButton.innerText = "Edit User"
  menuDiv.appendChild(editUserButton)
  editUserButton.addEventListener('click', () => {
    editUserForm(gameUser)
  })

  }
}


const createNewUser = () => {
  let newUserForm = `<div class="menu"><form class="new-user-form">
  <h3>Fill in your information!</h3>
  <input
      type="text"
      name="name"
      value=""
      placeholder="Enter name"
      class="input-text"
    />
  <input
      type="text"
      name="email_address"
      value=""
      placeholder="Enter email address"
      class="input-text"
    />
    <br />
    <input
      type="text"
      name="password"
      value=""
      placeholder="Enter password"
      class="input-text"
    />
    <br />
    <input
      type="submit"
      name="submit"
      value="Create User"
      class="submit"
    />
</form>
</div>`
body.innerHTML = newUserForm
let newUserSubmit = document.querySelector('.new-user-form')
newUserSubmit.addEventListener('submit', e => {
  createUserFetch(e)
})
}

const createUserFetch = (e) => {
  e.preventDefault()
  let data = {
    "name": e.target.name.value,
    "email_address": e.target.email_address.value,
    "password": e.target.password.value
  }
  fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    } 
  }).then(response => response.json())
  .then(json => showUser(json))
}

const editUserForm = (user) => {
  let editUserForm = `<div class="menu"><form class="edit-user-form">
  <h3>Edit your information!</h3>
  <input
      type="text"
      name="name"
      value=""
      placeholder="Enter name"
      class="input-text"
    />
  <input
      type="text"
      name="email_address"
      value=""
      placeholder="Enter email address"
      class="input-text"
    />
    <br />
    <input
      type="text"
      name="password"
      value=""
      placeholder="Enter password"
      class="input-text"
    />
    <br />
    <input
      type="submit"
      name="submit"
      value="Edit User"
      class="submit"
    />
  </form>
  </div>`
  let gameUser = user
  body.innerHTML = editUserForm
  let editUserSubmit = document.querySelector('.edit-user-form')
  editUserSubmit.addEventListener('submit', e => {
  editUserFetch(e, gameUser)
})
}

const editUserFetch = (e, user) => {

  let data = {
    "name": e.target.name.value,
    "email_address": e.target.email_address.value,
    "password": e.target.password.value
  }
  fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(response => response.json())
  .then(json => {
    showUser(json)
    debugger
  })

}