import React, { Component } from 'react';
import { Link } from "react-router-dom";

import * as BooksAPI from './../BooksAPI';

import Shelf from './Shelf';

const EMPTY_SHELVES = function () {
    return {
        currentlyReading: [],
        wantToRead: [],
        read: [],
    }
};

class Home extends Component{
    state = {
        shelves: EMPTY_SHELVES()
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.setState({
                    shelves: EMPTY_SHELVES()
                });

                let shelves = EMPTY_SHELVES();
                books.forEach(book => {
                    shelves[book.shelf].push(book);
                });

                return shelves;
            })
            .then(shelves => this.setState({
                shelves
            }))
            .catch(console.error);
    }

    componentWillUnmount() {
        this.setState({
            shelves: EMPTY_SHELVES()
        });

        console.log(this.state.shelves);
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    {
                        Object.keys(this.state.shelves).map((shelf, index) =>
                            <Shelf key={shelf} title={shelf} books={this.state.shelves[shelf]} />
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
