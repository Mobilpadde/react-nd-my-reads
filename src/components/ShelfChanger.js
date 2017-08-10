import React from 'react';
import PropTypes from 'prop-types';

import './styles/ShelfChanger.css';

const ShelfChanger = (props) => {
    return (
        <div className="book-shelf-changer">
            <select onChange={e => props.changeShelf(e.target.value)} defaultValue="none">
                <option value="none" disabled>Move to...</option>
                {props.shelves.map(shelf => (
                    <option key={shelf} value={shelf}>{shelf}</option>
                ))}
            </select>
        </div>
    );
};

ShelfChanger.propTypes = {
    shelves: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
};

export default ShelfChanger;
