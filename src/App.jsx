import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [apiKey] = useState('AIzaSyAN7Qh1Q3PCmH1lDZfhJc0YNK9b45JmNGY');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=40`)
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }

  return (
    <>
      <div className={`container ${isDarkTheme ? 'dark' : 'light'}`}>
        <div className="title">BookFindr</div>
        <form onSubmit={handleSubmit} className="search-form">
          <input type="text" onChange={handleChange} className="searchForm" placeholder="Search for Books" autoComplete="off" />
          <button type="submit" className="btn-search">
            Search
          </button>
        </form>

        <div className="theme-switcher" onClick={toggleTheme}>
          <span className={`checkbox ${isDarkTheme ? 'checked' : ''}`} />
          <label>Dark Theme</label>
        </div>

        {result.length > 0 && (
          <div className="thumbnails">
            {result.map((book, index) => (
              book.volumeInfo.imageLinks?.thumbnail && (
                <a target="_blank" href={book.volumeInfo.previewLink} key={index}>
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
