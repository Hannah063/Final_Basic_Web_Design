
function loadHeaderFooter() {
    fetch('/Final_Basic_Web_Design/HeaderFooter/header.html')
        .then(response => response.text())
        .then(data => {
            const header = document.getElementById('header');
            header.innerHTML = data;
        });

    fetch('/Final_Basic_Web_Design/HeaderFooter/footer.html')
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById('footer');
            footer.innerHTML = data;
        });
}


loadHeaderFooter();
