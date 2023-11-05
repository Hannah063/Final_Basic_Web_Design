// Lấy thông tin người dùng hiện tại từ localStorage
var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

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
  var loginModal = document.getElementById("loginModal");

  await axios
    .get("https://touring.glitch.me/users")
    .then(function (response) {
      const user = response.data;
      const userExist = response.data.find((usr) => usr.email === email);
      if (userExist && userExist.password === password) {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("role", userExist.role);
        setTimeout(() => {
          if (userExist.role === "Admin") {
            location.href = `${location.origin}/ad_dashboard/users.html`;
          } else {
            location.href = `${location.origin}/homepage.html`;
          }
        }, 1000);
      } else {
        // Đoạn này phải thêm một cái quên mk
        alert("Thay đổi mật khẩu?");
        chagePassword();
      }

      // if (user.off) {
      //     console.log('Đăng nhập không thành công: Tài khoản bị khoá.');
      //     alert('Tài khoản này đang bị khoá. Không thể đăng nhập.');
      //     return;
      // }

      // Gửi yêu cầu DELETE để xóa thông tin đăng nhập
      // axios.delete(`https://touring.glitch.me/users/${user.id}`)
      // .then(function (response) {
      //     // Xóa thành công, không hiển thị thông báo
      // })
      // .catch(function (error) {
      //     console.error(error);
      // });

      // Lưu thông tin người dùng vào currentUser
      currentUser = user;
      // console.log('Thông tin người dùng sau đăng nhập:', currentUser);

      // Lưu thông tin người dùng vào localStorage
      setCurrentUser(user);
      // console.log('Thông tin người dùng đã lưu vào Local Storage:', localStorage.getItem('CurrentUser'));

      // Cập nhật tên người dùng đã đăng nhập

      // Cập nhật giao diện người dùng sau khi đăng nhập
      handleUserState();

      // Đóng modal đăng nhập
      closeLoginModal();
    })

    .catch(function (error) {
      console.error(error);
    });
}
function chagePassword() {}

// Hàm đăng xuất
function logoutUser() {
  window.localStorage.removeItem("CurrentUser");
  window.localStorage.removeItem("me");
  location.reload();
}

// Hàm hiển thị form tài khoản
function toggleProfile() {
  const subProfile = document.getElementById("subProfile");
  subProfile.classList.toggle("open-profile");
  const userData = JSON.parse(localStorage.getItem("me"));
  document.getElementById("loggedInUserName2").innerHTML = userData.name;
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
  const userPic = document.getElementById("userPic");
  const subProfile = document.getElementById("subProfile");
  const subMenuLogin = document.getElementById("subMenuLogin");
  const subMenuUser = document.getElementById("subMenuUser");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");

  if (isLogin) {
    const userData = JSON.parse(localStorage.getItem("me"));
    const loggedInUserName = document.getElementById("loggedInUserName2");

    if (userData) {
      loggedInUserName.innerText = userData.name;
    }

    if (subMenuLogin && subMenuUser) {
      subMenuLogin.style.display = "none";
      subMenuUser.style.display = "block";
    }

    // Cập nhật nhãn của nút
    if (loginLink && registerLink) {
      loginLink.innerHTML = '<i class="fa fa-user-circle-o"></i>Profile';
      registerLink.innerHTML = '<i class="fa fa-sign-out"></i>Log Out';
    }
  } else {
    if (subMenuLogin && subMenuUser) {
      subMenuLogin.style.display = "block";
      subMenuUser.style.display = "none";
    }

    // Khôi phục nhãn ban đầu của nút
    if (loginLink && registerLink) {
      loginLink.innerHTML = '<i class="fa fa-sign-in"></i>Log In';
      registerLink.innerHTML = '<i class="fa fa-user-circle-o"></i>Sign Up';
    }
  }

  if (userPic) {
    userPic.onclick = function () {
      if (subProfile) {
        subProfile.classList.toggle("open-profile");
      }
    };
  }
}

// Gọi hàm handleUserState để thiết lập trạng thái người dùng khi trang web được tải
handleUserState();

//Hàm quên mật khẩu
function handleChangePass() {
    axios.get("https://touring.glitch.me/users").then(function (response) {
      const users = response.data;
      const email = document.getElementById("emailCreatePass").value;
      const userExist = users.find((user) => user.email === email);
      
      if (userExist) {
        const newPass = document.getElementById("changePassword").value;
        userExist.password = newPass;
        console.log(userExist.password);
        axios
          .put(`https://touring.glitch.me/users/${userExist.id}`, userExist)
          .then(function (response) {
            alert("Mật khẩu đã được cập nhật thành công");
          })
          .catch(function (error) {
            alert("Lỗi khi cập nhật mật khẩu:", error);
          });
      } else {
        alert("Không tìm thấy người dùng với email này");
      }
    });
  }



  
  