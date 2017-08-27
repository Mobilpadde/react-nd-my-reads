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

    componentWillMount() {
        const { hash } = window.location;
        const hashes = hash.split('/');

        if(hashes.length > 2) {
            this.setState({
                query: hashes[2],
            });

            this.search(hashes[2]);
        }
    }

    componentDidMount() {
        const elm = document.getElementById("search-bar");
        elm.focus();

        document.getElementsByClassName("blackness")[0].addEventListener("click", _ => window.location.hash = "/")
    }

    search(query) {
       if(query.length > 0) {
            BooksAPI.search(query, 20)
                .then(books => {
                    return books.map(book => {
                        Object.values(this.props.shelves).map(shelf => shelf.map(homeBook => {
                            if (book.id === homeBook.id) {
                                book['added'] = true;
                            }
                        }));

                        return book;
                    });
                })
                .then(books => this.setState({
                    books,
                    query
                }))
                .catch(console.error);
        }
    }

    keyUp(e) {
        const code = e.keyCode;

        if(code === 13) {
            const query = e.target.value.trim();

            this.search(query);
            window.location.hash = `/search/${query}`;
        }
    }

    render() {
        return (
            <div>
                <div className="blackness"></div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">Close</Link>
                        <div className="search-books-input-wrapper">
                            <input
                                id="search-bar"
                                onKeyUp={this.keyUp.bind(this)}
                                type="text"
                                placeholder="Search by title or author"
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">{ this.state.books.map(book => {
                                const authors = (book.authors || ['unknown']).join(", ");

                                return (
                                    <li key={`${book.title} -- ${authors}`}>
                                        <Book
                                            size={{
                                                width: WIDTH,
                                                height: HEIGHT
                                            }}
                                            added={book.added}
                                            title={book.title}
                                            author={authors}
                                            cover={book.imageLinks.thumbnail}
                                            shelves={Object.keys(this.props.shelves)}
                                            changeShelf={to => this.props.changeShelf(book, null, to)}
                                        />
                                    </li>
                                )})
                        }</ol>
                    </div>
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
