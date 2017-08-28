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
                let shelves = BooksApp.empty();
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
        const shelves = Object.assign({}, this.state.shelves);

        if(idx !== null && idx > -1) {
            shelves[book.shelf].splice(idx, 1);
        }

        book.shelf = shelf;
        shelves[shelf].push(book);

        this.setState({
            shelves,
        });

        return BooksAPI.update(book, shelf)
            .catch(console.error);
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
