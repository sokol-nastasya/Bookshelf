import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Books from './Books';
import SearchBook from './SearchBook';
import ResultBooks from './ResultBooks';
import BookDetails from './BookDetails';

function App() {

  const [searchResult, setSearchResult] = useState([]);

  const handleClear = (name) => {
    setSearchResult([]);
    setSearchResult(prevResult => prevResult.filter(book => book.title !== name));
  }

  const search = async (query) => {

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`);
        if (!response.ok) {
          throw new Error("Google Book API failed with status", response.status);
        }

        const data = await response.json();
        setSearchResult(data.items || []);

    } catch (error) {
        console.log("Error fetching: ", error);
        setSearchResult([]);
    }

  };

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Protest+Revolution&display=swap');
      </style>
      <Router>
        <div className="App">
          <h1>Bookshelf</h1>
          <SearchBook onSearch={search} />
          <ResultBooks books={searchResult} onClear={handleClear}/>

          <Routes>
            <Route exact path='/' element={<Books />}></Route>
            <Route path='book/:id' element={<BookDetails />}></Route>
          </Routes>
        
        {/* <Books /> */}
        </div>
      </Router>
    </>
  );
}

export default App;
