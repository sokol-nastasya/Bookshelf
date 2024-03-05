import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './BookDetails.css';

const BookDetails = () => {

    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch book details");
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.log("Error fatching book details:", error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if(!book) {
        return <div>Loading...</div>;
    };
    
    return (
        <>
            <div>
                <h1>Book Detail</h1>
                <div className="details">
                    <h2>{book.volumeInfo.title}</h2>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" className="image_block"></img>
                    <div className="container">
                        <div className="column">
                            <p><span>Authors:</span> {book.volumeInfo.authors.join(', ')}</p>
                            <p><span>Publisher:</span> {book.volumeInfo.publisher}</p>
                            <p><span>Published Date:</span> {book.volumeInfo.publishedDate}</p>
                            <p><span>Pages:</span> {book.volumeInfo.pageCount}</p>
                            <p><span>Rating:</span> {book.volumeInfo.averageRating}</p>
                            <p><span>Language:</span> {book.volumeInfo.language}</p>
                        </div>
                        <div className="column description">
                            <p>Description: {book.volumeInfo.description}</p>
                        </div>
                    </div>                
                    <p className="categories"><span>Categories:</span> {book.volumeInfo.categories.join(', ').substring(0, 100)}</p>
                </div>
                <Link className='button_link' to={'/'}>Back</Link>
            </div>
        </>
    )
}

export default BookDetails;