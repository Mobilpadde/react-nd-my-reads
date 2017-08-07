import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';

import Searcher from './components/scripts/Searcher';
import * as BooksAPI from './BooksAPI';

import './App.css';

class BooksApp extends React.Component {
    state = {
        searcher: null,
        maxPageCount: 0,
        shelves: BooksApp.empty(),
    };

    static empty() {
        return {
            currentlyReading: [],
            wantToRead: [],
            read: [],
        }
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                let length = 0;
                books.forEach(book => {
                    this.state.shelves[book.shelf].push(book);

                    if(length < book.pageCount)
                        length = book.pageCount;
                });

                return { shelves: this.state.shelves, length };
            })
            .then(({ shelves, length }) => this.setState({
                shelves,
                maxPageCount: length,
                searcher: new Searcher(),
            }))
            .catch(console.error);
    }

    componentWillUnmount() {
        this.state.searcher.destroy();

        this.setState({
            searcher: null,
        });
    }

    changeShelf(book, idx, shelf) {
        this.setState(state => {
            if(idx !== null && idx > -1) {
                state.shelves[book.shelf].splice(idx, 1);

                book.shelf = shelf;
                state.shelves[shelf].push(book);

                return state;
            } else {
                return BooksAPI.update(book, shelf)
                    .then(_ => {
                        book.shelf = shelf;
                        state.shelves[shelf].push(book);

                        return state;
                    })
                    .catch(console.error);
            }
        });
    }

    render() {
        return (
            <div className="app">
                <Route path="/" render={() => (
                    <Home
                        shelves={this.state.shelves}
                        changeShelf={this.changeShelf.bind(this)}
                        maxPageCount={this.state.maxPageCount}
                    />
                )} />

                <Route path="/search/(:term)?" render={() => (
                    <Search
                        shelves={this.state.shelves}
                        changeShelf={this.changeShelf.bind(this)}
                    />
                )} />
            </div>
        );
    }
}

export default BooksApp;
