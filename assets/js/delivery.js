import bookList from "./sample-data-delivery.js";

// Test: 1. Hiển thị danh sách sách từ data mẫu ra trang chính và lưu sản phẩm đó vào session nếu sp đó được click thêm vào giỏ
const bookContainer = document.getElementById("book-container");

// Kiểm tra xem file html nào có "id:book-container" thì Lặp qua bookList và tạo phần tử HTML cho từng sách
if (bookContainer) {
  bookList.forEach((book) => {
    // B1. Tạo phần tử div để chứa thông tin sách
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    // B2. Thêm thông tin sách vào bookItem
    bookItem.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <p>Id:${book.id}</p>
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.price}</p>
      <button class="add-to-cart">Add-to-cart</button>
    `;

    // B3. Thêm bookItem vào bookContainer
    bookContainer.appendChild(bookItem);

    // B4. Lắng nghe sự kiện click trên nút "Add-to-cart"
    const addToCartButton = bookItem.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
      //Lấy thông tin sách khi được click
      const bookInfo = {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        quantity: 1,
      };

      // B5. Kiểm tra sessionStorage đã có 'cart' chưa
      //Vì các thông tin lưu trữ được phải ở dạng JSON, còn thông tin để xử lý thì ở dạng object nên phải chuyển từ JSON->Object
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // B6. Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProductIndex = cart.findIndex(
        (item) => item.id === bookInfo.id
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        cart[existingProductIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm vào giỏ
        cart.push(bookInfo);
      }

      // B7. Lưu giỏ hàng vào sessionStorage
      sessionStorage.setItem("cart", JSON.stringify(cart));

      // B8. Thông báo thêm sản phẩm thành công
      alert(`Sách ${book.title} đã được thêm vào giỏ`);
    });
  });
}
// End Test 1.

// Test 2: Hiển thị tất cả các sản phẩm trong sessionStorage ra giỏ hàng
const bookCart = document.getElementById("item-container");
if (bookCart) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    bookCart.innerHTML = "Giỏ hàng trống";
  }

  function createCartItemHTML(book) {
    let quantityOptions = "";
    for (let i = 1; i <= 10; i++) {
      quantityOptions += `<option value="${i}" ${
        (book.quantity || 1) == i ? "selected" : ""
      }>${i}</option>`;
    }
    return `
    <div class="cart__item" data-id="${book.id}">
      <input type="checkbox">
      <img src="${book.image}" alt="${book.title}">
      <div class="cart__item--content">
        <p>Id: ${book.id}</p>
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.price}</p>
        <a href="javascript:void(0);" class="remove-item">Remove</a>
      </div>
      <div class="cart__item--quantity-total-price">
        <select id="quantity" name="quantity" data-id="${book.id}">
          ${quantityOptions}
        </select>
        <p class="total-price-display">${(
          book.price * (book.quantity || 1)
        ).toFixed(2)}</p>
      </div>
    </div>
  `;
  }

  function removeItem(bookId) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart = cart.filter((book) => book.id !== bookId);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    updateTotalItemsCount();
  }

  function updateTotalPrice(selectElement) {
    const quantity = parseInt(selectElement.value);
    const bookId = selectElement.dataset.id;
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const book = cart.find((book) => book.id == bookId);

    if (book) {
      book.quantity = quantity;
      sessionStorage.setItem("cart", JSON.stringify(cart));
      const totalPrice = book.price * quantity;
      selectElement
        .closest(".cart__item--quantity-total-price")
        .querySelector(".total-price-display").textContent =
        totalPrice.toFixed(2);
      updateTotalItemsCount();
    }
  }

  function updateCartDisplay() {
    const bookCart = document.getElementById("item-container");
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      bookCart.innerHTML = "Giỏ hàng trống";
    } else {
      bookCart.innerHTML = "";

      cart.forEach((book) => {
        const bookItem = createCartItemHTML(book);
        const bookItemElement = document.createElement("div");
        bookItemElement.innerHTML = bookItem;
        bookCart.appendChild(bookItemElement);

        const removeButton = bookItemElement.querySelector(".remove-item");
        removeButton.addEventListener("click", () => {
          removeItem(book.id);
        });

        const quantitySelect = bookItemElement.querySelector("select");
        quantitySelect.addEventListener("change", (event) => {
          updateTotalPrice(event.target);
        });
      });
    }
  }

  function updateTotalItemsCount() {
    const totalItems = document.getElementById("items-order");
    if (totalItems) {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const totalCount = cart.reduce((sum, item) => {
        return sum + (item.quantity || 1);
      }, 0);
      totalItems.textContent = `${totalCount} items`;
    }
  }

  // Tự động hiển thị khi tải trang
  document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
    updateTotalItemsCount();
  });
}

//Test 3: Đếm tổng tất cả số lượng sản phẩm có trong giỏ hàng
