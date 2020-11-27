import React, { Fragment, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OscillatorOne from './OscillatorOne';
import keyBindings from '../../static/oscillatorData/keyBindings';
import {
    FX1, FX2
} from './../storage/Types';

const Keyboard = ({
    audioNodeManager,
    isCompiled
}) => {
    //This will only fire updates and pass as props to the Oscillators
    //It makes sense to send the frequency directly so that recomputation doesn't happen twice.
    //TabIndex is for focusing via tab on the div

    const bindings = useRef(keyBindings);
    const [freq, changeFrequency] = useState(130.8);
    const [detune, changeDetune] = useState(0);
    const [sw, setSwitch] = useState(false);

    //TODO: Handle Detune Logic via Mouse Scroll or other key presses


    const handleKeyDown = (event) => {
        const key = event.key;
        
        if (key in bindings.current){
            changeFrequency(bindings.current[key]);
            setSwitch(true);
            console.log(`KeyDown> ${key}  frequency matched: ${freq} sw: ${sw} START`);
        }
	}

    const handleKeyUp = (event) => {
        const key = event.key;
        
        if (key in bindings.current){
            setSwitch(false);
            console.log(`KeyUp> ${key}  frequency matched: ${freq} sw: ${sw} STOP`);
        }
    }

    const handleKeyPressed = (event) => {
        const key = event.key;
        
        console.log(`KeyPressed> ${key}`);
    }

    return (
        <Fragment>
            {
                isCompiled ? 
                    (
                        <Fragment>
                            <div className="dummy" tabIndex="0" onKeyDown={ (e) => handleKeyDown(e) } onKeyUp={ (e) => handleKeyUp(e) } onKeyPressed={ (e) => handleKeyPressed(e) }>
                                <OscillatorOne audioNodeManager={audioNodeManager} details={
                                    {
                                        key : FX1,
                                        toggle : sw,
                                        frequency : freq,
                                        detune : detune
                                    }
                                }/>
                                <Fragment>
                                    <h1>Try {sw} {freq}</h1>
                                </Fragment>
                            </div> 
                        </Fragment>
                    )
                : <Fragment> Not Compiled </Fragment>
            }
        </Fragment>
    )
}

Keyboard.propTypes = {
    audioNodeManager : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    isCompiled: state.audioNodeManager.isCompiled
});

export default connect(mapStateToProps, {})(Keyboard)
