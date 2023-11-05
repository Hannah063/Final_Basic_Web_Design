// Ẩn overlay khi người dùng nhấp chuột vào nó
document.getElementById('complete').addEventListener('click', function() {
  this.style.display = 'none';
});
function getDestinationIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}
handleGetInfo(getDestinationIdFromURL());
let id_des = getDestinationIdFromURL();
let id_u = 1;
let childPrice;
let adultPrice;
let option;
//let days;
async function handleGetInfo(id) {
  await axios
  .get(`https://touring.glitch.me/details/${id}`)
    .then((response) => {
      document.getElementById("info-tour-title").innerHTML = response.data.name_destination;
      document.getElementById("review-tour-title").innerHTML = response.data.name_destination;
      let duration = JSON.parse(localStorage.getItem("duration"));
      console.log(duration);

      if (duration == "option1") {
        option = response.data.option1;
        childPrice = response.data.priceChildrenOption_1,
        console.log(childPrice);
        adultPrice = response.data.priceAdultOption_1
        console.log(adultPrice);
      } else {
        option = response.data.option2;
        childPrice = response.data.priceChildrenOption_2,
        console.log(childPrice);
        adultPrice = response.data.priceAdultOption_2
        console.log(adultPrice);
      }
      document.getElementById("duration-input").value = option;
    })
    .catch(error => {
      // Xử lý lỗi khi yêu cầu thất bại

    
    function checkout_review() {
  
      console.log("Error");
    }});
}
var adults;
var start;
var children;
var duration;
var fullname;
var phone;
var email;
var request;
var payment;
let price;
var statuss;
function checkout_review() {
  // lấy giá trị từ ô input
  adults = document.querySelector('input[id="adults-input"]').value;
  start = document.querySelector('input[id="start-date-input"]').value;
  console.log(start);
  children = document.querySelector('input[id="children-input"]').value;
  duration = document.getElementById("review-duration-input").value = option;
  fullname = document.querySelector('input[id="fullname-input"]').value;
  phone = document.querySelector('input[id="tel-input"]').value;
  email = document.querySelector('input[id="email-input"]').value;

    
          
            
    
 async function handleGetDetail() {
  
  request = document.querySelector('textarea#request-input').value;
  var selectElementS = document.getElementById("payment");
  payment = selectElementS.value;
  
  //tạo giá tiền
  price = (adultPrice*adults)+(childPrice*children);
  console.log(price);
  let review = document.getElementById('review-form');
  let booking = document.getElementById('booking-form');
  let backgroundColor_nav1 = document.getElementById('circle-1');
  let backgroundColor_nav2 = document.getElementById('circle-2');
  let color_nav1 = document.getElementById('so1');
  if (payment == "CASH") {
    statuss = "Unpaid";
  } else {
    statuss = "Paid";
  }
  setTimeout(() => {
    review.style.display = 'flex';
    backgroundColor_nav2.style.backgroundColor = 'var(--button-3)';
    backgroundColor_nav2.style.color = 'var(--main-white)';
    booking.style.display = 'none';
    backgroundColor_nav1.style.backgroundColor = 'var(--button-4)';
    color_nav1.style.color = 'var(--main-text)';
  }, 1000);
  handleGetDetail();
}}
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

async function handleGetBooked(id) {
  try {
    const response = await axios.get(`https://touring.glitch.me/destinations/${id}`);
    const currentBooked = response.data.booked;
    const updatedBooked = currentBooked + 1;

    await axios.put(`https://touring.glitch.me/destinations/${id}`, {
      booked: updatedBooked
    });

    console.log("OK booked");
  } catch (error) {
    // Xử lý lỗi khi yêu cầu thất bại
    console.log("Error");
  }
}

// POST INFOMATION 
async function handleSubmit(event) {
  event.preventDefault();

    
        
          
    

        
     async function handleSubmit(event) {
  
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
      request: request,
      payment: payment,
      status: statuss
    })
    .then((response) => {
      handleGetBooked(id_des);
      var modal = document.getElementById("complete");
      modal.style.display = "flex";
    });

    
          
            

    
  
}}





function validateStartDate() {
  var startDateInput = document.getElementById('review-start-date-input');
  var selectedDate = new Date(startDateInput.value);
  var currentDate = new Date();

  if (selectedDate < currentDate) {
      startDateInput.setCustomValidity("Please select a date starting from today or later.");
  } else {
      startDateInput.setCustomValidity("");
  }
}