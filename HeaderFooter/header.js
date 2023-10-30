// var isLogin = JSON.parse(localStorage.getItem("isLogin"));

// // Hàm mở modal Login
// function openLoginModal() {
//     var loginModal = document.getElementById("loginModal");
//     var signUpModal = document.getElementById("signupModal");
//     loginModal.style.display = "block";
//     signUpModal.style.display = "none";
// }
// // Hàm đóng modal Login
// function closeLoginModal() {
//     var loginModal = document.getElementById("loginModal");
//     loginModal.style.display = "none";
//     // signUpModal.style.display = "block";
// }

// // Hàm mở modal Sign Up
// function openSignUpModal() {
//     var loginModal = document.getElementById("loginModal");
//     var signUpModal = document.getElementById("signupModal");
//     signUpModal.style.display = "block";
//     loginModal.style.display = "none";
// }

// // Hàm đóng modal Sign Up
// function closeSignUpModal() {
//     var signUpModal = document.getElementById("signupModal");
//     signUpModal.style.display = "none";
//     // loginModal.style.display = "block";
// }

// async function handleSubmit() {

//     var email = document.getElementById('emailLogIn').value;
//     var password = document.getElementById('passwordLogIn').value;

//     await axios
//         .get("https://touring.glitch.me/users")
//         .then((response) => {

//             var userExist = response.data.find((usr) => usr.email === email);
//             if (userExist && userExist.password === password) {
//                 // Lưu ID của người dùng đã đăng nhập vào localStorage
//                 localStorage.setItem("loggedInUserID", userExist.id);

//                 setTimeout(() => {
//                     location.href = `${location.origin}header.html`;
//                 }, 100);
//             }
//         });

//     localStorage.setItem("isLoggedIn", "true");

//     document.getElementById("userPic").src = "./user1.png"
//     document.getElementById("userInfoPic").src = "./user1.png";
//     document.getElementById("loggedInUserName").textContent = "Thanh Luan";
//     document.getElementById("subMenuLogin").style.display = "none";
//     document.getElementById("subMenuUser").style.display = "block";

// }

// // async function handleSubmit() {
// //     var email = document.getElementById('emailLogIn').value;
// //     var password = document.getElementById('passwordLogIn').value;

// //     await axios
// //         .get("https://touring.glitch.me/users")
// //         .then((response) => {
// //             var userExist = response.data.find((usr) => usr.email === email);
// //             if (userExist && userExist.password === password) {
// //                 // Lưu ID của người dùng đã đăng nhập vào localStorage
// //                 localStorage.setItem("loggedInUserID", userExist.id);
// //                 setTimeout(() => {
// //                     location.href = `${location.origin}header.html`;
// //                 }, 100);
// //             }
// //         });
// // }

// function logout() {

//     localStorage.removeItem("isLoggedIn", false);

//     document.getElementById("userInfoPic").src = "./user2.png";
//     document.getElementById("userPic").src = "./user2.png"
//     document.getElementById("loggedInUserName").textContent = "Guest";
//     document.getElementById("subMenuLogin").style.display = "block";
//     document.getElementById("subMenuUser").style.display = "none";
// }

// // Kiểm tra trạng thái đăng nhập khi trang web được tải
// document.addEventListener("DOMContentLoaded", function () {
//     var isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (isLoggedIn === "true") {
//         document.getElementById("userInfoPic").src = "./user1.png";
//         document.getElementById("userPic").src = "./user1.png"
//         document.getElementById("loggedInUserName").textContent = "Thanh Luan";
//         document.getElementById("subMenuLogin").style.display = "none";
//         document.getElementById("subMenuUser").style.display = "block";
//     }
// });

// async function handleSignup() {
//     var email = document.getElementById('email').value;
//     var phone = document.getElementById('phone').value;
//     var password = document.getElementById('password').value;

//     await axios
//         .post("https://touring.glitch.me/users", {
//             email: email,
//             password: password,
//             phone: phone,
//             role: "",
//             name: "",
//             status: "Active",
//         })

//         .then((response) => {
//             toastr.success("Signup successfully", "Message", {
//                 timeOut: 2000,
//                 closeButton: true,
//                 debug: false,
//                 newestOnTop: true,
//                 progressBar: true,
//                 positionClass: "toast-top-right",
//                 preventDuplicates: true,
//                 onclick: null,
//                 showDuration: "300",
//                 hideDuration: "1000",
//                 extendedTimeOut: "1000",
//                 showEasing: "swing",
//                 hideEasing: "linear",
//                 showMethod: "fadeIn",
//                 hideMethod: "fadeOut",
//                 tapToDismiss: false,
//             });
//             setTimeout(() => {
//                 location.href = `${location.origin}header.html`;
//             }, 200);
//         });
// }

// handleSignup;

// async function logout() {
//     localStorage.setItem("isLogin", false);
// }

var isLogin = JSON.parse(localStorage.getItem("isLogin"));

// Hàm mở modal Loginá
function openLoginModal() {
    var loginModal = document.getElementById("loginModal");
    var signUpModal = document.getElementById("signupModal");
    loginModal.style.display = "block";
    signUpModal.style.display = "none";
}

// Hàm đóng modal Login
function closeLoginModal() {
    var loginModal = document.getElementById("loginModal");
    loginModal.style.display = "none";
    // signUpModal.style.display = "block";
}

// Hàm mở modal Sign Up
function openSignUpModal() {
    var loginModal = document.getElementById("loginModal");
    var signUpModal = document.getElementById("signupModal");
    signUpModal.style.display = "block";
    loginModal.style.display = "none";
}

// Hàm đóng modal Sign Up
function closeSignUpModal() {
    var signUpModal = document.getElementById("signupModal");
    signUpModal.style.display = "none";
    // loginModal.style.display = "block";
}

async function handleLogin() {
    var email = document.getElementById("emailLogIn").value;
    var password = document.getElementById("passwordLogIn").value;

    await axios.get("https://touring.glitch.me/users").then((response) => {
        var userExist = response.data.find((usr) => usr.email === email);
        if (userExist && userExist.password === password) {
            localStorage.setItem("isLogin", true);
            setTimeout(() => {
                location.href = `${location.origin}/HomePage/homepage.html`;
            }, 100);
        }
    });

    localStorage.setItem("isLogin", "true");

    document.getElementById("userPic").src = "./user1.png";
    document.getElementById("userInfoPic").src = "./user1.png";
    document.getElementById("loggedInUserName").textContent = "Thanh Luan";
    document.getElementById("subMenuLogin").style.display = "none";
    document.getElementById("subMenuUser").style.display = "block";
}

// Hàm logout khi người dùng đăng xuất
function logoutUser() {
    localStorage.setItem("isLogin", false);

    document.getElementById("userInfoPic").src = "./user2.png";
    document.getElementById("userPic").src = "./user2.png";
    document.getElementById("loggedInUserName").textContent = "Guest";
    document.getElementById("subMenuLogin").style.display = "block";
    document.getElementById("subMenuUser").style.display = "none";
}

// Kiểm tra trạng thái đăng nhập khi trang web được tải
document.addEventListener("DOMContentLoaded", function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        document.getElementById("userInfoPic").src = "./user1.png";
        document.getElementById("userPic").src = "./user1.png";
        document.getElementById("loggedInUserName").textContent = "Thanh Luan";
        document.getElementById("subMenuLogin").style.display = "none";
        document.getElementById("subMenuUser").style.display = "block";
    }
});

async function handleSignup() {
    var email = document.getElementById("email").value;
    // var phone = document.getElementById('phone').value;
    var password = document.getElementById("password").value;

    try {
        const response = await axios.post("https://touring.glitch.me/users", {
            email: email,
            password: password,
            role: "Customer",
            name: "",
            avatar: "",
            status: "Active",
        });

        // Lấy ID của người dùng từ phản hồi
        const userId = response.data.id;

        // Tiếp tục xử lý với ID của người dùng
        console.log("ID của người dùng:", userId);
        localStorage.setItem("userId", userId);

        //gọi function 
        sendEmail(email);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi tạo người dùng:", error);
    }
}

function sendEmail(email) {
    emailjs.init('Osy8L38k62YRgUKem'); // Thay 'YOUR_USER_ID' bằng User ID của bạn

    const serviceID = "service_0ohuk3r"; // Thay 'YOUR_SERVICE_ID' bằng Service ID của dịch vụ của bạn
    const templateID = "template_pgj7ajo"; // Thay 'YOUR_TEMPLATE_ID' bằng ID của mẫu email của bạn

    var templateParams = {
        name: "Customer of Travel Agency",
        email: email
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(function (response) {
            console.log("Email sent successfully!", response.status, response.text);
        })
        .catch(function (error) {
            console.error("Email failed to send:", error);
        });
}



// .then((response) => {

//     toastr.success("Signup successfully", "Message", {
//         timeOut: 2000,
//         closeButton: true,
//         debug: false,
//         newestOnTop: true,
//         progressBar: true,
//         positionClass: "toast-top-right",
//         preventDuplicates: true,
//         onclick: null,
//         showDuration: "300",
//         hideDuration: "1000",
//         extendedTimeOut: "1000",
//         showEasing: "swing",
//         hideEasing: "linear",
//         showMethod: "fadeIn",
//         hideMethod: "fadeOut",
//         tapToDismiss: false,
//     });
//     setTimeout(() => {
//         location.href = `${location.origin}header.html`;
//     }, 200);
// });
// }

// handleSignup;
// handleSignup();

async function logout() {
    localStorage.setItem("isLogin", false);
}
