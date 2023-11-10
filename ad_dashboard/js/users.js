let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/users")
    .then((res) => res.json())
    .then((json) => {
        json.map((data) => {
            tbody.append(td_fun(data));
        });
        const arrayLength = json.length;
        document.getElementById('total--users').innerHTML = arrayLength;
    });

function td_fun({ id, name, email, phone, status, role }) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id}`);
    td.innerHTML = `
    <th scope="row">${id}</th>
    <td>${name}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${role}</td>
    <td>${status}</td>
    <td>
      <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"><i class="fa-solid fa-pen-to-square icons"></i></button>
      <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleDeleteUser(${id})"><i class="fa-solid fa-trash-can icons"></i></button>
    </td>
      `;
    return td;
}

var idUserUpdate;

async function handleGetDetail(id) {
  console.log(id);
  event.preventDefault();
  await axios
  .get(`https://touring.glitch.me/users/${id}`)
    .then((response) => {
      idUserUpdate = response.data.id;
      document.getElementById("name-update").value = response.data.name;
      document.getElementById("email-update").value = response.data.email;
      document.getElementById("phone-update").value = response.data.phone;
      document.getElementById("role-update").value = response.data.role;
      document.getElementById("status-update").value = response.data.status;
      var modal = document.getElementById("id02");
      modal.style.display = "block";
    })
    .catch(error => {
      // Xử lý lỗi khi yêu cầu thất bại
      console.error(error);
    });
}

async function handleUpdate(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name-update"]').value;
  var email = document.querySelector('input[name="email-update"]').value;
  var phone = document.querySelector('input[name="phone-update"]').value;
  var selectElement = document.getElementById("role-update");
  var role = selectElement.value;
  var selectElementS = document.getElementById("status-update");
  var status = selectElementS.value;
  await axios
    .put(`https://touring.glitch.me/users/${idUserUpdate}`, {
      name: name,
      email: email,
      phone: phone,
      status: status,
      role: role
    })
    .then((response) => {
      idUserUpdate = "";
      setTimeout(function () {
        location.reload();
      }, 500);
    });
}

async function handleSubmit(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var phone = document.querySelector('input[name="phone"]').value;
  var selectElement = document.getElementById("role");
  var role = selectElement.value;
  var selectElementS = document.getElementById("status");
  var status = selectElementS.value;
  await axios
    .post("https://touring.glitch.me/users", {
      name: name,
      email: email,
      phone: phone,
      status: status,
      role: role
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      setTimeout(function () {
        location.reload();
      }, 500);
    });
}
