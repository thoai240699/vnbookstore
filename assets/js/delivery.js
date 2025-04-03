import bookList from "./sample-data-delivery.js";

//Lấy phần tử có Id "book-container" trong file html
const bookContainer = document.getElementById("book-container");

bookList.forEach((book) => {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");

  bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <p>Id: ${book.id}</p>
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Price: ${book.price}</p>
            <button class="add-to-cart-btn">Add to cart</button>
        `;
  bookContainer.appendChild(bookElement);
});

//Lấy phần tử có Id "item" trong file html
const itemList = document.getElementById("item--list");
itemList;
