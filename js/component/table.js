/**
 * Kiểm soát mối quan hệ giữa checkbox chọn tất cả và checkbox còn lại
 * Author: PHẠM MINH CHIẾN (29/11/2023)
 */
function setCheckboxInTable() {
  const selectAllCheckbox = document.getElementById("m-checkbox-select-all");
  const checkboxes = document.querySelectorAll("tr .checkbox");

  selectAllCheckbox.addEventListener("change", function () {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;

      let row = checkbox.closest("tr");

      if (checkbox.checked) {
        row.classList.add("checked");
      } else {
        row.classList.remove("checked");
      }
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const allChecked = Array.from(checkboxes).every(
        (checkbox) => checkbox.checked
      );
      selectAllCheckbox.checked = allChecked;

      let row = checkbox.closest("tr");

      if (checkbox.checked) {
        row.classList.add("checked");
      } else {
        row.classList.remove("checked");
      }
    });
  });
}

export { setCheckboxInTable };
