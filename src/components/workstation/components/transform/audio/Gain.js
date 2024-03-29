import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knob from './../../../../../assets/ui/components/Knob';
import {
    updateHasValuesChanged
} from './../../../../../redux/actions/values';
import Property from '../../../../../assets/ui/components/Property';
import AudioNodeDetails from '../../../../../assets/ui/components/AudioNodeDetails';
import {
    GAIN, GAINVAL,
    LINEAR_RAMP
} from './../../../../storage/Types';
import GainClass from '../../../../storage/audio/Gain';

const Gain = ({
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
    
    useEffect(() => {
        return () => {
            updateHasValuesChanged(true);
        }
    }, [updateHasValuesChanged])

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

    return (
        <div className={`audioProperties ${styling}`}>
            <AudioNodeDetails name={name} type={type} description={description} styling={styling}/>
            <Property 
                name={GAIN} 
                description={"Adjust the Gain setting."}
                styling={styling}>
                <Knob 
                    styling={styling} 
                    eventHandler={eventHandler} 
                    properties={{
                        ...GainClass.fetchPropertyDetails(GAINVAL),
                        value : stateProperties.current[GAINVAL]
                    }} 
                />
            </Property>
            <Property 
                name={LINEAR_RAMP} 
                description={"Change the attack of the gain."}
                styling={styling}>
                <Knob 
                    styling={styling} 
                    eventHandler={eventHandler} 
                    properties={{
                        ...GainClass.fetchPropertyDetails(LINEAR_RAMP),
                        value : stateProperties.current[LINEAR_RAMP]
                    }} 
                />
            </Property>
        </div>
    )
}

Gain.propTypes = {
    stateDetails : PropTypes.object.isRequired,
    styling : PropTypes.string.isRequired,
    updateHasValuesChanged : PropTypes.func.isRequired
}

export default connect(null, {
    updateHasValuesChanged
})(Gain);
