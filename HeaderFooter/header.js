
var isLogin = JSON.parse(localStorage.getItem("isLogin"));

// Hàm mở modal Login
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
    var email = document.getElementById('emailLogIn').value;
    var password = document.getElementById('passwordLogIn').value;

    await axios
        .get("https://touring.glitch.me/users")
        .then((response) => {
            var userExist = response.data.find((users) => users.email === email);

            if (userExist && userExist.password === password) {
                localStorage.setItem("isLogin", true);
               console.log(userExist);
             
                // Update user-specific information
                document.getElementById("userPic").src = userExist.avatar || "./defaultUserImage.png";
                document.getElementById("userInfoPicLoggedIn").src = userExist.avatar || "./defaultUserImage.png";
                document.getElementById("loggedInUserName").textContent = userExist.name;
                
                document.getElementById("subMenuLogin").style.display = "none";
                document.getElementById("subMenuUser").style.display = "block";
            }
        });


    // Redirect to the home page
    setTimeout(() => {
        location.href = `${location.origin}/Final_Basic_Web_Design/HeaderFooter/header.html`;
    }, 100);
}



// Hàm logout khi người dùng đăng xuất
function logoutUser() {
    localStorage.setItem("isLogin", false);

    document.getElementById("userInfoPic").src = "./user2.png";
    document.getElementById("userPic").src = "./user2.png"
    document.getElementById("loggedInUserName").textContent = "Guest";
    document.getElementById("subMenuLogin").style.display = "block";
    document.getElementById("subMenuUser").style.display = "none";
}

//Kiểm tra trạng thái đăng nhập khi trang web được tải
// Kiểm tra trạng thái đăng nhập khi trang web được tải
document.addEventListener("DOMContentLoaded", function () {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (isLoggedIn === "true") {
        // Retrieve user ID from local storage (you need to store this during login)
        var userId = localStorage.getItem("userId");

        // Fetch user data using the user ID
        axios.get(`https://touring.glitch.me/users/${userId}`)
            .then((response) => {
                var user = response.data;
                if (user) {
                    document.getElementById("userInfoPicLoggedIn").src = user.avatar || "./defaultUserImage.png";
                    document.getElementById("userPic").src = user.avatar || "./defaultUserImage.png";
                    document.getElementById("loggedInUserName").textContent = user.name;
                    document.getElementById("subMenuLogin").style.display = "none";
                    document.getElementById("subMenuUser").style.display = "block";
                }
            })
            .catch((error) => {
                // Handle error if user data cannot be fetched
                console.error("Error fetching user data:", error);
            });
    }
});




async function handleSignup() {
    var email = document.getElementById('email').value;
    // var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;


    await axios
        .post("https://touring.glitch.me/users", {
            email: email,
            password: password,
            phone: "",
            role: "",
            name: "",
            status: "Active",
        })

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
}


handleSignup();


async function logout() {
        localStorage.setItem("isLogin", false);
    }






