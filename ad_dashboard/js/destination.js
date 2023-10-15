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

function td_fun({ id_destination, name, description, image, booked }) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id_destination}`);
    td.innerHTML = `
    <th scope="row">${id_destination}</th>
    <td>${name}</td>
    <td>${description}</td>
    <td>${image}</td>
    <td>${booked}</td>
    <td>
      <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id_destination})"><i class="fa-solid fa-trash-can"></i></button>
      <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleOpenModalDelete(${id_destination})"><i class="fa-solid fa-pen-to-square"></i></button>
    </td>
      `;
    return td;
}