
// fetch("https://touring.glitch.me/users")
//     .then(function (response) {
//         return response.json();
//     })

//     .then(function (data) {
//         // Tìm người dùng với role là "User"
//         const user = data.find(user => user.role === "User");

//         if (user) {
//             console.log(user);
//             document.getElementById("fullName").textContent = user.name;
//             document.getElementById("email").textContent = user.email;
//             document.getElementById("phone").textContent = user.phone;
//             document.getElementById("address").textContent = user.address;
//             document.getElementById("password").value = user.password;
//         } else {
//             console.log("Không có thông tin người dùng với role là 'User'.");
//         }
//     })
//     .catch(function (error) {
//         console.error("Lỗi khi tải dữ liệu từ tệp JSON: " + error);
//     });


// Kiểm tra nếu người dùng đã đăng nhập
if (localStorage.getItem("loggedInUserID")) {
    const loggedInUserID = localStorage.getItem("loggedInUserID");

    // Sử dụng loggedInUserID để tìm người dùng và hiển thị thông tin của họ
    fetch("https://touring.glitch.me/users")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const user = data.find((usr) => usr.id === loggedInUserID);
            if (user) {
                // Hiển thị thông tin của người dùng và cho phép chỉnh sửa
                document.getElementById("fullName").textContent = user.name;
                document.getElementById("email").textContent = user.email;
                document.getElementById("phone").textContent = user.phone;
                document.getElementById("address").textContent = user.address;
                document.getElementById("password").value = user.password;
            }
        })
        .catch(function (error) {
            console.error("Error when load data form JSON:  " + error);
        });
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
const addressElement = document.getElementById("address");
const passwordElement = document.getElementById("password");

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editFullNameInput = document.getElementById("editFullName");
const editEmailInput = document.getElementById("editEmail");
const editPhoneInput = document.getElementById("editPhone");
const editAddressInput = document.getElementById("editAddress");

function openEditModal() {
    editFullNameInput.value = fullNameElement.textContent;
    editEmailInput.value = emailElement.textContent;
    editPhoneInput.value = phoneElement.textContent;
    editAddressInput.value = addressElement.textContent;

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
    // const userId = getUserID(); // Lấy ID của người dùng cần cập nhật
    const editedFullName = editFullNameInput.value;
    const editedEmail = editEmailInput.value;
    const editedPhone = editPhoneInput.value;
    const editedAddress = editAddressInput.value;
    const editedPassword = newPasswordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (editedPassword !== confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
        return;
    }

    try {
        await axios.put(`https://touring.glitch.me/users`, {
            //https://touring.glitch.me/users/${userId}

            fullName: editedFullName,
            email: editedEmail,
            phone: editedPhone,
            address: editedAddress,
            password: editedPassword
        });

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
                        <td>${item.adults}</td>
                        <td>${item.children}</td>
                        <td>${item.start_date}</td>
                        <td>${item.duration}</td>
                        <td>${item.total_price}</td>

                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone}</td>
                        <td>${item.additional_request}</td>
                </tr>
             `;
        });


        const tbody = document.getElementById("tbody");
        tbody.innerHTML = tableData.join('');
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });