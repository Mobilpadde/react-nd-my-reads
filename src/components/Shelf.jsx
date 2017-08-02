import React from 'react';

import Book from './Book';

const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map(book => {
                        return (
                            <li key={book.title + "-" + book.author}>
                                <Book title={book.title} author={book.author} cover={book.cover} />
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
};

export default Shelf;