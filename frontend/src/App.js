// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    axios.get('/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addBook = () => {
    axios.post('/api/books', { title, author, year })
      .then(res => {
        setBooks([...books, res.data]);
        setTitle('');
        setAuthor('');
        setYear('');
      })
      .catch(err => console.error(err));
  };

  const deleteBook = (id) => {
    axios.delete(`/api/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <center>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} ({book.year})
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
      <button onClick={addBook}>Add Book</button>
      </center>
    </div>
  );
}

export default App;
