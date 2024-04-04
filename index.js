//This file includes CRUD Operations that includes data into the Table
//Fields are Name, Age, Email and Address that are required fields
//

class TableData {
  constructor(name, age, email, address) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.address = address;
  }
}
class CrudOperation {
  //Add Data Function
  static addData() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    if (
      name.trim() === "" ||
      age.trim() === "" ||
      address.trim() === "" ||
      email.trim() === ""
    ) {
      swal("Error", "Please Enter All the Fields", "error");
      return;
    }
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

  //Delete Data Function
  static deleteData(index) {
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

  //update

  static updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

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
    };
  }
}
// Show Data Function
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

        <button onclick="CrudOperation.deleteData(${index})" class="button-6 btn-delete">Delete</button>


       
        <button onclick="CrudOperation.updateData(${index})" class="button-6 btn-edit">Edit</button>


        </td>`;
    html += "</tr>";
  });
  document.querySelector("#table-data tbody").innerHTML = html;
}
document.onload = showData();
