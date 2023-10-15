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

function td_fun({ id_detail ,id_destination, name_destination, main_name_destination, sub_name_destination, mainImage, sub_images, descriptions_destination,  highlight_destination, adultPrice, childPrice}) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id_detail}`);
    td.innerHTML = `
    <th scope="row">${id_detail}</th>
    <td>${id_destination}</td>
    <td>${name_destination}</td>
    <td>${main_name_destination}</td>
    <td>${sub_name_destination}</td>
    <td>${mainImage}</td>
    <td>${sub_images}</td>
    <td>${descriptions_destination}</td>
    <td>${highlight_destination}</td>
    <td>${adultPrice}</td>
    <td>${childPrice}</td>
    <td>
      <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id_detail})"><i class="fa-solid fa-trash-can"></i></button>
      <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleOpenModalDelete(${id_detail})"><i class="fa-solid fa-pen-to-square"></i></button>
    </td>
      `;
    return td;
}