// Constructor
function Validator(options) {
  // Object lưu các rule theo selector
  let selectorRules = {};
  //Chọn đúng form cần validator
  let formElement = document.querySelector(options.form);

  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();
      let isFormValid = true; // Khởi tạo biến kiểm tra trạng thái hợp lệ của form
      // Lặp qua từng rule và validate
      options.rules.forEach(function (rule) {
        let inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule); // Kiểm tra từng trường

        if (!isValid) {
          isFormValid = false; // Nếu có lỗi, đặt isFormValid thành false
        }
      });
      // Nếu form hợp lệ, thực hiện hành động submit
      if (isFormValid) {
        formElement.submit();
      }
    };

    options.rules.forEach(function (rule) {
      // Lưu các rule vào selectorRules
      if (!selectorRules[rule.selector]) {
        selectorRules[rule.selector] = [];
      }
      selectorRules[rule.selector].push(rule.test);

      // Truyền qua formElement
      let inputElement = formElement.querySelector(rule.selector);
      let errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
        // Khi người dùng blur, mất focus input thì test
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        //Khi người dùng nhập input, thì không error
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
  // Hàm validate
  function validate(inputElement, rule) {
    let errorMessage;
    let rules = selectorRules[rule.selector];

    // Lặp qua từng rule và kiểm tra
    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break; // Nếu có lỗi thì dừng kiểm tra
    }

    let errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      // Nếu có lỗi
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
      return false;
    } else {
      // Nếu không có lỗi
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
      return true;
    }
  }
}

// Định nghĩa rules
// 1. Khi có lỗi thì return message lỗi
// 2. khi không lỗi thì return undefined
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Please enter this field."; // Để custom message
      //   Dùng trim tránh người dùng nhập dấu cách vẫn hợp lệ
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(value.trim())
        ? undefined
        : "Please enter a valid email address.";
    },
  };
};
Validator.minLength = function (selector, min) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : "Please enter minimum " + min + " character.";
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message ||
            "The entered data does not match the value provided for confirmation."; // Để custom message
    },
  };
};
Validator.isRequiredCheckbox = function (selector, message) {
  return {
    selector: selector,
    test: function () {
      const checkbox = document.querySelector(selector);
      return checkbox.checked
        ? undefined
        : message || "This field is required.";
    },
  };
};
