import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Gain = ({
    stateDetails,
    fireOnUnMount
}) => {

    const {
        name,
        type,
        description,
        properties
    } = stateDetails;

    const [stateProperties, changeProperties] = useState(properties);
    
    useEffect(() => {
        return () => {
            fireOnUnMount();
        }
    }, [fireOnUnMount])

    const changeValues = (e) => {
        changeProperties({
            ...stateProperties,
            [e.target.name] : e.target.value
        });
    }

    return (
        <Fragment>
            <hr/>
            Showing {name} | What is it? : {description}
            Check Gain for more info: TODO: Provide Link <br/>
            Frequency: {stateProperties.gain} <br/>
            :Ideally Create Dumb Components and pass them the event handlers as props. 
            <input  
			    type="range" 
			    name="gain"
			    value={stateProperties.gain}
			    onInput={(e) => changeValues(e)}
			/>
            <br/>
            Detune: {stateProperties.detune}
            <input  
			    type="range" 
			    name="linearRampValueAtTime"
			    value={stateProperties.detune}
			    onInput={(e) => changeValues(e)}
			/>
            <hr/>
        </Fragment>
    )
}

Gain.propTypes = {
    fireOnUnMount : PropTypes.func.isRequired,
    stateDetails : PropTypes.object.isRequired,
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fireOnUnMount : ownProps.fireOnUnMount
    }
  }

export default connect(null, mapDispatchToProps)(Gain);
