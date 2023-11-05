document.addEventListener("DOMContentLoaded", function () {
  fetch("https://touring.glitch.me/destinations")
    .then(response => response.json())
    .then(data => {
      const destinations = data;
      const destinationElements = document.querySelectorAll(".item-destination");
      destinations.forEach((destination, index) => {
        const destinationElement = destinationElements[index];
        const imgElement = destinationElement.querySelector(".img-destination");
        console.log(imgElement);
        const nameElement = destinationElement.querySelector(".name-destination");
        console.log(nameElement);
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


document.addEventListener("DOMContentLoaded", function () {
  const pageNumbers = document.querySelectorAll(".page-number");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  pageNumbers.forEach(pageNumber => {
    pageNumber.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("data-page");
      showPage(page);
    });
  });

  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    const currentPage = parseInt(document.querySelector(".destination-page:visible").getAttribute("data-page"));
    const nextPage = currentPage + 1;
    showPage(nextPage);
  });

  prevButton.addEventListener("click", function (event) {
    event.preventDefault();
    const currentPage = parseInt(document.querySelector(".destination-page:visible").getAttribute("data-page"));
    const prevPage = currentPage - 1;
    showPage(prevPage);
  });

  function showPage(page) {
    const pages = document.querySelectorAll(".destination-page");
    pages.forEach(pageElement => {
      if (pageElement.getAttribute("data-page") === page.toString()) {
        pageElement.style.display = "block";
      } else {
        pageElement.style.display = "none";
      }
    });
  }
});
