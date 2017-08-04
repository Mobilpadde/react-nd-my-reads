import React, { Component } from 'react';
import { Link } from "react-router-dom";

import * as BooksAPI from './../BooksAPI';

import Shelf from './Shelf';

import SideScroller from './scripts/SideScroller';

const EMPTY_SHELVES = function () {
    return {
        currentlyReading: [],
        wantToRead: [],
        read: [],
    }
};

class Home extends Component{
    state = {
        shelves: EMPTY_SHELVES(),
        maxPageCount: 0,
        sideScroller: null,
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                console.log(books);
                this.setState({
                    shelves: EMPTY_SHELVES()
                });

                let shelves = EMPTY_SHELVES();
                let length = 0;
                books.forEach(book => {
                    shelves[book.shelf].push(book);

                    if(length < book.pageCount)
                        length = book.pageCount;
                });

                return { shelves, length };
            })
            .then(({ shelves, length }) => this.setState({
                shelves,
                maxPageCount: length,
                sideScroller: new SideScroller("list-book-content"),
            }))
            .catch(console.error);
    }

    componentWillUnmount() {
        this.setState({
            shelves: EMPTY_SHELVES(),
            sideScroller: null,
        });
    }

    changeShelf(book, idx, shelf) {
        this.setState(state => {
            state.shelves[book.shelf].splice(idx, 1);

            book.shelf = shelf;
            state.shelves[shelf].push(book);

            return state;
        });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div id="list-book-content" className="list-books-content">
                    {
                        Object.keys(this.state.shelves).map((shelf, index) => {
                            console.log(this.state.shelves[shelf], shelf);
                            return (
                            <Shelf
                                key={shelf}
                                maxCount={this.state.maxPageCount}
                                title={shelf}
                                shelves={Object.keys(this.state.shelves).filter(name => name !== shelf)}
                                books={this.state.shelves[shelf]}
                                changeShelf={this.changeShelf.bind(this)}
                            />)
                            }
                        )
                    }
                </div>

                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default Home;
