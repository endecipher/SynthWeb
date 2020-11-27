import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//Dumb Component
const Oscillator = ({
    key,
    frequency,
    toggle,
    type,
    detune
}) => {

    //Dump Component = Show purposes from props
    return (
        <Fragment>
            <hr/>
            Showing {key}: <br/> 
            Frequency: {frequency} <br/>
            State: {toggle} <br/>
            Type: {type} <br/>
            Detune: {detune}
            <hr/>
        </Fragment>
    )
}

Oscillator.propTypes = {
    key: PropTypes.string.isRequired,
    frequency: PropTypes.number.isRequired,
    toggle: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    detune: PropTypes.number.isRequired,
}

export default Oscillator;
