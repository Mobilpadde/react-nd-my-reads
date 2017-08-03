import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const WIDTH = 128;
const HEIGHT = 193;

const Shelf = (props) => {
    let mult = props.multiplier || 1;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book, index) => {
                        return (
                            <li key={book.title + book.authors[0] + index}>
                                <Book
                                    size={{
                                        width: WIDTH * mult,
                                        height: HEIGHT * mult
                                    }}
                                    title={book.title}
                                    subtitle={book.subtitle}
                                    author={book.authors[0]}
                                    cover={book.imageLinks.thumbnail}
                                />
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
};

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    multiplier: PropTypes.number,
};

export default Shelf;
