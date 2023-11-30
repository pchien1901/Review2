import { toggleDialog, togglePopup } from "../component/toggle.js";
import { formatNumberWithCommas } from "../component/popup.js";
import { setCheckboxInTable } from "../component/table.js";
import {
  updateSelectedCount,
  updateSelectedCountOnclick,
} from "../page/delete-customer.js";
import { toast } from "../component/toast.js";

window.onload = function () {
  new CustomerPage();
};

class CustomerPage {
  pageTitle = "Quản lý khách hàng";
  currentCustomer;
  constructor() {
    this.loadData();
    this.initEvents();
    toast("success", "Thêm khách hàng thành công.", "", 5000);
  }

  /**
   * Khởi tạo các sự kiện trong page customer
   * Author: PHẠM MINH CHIẾN  (28/11/2023)
   */
  initEvents() {
    try {
      // click button add hiển thị form thêm mới
      document
        .getElementById("add-new-customer-btn")
        .addEventListener("click", this.btnAddOnClick);
      // Refesh dữ liệu
      document
        .querySelector(".refresh-btn")
        .addEventListener("click", this.btnRefreshBtn);
      // Xuất khẩu

      // Ẩn form chi tiết
      let btnClosePopups = document.querySelectorAll(".btn-close-popup");
      for (const btnClosePopup of btnClosePopups) {
        btnClosePopup.addEventListener("click", function () {
          togglePopup();
        });
      }

      // lưu dữ liệu - submit form chi tiết
      document
        .querySelector("#submit-popup-btn")
        .addEventListener("click", this.btnSaveOnClick.bind(this));

      //  Click button "Xóa tất cả" hiển thị dialog xác nhận
      document
        .querySelector(".main-block-header .delete-all-btn")
        .addEventListener("click", function () {
          toggleDialog();
        });

      // đóng dialog xác nhận xóa tất cả
      let btnCloseDialogs = document.querySelectorAll(".btn-close-dialog");
      for (const btnCloseDialog of btnCloseDialogs) {
        btnCloseDialog.addEventListener("click", function () {
          toggleDialog();
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * hiển thị dữ liệu vào table
   * Author: PHẠM MINH CHIẾN (29/11/2023)
   */
  async loadData() {
    try {
      let serverError = false;
      await fetch("https://cukcuk.manhnv.net/api/v1/Customers")
        .then((res) => {
          if(!res.ok) {
            throw Error(res);
          }
          return res.json();
        })
        .then((data) => {
          let serverStatus = data.status;
          if (serverStatus >= 500) {
            serverError = true;
            // this.disableWhenServerError();
          } else {
            this.currentCustomer = data;
            console.log(data);
            const tableCustomer = document.getElementById("tableCustomer");
            const tblCustomerBody = tableCustomer.querySelector("tbody");
            for (const item of data) {
              let tr = document.createElement("tr");
              tr.innerHTML = `
            <tr>
              <td>
                <input type="checkbox" name="" id="${
                  item.CustomerId
                }" class="checkbox" />
              </td>
              <td>${item.CustomerCode}</td>
              <td>${item.FullName}</td>
              <td>${
                item.Gender === 0 ? "Nam" : item.Gender === 2 ? "Nữ" : "Khác"
              }</td>
              <td class="dateOfBirth">${
                item.DateOfBirth ? this.convertDateFormat(item.DateOfBirth) : ""
              }</td>
              <td>${item.CompanyName ? item.CompanyName : ""}</td>
              <td class="colummDebitAmount">${
                item.DebitAmount ? formatNumberWithCommas(item.DebitAmount) : ""
              }</td>
              <td class="action-btns">
                <button class="m-icon-btn btn-edit-tr-table">
                  <i class="fas fa-pen"></i>
                </button>
                <button class="m-icon-btn btn-delete-tr-table">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            `;
              tblCustomerBody.appendChild(tr);
            }
          }
          
        })
        .catch((error) => {
          this.disableWhenServerError();
          console.log(error);
        });
      if (!serverError) {
        setCheckboxInTable();
        updateSelectedCount();
        updateSelectedCountOnclick();
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * disable các button và table khi không tải được dữ liệu
   * Author: PHẠM MINH CHIẾN (30/11/2023)
   */
  disableWhenServerError() {
    let table = document.querySelector("#tableCustomer table");
    let cancelSelectedBtn = document.querySelector(".cancel-selected");
    let deleteAllBtn = document.querySelector(".delete-all-btn");

    // Disabled button thêm khách hàng, refresh
    document.getElementById("add-new-customer-btn").disabled = true;
    document.querySelector(".refresh-btn").disabled = true;

    // disabled table, các nút "Xóa tất cả", "Bỏ chọn"
    if(table) {
      table.classList.add("disabled");
    }
    if(
      !deleteAllBtn.hasAttribute("disabled") && 
      !cancelSelectedBtn.hasAttribute("disabled")
    ) {
      deleteAllBtn.setAttribute("disabled", "disabled");
      cancelSelectedBtn.setAttribute("disable", "disable");
    }  
  }

  /**
   * Click button "Thêm mới" mở form chi tiết
   * Author: PHẠM MINH CHIẾN (28/11/2023)
   */
  btnAddOnClick() {
    try {
      // Hiển thị form thêm mới :
      togglePopup();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Refresh dữ liệu
   * Author: PHẠM MINH CHIẾN (28/22/2023)
   */
  btnRefreshBtn() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Click nút "Cất" trong form chi tiết
   * Author: PHẠM MINH CHIẾN (28/11/2023)
   */
  async btnSaveOnClick(e) {
    try {
      e.preventDefault();
      // Thực hiện validate dữ liệu
      const error = this.validateData();

      // Hiển thị thông báo nếu dữ liệu không hợp lệ
      if (error.Required === false) {
        let dialogNotice = document.querySelector(".dialog-container");
        toggleDialog();
        dialogNotice.querySelector(".dialog-heading").innerHTML =
          "Dữ liệu không hợp lệ";
        let errorElement = dialogNotice.querySelector(
          ".dialog-content .dialog-text"
        );
        let btnAcceptDialog = dialogNotice.querySelector(".btn-accept-dialog");
        let firstFieldFocus = document.querySelector("#customerCode");
        btnAcceptDialog.addEventListener("click", function () {
          toggleDialog();
          firstFieldFocus.focus();
        });
        errorElement.textContent = "";
        for (const message of error.Msg) {
          let li = document.createElement("li");
          li.innerHTML = message;
          errorElement.append(li);
        }
      }

      // Nếu dữ liệu hợp lệ hết, gọi api thêm
      if (error.IsValid && error.Required) {
        let addCustomerForm = document.getElementById("addCustomerForm");
        let formValue = new FormData(addCustomerForm);
        let newCustomer = {};
        // lấy dữ liệu từ form nhập
        let customerCode = document.getElementById("customerCode").value;
        let fullName = document.getElementById("fullName").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let email = document.getElementById("email").value;
        let dateOfBirth = document.getElementById("dateOfBirth").value;
        let genderInput = document.getElementsByName("gender");
        let gender;
        for (let i = 0; i < genderInput.length; i++) {
          if (genderInput[i].checked) {
            gender = genderInput[i].value;
            break;
          }
        }
        let memberCardCode = document.getElementById("memberCardCode").value;
        let dateOfRange = document.getElementById("dateOfRange").value;
        let memberCardCodeAddress = document.getElementById(
          "memberCardCodeAddress"
        ).value;
        let debitAmount = document.getElementById("debitAmount").value;
        let companyName = document.getElementById("company").value;
        let address = document.getElementById("address").value;

        // đổi kiểu ngày về dạng ISO
        let birthday = new Date(dateOfBirth);
        let newDateOfBirth = birthday.toISOString();

        let dateRange = new Date(dateOfRange);
        let newDateOfRange = dateRange.toISOString();

        // tạo object
        let postData = {
          customerCode: customerCode,
          firstName: "",
          lastName: "",
          fullName: fullName,
          gender: gender,
          address: address,
          dateOfBirth: newDateOfBirth,
          email: email,
          phoneNumber: phoneNumber,
          customerGroupId: "",
          debitAmount: debitAmount,
          memberCardCode: memberCardCode,
          companyName: companyName,
          companyTaxCode: "",
          isStopFollow: false,
        };

        console.log(postData);

        await fetch("https://cukcuk.manhnv.net/api/v1/Customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })
          .then((res) => {
            if(!res.ok) {
              console.log(res.json());
              throw Error(res);
            }
            return res.json();
          })
          .then((res) => {
            if(res === 1) {
              toast("success", "Thêm khách hàng thành công.", "", 5000);
            } 
          })
          .catch(
            
          );
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * validate dữ liệu trong form thêm khách hàng
   * Author: PHẠM MINH CHIẾN (28/11/2023)
   */
  validateData() {
    try {
      let error = {
        IsValid: true,
        Msg: [],
        Required: true,
      };
      let today = new Date();
      // validate mã khách hàng: bắt buộc nhập
      const customerCode = document.querySelector("#customerCode").value;
      if (
        customerCode === "" ||
        customerCode === null ||
        customerCode === undefined
      ) {
        error.Required = false;
        error.Msg.push("Mã khách hàng không được để trống.");
        this.addErrorElementToInputNotValid(
          "customerCode",
          "Thông tin này không được để trống"
        );
      } else if (customerCode && this.checkCustomerCodeExist(customerCode)) {
        error.IsValid = false;
        console.log("Mã khách hàng bị trùng");
        this.removeErrorElement("customerCode");
        this.addErrorElementToInputNotValid(
          "customerCode",
          "Mã khách hàng đã tồn tại"
        );
      } else {
        this.removeErrorElement("customerCode");
      }

      // họ tên: bắt buộc nhập
      const fullName = document.querySelector("#fullName").value;
      if (fullName === "" || fullName === null || fullName === undefined) {
        error.Required = false;
        error.Msg.push("Họ và tên không được để trống.");
        this.addErrorElementToInputNotValid(
          "fullName",
          "Thông tin này không được để trống"
        );
      } else {
        this.removeErrorElement("fullName");
      }

      // Kiểm tra só điện thoại: nếu nhập phải đúng định dạng
      const phone = document.querySelector("#phoneNumber").value;
      if (phone !== "" && phone !== null && phone !== undefined) {
        // const regexPhoneInVN = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        const regexPhoneInVN = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        if (!regexPhoneInVN.test(phone)) {
          error.IsValid = false;
          console.log("IsValid false tại phone");
          this.addErrorElementToInputNotValid(
            "phoneNumber",
            "Số điện thoại không đúng định dạng"
          );
        } else {
          this.removeErrorElement("phoneNumber");
        }
      }

      // Kiểm tra email: nếu nhập phải đúng định dạng
      const email = document.querySelector("#email").value;
      if (email !== "" && email !== null && email !== undefined) {
        const regexEmail =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        if (!regexEmail.test(email)) {
          error.IsValid = false;
          console.log("IsValid false tại email");
          this.addErrorElementToInputNotValid(
            "email",
            "Email không đúng định dạng"
          );
        } else {
          this.removeErrorElement("email");
        }
      }

      //Kiểm tra ngày sinh
      const birthday = document.querySelector("#dateOfBirth").value;
      if (birthday !== "" && birthday !== null && birthday !== undefined) {
        let birthdayDate = new Date(birthday);

        if (
          birthdayDate > today ||
          (birthdayDate.getFullYear() === today.getFullYear() &&
            birthdayDate.getMonth() === today.getMonth() &&
            birthdayDate.getDate() === today.getDate())
        ) {
          error.IsValid = false;
          console.log("IsValid false tại birthday");
          this.addErrorElementToInputNotValid(
            "dateOfBirth",
            "Ngày sinh không hợp lệ"
          );
        } else {
          this.removeErrorElement("dateOfBirth");
        }
      }

      // Kiểm tra số CMTND
      const memberCardCode = document.querySelector("#memberCardCode").value;
      if (
        memberCardCode !== "" &&
        memberCardCode !== null &&
        memberCardCode !== undefined
      ) {
        let regexmemberCardCode = /^\d{9}$/;
        if (!regexmemberCardCode.test(memberCardCode)) {
          error.IsValid = false;
          console.log("IsValid false tại cmtnd");
          this.addErrorElementToInputNotValid(
            "memberCardCode",
            "Số CMTND không đúng định dạng"
          );
        } else {
          this.removeErrorElement("memberCardCode");
        }
      }

      // Kiểm tra ngày cấp
      const dateRange = document.querySelector("#dateOfRange").value;
      if (dateRange !== "" && dateRange !== null && dateRange !== undefined) {
        let dateOfRange = new Date(dateRange);
        if (
          dateOfRange > today ||
          (dateOfRange.getFullYear() === today.getFullYear() &&
            dateOfRange.getMonth() === today.getMonth() &&
            dateOfRange.getDate() === today.getDate())
        ) {
          error.IsValid = false;
          console.log("IsValid false tại ngày cấp");
          this.addErrorElementToInputNotValid(
            "dateOfRange",
            "Ngày cấp CMTND không hợp lệ"
          );
        } else {
          this.removeErrorElement("dateOfRange");
        }
      }

      // Kiểm tra số tiền nợ
      const debitAmount = document.querySelector("#debitAmount").value;
      if (
        debitAmount !== "" &&
        debitAmount !== null &&
        debitAmount !== undefined
      ) {
        let regexdebitAmount = /^[0-9]+$/;
        if (!regexdebitAmount.test(debitAmount)) {
          error.IsValid = false;
          console.log("IsValid false tại debit amount");
          this.addErrorElementToInputNotValid(
            "debitAmount",
            "Vui lòng chỉ nhập số"
          );
        } else {
          this.removeErrorElement("debitAmount");
        }
      }

      if (error.Msg.length == 0) {
        error.Required = true;
      }

      return error;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Thêm thông tin lỗi vào trường nhập
   * @param {*} inputId id của trường nhập không hợp lệ
   * @param {*} message thông báo lỗi
   * Author: PHẠM MINH CHIẾN (28/11/2023)
   */
  addErrorElementToInputNotValid(inputId, message) {
    try {
      let input = document.getElementById(inputId);
      if (!input.parentElement.classList.contains("m-textfield-error")) {
        input.parentElement.classList.add("m-textfield-error");
        let elElement = document.createElement("div");
        let ul = document.createElement("ul");
        let li = document.createElement("li");

        li.textContent = message;
        elElement.classList.add("m-error-message");
        ul.appendChild(li);
        elElement.appendChild(ul);
        input.after(elElement);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Hàm xóa element error message khỏi input
   * @param {*} inputId id của phần tử input có error message
   * Author: PHẠM MINH CHIẾN (29/11/2023)
   */
  removeErrorElement(inputId) {
    try {
      const input = document.getElementById(inputId);
      if (input.parentElement.classList.contains("m-textfield-error")) {
        input.parentElement.classList.remove("m-textfield-error");
        input.nextElementSibling.remove();
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Hàm chuyển ngày về định dạng dd/mm/yyyy
   * @param {*} inputDateString Chuỗi cần chuyển
   * @returns ngày theo định dạng dd/mm/yyyy
   * Author: PHẠM MINH CHIẾN (30/11/2023)
   */
  convertDateFormat(inputDateString) {
    let inputDate = new Date(inputDateString);

    // lấy giá trị ngày tháng năm
    let day = inputDate.getDate().toString().padStart(2, "0");
    let month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // tháng bắt đầu từ 0 nên phải + 1
    let year = inputDate.getFullYear();

    // tạo chuỗi mới
    const outputDateString = `${day}/${month}/${year}`;
    return outputDateString;
  }

  /**
   * Kiểm tra xem mã nhân viên đã tồn tại chưa
   * @param {*} input
   * @returns
   * Author: PHẠM MINH CHIẾN (30/11/2023)
   */
  checkCustomerCodeExist(input) {
    console.log(this.currentCustomer);
    if (this.currentCustomer) {
      let exist = this.currentCustomer.some(
        (item) => item.CustomerCode === input
      );
      return exist;
    }
    return false;
  }
}
