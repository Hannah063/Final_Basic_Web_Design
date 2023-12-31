//IN TOÀN BỘ PHẦN TỬ RA MÀN HÌNH
let tbody = document.getElementById("tbody");

fetch("https://touring.glitch.me/bookings")
    .then((res) => res.json())
    .then((json) => {
        json.map((data) => {
            tbody.append(td_fun(data));
        });
        const arrayLength = json.length;
        document.getElementById('total--bookings').innerHTML = arrayLength;
    });

function td_fun({ id, id_destination, id_user, booking_fullname, booking_phone_number, booking_email, total_adults, total_children, total_price, start_date, duration, request, payment, status }) {
    let td = document.createElement("tr");
    td.setAttribute("id", `child-${id}`);
    td.innerHTML = `
    <th scope="row">${id}</th>
    <td>${id_user}</td>
    <td>${id_destination}</td>
    <td>${total_adults + total_children}</td>
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


var idProductUpdate;
var option_1 = "";
var option_2 = "";

async function handleGetDetailOption(id) {
  console.log(id);
  event.preventDefault();
  await axios
  .get(`https://touring.glitch.me/details/${id}`)
    .then((response) => {
      option_1 = response.data.option1;
      option_2 = response.data.option2;
    })
    .catch(error => {
      // Xử lý lỗi khi yêu cầu thất bại
      console.error(error);
    });
}

console.log(option_1);

async function handleGetDetail(id) {
  console.log(id);
  event.preventDefault();
  
  try {
    const response = await axios.get(`https://touring.glitch.me/bookings/${id}`);
    
    idProductUpdate = response.data.id;
    document.getElementById("id_destination-update").value = response.data.id_destination;
    await handleGetDetailOption(response.data.id_destination);
    document.getElementById("id_user-update").value = response.data.id_user;
    document.getElementById("adults-update").value = response.data.total_adults;
    document.getElementById("children-update").value = response.data.total_children;
    document.getElementById("date-update").value = response.data.start_date;
    document.querySelector(".option1Value").textContent = option_1;
    document.querySelector(".option2Value").textContent = option_2;
    document.getElementById("fullname-update").value = response.data.booking_fullname;
    document.getElementById("phone-update").value = response.data.booking_phone_number;
    document.getElementById("email-update").value = response.data.booking_email;
    document.getElementById("payment-update").value = response.data.payment;
    document.getElementById("status-update").value = response.data.status;
    var modal = document.getElementById("id02");
    modal.style.display = "block";
  } catch (error) {
    // Xử lý lỗi khi yêu cầu thất bại
    console.error(error);
  }
}

async function handleUpdate(event) {
  event.preventDefault();
  var id_destination = document.querySelector('input[name="id_destination-update"]').value;
  var id_user = document.getElementById("id_user-update").value;
  var adults = document.getElementById("adults-update").value;
  var children = document.getElementById("children-update").value;
  var date = document.getElementById("date-update").value;
  var durationElement = document.getElementById("duration-update");
  var durationValue = durationElement.value;
  var duration;
  if (durationValue == "option1") {
    duration = durationElement.options[0].textContent;
  } else {
    duration = durationElement.options[1].textContent;
  }
  var fullname = document.getElementById("fullname-update").value;
  var phone = document.getElementById("phone-update").value;
  var email = document.getElementById("email-update").value;
  var payment = document.getElementById("payment-update").value;
  var status = document.getElementById("status-update").value;
  await axios
    .put(`https://touring.glitch.me/bookings/${idProductUpdate}`, {
      id_destination: id_destination,
      id_user: id_user,
      total_adults: adults,
      total_children: children,
      start_date: date,
      duration: duration,
      booking_fullname: fullname,
      booking_phone_number: phone,
      booking_email: email,
      payment: payment,
      status: status
    })
    .then((response) => {
      idProductUpdate = "";
      setTimeout(function () {
        location.reload();
      }, 500);
    });
    alert ("Update successfully!!!");
}