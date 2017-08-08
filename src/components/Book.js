import React from 'react';
import PropTypes from 'prop-types';

import ShelfChanger from './ShelfChanger';
import PercentageViewer from './PercentageViewer';

const Book = (props) => {
    return (
        <div className="book">
            <PercentageViewer
                percentage={props.percentage}
                count={props.count}
            />

            <div className="book-top" style={{
                width: props.size.width,
            }}>
                <div className="book-cover" style={{
                    ...props.size,
                    backgroundImage: `url(${props.cover})`
                }}></div>

                <ShelfChanger
                    shelves={props.shelves}
                    changeShelf={props.changeShelf}
                />
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
    author: PropTypes.string.isRequired,

    shelves: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,

    percentage: PropTypes.number,
    count: PropTypes.number,
};

export default Book;
