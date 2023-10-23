// Thay đổi star trên 
const voteButton = document.getElementById('voteButton');
voteButton.addEventListener('click', function() {
  voteButton.classList.add('voted');
});

document.addEventListener("DOMContentLoaded", function () {
  
const urlParams = new URLSearchParams(window.location.search);
   
const destinationId = parseInt(urlParams.get("id"));
   
    fetch("../../Database/db.json")
        .then(response => response.json())
        .then(data => {
            const destinations = data.destinations;
            const details = data.details_destination; 
            const detail = details.find(item => item.id_destination === parseInt(destinationId, 10));

            if (detail) {
         
            document.querySelector(".name_destination").textContent = detail.name_destination;
    
            const mainImageElement = document.querySelector("#product-img");
            mainImageElement.src = detail.mainImage;

            
            const smallImgElements = document.querySelectorAll(".small-img");
            detail.sub_images.forEach((image, index) => {
                smallImgElements[index].src = image;
            });

                document.querySelector(".main_name_destination").textContent = detail.main_name_destination;
                document.querySelector(".sub_name_destination").textContent = detail.sub_name_destination;

                document.querySelector(".highlight_destination").textContent = detail.highlight_destination;
                document.querySelector("#pr1").textContent = detail.adultPrice +"$";
                document.querySelector("#pr2").textContent = detail.childPrice +"$";

                const descriptionElements = document.querySelectorAll(".descriptions_destination");
                descriptionElements.forEach((element, index) => {
                    element.textContent = detail.descriptions_destination[index];
                });

            } else {
                
                console.error("Không tìm thấy chi tiết cho địa điểm có ID: " + destinationId);
            }

            
            const bookNowButton = document.querySelector("#book-now-button");
            bookNowButton.addEventListener("click", function () {
                localStorage.setItem("book",JSON.stringify(detail )) ;
                window.location.href = `../../bookingPage/booking.html?id=${destinationId}`;
            });
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu: " + error));
});
