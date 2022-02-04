import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knob from './../../../../../assets/ui/components/Knob';
import PlayableOscillatorClass from './../../../../storage/audio/PlayableOscillator';
import {
    DETUNE,
    TYPE
} from './../../../../storage/Types';
import {
    updateHasValuesChanged
} from './../../../../../redux/actions/values';
import Property from '../../../../../assets/ui/components/Property';
import AudioNodeDetails from '../../../../../assets/ui/components/AudioNodeDetails';
import PropertyButtonGroup from '../../../../../assets/ui/components/PropertyButtonGroup';

const PlayableOscillator = ({
    stateDetails,
    styling,
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

    /**
     * Change Button (Osc Type) Type
     * @param {String} value 
     */
    const changeType = (value) => {
        eventHandler(TYPE, value);
    }

    //Dump Component = Show purposes from props
    return (
        <div className={`audioProperties ${styling}`}>
            <AudioNodeDetails name={name} type={type} description={description} styling={styling}/>
            <Property 
                name={DETUNE} 
                description={"Set a non-zero value to detune the oscillator by the specified cents. "}
                styling={styling}>
                <Knob 
                    styling={styling} 
                    eventHandler={eventHandler} 
                    properties={{
                        ...PlayableOscillatorClass.fetchPropertyDetails(DETUNE),
                        value : stateProperties.current[DETUNE]
                    }} 
                />
            </Property>
            <Property 
                name={TYPE} 
                description={"Change the type of the Oscillator"}
                styling={styling}>
                <PropertyButtonGroup
                    optionArray={PlayableOscillatorClass.fetchPropertyDetails(TYPE).values}
                    selectedValue={stateProperties.current[TYPE]}
                    eventHandler={changeType}/>
            </Property>
        </div>
    )
}

PlayableOscillator.propTypes = {
    stateDetails : PropTypes.object.isRequired,
    styling : PropTypes.string.isRequired,
    updateHasValuesChanged : PropTypes.func.isRequired
}

export default connect(null, {
    updateHasValuesChanged
})(PlayableOscillator);
