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

function td_fun({ id ,id_destination, name_destination, main_name_destination, sub_name_destination, mainImage, sub_images, descriptions_destination,  highlight_destination, option1, option2}) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id}`);
    td.innerHTML = `
    <th scope="row" id="id--details">${id}</th>
    <td>${id_destination}</td>
    <td>${name_destination}</td>
    <td class="change--img"><img src="${mainImage}"></img></td>
    <td>${descriptions_destination}</td>
    <td>${highlight_destination}</td>
    <td>${option1} <br> <br> ${option2}</td>
    
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
      document.querySelector('input[name="option1-update"]').value = response.data.option1;
      document.querySelector('input[name="option2-update"]').value = response.data.option2;
      document.querySelector('input[name="adultPrice1-update"]').value = response.data.priceAdultOption_1;
      document.querySelector('input[name="childPrice1-update"]').value = response.data.priceChildrenOption_1;
      document.querySelector('input[name="adultPrice2-update"]').value = response.data.priceAdultOption_2;
      document.querySelector('input[name="childPrice2-update"]').value = response.data.priceChildrenOption_2;
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
  var option1 = document.querySelector('input[name="option1-update"]').value;
  var option2 = document.querySelector('input[name="option2-update"]').value;
  var adultPrice1 = parseInt(document.querySelector('input[name="adultPrice1-update"]').value);
  var childPrice1 = parseInt(document.querySelector('input[name="childPrice1-update"]').value);
  var adultPrice2 = parseInt(document.querySelector('input[name="adultPrice2-update"]').value);
  var childPrice2 = parseInt(document.querySelector('input[name="childPrice2-update"]').value);
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
      option1: option1,
      option2: option2,
      priceAdultOption_1: adultPrice1,
      priceChildrenOption_1: childPrice1,
      priceAdultOption_2: adultPrice2,
      priceChildrenOption_2: childPrice2
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
  var option1 = document.querySelector('input[name="option1"]').value;
  var option2 = document.querySelector('input[name="option2"]').value;
  var adultPrice1 = parseInt(document.querySelector('input[name="adultPrice1"]').value);
  var childPrice1 = parseInt(document.querySelector('input[name="childPrice1"]').value);
  var adultPrice2 = parseInt(document.querySelector('input[name="adultPrice2"]').value);
  var childPrice2 = parseInt(document.querySelector('input[name="childPrice2"]').value);
  await axios
    .post("https://touring.glitch.me/details", {
      name_destination: name,
      id_destination: id_destination,
      main_name_destination: main_name,
      sub_name_destination: sub_name,
      mainImage: mainImage,
      sub_images: sub_images,
      descriptions: descriptions,
      highlight_destination: highlight,
      option1: option1,
      option2: option2,
      priceAdultOption_1: adultPrice1,
      priceChildrenOption_1: childPrice1,
      priceAdultOption_2: adultPrice2,
      priceChildrenOption_2: childPrice2
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      setTimeout(function () {
        location.reload();
      }, 500);
    });
}
