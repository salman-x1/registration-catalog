function signup(e) {
  event.preventDefault();
  console.log("tfcv5fvkdfjksbfcj smnckjsfvbjnsc sjkdbcvk");

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = {
    email: email,
    username: username,
    password: password,
  };
  let json = JSON.stringify(user);
  localStorage.setItem(username, json);
  console.log("User Added");
}

function login(e) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  // let email = document.getElementById('password').value;
  let result = document.getElementById("result");

  let user = localStorage.getItem(username);
  let data = JSON.parse(user);
  console.log(data);

  if (user == null) {
    result.innerHTML = "Invalid Username";
  } else if (username == data.username && password == data.password) {
    result.innerHTML = "Successfully Logged In";
    window.location.href = "table.html";
  } else {
    result.innerHTML = "Wrong Password";
  }
}

function validateForm() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  if (name == "") {
    alert("name is requied");
    return false;
  }

  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 1) {
    alert("Age must be greater than 1");
    return false;
  }

  if (address == "") {
    alert("Address is required");
    return false;
  }

  if (email == "") {
    alert("Email is requied");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid Email Address");
    return false;
  }

  return true;
}

function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  let html = "";
  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";

    html += `<td>

        <button onclick="deleteData(${index})" class="button-6 btn-delete">Delete</button>

        <button onclick="updateData(${index})" class="button-6 btn-edit">Edit</button>

        </td>`;
    html += "</tr>";
  });
  document.querySelector("#table-data tbody").innerHTML = html;
}
document.onload = showData();

//
function addData() {
  if (validateForm() == true) {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

//
function deleteData(index) {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("age").value = peopleList[index].age;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("email").value = peopleList[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById("name").value;
      peopleList[index].age = document.getElementById("age").value;
      peopleList[index].address = document.getElementById("address").value;
      peopleList[index].email = document.getElementById("email").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));

      showData();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}
