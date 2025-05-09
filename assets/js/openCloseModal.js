let modal = document.querySelector(".modal");

// Mở modal khi click vào link "Sign In"
document
  .querySelector(".js-open-modal")
  .addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "flex";
  });

// Đóng modal khi click vào nút "×"
document
  .querySelector(".js-close-modal")
  .addEventListener("click", function () {
    modal.style.display = "none";
  });
// Đóng modal khi click vào nền (background)
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
// Đóng modal khi nhấn phím Escape
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});
