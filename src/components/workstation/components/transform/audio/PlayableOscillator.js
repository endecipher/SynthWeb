import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knob from './../../../../../assets/ui/components/Knob';
import PlayableOscillatorClass from './../../../../storage/audio/PlayableOscillator';
import {
    DETUNE,
    FREQUENCY,
    TYPE
} from './../../../../storage/Types';
import {
    updateHasValuesChanged
} from './../../../../../redux/actions/values';

const PlayableOscillator = ({
    stateDetails,
    updateHasValuesChanged
}) => {

    const {
        name,
        type,
        description,
        properties
    } = stateDetails;

    const stateProperties = useRef(properties);
    
    /**
     * On unmount of this conditionally rendered component, we will update HasValueChanged to true.
     */
    useEffect(() => {
        return () => {
            updateHasValuesChanged(true);
        }
    }, [updateHasValuesChanged]);

    /**
     * @name eventHandler
     * @description Changes the ref state properties
     * The key and value obtained by the UI Controls (Like knobs) will change properties of the state.
     * @param {String} key - Key
     * @param {Object} value - Could be a String or a Number ocassionally. 
     */
    const eventHandler = (key, value) => {
        console.log(`Value Changed > ${key} : ${value}`);
        stateProperties.current[key] = value;
    }

    //Dump Component = Show purposes from props
    return (
        <Fragment>
            <hr/>
            Showing {name} | What is it? : {description}
            Check Playable Oscillator for more info: TODO: Provide Link <br/>
            //Ideally Create Dumb Components and pass them the event handlers as props.
            <br/>
            <Knob 
                styling={" "} 
                eventHandler={eventHandler} 
                properties={{
                    ...PlayableOscillatorClass.fetchPropertyDetails(DETUNE),
                    value : stateProperties.current[DETUNE]
                }} 
            />
            <hr/>
        </Fragment>
    )
}

PlayableOscillator.propTypes = {
    stateDetails : PropTypes.object.isRequired,
    updateHasValuesChanged : PropTypes.func.isRequired,
}

export default connect(null, {
    updateHasValuesChanged
})(PlayableOscillator);
