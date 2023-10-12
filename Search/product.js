let data;

fetch(`https://6520d260906e276284c4af84.mockapi.io/product`)
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    const productTable = document.getElementById("productTable");
    data.forEach((item) => {
      const row = document.createElement("tr");

      const dateCell = document.createElement("td");
      dateCell.innerText = item.createAt;
      row.appendChild(dateCell);

      const nameCell = document.createElement("td");
      nameCell.innerText = item.name;
      row.appendChild(nameCell);

      const imageCell = document.createElement("td");
      const imageElement = document.createElement("img");
      imageElement.src = item.avatar;
      imageElement.alt = item.name;
      imageElement.style.width = "50px";
      imageCell.appendChild(imageElement);
      row.appendChild(imageCell);

      const priceCell = document.createElement("td");
      priceCell.innerText = item.price;
      row.appendChild(priceCell);

      const quantityCell = document.createElement("td");
      quantityCell.innerText = item.quantity;
      row.appendChild(quantityCell);

      const idCell = document.createElement("td");
      idCell.innerText = item.id;
      row.appendChild(idCell);

      productTable.appendChild(row);
    });
  });

function searchInJSON() {
    const searchInput = document.getElementById("inp").value.toLowerCase();
    const productTable = document.getElementById("productTable");
    const rows = productTable.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName("td")[1];
        const name = nameCell.innerText.toLowerCase();

        if (name.includes(searchInput)) {
            rows[i].style.display = ""; 
        } else {
            rows[i].style.display = "none"; 
        }
    }
}
