/**
 * Hàm ẩn/ hiện popup thêm khách hàng
 * @param {*} không
 * Author: PHẠM MINH CHIẾN (24/11/2023)
 */
function togglePopup() {
  const popup = document.querySelector(".popup");
  const overlay = document.querySelector("#overlay");

  if (popup.style.visibility !== "visible") {
    overlay.style.visibility = "visible";
    overlay.style.zIndex = "1000";
    popup.style.visibility = "visible";
  } else {
    overlay.style.visibility = "hidden";
    popup.style.visibility = "hidden";
  }
}

/**
 * Hàm ẩn hiện Dialog xác nhận xóa khách hàng
 * @param {*} Không
 * Author: PHẠM MINH CHIẾN (24/11/2023)
 */
function toggleDialog() {
  try {
    const overlay = document.querySelector("#overlay");
    const dialogDeleteAll = document.querySelector(".dialog-container");
    const popup = document.querySelector(".popup");

    if (dialogDeleteAll.style.visibility !== "visible") {
      overlay.style.visibility = "visible";
      overlay.style.zIndex = "1009";
      dialogDeleteAll.style.visibility = "visible";
    } else {
      if( popup.style.visibility === "visible") {
        overlay.style.zIndex = "1000";
        dialogDeleteAll.style.visibility = "hidden";
      }
      else {
        overlay.style.visibility = "hidden";
        dialogDeleteAll.style.visibility = "hidden";
      }
     
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi: ", error);
  }
}

function toggleToast() {
  try {
    const toast = document.querySelector(".m-toast");

    if (toast.style.visibility !== "visible") {
      toast.style.visibility = "visible";
    } else {
      toast.style.visibility = "hidden";
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi: ", error);
  }
}
export { togglePopup, toggleDialog, toggleToast };
