let signupForm = document.getElementById("signupForm");

class Register {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class Auth {
  static signup(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const user = new Register(username, email, password);

    let json = JSON.stringify(user);
    localStorage.setItem(username, json);
    signupForm.reset();
    window.location.href = "login.html";
  }

  static login(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let result = document.getElementById("result");

    let user = localStorage.getItem(username);

    if (user === null) {
      result.innerHTML = "Invalid Username";
      return;
    }

    try {
      let data = JSON.parse(user);

      if (username === data.username && password === data.password) {
        result.innerHTML = "Successfully Logged In";
        window.location.href = "table.html";
      } else {
        result.innerHTML = "Wrong Password";
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      result.innerHTML = "An error occurred. Please try again.";
    }
  }
}
