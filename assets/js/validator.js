// Constructor
function Validator(options) {
  //Chọn đúng form cần validator
  let formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.forEach(function (rule) {
      // Truyền qua formElement
      let inputElement = formElement.querySelector(rule.selector);
      //Chọn class form-message đúng trường: ra thẻ cha sau đó query
      let errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
        // Khi người dùng blur, mất focus input thì test
        inputElement.onblur = function () {
          let errorMessage = rule.test(inputElement.value);
          if (errorMessage) {
            // Nếu có lỗi
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
          } else {
            // Nếu không có lỗi
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
          }
        };
        //Khi người dùng nhập input, thì không error
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// Định nghĩa rules
// 1. Khi có lỗi thì return message lỗi
// 2. khi không lỗi thì return undefined
Validator.isFname = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Please enter your first name.";
      //   Dùng trim tránh người dùng nhập dấu cách vẫn hợp lệ
    },
  };
};
Validator.isLname = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Please enter your last name.";
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
