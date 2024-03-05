import React, { useEffect, useState } from "react";
import './Books.css';
import { Link } from "react-router-dom";

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(()=> {
       
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=reactjs&maxResults=5');
                const data = await response.json();
                setBooks(data.items);
            } catch (error) {
                console.log("Error fetching: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="top_books">
                <h1>Top 5 React books:</h1>
                <div className="books_table">
                    {books.map(book => (
                        <div className="column" key={book.id}>
                            <h2 className="title_block">{book.volumeInfo.title}</h2>
                            <p>{book.volumeInfo.authors}</p>
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" className="image_block"></img>
                            <p>{book.volumeInfo.description && book.volumeInfo.description.substring(0, 50)}...</p>
                            <Link className="button_link" to={`/book/${book.id}`}>More Information</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Books;