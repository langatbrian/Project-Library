const myLibrary = [] // Library array

// Book constructor with a unique ID
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add books to the array
// Function that creates a book and stores it in myLibrary

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

const libraryDiv = document.getElementById("library");

function displayBooks() {
  libraryDiv.innerHTML = ""; // clear old display

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? "Read" : "Not read"}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    libraryDiv.appendChild(card);
  });
}

displayBooks();

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

libraryDiv.addEventListener("click", (e) => {
  const card = e.target.closest(".book-card");
  if (!card) return;

  const bookId = card.dataset.id;
  const book = myLibrary.find(b => b.id === bookId);

  if (e.target.classList.contains("remove-book")) {
    const index = myLibrary.findIndex(b => b.id === bookId);
    myLibrary.splice(index, 1);
    displayBooks();
  }

  if (e.target.classList.contains("toggle-read")) {
    book.toggleRead();
    displayBooks();
  }
});


const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const closeDialog = document.getElementById("closeDialog");

newBookBtn.addEventListener("click", () => dialog.showModal());
closeDialog.addEventListener("click", () => dialog.close());

const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 🚨 important

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  bookForm.reset();
  dialog.close();
});
