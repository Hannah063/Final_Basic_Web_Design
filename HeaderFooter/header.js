// Lấy thông tin người dùng hiện tại từ localStorage
var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
if (Boolean(localStorage.getItem("isLogin"))) {
  handleUserState();
}
// Kiểm tra nếu currentUser không rỗng (tức là người dùng đã đăng nhập), thì đặt isLogin thành true. Ngược lại, isLogin là false.
var isLogin = !!currentUser;

// Hàm mở modal Login
function openLoginModal() {
  var loginModal = document.getElementById("loginModal");
  var signUpModal = document.getElementById("signupModal");
  var changePass = document.getElementById("changePass");
  loginModal.style.display = "block";
  signUpModal.style.display = "none";
  changePass.style.display = "none";
}

// Hàm đóng modal Login
function closeLoginModal() {
  var loginModal = document.getElementById("loginModal");
  loginModal.style.display = "none";
}

// Hàm mở modal Sign Up
function openSignUpModal() {
  var loginModal = document.getElementById("loginModal");
  var signUpModal = document.getElementById("signupModal");
  var changePass = document.getElementById("changePass");
  signUpModal.style.display = "block";
  loginModal.style.display = "none";
  changePass.style.display = "none";
}

// Hàm đóng modal Sign Up
function closeSignUpModal() {
  var signUpModal = document.getElementById("signupModal");
  signUpModal.style.display = "none";
}

// Hàm mở change Pw
function openChangePassword() {
  var changePass = document.getElementById("changePass");
  var signUpModal = document.getElementById("signupModal");
  var loginModal = document.getElementById("loginModal");
  changePass.style.display = "block";
  signUpModal.style.display = "none";
  loginModal.style.display = "none";
}

// Hàm đóng modal Sign Up
function closeChangePassword() {
  var changePass = document.getElementById("changePass");
  changePass.style.display = "none";
}

// Hàm lấy người dùng hiện tại đã đăng nhập
function getCurrentUser() {
  return JSON.parse(window.localStorage.getItem("CurrentUser"));
}

// Hàm đặt người dùng hiện tại
function setCurrentUser(user) {
  window.localStorage.setItem("CurrentUser", JSON.stringify(user));
}

// Hàm lấy danh sách người dùng từ API
async function getListUserFromAPI() {
  try {
    const response = await axios.get("https://touring.glitch.me/users");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng từ API:", error);
    return [];
  }
}

// Hàm cập nhật danh sách người dùng lên API
async function setListUserToAPI(users) {
  try {
    const response = await axios.put("https://touring.glitch.me/users", users);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh sách người dùng lên API:", error);
    return false;
  }
}

// Hàm cập nhật danh sách người dùng trong localStorage
async function updateListUser(newUser, newData) {
  let list = await getListUserFromAPI();
  for (let i = 0; i < list.length; i++) {
    if (equalUser(newUser, list[i])) {
      list[i] = newData ? newData : newUser;
    }
  }
  await setListUserToAPI(list);
}

// Hàm đăng ký
function handleSignup() {
  const username = document.getElementById("newUser").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("pass").value;

  axios
    .post("https://touring.glitch.me/users", {
      name: username,
      email: email,
      phone: phone,
      password: password,
      status: "Active",
      avatar: "",
      role: "",
    })
    .then(function (response) {
      const user = response.data;
      setCurrentUser(user);

      // Cập nhật tên người dùng đã đăng ký
      const loggedInUserName = document.getElementById("loggedInUserName2");
      loggedInUserName.innerText = user.name;

      alert("Đăng ký thành công, Bạn sẽ được tự động đăng nhập!");
      location.reload();
    })
    .catch(function (error) {
      alert(
        "Tên đăng nhập đã có người sử dụng hoặc có lỗi trong quá trình đăng ký."
      );
      console.error(error);
    });
}

// Hàm đăng nhập
async function handleLogin() {
  const email = document.getElementById("emailLogIn").value;
  const password = document.getElementById("passwordLogIn").value;

  await axios
    .get("https://touring.glitch.me/users")
    .then(function (response) {
      
      const userExist = response.data.find((usr) => usr.email === email);
      const user = userExist;
      if (userExist && userExist.password === password) {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("role", userExist.role);

      setCurrentUser(user);
      closeLoginModal();
      





} else {
        alert("Tài khoản hoặc mật khẩu không chính xác !");
      }

      if (Boolean(localStorage.getItem("isLogin"))) {
        handleUserState();
      }
     
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Hàm đăng xuất
function logoutUser() {
  window.localStorage.clear();
  location.reload();
}

// Hàm hiển thị form tài khoản
function toggleProfile() {
  if (Boolean(localStorage.getItem("isLogin"))) {
    handleUserState();
  }
  const subProfile = document.getElementById("subProfile");
  subProfile.classList.toggle("open-profile");
}

// Hàm kiểm tra tài khoản
function checkTaiKhoan() {
  if (!getCurrentUser()) {
    showTaiKhoan(true);
  }
}

// Hàm setup sự kiện cho form tài khoản
function setupEventTaiKhoan() {
  const taikhoan = document.getElementsByClassName("taikhoan")[0];
  const list = taikhoan.getElementsByTagName("input");
  ["blur", "focus"].forEach(function (evt) {
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener(evt, function (e) {
        const label = this.previousElementSibling;
        if (e.type === "blur") {
          if (this.value === "") {
            label.classList.remove("active");
            label.classList.remove("highlight");
          } else {
            label.classList.remove("highlight");
          }
        } else if (e.type === "focus") {
          label.classList.add("active");
          label.classList.add("highlight");
        }
      });
    }
  });

  const tab = document.getElementsByClassName("tab");
  for (let i = 0; i < tab.length; i++) {
    const a = tab[i].getElementsByTagName("a")[0];
    a.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentElement.classList.add("active");
      if (this.parentElement.nextElementSibling) {
        this.parentElement.nextElementSibling.classList.remove("active");
      }
      if (this.parentElement.previousElementSibling) {
        this.parentElement.previousElementSibling.classList.remove("active");
      }
      const target = this.href.split("#")[1];
      document.getElementById(target).style.display = "block";
      const hide = target == "login" ? "signup" : "login";
      document.getElementById(hide).style.display = "none";
    });
  }
}

// Hàm xử lý trạng thái người dùng khi trang web được tải
function handleUserState() {
  if (Boolean(localStorage.getItem("isLogin"))) {
  const userPic = document.getElementById("userPic");
  const subProfile = document.getElementById("subProfile");
  const subMenuLogin = document.getElementById("subMenuLogin");
  const subMenuUser = document.getElementById("subMenuUser");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
    subMenuLogin.style.display = "none";
    subMenuUser.style.display = "block";
    const userData = JSON.parse(localStorage.getItem("CurrentUser"));
    const loggedInUserName = document.getElementById("loggedInUserName2");

    if (userData) {
      loggedInUserName.innerHTML = userData.name;
    }
    // Cập nhật nhãn của nút
    if (loginLink && registerLink) {
      loginLink.innerHTML = '<i class="fa fa-user-circle-o"></i>Profile';
      registerLink.innerHTML = '<i class="fa fa-sign-out"></i>Log Out';
    }

    // Khôi phục nhãn ban đầu của nút
    if (loginLink && registerLink) {
      loginLink.innerHTML = '<i class="fa fa-sign-in"></i>Log In';
      registerLink.innerHTML = '<i class="fa fa-user-circle-o"></i>Sign Up';
    }

  if (userPic) {
    userPic.onclick = function () {
      if (subProfile) {
        subProfile.classList.toggle("open-profile");
      }
  }
}
}

}
function shuffleString(string) {
  let array = string.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

function generatePassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const specialCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let password = '';

  // Tạo 9 ký tự chữ cái ngẫu nhiên
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  // Thêm 1 ký tự đặc biệt ngẫu nhiên
  const randomSpecialCharIndex = Math.floor(Math.random() * specialCharacters.length);
  password += specialCharacters[randomSpecialCharIndex];

  // Trộn ngẫu nhiên các ký tự trong mật khẩu
  password = shuffleString(password);

  return password;
}

// Gọi hàm handleUserState để thiết lập trạng thái người dùng khi trang web được tải
// handleUserState();

async function handleConfirmChangePassword() {
  const code = document.getElementById("codeConfirmChangePassword").value;
  await axios.get("https://touring.glitch.me/users").then(async function (response) {
    const email = document.getElementById("emailCur").value;
    const userExist = response.data.find((user) => user.email === email);
    if (userExist && Number(userExist.code) === Number(code)) {
      var templateParams = {
        email: userExist.email,
        password: await generatePassword(10),
      };
      emailjs
        .send("default_service", "template_gazt72q", templateParams)
        .then(
         async function () {
          await axios
                .patch(
                  `https://touring.glitch.me/users/${userExist.id}`,
                  { password: templateParams.password }
                ).then(function (response) {
                  var modalEnterCode = document.getElementById("confirmChangePassword")
                  modalEnterCode.style.display = "none"
                  alert("Mật khẩu mới đã được gửi về email của bạn!");
                })

          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    }

  })
}

//Hàm quên mật khẩu
async function handleChangePass() {
    await axios.get("https://touring.glitch.me/users").then(function (response) {
      const email = document.getElementById("emailCreatePass").value;
      const userExist = response.data.find((user) => user.email === email);

      if (userExist) {
        var templateParams = {
          email: userExist.email,
          code: (Math.random() * 100000) | 0,
        };
        emailjs
          .send("service_4mv8mgj", "template_69jvbsa", templateParams)
          .then(
           async function () {
              await axios
                .patch(
                  `https://touring.glitch.me/users/${userExist.id}`,
                  { code: templateParams.code }
                )
                .then((res) => {
                  var modalEnterMail = document.getElementById("changePass")
                  modalEnterMail.style.display = "none"
                  var modalEnterCode = document.getElementById("confirmChangePassword")
                  modalEnterCode.style.display = "block"
                  const emailCur = document.getElementById("emailCur");
                  emailCur.value = userExist.email
               
                });
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      } else {
        alert("Không tìm thấy người dùng với email này");
      }
    });
  }

  