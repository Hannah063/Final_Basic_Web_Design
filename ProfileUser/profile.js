// Kiểm tra nếu người dùng đã đăng nhập
if (Boolean(localStorage.getItem("isLogin"))) {
    const userData = JSON.parse(localStorage.getItem("CurrentUser"));
    document.getElementById("fullNameProfile").textContent = userData.name;
    document.getElementById("fullName").textContent = userData.name;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("phone").textContent = userData.phone;
    document.getElementById("password").value = userData.password;
    document.getElementById("avatarImage").src=userData.avata;
} else {
    alert("You should to log in to edit profile.")
}






    let isEditMode = false;
    const oldPasswordField = document.getElementById("oldPassword");
    const newPasswordField = document.getElementById("newPassword");
    const confirmPasswordField = document.getElementById("confirmPassword");

    const fullNameElement = document.getElementById("fullName");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");
    const passwordElement = document.getElementById("password");

    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const editFullNameInput = document.getElementById("editFullName");
    const editEmailInput = document.getElementById("editEmail");
    const editPhoneInput = document.getElementById("editPhone");


function openEditModal() {
    editFullNameInput.value = fullNameElement.textContent;
    editEmailInput.value = emailElement.textContent;
    editPhoneInput.value = phoneElement.textContent;


    oldPasswordField.value = passwordElement.value;
    oldPasswordField.style.display = "block";
    newPasswordField.style.display = "block";
    confirmPasswordField.style.display = "block";

    editModal.style.display = "block";
}

function closeEditModal() {
    editModal.style.display = "none";
}

async function saveChanges() {
    const editedFullName = editFullNameInput.value;
    const editedEmail = editEmailInput.value;
    const editedPhone = editPhoneInput.value;
    const editedPassword = newPasswordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (editedPassword !== confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
        return;
    }

    try {
        const fileInput = document.getElementById('avatarUpload');
        const file = fileInput.files[0]; // Lấy file được chọn từ input

        // Kiểm tra xem có file được chọn hay không
        if (file) {
            // Tạo FormData để gửi yêu cầu PUT với dữ liệu và file avatar
            const formData = new FormData();
            formData.append('avatar', file);
            formData.append('fullName', editedFullName);
            formData.append('email', editedEmail);
            formData.append('phone', editedPhone);
            formData.append('address', editedAddress);
            formData.append('password', editedPassword);

            await axios.put(`https://touring.glitch.me/users`, formData, {
                //https://touring.glitch.me/users/${userId
                headers: {
                    'Content-Type': 'multipart/form-data' // Đặt header phù hợp để gửi FormData
                }
            });
        } else {
            // Nếu không có file được chọn, gửi yêu cầu PUT chỉ với dữ liệu không có avatar
            await axios.put(`https://touring.glitch.me/users`, {
    
                name: editedFullName,
                email: editedEmail,
                phone: editedPhone,
                password: editedPassword
            });
        }

        closeEditModal();
    } catch (error) {
        // Xử lý lỗi
        console.error(error);
    }
}












function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const showPasswordIcon = document.getElementById(`show${fieldId}`);

    if (passwordField.type === "password") {
        passwordField.type = "text";
        showPasswordIcon.classList.remove("fa-eye-slash");
        showPasswordIcon.classList.add("fa-eye");
    } else {
        passwordField.type = "password";
        showPasswordIcon.classList.remove("fa-eye");
        showPasswordIcon.classList.add("fa-eye-slash");
    }
}
function PasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var showPasswordIcon = document.getElementById("showPassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordIcon.classList.remove("far", "fa-eye");
        showPasswordIcon.classList.add("far", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        showPasswordIcon.classList.remove("far", "fa-eye-slash");
        showPasswordIcon.classList.add("far", "fa-eye");
    }
}

const editButton = document.getElementById("editButton");
editButton.addEventListener("click", openEditModal);





fetch("https://touring.glitch.me/bookings")
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
                        <td>${item.total_adults}</td>
                        <td>${item.total_children}</td>
                        <td>${item.start_date}</td>
                        <td>${item.duration}</td>
                        <td>${item.total_price}</td>

                        <td>${item.booking_fullname}</td>
                        <td>${item.booking_email}</td>
                        <td>${item.booking_phone_number}</td>
                        <td>${item.request}</td>
                </tr>
             `;
        });


        const tbody = document.getElementById("tbody");
        tbody.innerHTML = tableData.join('');
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });




    // Lắng nghe sự kiện khi người dùng chọn tệp tải lên
document.getElementById('avatarUpload').addEventListener('change', function(event) {
    var file = event.target.files[0]; // Lấy tệp được chọn

    if (file) {
        var reader = new FileReader();

        // Đọc dữ liệu từ tệp và hiển thị nó trên hình ảnh avatar
        reader.onload = function(e) {
            document.getElementById('avatarImage').src = e.target.result;
        };

        // Đọc tệp dưới dạng URL dữ liệu
        reader.readAsDataURL(file);

        // Lưu avatar vào dữ liệu người dùng (ví dụ: sử dụng localStorage)
        localStorage.setItem('avatar', file);
    }
});