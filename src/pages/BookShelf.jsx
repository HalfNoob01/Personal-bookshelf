import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
function BookShelf() {
  const [shelf, setShelf] = useState([]);
  const navigate = useNavigate()
  const notify = () => toast.success('Removed Succesfully ');

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf") || "[]");
    setShelf(savedBooks);
  }, []);

  const removeFromShelf = (bookKey) => {
    const updatedShelf = shelf.filter((book) => book.key !== bookKey);
    setShelf(updatedShelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedShelf));
    notify()
  };

 const goHome = () =>{
   navigate('/')
  }
  return (
    <div>
      <Toaster/>
      <button class="btn-donate" onClick={goHome}>BACK</button>
      <div className="search">
        <span>My Bookshelf</span>
      </div>
      <div className="display">
        {shelf.length === 0 ? (
          <p>No books in your shelf.</p>
        ) : (
          shelf.map((book) => (
            <div key={book.key} className="book-card">
              <h3 >Book Title : <span style={{fontWeight:400}}>{book.title}</span></h3>
              <h3>Edition Count : <span style={{fontWeight:400}}>{book.edition_count}</span></h3>
              <button
                onClick={() => removeFromShelf(book.key)}
                className="b-card"
              >
                Remove 
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookShelf;
