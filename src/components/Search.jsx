import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import * as BooksAPI from './../BooksAPI';

import Book from './Book';

const WIDTH = 128;
const HEIGHT = 193;

class Search extends Component{
    state = {
        books: []
    };

    componentDidMount() {
        const elm = document.getElementById("search-bar");
        elm.focus();

        document.getElementsByClassName("blackness")[0].addEventListener("click", _ => window.location.hash = "/")
    }

    search(query, max) {
        query = query.trim();

        if(query.length > 0) {
            BooksAPI.search(query, max || 20)
                .then(books => this.setState({
                    books
                }))
                .catch(console.error);
        }
    }

    render() {
        return (
            <div className="search-books blackness">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input id="search-bar" onChange={e => this.search(e.target.value || '')} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{this.state.books.length > 0 && this.state.books.map(book => {
                        let authors = (book.authors || [null]).join(", ");

                        return (
                            <li key={`${book.title} -- ${authors}`}>
                                <Book
                                    size={{
                                        width: WIDTH,
                                        height: HEIGHT
                                    }}
                                    title={book.title}
                                    author={authors}
                                    cover={book.imageLinks.thumbnail}
                                    shelves={Object.keys(this.props.shelves)}
                                    changeShelf={to => this.props.changeShelf(book, null, to)}
                                />
                            </li>
                        )})}
                    </ol>
                </div>
            </div>
        );
    }
}

Book.propTypes = {
    shelves: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,

    count: PropTypes.number,
};

export default Search;
