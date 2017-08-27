import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShelfChanger from './ShelfChanger';
import PercentageViewer from './PercentageViewer';

class Book extends Component{
    state = {
        added: this.props.added || false
    };

    falsify() {
        this.setState(old => {
            old.added = true;
        });
    }

    render() {
        return (
            <div className="book">
                <PercentageViewer
                    percentage={this.props.percentage}
                    count={this.props.count}
                />

                <div className="book-top" style={{
                    width: this.props.size.width,
                }}>
                    <div className="book-cover" style={{
                        ...this.props.size,
                        backgroundImage: `url(${this.props.cover})`
                    }}></div>

                    {this.state.added === false && <ShelfChanger
                        shelves={this.props.shelves}
                        changeShelf={this.props.changeShelf}
                        falsify={this.falsify.bind(this)}
                    />}
                </div>

                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.author}</div>
            </div>
        );
    }
};

Book.propTypes = {
    size: PropTypes.object.isRequired,
    added: PropTypes.bool.isRequired,

    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,

    shelves: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,

    percentage: PropTypes.number,
    count: PropTypes.number,
};

export default Book;
