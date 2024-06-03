import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function BookSearch() {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const notify = () => toast.error('Already Added ');
  const notify2 = () => toast.success('Added Successfully');
  
  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (query.length > 1) {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
      );
      const data = await response.json();
      setBooks(data.docs);
    }
  };

  const addToBookShelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    
    const isBookAlreadyAdded = bookshelf.some(
      (savedBook) => savedBook.key === book.key
    );

    if (!isBookAlreadyAdded) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
      notify2 ()
    } else {
      notify()
    }
  };

  const goToBookShelf = () => {
    navigate("/bookshelf");
  };

  return (
    <div className="booksearch">
      <div className="search">
        <Toaster/>
        <span>Search by book name:</span>
        <input
          type="search"
          className="b-search"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className="results">
        {books.map((book) => (
          <div key={book.key} className="book-card">
            <h3 >Book Title : <span style={{fontWeight:400}}>{book.title}</span></h3>
            <h3>Edition Count : <span style={{fontWeight:400}}>{book.edition_count}</span></h3>
            <button onClick={() => addToBookShelf(book)} >
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
      <div className="shelf">
      <button class="btn-donate"  onClick={goToBookShelf}>MY BOOKSHELF</button>
         
      </div>
    </div>
  );
}

export default BookSearch;
