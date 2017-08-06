import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';

import Searcher from './components/scripts/Searcher';

import './App.css';

class BooksApp extends React.Component {
    state = {
        searcher: null,
    };

    componentDidMount() {
        this.setState({
            searcher: new Searcher("search-bar"),
        });
    }

    componentWillUnmount() {
        this.state.searcher.destroy("search-bar");

        this.setState({
            searcher: null,
        });
    }

    empty = function () {
        return {
            currentlyReading: [],
            wantToRead: [],
            read: [],
        }
    };

    render() {
        return (
            <div className="app">
                <Route path="/" render={() => (
                    <Home shelves={this.empty} />
                )} />

                <Route path="/search/(:term)?" render={() => (
                    <Search shelves={this.empty()} />
                )} />
            </div>
        );
    }
}

export default BooksApp;
