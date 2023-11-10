let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/destinations")
    .then((res) => res.json())
    .then((json) => {
        json.map((data) => {
            tbody.append(td_fun(data));
        });
        const arrayLength = json.length;
        document.getElementById('total--destination').innerHTML = arrayLength;
    });

function td_fun({ id, name, description, image, booked }) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id}`);
    td.innerHTML = `
    <th scope="row">${id}</th>
    <td>${name}</td>
    <td>${description}</td>
    <td class="change--img"><img src="${image}"></img></td>
    <td>${booked}</td>
    <td>
      <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"><i class="fa-solid fa-pen-to-square icons"></i></button>
      <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleDeleteDestination(${id})"><i class="fa-solid fa-trash-can icons"></i></button>
    </td>
      `;
    return td;
}


var idUserUpdate;

async function handleGetDetail(id) {
  event.preventDefault();
  await axios
  .get(`https://touring.glitch.me/destinations/${id}`)
    .then((response) => {
      idUserUpdate = response.data.id;
      document.getElementById("name-update").value = response.data.name;
      document.getElementById("description-update").value = response.data.description;
      document.getElementById("image-update").value = response.data.image;
      document.getElementById("booked-update").value = response.data.booked;
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
  var description = document.querySelector('input[name="description-update"]').value;
  var image = document.querySelector('input[name="image-update"]').value;
  var booked = document.querySelector('input[name="booked-update"]').value;
  await axios
    .put(`https://touring.glitch.me/destinations/${idUserUpdate}`, {
      name: name,
      description: description,
      image: image,
      booked: booked
    })
    .then((response) => {
      idUserUpdate = "";
      alert("Update susesfully")
      setTimeout(function () {
        location.reload();
      }, 500);
    });
}

async function handleSubmit(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var description = document.querySelector('input[name="description"]').value;
  var image = document.querySelector('input[name="image"]').value;
  var booked = document.querySelector('input[name="booked"]').value;
  await axios
    .post("https://touring.glitch.me/destinations", {
      name: name,
      description: description,
      image: image,
      booked: booked
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      setTimeout(function () {
        location.reload();
      }, 500);
    });
}

