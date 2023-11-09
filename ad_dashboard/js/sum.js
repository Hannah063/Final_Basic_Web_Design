const backButton = document.querySelector(".backtoHome");
backButton.addEventListener("click", () => {
  window.location.href = "../homepage.html";
});

// Modal element
const modalDelete = document.getElementById("modal-delete");

// HÀM XOÁ
async function deleteResource(apiUrl, resourceId) {
  try {
    const response = await axios.delete(`${apiUrl}/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//HÀM XOÁ USER
async function handleDeleteUser(id) {
  event.preventDefault();
  const apiUrl = "https://touring.glitch.me/users"; // Liên kết API bạn muốn sử dụng
  const resourceId = id;

  modalDelete.style.display = "block";
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", async () => {
      try {
        await deleteResource(apiUrl, resourceId);
        document.getElementById(`child-${resourceId}`).remove();
        modalDelete.style.display = "none";
        setTimeout(function () {
          location.reload();
        }, 500);
      } catch (error) {
        console.log("error");
      }
    });

  // Cancel button click event handler
  document.getElementById("cancel-delete-btn").addEventListener("click", () => {
    modalDelete.style.display = "none";
  });
}

//HÀM XOÁ BOOKING
async function handleDeleteBooking(id) {
  event.preventDefault();
  const apiUrl = "https://touring.glitch.me/bookings"; // Liên kết API bạn muốn sử dụng
  const resourceId = id;

  modalDelete.style.display = "block";
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", async () => {
      try {
        await deleteResource(apiUrl, resourceId);
        document.getElementById(`child-${resourceId}`).remove();
        modalDelete.style.display = "none";
        setTimeout(function () {
          location.reload();
          alert("deleted successfully!!!");
        }, 500);
      } catch (error) {
        console.log("error");
      }
    });

  // Cancel button click event handler
  document.getElementById("cancel-delete-btn").addEventListener("click", () => {
    modalDelete.style.display = "none";
  });
}

//HÀM XOÁ DETAIL
async function handleDeleteDetail(id) {
  event.preventDefault();
  const apiUrl = "https://touring.glitch.me/details"; // Liên kết API bạn muốn sử dụng
  const resourceId = id;

  modalDelete.style.display = "block";
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", async () => {
      try {
        await deleteResource(apiUrl, resourceId);
        document.getElementById(`child-${resourceId}`).remove();
        modalDelete.style.display = "none";
        setTimeout(function () {
          location.reload();
        }, 500);
      } catch (error) {
        console.log("error");
      }
    });

  // Cancel button click event handler
  document.getElementById("cancel-delete-btn").addEventListener("click", () => {
    modalDelete.style.display = "none";
  });
}

//HÀM XOÁ DESTINATION
async function handleDeleteDestination(id) {
  event.preventDefault();
  const apiUrl = "https://touring.glitch.me/destinations"; // Liên kết API bạn muốn sử dụng
  const resourceId = id;

  modalDelete.style.display = "block";
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", async () => {
      try {
        await deleteResource(apiUrl, resourceId);
        document.getElementById(`child-${resourceId}`).remove();
        modalDelete.style.display = "none";
        setTimeout(function () {
          location.reload();
        }, 500);
      } catch (error) {
        console.log("error");
      }
    });

  // Cancel button click event handler
  document.getElementById("cancel-delete-btn").addEventListener("click", () => {
    modalDelete.style.display = "none";
  });
}
