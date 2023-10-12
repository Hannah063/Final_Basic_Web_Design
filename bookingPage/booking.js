//Bắt sự kiện click chuột vào button, chuyển màu của plaftform
function checkout_review() {
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
}

//sự kiện bắt click vào button CHECKOUT
document.getElementById('button-review').addEventListener('click', function(e) {
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
});



document.getElementById('complete').addEventListener('click', function() {
  this.style.display = 'none';
});

