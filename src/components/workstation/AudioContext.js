import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    changeGlobalStateOrder, 
    compileEverything, 
    compilationDone 
} from '../../redux/actions/audioNodeManager';
import {
    FX1,
    FX2
} from './../storage/Types'
import AudioNodeManager from './../storage/AudioNodeManager'; 
import Keyboard from './Keyboard';
import { ThrowCompilationFailedException } from '../../static/Errors';

const AudioContext = ({
    stateOrder,
    changeGlobalStateOrder,
    compileEverything, 
    compilationDone 
}) => {

    const audioNodeManager = useRef(new AudioNodeManager());

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

    return (
        <Fragment>
            <h6>Initialized audioContext</h6>
            <Keyboard audioNodeManager = {audioNodeManager} />
        </Fragment>
    )
}

AudioContext.propTypes = {
    compileEverything: PropTypes.func.isRequired,
    compilationDone: PropTypes.func.isRequired,
    stateOrder: PropTypes.object.isRequired,
    changeGlobalStateOrder: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    stateOrder : state.audioNodeManager.stateOrder,
});

export default connect(mapStateToProps, 
    { 
        changeGlobalStateOrder,
        compileEverything, 
        compilationDone
    }
)(AudioContext)
