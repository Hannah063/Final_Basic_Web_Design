function getDestinationIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

handleGetInfo(getDestinationIdFromURL());
let id_des = getDestinationIdFromURL();
let id_u = 1;
let childPrice;
let adultPrice;
async function handleGetInfo(id) {
  await axios
  .get(`https://touring.glitch.me/details/${id}`)
    .then((response) => {
      document.getElementById("info-tour-title").innerHTML = response.data.name_destination;
      document.getElementById("review-tour-title").innerHTML = response.data.name_destination;
      childPrice = response.data.childPrice,
      adultPrice = response.data.adultPrice
    })
    .catch(error => {
      // Xử lý lỗi khi yêu cầu thất bại
      console.log("Error");
    });
}
var adults;
var start;
var children;
var duration;
var fullname;
var phone;
var email;
var request;
let price;

function checkout_review() {
  // lấy giá trị từ ô input
  adults = document.querySelector('input[id="adults-input"]').value;
  console.log(adults);
  start = document.querySelector('input[id="start-date-input"]').value;
  children = document.querySelector('input[id="children-input"]').value;
  console.log(children);
  duration = document.querySelector('input[id="duration-input"]').value;
  
  fullname = document.querySelector('input[id="fullname-input"]').value;
  phone = document.querySelector('input[id="tel-input"]').value;
  email = document.querySelector('input[id="email-input"]').value;
  request = document.querySelector('textarea#request-input').value;
  //tạo giá tiền
  price = (adultPrice*adults)+(childPrice*children);

  let review = document.getElementById('review-form');
  let booking = document.getElementById('booking-form');
  let backgroundColor_nav1 = document.getElementById('circle-1');
  let backgroundColor_nav2 = document.getElementById('circle-2');
  let color_nav1 = document.getElementById('so1');

  setTimeout(() => {
    review.style.display = 'flex';
    backgroundColor_nav2.style.backgroundColor = 'var(--button-3)';
    backgroundColor_nav2.style.color = 'var(--main-white)';
    booking.style.display = 'none';
    backgroundColor_nav1.style.backgroundColor = 'var(--button-4)';
    color_nav1.style.color = 'var(--main-text)';
  }, 1000);
  handleGetDetail();
}

//SHOW INFOMATION
async function handleGetDetail() {
  let id = id_des;
  document.querySelector('input[id="review-adults-input"]').value = adults;
  document.querySelector('input[id="review-start-date-input"]').value = start;
  document.querySelector('input[id="review-children-input"]').value = children;
  document.querySelector('input[id="review-duration-input"]').value = duration;
  document.querySelector('textarea#review-customer-info').value = fullname + "\n" + phone + "\n" + email;
  document.querySelector('textarea#review-customer-request').value = request;
  document.querySelector('input[id="review-price"]').value = price;
}

// POST INFOMATION 
async function handleSubmit(event) {
  event.preventDefault();
  await axios
    .post("https://touring.glitch.me/bookings", {
      id_destination: id_des,
      id_user: id_u,
      booking_fullname: fullname,
      booking_phone_number: phone,
      booking_email: email,
      total_adults: adults,
      total_children: children,
      total_price: price,
      start_date: start,
      duration: duration,
      request: request
    })
    .then((response) => {
      var modal = document.getElementById("complete");
      modal.style.display = "flex";
    });
}
