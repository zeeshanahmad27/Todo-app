document.querySelector(".link1").addEventListener("click" ,toSee1);
function toSee1 (){
    document.querySelector(".x-section").classList.toggle("pink-section");
    document.querySelector(".y-section").classList.toggle("pink-section");
}


document.querySelector(".link").addEventListener("click" ,toSee);
function toSee (){
    document.querySelector(".x-section").classList.toggle("pink-section");
    document.querySelector(".y-section").classList.toggle("pink-section");
}


// Book Class: Represents a Book
class Book {
    constructor(title, time, description) {
      this.title = title;
      this.time = time;
      this.description = description;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `

      
        <td>${book.title}</td>
        <td>${book.time}</td>
        <td>${book.description}</td>
        <td><a href="#" class="btn btn-outline-dark btn-md delete">DELETE</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#time').value = '';
      document.querySelector('#description').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(description) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.description === description) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const time = document.querySelector('#time').value;
    const description = document.querySelector('#description').value;
  
    // Validate
    if(title === '' || time === '' || description === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book = new Book(title, time, description);
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Show success message
      UI.showAlert('Todo Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Todo Removed', 'success');
  });