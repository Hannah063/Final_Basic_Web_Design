document.addEventListener("DOMContentLoaded", function () {
    fetch("../Database/db.json")
        .then(response => response.json())
        .then(data => {
            const destinations = data.destinations;
            const destinationElements = document.querySelectorAll(".item-destination");

            destinations.forEach((destination, index) => {
                const destinationElement = destinationElements[index];

                const imgElement = destinationElement.querySelector(".img-destination");
                const nameElement = destinationElement.querySelector(".name-destination");
                const titleElement = destinationElement.querySelector(".title-destination");
                const bookedElement = destinationElement.querySelector(".booked-count");
              




                imgElement.src = destination.image;
                nameElement.textContent = destination.name;
                titleElement.textContent = destination.description;
                bookedElement.textContent = destination.booked;
                
            });
        })
        .catch(error => console.error("Error fetching data: " + error));
});


const destinationLinks = document.querySelectorAll('[data-destination-link]');
destinationLinks.forEach((link) => {
  if (link.getAttribute('data-destination-link') === 'true') {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const destinationId = this.closest('.item-destination').getAttribute('data-destination-id');
      window.location.href = '../project web/page/demo.html?id=' + destinationId;
    });
  }
});
  