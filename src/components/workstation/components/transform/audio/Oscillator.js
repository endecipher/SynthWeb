import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Oscillator = ({
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

    //Dump Component = Show purposes from props
    return (
        <Fragment>
            <hr/>
            Showing {name} | What is it? : {description}
            Check Oscillator for more info: TODO: Provide Link <br/>
            //Ideally Create Dumb Components and pass them the event handlers as props.
            Frequency: {stateProperties.frequency} <br/>
            <input  
			    type="range" 
			    name="frequency"
			    value={stateProperties.frequency}
			    onInput={(e) => changeValues(e)}
			/>
            <br/>
            Detune: {stateProperties.detune}
            <input  
			    type="range" 
			    name="detune"
			    value={stateProperties.detune}
			    onInput={(e) => changeValues(e)}
			/>
            <hr/>
        </Fragment>
    )
}

Oscillator.propTypes = {
    stateDetails : PropTypes.object.isRequired,
    fireOnUnMount : PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fireOnUnMount : ownProps.fireOnUnMount
    }
  }

export default connect(null, mapDispatchToProps)(Oscillator);
