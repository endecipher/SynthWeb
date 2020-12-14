import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    compile
} from './../../../../redux/actions/combinedActions';
import {
    setAlert
} from './../../../../redux/actions/alert';
import AudioNodeManager from '../../../storage/AudioNodeManager';

const Compile = ({
    anm,
    nodeStructure,
    adjacencyList,
    hasCompiled,
    compile,
    setAlert
}) => {

    useEffect(() => {
        if(!hasCompiled && nodeStructure.length > 0 && adjacencyList.length > 0) {

            /**
             * @type {AudioNodeManager}
             */
            let audioNodeManager = anm.current;
            let compileInfo = audioNodeManager
                .initializeAudioNodeManager(nodeStructure, adjacencyList);

            if(!compileInfo.hasCompilationFailed){
                let informationStructure = audioNodeManager.getInformationStructure();
                compile(informationStructure.NodeStructure, informationStructure.AdjacencyList);
            }

            compileInfo.messages.forEach(message => {
                setAlert(message.msg, alertType);
            });
        }
    }, [anm, hasCompiled])

    return (
        <Fragment>
            Compile :D
        </Fragment>
    )
}

Compile.propTypes = {
    anm : PropTypes.object.isRequired,
    nodeStructure : PropTypes.array.isRequired,
    adjacencyList : PropTypes.array.isRequired,
    hasCompiled : PropTypes.bool.isRequired,
    compile : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    nodeStructure : state.audioNodeManager.nodeStructure,
    adjacencyList : state.audioNodeManager.adjacencyList,
    hasCompiled : state.values.hasCompiled 
});

export default connect(mapStateToProps, { compile, setAlert })(Compile);
