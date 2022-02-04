import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

const AudioNodeDetails = ({
    name,
    type,
    description,
    styling
}) => {
    return (
        <div className="audioNodeDetails">
            <div className="audioNodeName">
                {name}
            </div>
            <div className="audioNodeType customTooltip">
                    <Badge size="lg">{type}</Badge>
                    <span className="customTooltiptext">
                        {description}
                    </span>
            </div>
        </div>
    )
}

AudioNodeDetails.propTypes = {
    name : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    styling : PropTypes.string.isRequired,
}

export default AudioNodeDetails;
