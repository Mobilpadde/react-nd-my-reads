import React from 'react';
import PropTypes from 'prop-types';

import './styles/PercentageViewer.css';

const PercentageViewer = (props) => {
    return (
        <div className="percentage">
            <div
                style={{
                    width: (props.percentage || 0) + '%'
                }}
                data-count={(props.count || 0) + ' pages'}
            ></div>
        </div>
    );
};

PercentageViewer.propTypes = {
    percentage: PropTypes.number,
    count: PropTypes.number,
};

export default PercentageViewer;
