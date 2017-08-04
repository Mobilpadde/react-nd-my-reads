import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const WIDTH = 128;
const HEIGHT = 193;

const Shelf = (props) => {
    let mult = props.multiplier || 1;
    console.log(props.books);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book, index) => {
                        return (
                            <li key={book.title + book.authors[0] + index}>
                                <Book
                                    percentage={(book.pageCount / props.maxCount) * 100}
                                    count={book.pageCount}
                                    size={{
                                        width: WIDTH * mult,
                                        height: HEIGHT * mult
                                    }}
                                    title={book.title}
                                    subtitle={book.subtitle}
                                    author={book.authors[0]}
                                    cover={book.imageLinks.thumbnail}
                                    shelves={props.shelves}
                                    changeShelf={to => props.changeShelf(book, index, to)}
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

    maxCount: PropTypes.number,
    multiplier: PropTypes.number,

    shelves: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
};

export default Shelf;
