import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    updateHasValuesChanged
} from './../../../../redux/actions/values';
import Oscillator from './audio/Oscillator';
import Gain from './audio/Gain';
import {
    OSCILLATOR,
    GAIN
} from '../../../storage/Types';

const AudioProperties = ({
    activeStateDetails
}) => {

    const fireOnUnMount = async () =>{
        await updateHasValuesChanged(true);
    };

    const conditionallyRenderAudioComponents = (activeStateDetails) => {

        const { type } = activeStateDetails

        switch(type) {
            case OSCILLATOR:
                return <Oscillator stateDetails={activeStateDetails} fireOnUnMount = {fireOnUnMount}/>;
            case GAIN:
                return <Gain stateDetails={activeStateDetails} fireOnUnMount = {fireOnUnMount}/>;
            default:
                return <Fragment />;
        }
    }

    return <Fragment>
            {
                activeStateDetails ? 
                    (
                        <Fragment>
                            {
                                conditionallyRenderAudioComponents(activeStateDetails)
                            }
                        </Fragment>
                    ) : 
                    (
                        <Fragment>
                            <div>
                                <h5>Please click on the Graph Plot to check the properties of a node.</h5>
                            </div>
                        </Fragment>
                    )
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
