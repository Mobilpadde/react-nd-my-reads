import React from 'react';
import PropTypes from 'prop-types';

import ShelfChanger from './ShelfChanger';

const Book = (props) => {
    console.log(props.cover);
    return (
        <div className="book">
            <div className="book-top" style={{
                width: props.size.width,
            }}>
                <div className="book-cover" style={{
                    ...props.size,
                    backgroundImage: `url(${props.cover})`
                }}></div>
                <ShelfChanger />
            </div>

            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
        </div>
    );
};

Book.propTypes = {
    size: PropTypes.object.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default Book;
