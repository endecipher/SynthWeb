import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Keyboard from './workstation/Keyboard';
import AudioContext from './workstation/AudioContext';

const Synthesizer = props => {
    return (
        <Fragment>
            Synthesizer
            <AudioContext />
        </Fragment>
    )
}

/*

Visualization:

------------------------------------------------------------------
 Menu - Properties/Help - Key Mappings to frequencies - Other
------------------------------------------------------------------
Oscillator1                 | Osc1/2 FXChain |  FX Properties
                            |----------------|
Properties                  |___Reverb_____ #|  Define properties 
----------------------------|___Delay _____ #|      & widgets
Oscillator2                 |___Gain  _____ #|
                            |___Sweep______ #|
Properties                  |___Scroll_____ #|
----------------------------|--------------------------------------
    LFO1    |   LFO2    |   Mixer (Opens hovering component)
-------------------------------------------------------------------
    Keys highlighted when somekey pressed (dynamically update)
-------------------------------------------------------------------

Before a key gets pressed (i.e make a specific functionality to expose 
    keys component to signify it's okay to play now once connected), we need to build the audio chain (Connect it)
Once done, automatically, whenever a key gets pressed, the oscillators start to play with the proper frequency from key mappings.


*/

Synthesizer.propTypes = {

}

export default Synthesizer;
