import { toast } from "./toast.js";
import { togglePopup, toggleDialog, toggleToast } from "./toggle.js";

// ADDNEW CUSTOMER BUTTON
const addNewCustomerBtn = document.querySelector(".add-new-customer-btn");
const submitPopupBtn = document.querySelector("#submit-popup-btn");
const cancelPopupBtns = document.querySelectorAll(".btn-close-popup");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const cancelDialogBtns = document.querySelectorAll(".btn-close-dialog");
const acceptDeleteCustomerBtn = document.querySelector(".btn-accept-dialog");
// const cancelSelectedBtn = document.querySelector('.cancel-selected');

console.log(cancelPopupBtns);

addNewCustomerBtn.addEventListener("click", function () {
  togglePopup();
  console.log("meo meo meo");
});

submitPopupBtn.addEventListener("click", function () {
  event.preventDefault();
  togglePopup();
  toast({
    type: "success",
    message: "Thêm khách hàng thành công.",
    duration: 5000,
  });
});

cancelPopupBtns.forEach((cancelBtn) =>
  cancelBtn.addEventListener("click", function () {
    togglePopup();
  })
);

deleteAllBtn.addEventListener("click", function () {
  toggleDialog();
});

cancelDialogBtns.forEach((cancelBtn) =>
  cancelBtn.addEventListener("click", function () {
    toggleDialog();
  })
);

// closeToast.addEventListener('click', function() {
//   toggleToast();
// });

acceptDeleteCustomerBtn.addEventListener("click", function () {
  toggleDialog();
  toast({
    type: "success",
    message: "Đã xóa thành công.",
    duration: 5000,
  });
});
