/**
 * định dạng số với dấu phẩy hàng nghìn
 * @param {*} number
 * @returns số được định dạng
 * Author: PHẠM MINH CHIẾN (29/11/2023)
 */
function formatNumberWithCommas(number) {
  try {
    // Sử dụng toLocaleString để định dạng số với dấu phẩy hàng nghìn
    return number.toLocaleString("vi-VN");
  } catch (error) {
    console.error(error);
  }
}

// format số tiền nợ ngăn cách hàng nghìn
// const debitAmountInput = document.getElementById("debitAmount");
// debitAmountInput.addEventListener("input", function (event) {
//   // lấy giá trị từ trường nhập
//   const debitAmount = event.target.value;

//   // chuyển giá trị thành số
//   let numericValue = parseFloat(debitAmount.replace(/\./g, ""));

//   if (!isNaN(numericValue)) {
//     event.target.value = formatNumberWithCommas(numericValue);
//   }
// });

export { formatNumberWithCommas };
