import React from 'react'
import PropTypes from 'prop-types'

const Keys = ({
    inputs
}) => {

    const {
        key
    } = inputs;

    return (
        <div>
            Key Highlighted: {key};
        </div>
    )
}

Keys.propTypes = {
    inputs : PropTypes.object.isRequired,
}

export default Keys
