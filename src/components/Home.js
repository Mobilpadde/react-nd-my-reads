import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Shelf from './Shelf';

import SideScroller from './scripts/SideScroller';

class Home extends Component{
    state = {
        sideScroller: null,
    };

    componentDidMount() {
        this.setState({
            sideScroller: new SideScroller("list-book-content"),
        });
    }

    componentWillUnmount() {
        this.setState({
            sideScroller: null,
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
                        Object.keys(this.props.shelves).map(shelf => {
                            return (
                            <Shelf
                                key={shelf}
                                maxCount={this.props.maxPageCount}
                                title={shelf}
                                shelves={Object.keys(this.props.shelves).filter(name => name !== shelf)}
                                books={this.props.shelves[shelf]}
                                changeShelf={this.props.changeShelf}
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

Home.propTypes = {
    shelves: PropTypes.object.isRequired,
};


export default Home;
