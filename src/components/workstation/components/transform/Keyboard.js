import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import keyBindings from './../../../../static/keyBindings';
import Keys from './Keys';

const Keyboard = ({
    anm
}) => {

    const bindings = useRef(keyBindings);
    const highlights = useRef({
        key : null,
        //Add any other Keyboard mapped inputs
    });
    //TODO: Handle Detune Logic via Mouse Scroll or other key presses

    /**
     * 
     * @param {Event} event 
     * @param {(key : '', anm : AudioNodeManager) => void} func 
     */
    const invokeAudioNodeManagerCall = (event, func) => {

        let currentKey = highlights.current.key;

        if(currentKey in bindings.current || currentKey === ''){
            try{
                func(currentKey, anm);
            }catch(err){

            }
        }
    }

    const handleKeyDown = (event) => {

        changeKey(event.key)

        invokeAudioNodeManagerCall(event, (key, anm) => {
            const keyBoardInputs = {
                newFrequency : bindings.current[key],
            };

            anm.current.startAll(keyBoardInputs);
        });

        // const key = event.key;
        
        // if (key in bindings.current){
        //     changeFrequency(bindings.current[key]);
        //     setSwitch(true);
        //     console.log(`KeyDown> ${key}  frequency matched: ${freq} sw: ${sw} START`);
        // }
	}

    const handleKeyUp = (event) => {
        changeKey('');

        invokeAudioNodeManagerCall(event, (key, anm) => {
            anm.current.stopAll();
        });
        // const key = event.key;
        
        // if (key in bindings.current){
        //     setSwitch(false);
        //     console.log(`KeyUp> ${key}  frequency matched: ${freq} sw: ${sw} STOP`);
        // }
    }

    // const handleKeyPressed = (event) => {
    //     const key = event.key;
        
    //     console.log(`KeyPressed> ${key}`);
    // }

    const getDetailsToRender = () => {
        return {
            key: highlights
        };
    }

    return (
        <Fragment>
            <div className="dummy" tabIndex="0" onKeyDown={ (e) => handleKeyDown(e) } onKeyUp={ (e) => handleKeyUp(e) }>
                <Fragment>
                    <h1>Keyboard {highlights}</h1>
                </Fragment>
                <Keys details = {{
                    key: highlights
                }}/>
            </div> 
        </Fragment>
    )
}

Keyboard.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default Keyboard;
