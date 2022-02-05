import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AudioNodeManager from '../../../storage/AudioNodeManager';
import {
    checkIfKeyIsBlack,
    getNotes
} from './../../../../static/keyBindings';
import getFreqBindings from './../../../../static/freqBindings';

const Keys = ({
    anm
}) => {
    
    const [activeNote, changeActiveNote] = useState('');

    const displayActiveKey = (frequency) => {
        changeActiveNote(frequency === 0 ? '' : getFreqBindings()[frequency]);
    }

    /**
     * On Mount, it will add thiss callback to display the keys pressed
     */
    useEffect(() => {
        /**
         * @type {AudioNodeManager}
         */
        let manager = anm.current;
        manager.addKeyboardCallback(displayActiveKey);
    }, [anm])

    return (
        <ul>
            {
                getNotes().map(note => 
                    (<li key={note} className={`${checkIfKeyIsBlack(note) ? 'black' : 'white'}${note == activeNote ? ' active ' : ' '}${note}`}></li>)
                )

                
            }
        </ul>
    )
}

Keys.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default Keys

/**
 * This will have the Keyboard. 
 * It will have a local state.
 * During onMount, the anm.addKEyDisplayFunction will be added from here.
 * The function body will actually encapsulate logic to change this componen'ts state details.
 * When the state changes, the component will re-render.
 * Will have to ${active} pass the className to mark active for the keyboard.
 */
