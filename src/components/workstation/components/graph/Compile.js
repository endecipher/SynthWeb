import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    compile
} from './../../../../redux/actions/combinedActions';

const Compile = ({
    anm,
    nodeStructure,
    adjacencyList,
    hasCompiled,
    compile
}) => {

    useEffect(() => {
        if(!hasCompiled && nodeStructure.length > 0 && adjacencyList.length > 0){
            anm.current.initializeAudioNodeManager(nodeStructure, adjacencyList);
            compile();
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
}

const mapStateToProps = (state) => ({
    nodeStructure : state.audioNodeManager.nodeStructure,
    adjacencyList : state.audioNodeManager.adjacencyList,
    hasCompiled : state.values.hasCompiled 
});

export default connect(mapStateToProps, { compile })(Compile);
