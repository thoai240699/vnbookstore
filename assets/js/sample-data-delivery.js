const books = [
  "Internet và Công nghệ Web",
  "Công nghệ Java",
  "Phát triển hệ thống Web",
  "Tối ưu hóa công cụ tìm kiếm",
];
const authors = ["Thầy Khoa", "Thầy Sơn", "Thầy Khoa", "Thầy Tân"];
const prices = [9.9, 9.9, 9.9, 9.9];
const image = "../assets/img/books/book1-web-150-200.jpg";

const bookList = [];
for (let i = 0; i < 12; i++) {
  bookList.push({
    id: i + 1,
    title: books[i % books.length],
    author: authors[i % authors.length],
    price: prices[i % prices.length],
    image: image,
  });
}

export default bookList;
