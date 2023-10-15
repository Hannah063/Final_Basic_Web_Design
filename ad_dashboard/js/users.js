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

function td_fun({ id, name, email, password, phone, status, role }) {
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
      <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"><i class="fa-solid fa-trash-can"></i></button>
      <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleOpenModalDelete(${id})"><i class="fa-solid fa-pen-to-square"></i></button>
    </td>
      `;
    return td;
}