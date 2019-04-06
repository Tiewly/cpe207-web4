// 1. Book Class: Represents a Book
class Book {
    constructor(Subject, Message, Name, Phone, Email) {
      this.Subject = Subject;
      this.Message = Message;
      this.Name = Name;
      this.Phone = Phone;
      this.Email = Email;
    }
  }
  
  // 2. UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
  
       
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
  // 4. add book
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.Subject}</td>
        <td>${book.Message}</td>
        <td>${book.Name}</td>
        <td>${book.Phone}</td>
        <td>${book.Email}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
      `;
  
      list.appendChild(row);
    }
  
  // 11. delete book  
    static deleteBook(el) {
      // if element contains .delete class
      if(el.classList.contains('delete')) {
      // remove <a> -> <td> -> <tr>       
        el.parentElement.parentElement.remove();
      }
    }
  
  // 13. show alert  
  // <div class="alert alert-success/alert-danger>Message</div>
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
  
  // 9. clear fields  
    static clearFields() {
      document.querySelector('#Subject').value = '';
      document.querySelector('#Message').value = '';
      document.querySelector('#Name').value = '';
      document.querySelector('#Phone').value = '';
      document.querySelector('#Email').value = '';
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
  
    static removeBook(Email) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.Email === Email) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // 4. Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // 5. Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // 7. Prevent actual submit action
    e.preventDefault();
  
    // Get form values
    const Subject = document.querySelector('#Subject').value;
    const Message = document.querySelector('#Message').value;
    const Name = document.querySelector('#Name').value;
    const Phone = document.querySelector('#Phone').value;
    const Email = document.querySelector('#Email').value;
  
    // 12. Validate
    if(Subject === '' || Message === '' || Name === '' || Phone === '' || Email === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // 6. Instatiate book
      const book = new Book(Subject, Message, Name, Phone, Email);
      // console.log(book);
  
      // 8. Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // 13. Show success message
      UI.showAlert('Book Added', 'success');
  
      // 9. Clear fields
      UI.clearFields();
    }
  });
  
  // 10. Event: Remove a Book - event propagation by selecting the parent
  document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e.target);
    
    // 11. Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // 13. Show success message
    UI.showAlert('Book Removed', 'success');
  });