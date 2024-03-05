import React from "react";
import './ResultBooks.css';

const ResultBooks = ({ books, onClear }) => {

    return (
        <>
            <div className="result_books">
                {books.map(book => (
                    <div className="column" key={book.id}>
                        <h2 className="title">{book.volumeInfo.title}</h2>
                        <p>{book.volumeInfo.authors}</p>
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" className="image_block" />
                        <p>{book.volumeInfo.description && book.volumeInfo.description.substring(0, 50)}...</p>
                    </div>
                ))}
            </div>
            <div className="button_block">
                    {books.length > 0 && <button onClick={onClear}>Clear</button>}
            </div>
           
        </>
    )
}

export default ResultBooks;