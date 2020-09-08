const renderMenu = () => {
    const menuContainer = document.querySelector(".menu")
    let page = `
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
    <br><br>
    <form id="manipulate_users"><br><br><br>
    </form>
    `
    menuContainer.innerHTML = page
    let userLogin = document.querySelector('.new-game-form')
    userLogin.addEventListener('submit', event => {
        handleForm(event)
    })
}

const handleForm = (event) => {
    event.preventDefault();
    let data = {
        "email_address": event.target.email_address.value,
        "password": event.target.password.value
    }
    // let emailAddress = event.target.email_address.value
    // let password = event.target.password.value
    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
}


