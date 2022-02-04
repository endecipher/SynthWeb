import React from 'react';
import PropTypes from 'prop-types';

const Property = ({
    name,
    description,
    styling,
    children
}) => {

    return (
        <div className="property">
            <div className="ptyheader">
                <div className="customTooltip"><span className="ptyText">{name}</span>
                    <span className="customTooltiptext">{description}</span>
                </div>
            </div>  
            <div className="ptyhandler">
                {children}
            </div>
        </div>
    )
}

Property.propTypes = {
    name: PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    styling : PropTypes.string.isRequired,
    children : PropTypes.object.isRequired,
}

export default Property;
