document.addEventListener("DOMContentLoaded", function () {
    fetch("../data.json")
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
