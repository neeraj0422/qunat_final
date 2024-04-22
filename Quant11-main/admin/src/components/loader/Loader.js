import React from 'react';
import classes from './Loader.css';

export const Loader = () => {
    return (
        <div className="cmp-loader">
            <div className="loader"></div>
            <span className="d-flex mt-4" style={{ fontWeight: "bold" }}>
                {/* {displayText} */}
            </span>
        </div>
    );
}
