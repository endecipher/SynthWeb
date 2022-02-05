import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Oscillator from './audio/Oscillator';
import Gain from './audio/Gain';
import PlayableOscillator from './audio/PlayableOscillator';
import {
    OSCILLATOR,
    GAIN,
    PLAYABLE_OSCILLATOR,
    DELAY
} from '../../../storage/Types';
import Delay from './audio/Delay';

const AudioProperties = ({
    activeStateDetails
}) => {

    /**
     * Returns DOM Nodes of EntityNodes from activeStateDetails.type
     * @param {Object} activeStateDetails 
     */
    const conditionallyRenderAudioComponents = (activeStateDetails) => {

        const { type, name } = activeStateDetails;

        switch(type) {
            case PLAYABLE_OSCILLATOR:
                return <PlayableOscillator key={name} stateDetails={activeStateDetails} styling={'playableOscillator'}/>;
            case OSCILLATOR:
                return <Oscillator key={name} stateDetails={activeStateDetails} styling={'oscillator'}/>;
            case GAIN:
                return <Gain key={name} stateDetails={activeStateDetails} styling={'gain'}/>;
            case DELAY:
                return <Delay key={name} stateDetails={activeStateDetails} styling={'delay'}/>;
            default:
                return <Fragment />;
        }
    }

    return <Fragment>
            {
                conditionallyRenderAudioComponents(activeStateDetails)
            }
    </Fragment>
}

AudioProperties.propTypes = {
    activeStateDetails : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    activeStateDetails : state.activeState.details
});

export default connect(mapStateToProps, {})(AudioProperties)
