// Thay đổi star trên 
function toggleStarColor(star) {
    star.classList.toggle('orange');
}

document.addEventListener("DOMContentLoaded", function () {
  
const urlParams = new URLSearchParams(window.location.search);
   
const destinationId = parseInt(urlParams.get("id"));
    fetch("https://touring.glitch.me/details")
        .then(response => response.json())
        .then(data => {
            
            // const detail = data.find(item => item.id_destination === parseInt(destinationId, 10));
            const detail = data.find((item)=> item.id_destination === destinationId);
<<<<<<< HEAD:Detail_Destination/page/detail.js
=======
        
>>>>>>> 596f90d288386d59914b307c51e34626f6dd93bc:project web/page/demo.js

            if (detail) {
            
            document.querySelector(".name_destination").textContent = detail.name_destination;
                console.log(detail.name_destination);
            const mainImageElement = document.querySelector("#product-img");
            mainImageElement.src = detail.mainImage;
            console.log(detail.mainImage);
            
            const smallImgElements = document.querySelectorAll(".small-img");
            detail.sub_images.forEach((image, index) => {
                smallImgElements[index].src = image;
            });

                document.querySelector(".main_name_destination").textContent = detail.main_name_destination;
                document.querySelector(".sub_name_destination").textContent = detail.sub_name_destination;
                document.querySelector(".highlight_destination").textContent = detail.highlight_destination;
                document.querySelector(".option1").textContent = detail.option1;
                document.querySelector(".option2").textContent = detail.option2;
                document.querySelector(".option1Value").textContent = detail.option1;
                document.querySelector(".option2Value").textContent = detail.option2;
                document.querySelector(".priceAdultOption_1").textContent = detail.priceAdultOption_1;
                document.querySelector(".priceAdultOption_2").textContent = detail.priceAdultOption_2;
                document.querySelector(".priceChildrenOption_1").textContent = detail.priceChildrenOption_1;
                document.querySelector(".priceChildrenOption_2").textContent = detail.priceChildrenOption_2;
                const descriptionElements = document.querySelectorAll(".descriptions_destination");
                descriptionElements.forEach((element, index) => {
                    element.textContent = detail.descriptions_destination[index];
                });

            } else {
                
                console.error("Không tìm thấy chi tiết cho địa điểm có ID: " + destinationId);
            }   
            const bookNowButton = document.querySelector("#book-now-button");
            bookNowButton.addEventListener("click", function () {
<<<<<<< HEAD:Detail_Destination/page/detail.js
                localStorage.setItem("book",JSON.stringify(detail)) ;
                window.location.href = `booking.html?id=${destinationId}`;
=======
                var selectElementS = document.getElementById("select");
                var option = selectElementS.value;
                localStorage.setItem("duration",JSON.stringify(option)) ;
                localStorage.setItem("book",JSON.stringify(detail)) ;//????
                window.location.href = `../../bookingPage/booking.html?id=${destinationId}`;
>>>>>>> 596f90d288386d59914b307c51e34626f6dd93bc:project web/page/demo.js
            });
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu: " + error));
});
