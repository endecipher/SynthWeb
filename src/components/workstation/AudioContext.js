import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AudioNodeManager from './../storage/AudioNodeManager'; 
import Home from './Home';
import Spinner from './Spinner';
import AudioGraph from './components/graph/AudioGraph';
import ResponsiveTransform from './components/transform/ResponsiveTransform';

const AudioContext = ({
    hasColdStarted,
    hasCompiled
}) => {

    const audioNodeManager = useRef(new AudioNodeManager());

    return (
        <Fragment>
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
                                    Compiled Successfully.
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

/*


    useEffect(() => {
        console.log('Getting GlobalStateOrder from ANM. Should fire only once.');
        //First Time AudioNodeManager gets Initialized, we need to changeStateOrder
        const stateOrder = audioNodeManager.current.getGlobalStateOrder();

        changeGlobalStateOrder(stateOrder);
    }, [audioNodeManager, changeGlobalStateOrder])

    

    useEffect(() => {
        console.log(`Updating Global Order from ${stateOrder}`);
        audioNodeManager.current.updateGlobalOrder(stateOrder);

        const initiateCompilation = () => {

            console.log(`Dispatch to compile`);
            compileEverything();
    
            const isSuccess = audioNodeManager.current.compile();
            
            if(isSuccess){
                console.log(`Compiled`);
                compilationDone();
                return;
            }
    
            ThrowCompilationFailedException();
        }

        initiateCompilation();
    }, [audioNodeManager, compileEverything, compilationDone]);

*/
