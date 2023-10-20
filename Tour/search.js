// Tạo một hàm để xử lý sự kiện tìm kiếm
function searchDestinations() {
    // Lấy giá trị tìm kiếm từ trường input
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
  
    // Lấy tất cả các thẻ .item-destination
    const destinationElements = document.querySelectorAll('.item-destination');
  
    // Duyệt qua mỗi thẻ và kiểm tra xem tên tour có khớp với tìm kiếm không
    destinationElements.forEach(destinationElement => {
      const nameElement = destinationElement.querySelector('.name-destination');
      const titleElement = destinationElement.querySelector('.title-destination');
  
      const name = nameElement.textContent.toLowerCase();
      const title = titleElement.textContent.toLowerCase();
  
      if (name.includes(searchInput) || title.includes(searchInput)) {
        // Hiển thị thẻ tour nếu tìm kiếm khớp
        destinationElement.style.display = 'block';
      } else {
        // Ẩn thẻ tour nếu tìm kiếm không khớp
        destinationElement.style.display = 'none';
      }
    });
  }
  
  // Thêm sự kiện submit cho form tìm kiếm
  const searchForm = document.querySelector('.header-form form');
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchDestinations();
  });
  