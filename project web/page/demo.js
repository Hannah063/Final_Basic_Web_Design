

document.addEventListener("DOMContentLoaded", function () {
    // Lấy tham số 'id' từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = urlParams.get('id');

    // Tải dữ liệu từ tệp JSON
    fetch("../Database/db.json")
        .then(response => response.json())
        .then(data => {
            const destinations = data.destinations;
            const details = data.details_destination; // Dữ liệu chi tiết

            // Tìm địa điểm chi tiết tương ứng với destinationId
            const detail = details.find(item => item.id_destination === parseInt(destinationId, 10));

            if (detail) {
                // Cập nhật thông tin trang chi tiết dựa trên dữ liệu chi tiết
                document.querySelector(".name_destination").textContent = detail.name_destination;
            
            // Cập nhật hình ảnh chính
            const mainImageElement = document.querySelector("#product-img");
            mainImageElement.src = detail.mainImage;

            // Cập nhật các hình ảnh phụ
            const smallImgElements = document.querySelectorAll(".small-img");
            detail.sub_images.forEach((image, index) => {
                smallImgElements[index].src = image;
            });

                document.querySelector(".main_name_destination").textContent = detail.main_name_destination;
                document.querySelector(".sub_name_destination").textContent = detail.sub_name_destination;

                // Xử lý số sao (các bạn có thể thay bằng cách khác nếu cần)
                // const starElements = document.querySelectorAll(".star iconify-icon");
                // starElements.forEach(element => {
                //     element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M8 1a.905.905 0 0 1 .63.26l1.855 1.826.76.083a.93.93 0 0 1 .557 1.606l-1.427 1.392.337.78a.93.93 0 0 1-1.347 1.025L8 7.15l-1.353.71a.93.93 0 0 1-1.347-1.025l.337-.78-1.427-1.392a.93.93 0 0 1 .557-1.606l.76-.083 1.855-1.826A.905.905 0 0 1 8 1zm0 2.445a.905.905 0 0 1 .906.905l.083.76 1.392 1.427a.93.93 0 0 1-.533 1.58l-.78.336-.083 1.855a.905.905 0 0 1-1.447.715l-.71-1.354-.08-.335a.93.93 0 0 1 .397-.92l1.427-1.392-1.855-.083a.905.905 0 0 1-.716-1.446l.336-.08 1.392-1.427a.93.93 0 0 1 1.58.533l.08.78 1.826.083a.905.905 0 0 1 .715 1.447l-1.353.71.335.08a.93.93 0 0 1 .92-.397l1.392-1.427-.083 1.855a.905.905 0 0 1-.906.906l-1.826-.083-1.427 1.392a.93.93 0 0 1-.533-1.58l.08-.78-.083-1.826a.905.905 0 0 1-.716-.715L8 3.365zm0 10.19a.91.91 0 0 1 .316-.691l.63-.595-.148-.344a.934.934 0 0 1 .262-.982.93.93 0 0 1 1.125.065l.313.314.613.041a.905.905 0 0 1 .536 1.555l-.493.48.116.536a.93.93 0 0 1-.393.927.934.934 0 0 1-.98.1l-.348-.19-.572.35a.915.915 0 0 1-.8.01l-.572-.35-.347.19a.93.93 0 0 1-.98-.1.93.93 0 0 1-.392-.928l.117-.536-.493-.48a.905.905 0 0 1 .632-1.554l.614-.041.313-.314a.93.93 0 0 1 1.125-.064.934.934 0 0 1 .262.981l-.147.344.63.594a.91.91 0 0 1 .316.692z"/></svg>';
                // });

                document.querySelector(".highlight_destination").textContent = detail.highlight_destination;
                document.querySelector("#pr1").textContent = detail.adultPrice +"$";
                document.querySelector("#pr2").textContent = detail.childPrice +"$";

                const descriptionElements = document.querySelectorAll(".descriptions_destination");
                descriptionElements.forEach((element, index) => {
                    element.textContent = detail.descriptions_destination[index];
                });

            } else {
                // Xử lý khi không tìm thấy chi tiết
                console.error("Không tìm thấy chi tiết cho địa điểm có ID: " + destinationId);
            }
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu: " + error));
});
