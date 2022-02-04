import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knob from '../../../../../assets/ui/components/Knob';
import {
    updateHasValuesChanged
} from '../../../../../redux/actions/values';
import Property from '../../../../../assets/ui/components/Property';
import AudioNodeDetails from '../../../../../assets/ui/components/AudioNodeDetails';
import {
    DELAY
} from '../../../../storage/Types';
import DelayClass from '../../../../storage/audio/Delay';

const Delay = ({
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
                name={DELAY} 
                description={"Adjust the delay."}
                styling={styling}>
                <Knob 
                    styling={styling} 
                    eventHandler={eventHandler} 
                    properties={{
                        ...DelayClass.fetchPropertyDetails(DELAY),
                        value : stateProperties.current[DELAY]
                    }} 
                />
            </Property>
        </div>
    )
}

Delay.propTypes = {
    stateDetails : PropTypes.object.isRequired,
    styling : PropTypes.string.isRequired,
    updateHasValuesChanged : PropTypes.func.isRequired
}

export default connect(null, {
    updateHasValuesChanged
})(Delay);
