let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/details")
    .then((res) => res.json())
    .then((json) => {
        json.map((data) => {
            tbody.append(td_fun(data));
        });
        const arrayLength = json.length;
        document.getElementById('total--details').innerHTML = arrayLength;
    });

function td_fun({ id ,id_destination, name_destination, main_name_destination, sub_name_destination, mainImage, sub_images, descriptions_destination,  highlight_destination, adultPrice, childPrice}) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id}`);
    td.innerHTML = `
    <th scope="row" id="id--details">${id}</th>
    <td>${id_destination}</td>
    <td>${name_destination}</td>
    <td>${main_name_destination}<br>${sub_name_destination}</td>
    <td class="change--img">${mainImage}</td>
    <td class="change--imgs">${sub_images}</td>
    <td>${descriptions_destination}</td>
    <td>${highlight_destination}</td>
    <td>${adultPrice}</td>
    <td>${childPrice}</td>
    <td>
      <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"><i class="fa-solid fa-pen-to-square icons"></i></button>
      <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleDeleteDetail(${id})"><i class="fa-solid fa-trash-can icons"></i></button>
    </td>
      `;
    return td;
}

var idProductUpdate;

async function handleGetDetail(id) {
  console.log(id);
  event.preventDefault();
  await axios
  .get(`https://touring.glitch.me/details/${id}`)
    .then((response) => {
      idProductUpdate = response.data.id;
      document.getElementById("name-update").value = response.data.name_destination;
      document.getElementById("id_destination-update").value = response.data.id_destination;
      document.getElementById("main_name-update").value = response.data.main_name_destination;
      document.getElementById("sub_name-update").value = response.data.sub_name_destination;
      document.getElementById("mainImage-update").value = response.data.mainImage;
      document.getElementById("sub_images-update").value = response.data.sub_images;
      document.getElementById("descriptions-update").value = response.data.descriptions_destination;
      document.getElementById("highlight-update").value = response.data.highlight_destination;
      document.getElementById("adultPrice-update").value = response.data.adultPrice;
      document.getElementById("childPrice-update").value = response.data.childPrice;
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
  var id_destination = document.querySelector('input[name="id_destination-update"]').value;
  var main_name = document.querySelector('input[name="main_name-update"]').value;
  var sub_name = document.querySelector('input[name="sub_name-update"]').value;
  var mainImage = document.querySelector('input[name="mainImage-update"]').value;
  var sub_images = document.querySelector('input[name="sub_images-update"]').value;
  var descriptions = document.querySelector('input[name="descriptions-update"]').value;
  var highlight = document.querySelector('input[name="highlight-update"]').value;
  var adultPrice = document.querySelector('input[name="adultPrice-update"]').value;
  var childPrice = document.querySelector('input[name="childPrice-update"]').value;
  await axios
    .put(`https://touring.glitch.me/details/${idProductUpdate}`, {
      name_destination: name,
      id_destination: id_destination,
      main_name_destination: main_name,
      sub_name_destination: sub_name,
      mainImage: mainImage,
      sub_images: sub_images,
      descriptions_destination: descriptions,
      highlight_destination: highlight,
      adultPrice: adultPrice,
      childPrice: childPrice
    })
    .then((response) => {
      idProductUpdate = "";
      setTimeout(function () {
        location.reload();
      }, 500);
    });
}

async function handleSubmitProduct(event) {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var id_destination = document.querySelector('input[name="id_destination"]').value;
  var main_name = document.querySelector('input[name="main_name"]').value;
  var sub_name = document.querySelector('input[name="sub_name"]').value;
  var mainImage = document.querySelector('input[name="mainImage"]').value;
  var sub_images = document.querySelector('input[name="sub_images"]').value;
  var descriptions = document.querySelector('input[name="descriptions"]').value;
  var highlight = document.querySelector('input[name="highlight"]').value;
  var adultPrice = document.querySelector('input[name="adultPrice"]').value;
  var childPrice = document.querySelector('input[name="childPrice"]').value;
  await axios
    .post("https://touring.glitch.me/details", {
      name: name,
      id_destination: id_destination,
      main_name: main_name,
      sub_name: sub_name,
      mainImage: mainImage,
      sub_images: sub_images,
      descriptions: descriptions,
      highlight: highlight,
      adultPrice: adultPrice,
      childPrice: childPrice
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      setTimeout(function () {
        location.reload();
      }, 500);
    });
}
