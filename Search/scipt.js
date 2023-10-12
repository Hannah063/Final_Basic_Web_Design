let destinations = [];


function displayDestinations(destinations) {
    const destinationContainer = document.getElementById('destination-container');
    destinationContainer.innerHTML = '';

    destinations.forEach(destination => {
        const card = document.createElement('div');
        card.classList.add('destination-card');

        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <p>Booked: ${destination.booked} times</p>
        `;

        destinationContainer.appendChild(card);
    });
}


function searchDestinations() {
    const searchInput = document.getElementById('search').value.toLowerCase();

    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchInput)
    );

    displayDestinations(filteredDestinations);
}

fetch('db.json')
    .then(response => response.json())
    .then(data => {
        destinations = data.destinations; 
        displayDestinations(destinations);
    });
