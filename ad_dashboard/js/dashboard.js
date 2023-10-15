let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/products")
    .then((res) => res.json())
    .then((json) => {
        json.map((data) => {
          console.log(123);
            tbody.append(td_fun(data));
            console.log(456);
        });
    });

function td_fun({ date, id_destination, id_user, amount, duration, total_people }) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id}`);
    td.innerHTML = `
    <th scope="row">${date}</th>
    <td>${id_destination}</td>
    <td>${id_user}</td>
    <td>${amount}</td>
    <td>${duration}</td>
    <td>${total_people}</td>
    <td>
      <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"><i class="fa-solid fa-trash-can"></button>
      <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleOpenModalDelete(${id})"><i class="fa-solid fa-pen-to-square"></i></button>
    </td>
      `;
    return td;
}