const button = document.querySelector('.button-review');

async function Booking() {
  var countAdults    = document.getElementById('adults-input').value;
  var countChildrens = document.getElementById('children-input').value;
  var startDate      = document.getElementById('start-date-input').value;
  var duration       = document.getElementById('duration-input').value;
  var totalPrice     = document.getElementById('totalPrice').value;

  var fullName       = document.getElementById('fullname-input').value;
  var gmail          = document.getElementById('email-input').value;
  var telephone      = document.getElementById('tel-input').value;
  var request        = document.getElementById('request-input').value;

  await axios.post("https://touring.glitch.me/booking", {
   
            role: "user",
            status: "Active",
            name: fullName,
            adults: countAdults,
            children: countChildrens,
            start_date: startDate,
            duration: duration,

            total_price: totalPrice,
            email: gmail,
            phone: telephone,
            additional_request: request,
  });
    
}

function booking_review() {
  
    let overlay = document.getElementById('complete');
    let backgroundColor_nav1 = document.getElementById('circle-2');
    let backgroundColor_nav2 = document.getElementById('circle-3');
    setTimeout(() => {
      backgroundColor_nav2.style.backgroundColor = 'var(--button-3)';
      backgroundColor_nav2.style.color = 'var(--main-white)';
      backgroundColor_nav1.style.backgroundColor = 'var(--button-4)';
      backgroundColor_nav1.style.color = 'var(--main-text)';
      overlay.style.display = 'flex';
    }, 1000);
  ;
}

button.addEventListener('click', Booking);
button.addEventListener('click', booking_review);




function checkout_review() {
  let review                = document.getElementById('review-form');
  let booking               = document.getElementById('booking-form');
  let backgroundColor_nav1  = document.getElementById('circle-1');
  let backgroundColor_nav2  = document.getElementById('circle-2');
  let color_nav1            = document.getElementById('so1');

  setTimeout(() => {
    review.style.display = 'flex';
    backgroundColor_nav2.style.backgroundColor = 'var(--button-3)';
    backgroundColor_nav2.style.color = 'var(--main-white)';
    booking.style.display = 'none';
    backgroundColor_nav1.style.backgroundColor = 'var(--button-4)';
    color_nav1.style.color = 'var(--main-text)';
  }, 1000);
}


document.getElementById('complete').addEventListener('click', function() {
  this.style.display = 'none';
});



document.addEventListener("DOMContentLoaded", function () {
  const adultsInput = document.getElementById("adults-input");
  const childrenInput = document.getElementById("children-input");
  const totalPriceElement = document.getElementById("totalPrice");

  function calculateTotal() {
      const adults = parseInt(adultsInput.value) || 0;
      const children = parseInt(childrenInput.value) || 0;
      const destinationId = getDestinationIdFromURL(); 
    
      fetch("../Database/db.json")
          .then(response => response.json())
          .then(data => {
              const details = data.details_destination;
              const detail = details.find(item => item.id_destination === destinationId);

              if (detail) {
                  const adultPrice = parseInt(detail.adultPrice);
                  const childPrice = parseInt(detail.childPrice);
                  const total = adults * adultPrice + children * childPrice;
                  totalPriceElement.value = total;
              }
          })
          .catch(error => console.error("Lỗi khi tải dữ liệu: " + error));
  }


  function getDestinationIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      return parseInt(urlParams.get('id'));
  }

  adultsInput.addEventListener("input", calculateTotal);
  childrenInput.addEventListener("input", calculateTotal);

  calculateTotal();
});




//sự kiện bắt click vào button CHECKOUT
// document.getElementById('button-review').addEventListener('click', function(e) {
//   let overlay = document.getElementById('complete');
//   let backgroundColor_nav1 = document.getElementById('circle-2');
//   let backgroundColor_nav2 = document.getElementById('circle-3');
//   setTimeout(() => {
//     backgroundColor_nav2.style.backgroundColor = 'var(--button-3)';
//     backgroundColor_nav2.style.color = 'var(--main-white)';
//     backgroundColor_nav1.style.backgroundColor = 'var(--button-4)';
//     backgroundColor_nav1.style.color = 'var(--main-text)';
//     overlay.style.display = 'flex';
//   }, 1000);
// });
























