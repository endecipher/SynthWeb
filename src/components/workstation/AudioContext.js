import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AudioNodeManager from './../storage/AudioNodeManager'; 
import Home from './Home';
import Spinner from './Spinner';
import AudioGraph from './components/graph/AudioGraph';
import ResponsiveTransform from './components/transform/ResponsiveTransform';
import Compile from './components/graph/Compile';

const AudioContext = ({
    hasColdStarted,
    hasCompiled
}) => {

    const audioNodeManager = useRef(new AudioNodeManager());

    return (
        <Fragment>
            <Compile anm={audioNodeManager}/>
            {
                hasColdStarted ? 
                (
                    <Fragment>
                        <Home anm={audioNodeManager}/>
                    </Fragment>
                ) :
                (
                    <Fragment>
                        {
                            hasCompiled ? 
                            (
                                <Fragment>
                                    <AudioGraph anm={audioNodeManager}/>
                                    <ResponsiveTransform anm={audioNodeManager}/>
                                </Fragment>
                            ) : 
                            (
                                <Spinner/>
                            )
                        }
                    </Fragment>
                )
            }
        </Fragment>
    )
}

AudioContext.propTypes = {
    hasColdStarted: PropTypes.bool.isRequired,
    hasCompiled: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    hasColdStarted : state.values.hasColdStarted,
    hasCompiled : state.values.hasCompiled,
});

export default connect(mapStateToProps, {})(AudioContext);