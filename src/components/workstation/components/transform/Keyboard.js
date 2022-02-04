import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    keyBindings,
} from './../../../../static/keyBindings';
import Keys from './Keys';
import {
    ThrowKeyboardPerformOnFunctionException
} from './../../../../static/Errors';

const Keyboard = ({
    anm
}) => {

    const bindings = useRef(keyBindings);

    /**
     * Handles the Key Down Event on the Div
     * @param {Event} event 
     * @description Starts all Keyboard Delegates initialized on ANM
     */
    const handleKeyDown = (event) => {
        const key = event.key;
        console.log(`New Event Key: ${key}`);
        if(key in bindings.current){
            try{
                anm.current.play(bindings.current[key]);
            }catch(err){
                ThrowKeyboardPerformOnFunctionException(err);
            }
        }
	};

    /**
     * Handles the Key Up Event on the Div
     * @param {Event} event 
     * @description Stops all Keyboard delegates fired on ANM
     */
    const handleKeyUp = (event) => {
        const key = event.key;
        console.log(`Stop Event Key ${key}`);
        if(key in bindings.current){
            try{
                anm.current.stop(bindings.current[key]);
            }catch(err){
                ThrowKeyboardPerformOnFunctionException(err);
            }
        }
    }

    return (
        <Fragment>
            <div className="keyboard" tabIndex="0" onKeyDown={ (e) => handleKeyDown(e) } onKeyUp={ (e) => handleKeyUp(e) }>
                <Keys anm={anm}/>
            </div>
        </Fragment>
    )
}

Keyboard.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default Keyboard;
