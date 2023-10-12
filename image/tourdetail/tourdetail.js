document.addEventListener("DOMContentLoaded", function () {
    // Sử dụng Fetch API để lấy dữ liệu từ db.json
    fetch("./db.json")
        .then(response => response.json())
        .then(data => {
            // Cập nhật thông tin sản phẩm trên trang HTML
            document.getElementById("productName").textContent = data.product.name;
            document.getElementById("productLocation").textContent = data.product.location;
            document.getElementById("productRating").textContent = data.product.rating;
            document.getElementById("productPrice").textContent = data.product.price;

            // Cập nhật ảnh chính
            document.getElementById("mainImage").src = data.product.mainImage;

            // Cập nhật ảnh nhỏ
            const thumbnailImages = document.querySelectorAll(".thumbnail");
            data.product.thumbnailImages.forEach((image, index) => {
                thumbnailImages[index].src = image;
            });
        })
        .catch(error => console.error("Lỗi: " + error));
});
