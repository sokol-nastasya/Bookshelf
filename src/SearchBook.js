import React, { useCallback, useState } from "react";
import './SearchBook.css';

const SearchBook = ({ onSearch }) => {

    const [searchBooks, setSearchBooks] = useState('');

    const handleBook = useCallback((e) => {
        setSearchBooks(e.target.value)
    }, []);

    const handleSearch = useCallback(() => {
        onSearch(searchBooks);
    }, [onSearch, searchBooks]);

    const handleClear = () => {
        setSearchBooks("");
    };

    return (
        <>
        <div className="search_form">
            <h2>Search Books</h2>
            <input id="search" type="text" className="input_search" placeholder="Enter Book" value={searchBooks} onChange={handleBook} />
            <button type="submit" className="btn_submit" onClick={handleSearch}>Search</button>
            <button className="btn_clear" onClick={handleClear}>Clear</button>
        </div>
        </>
    )
}

export default SearchBook;