/**
 * Hàm tạo, hiển thị toast message
 * @param {object} object chứa thông tin của toast message
 * Author: PHẠM MINH CHIẾN (24/11/2023)
 */
function toast({
  type = "success",
  message = "",
  action = "Hoàn tác",
  duration = 5000
}) {
  try {
    const main = document.querySelector(".toast-message");
    if (main) {
      const toast = document.createElement("div");

      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);

      toast.onclick = function (e) {
        if (e.target.closest(".toast-close-icon")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };

      const toastInfo = {
        success: "Thành công!",
        error: "Lỗi!",
        warning: "Cảnh báo!",
        info: "Thông tin!",
      };

      const title = toastInfo[type];
      const delay = duration / 1000;

      toast.classList.add("toast", `toast--${type}`);
      // toast.style.animation = `slideInleft ease 0.5s, fadeOut linear 1s ${delay} forwards`;

      toast.innerHTML = `
    <div class="toast-left">
      <div class="toast-icon">
        ${type === "error" ? '<i class="fas fa-times-circle"></i>' : ""}  
      </div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <div class="toast-right">
      <div class="toast-action">${action}</div>
      <div class="toast-close-icon"></div>
    </div>
      `;

      main.appendChild(toast);
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi: ", error);
  }
}

export { toast };
