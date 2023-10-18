fetch("https://touring.glitch.me/booking")
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        const tableData = data.map((item) => {
            return `
                <tr>
                        <td>${item.adults}</td>
                        <td>${item.children}</td>
                        <td>${item.start_date}</td>
                        <td>${item.duration}</td>
                        <td>${item.total_price}</td>

                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone}</td>
                        <td>${item.additional_request}</td>
                </tr>
             `;
        });


        const tbody = document.getElementById("tbody");
        tbody.innerHTML = tableData.join('');
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });