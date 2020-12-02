import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    OSC_TYPE_SQUARE, 
    OSC_TYPE_SINE, 
    OSC_TYPE_TRIANGLE, 
    OSC_TYPE_SAWTOOTH, 
    OSCILLATOR
} from '../storage/Types';
import Oscillator from './components/audio/Oscillator';

const OscillatorOne = ({
    audioNodeManager,
    details,
    stateOrder
}) => {

    const {
        key,
        toggle,
        frequency,
        detune
    } = details;
    //TODO: Connect to Redux and get the state
    //Then Perform requests using the AudioNodeManager 
    //The UUID needs to be sent along witht he function to perform,
    //Thus each and every smart component must possess a unique UUID which will never change.
    //Also, is someone want the sound of a single oscillator, they can do that by sending a new state order
    //without the uuid's ocurrence. 
    //However, when they toggle it back on, the new state should be dispatched
    //Also, performFunction needs to be like audioNodeManager.current.perform1(key)(thisState's uuid)((x) => {x.play()}) //In case of x being an oscillator

    const [ NodeUUID, changeUniqueIdentifier ] = useState({
        UniqueId : null
    });

    const changeUniqueId = (id) => {
        changeUniqueIdentifier({
            ...NodeUUID,
            UniqueId: id
        });
    }

    useEffect(() => {
        if(!NodeUUID.UniqueId){
            console.log(`Fetching NodeUUID for OscillatorOne. Should fire only once.`)
            const id = audioNodeManager.current.getUniqueId(key, OSCILLATOR);
            changeUniqueId(id);
        }

        return () => {
            //On Unmounting, do the following
        }
    }, []);

    // useEffect(() => {
    //     if(NodeUUID.UniqueId){
    //         console.log(`Attempting Frequency Change to ${frequency}: ${key} ${NodeUUID}`);
    //         audioNodeManager.current
    //             .perform(key)(NodeUUID.UniqueId)((node) => { node.changeFrequency(frequency); });
    //     }
    // }, [frequency]);

    // useEffect(() => {
    //     OscillatorNode.current.detune.setValueAtTime(detune, audioContext.currentTime);
    // }, [detune, audioContext, OscillatorNode]);

    useEffect(() => {
        if(NodeUUID.UniqueId){
            console.log(`Toggling ${toggle}: ${key} ${NodeUUID}`);
            if(toggle){
                audioNodeManager.current.perform(key)(NodeUUID.UniqueId)((node) => { node.start(frequency); });
            }else{
                audioNodeManager.current.perform(key)(NodeUUID.UniqueId)((node) => { node.stop(); });
            }
        }
    }, [toggle, frequency]);

    // //TODO: Implement Type Changing functionality
    const [oscillatorType, changeOscillatorType] = useState(OSC_TYPE_TRIANGLE);

    // document.onkeypress = function(event) {
    //     event = event || window.event;
    //     var key = event.key;
    //     var charStr = String.fromCharCode(charCode);
    //     alert(charStr);
    // };

    return (
        <Fragment>
            <Oscillator key={key} frequency={frequency} toggle={toggle} type={oscillatorType} detune={detune}/>
        </Fragment>
    )
}

OscillatorOne.propTypes = {
    audioNodeManager : PropTypes.object.isRequired,
    details : PropTypes.object.isRequired,
    stateOrder : PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    stateOrder: state.audioNodeManager.stateOrder,
    ...ownProps
});

export default connect(mapStateToProps, { })(OscillatorOne);
