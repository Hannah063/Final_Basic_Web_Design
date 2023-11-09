
Trang Home (index.html):
Tạo một ô nhập dữ liệu tìm kiếm và một nút tìm kiếm:
html
<input type="text" id="searchInput" placeholder="Nhập thông tin tìm kiếm">
<button id="searchButton">Tìm kiếm</button>
html


<script>
    document.getElementById("searchButton").addEventListener("click", function() {
        // Lấy giá trị từ ô nhập liệu
        var query = document.getElementById("searchInput").value;

        // Kiểm tra xem người dùng đã nhập dữ liệu hay chưa
        if (query.trim() !== "") {
            // Chuyển hướng đến trang tour và truyền tham số tìm kiếm trong URL
            window.location.href = "tour.html#show-tour?query=" + encodeURIComponent(query);
        }
    });
</script>

Trang Tour (tour.html):
Trên trang tour, bạn có thể sử dụng JavaScript để kiểm tra dữ liệu tìm kiếm trong URL và hiển thị kết quả tương ứng:
<script>
    // Lấy tham số tìm kiếm từ URL
    var urlParams = new URLSearchParams(window.location.hash.substr(1));
    var query = urlParams.get("query");

    // Kiểm tra xem có dữ liệu tìm kiếm hay không
    if (query) {
        // Hiển thị kết quả tìm kiếm ở phần có ID "show-tour"
        document.getElementById("show-tour").textContent = "Kết quả tìm kiếm cho: " + decodeURIComponent(query);
    }
</script>