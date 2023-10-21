//IN TOÀN BỘ PHẦN TỬ RA MÀN HÌNH
let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/bookings")
    .then((res) => res.json())
    .then((json) => {
        json.map((data) => {
            tbody.append(td_fun(data));
        });
    });

function td_fun({ id, id_destination, id_user, booking_fullname, booking_phone_number, booking_email, total_adults, total_children, total_price, start_date, duration, request, payment, status }) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id}`);
    td.innerHTML = `
    <th scope="row">${id}</th>
    <td>${id_destination}</td>
    <td>${id_user}</td>
    <td>${total_adults}</td>
    <td>${total_children}</td>
    <td>${start_date}</td>
    <td>${duration}</td>
    <td>${booking_fullname}<br>${booking_phone_number}<br>${booking_email}</td>
    <td>${request}</td>
    <td>${payment}</td>
    <td>${status}</td>
    <td>
        <button class="color-dark ti-pencil-alt cursor" id="updateBtn" onclick="handleGetDetail(${id})"><i class="fa-solid fa-pen-to-square icons"></i></button>
        <button class="ti-trash color-danger cursor" id="deleteBtn" onclick="handleDeleteBooking(${id})"><i class="fa-solid fa-trash-can icons"></i></button>
    </td>
      `;
    return td;
}

