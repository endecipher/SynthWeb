import React from 'react'
import PropTypes from 'prop-types'

const Keys = ({
    details
}) => {

    const {
        key
    } = details;

    return (
        <div>
            Key Highlighted: {key};
        </div>
    )
}

Keys.propTypes = {
    details : PropTypes.object.isRequired,
}

export default Keys
