/**
 * Hàm cập nhật số bản ghi đã chọn và disabled button "Bỏ chọn" "Xóa tất cả"
 * @param {*} Không có tham số
 * Author: PHẠM MINH CHIẾN (24/11/2023)
 */
function updateSelectedCount() {
  try {
    const checkboxes = document.querySelectorAll(".checkbox");
    const totalSelected = document.querySelector(".total-selected b");
    const selectAllCheckbox = document.querySelector("#m-checkbox-select-all");
    const cancelSelectedBtn = document.querySelector(".cancel-selected");
    const deleteAllBtn = document.querySelector(".delete-all-btn");
    const selectedCheckboxes = document.querySelectorAll(".checkbox:checked");

    // Lấy tổng số checkbox được checked
    totalSelected.innerHTML = selectedCheckboxes.length;
    if (
      selectedCheckboxes.length > 0 || 
      (deleteAllBtn.hasAttribute("disabled") && cancelSelectedBtn.hasAttribute("disabled"))
      ) {
      deleteAllBtn.removeAttribute("disabled");
      cancelSelectedBtn.removeAttribute("disabled");
    } else {
      deleteAllBtn.setAttribute("disabled", "disabled");
      cancelSelectedBtn.setAttribute("disabled", "disabled");
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi: ", error);
  }
}

/**
 * Hàm cập nhật số bản ghi đã chọn và disabled button "Bỏ chọn" "Xóa tất cả"
 * khi có bản ghi nào được chọn
 * @param {*} Không có tham số
 * Author: PHẠM MINH CHIẾN (24/11/2023)
 */
function updateSelectedCountOnclick() {
  const checkboxes = document.querySelectorAll(".checkbox");
  const selectAllCheckbox = document.querySelector("#m-checkbox-select-all");
  const cancelSelectedBtn = document.querySelector(".cancel-selected");
  
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", function () {
      updateSelectedCount();
    })
  );

  selectAllCheckbox.addEventListener("change", function () {
    updateSelectedCount();
  });

  cancelSelectedBtn.addEventListener("click", function () {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
        checkbox.closest("tr").classList.remove("checked");
      }
    });
    selectAllCheckbox.checked = false;
    updateSelectedCount();
  });
}

export { updateSelectedCount, updateSelectedCountOnclick };
