
function loadHeaderFooter() {
    fetch('/HTML/header.html')
        .then(response => response.text())
        .then(data => {
            const header = document.getElementById('header');
            header.innerHTML = data;
        });

    fetch('/HTML/footer.html')
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById('footer');
            footer.innerHTML = data;
        });
}


loadHeaderFooter();
