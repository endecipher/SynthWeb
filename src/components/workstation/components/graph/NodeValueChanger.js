import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    updateHasValuesChanged
} from './../../../../redux/actions/values';
import {
    removeActiveStateDetailsAction
} from './../../../../redux/actions/activeState';
import {
    changeNodeStructure
} from './../../../../redux/actions/audioNodeManager';

const NodeValueChanger = ({
    anm,
    updateHasValuesChanged,
    hasValuesChanged,
    activeStateDetails,
    changeNodeStructure,
    removeActiveStateDetailsAction
}) => {

    useEffect(() => {
        if(hasValuesChanged){
            let updatedNodeStructure = anm.current.changeNodeValues(activeStateDetails);
            
            changeNodeStructure(updatedNodeStructure);

            updateHasValuesChanged(false);
        }
    }, [anm, hasValuesChanged, changeNodeStructure])

    return (
        <Fragment/>
    )
}

NodeValueChanger.propTypes = {
    anm : PropTypes.object.isRequired,
    hasValuesChanged : PropTypes.bool.isRequired,
    updateHasValuesChanged : PropTypes.func.isRequired,
    removeActiveStateDetailsAction : PropTypes.func.isRequired,
    changeNodeStructure : PropTypes.func.isRequired,
    //Since activeStateDetails could be null
}

const mapStateToProps = (state) => ({
    hasValuesChanged : state.values.hasValuesChanged,
    activeStateDetails : state.activeState.details
});

export default connect(mapStateToProps, {
    updateHasValuesChanged,
    removeActiveStateDetailsAction,
    changeNodeStructure
})(NodeValueChanger)
