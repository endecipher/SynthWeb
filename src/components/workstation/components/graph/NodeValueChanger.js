import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    updateHasValuesChanged
} from './../../../../redux/actions/values';

const NodeValueChanger = ({
    anm,
    updateHasValuesChanged,
    hasValuesChanged,
    activeStateDetails
}) => {

    useEffect(() => {
        if(hasValuesChanged){
            anm.current.changeNodeValues(activeStateDetails);
            updateHasValuesChanged(false);
        }
    }, [anm, hasValuesChanged])

    return (
        <Fragment>
            NodeValueChanger :)
        </Fragment>
    )
}

NodeValueChanger.propTypes = {
    anm : PropTypes.object.isRequired,
    hasValuesChanged : PropTypes.bool.isRequired,
    updateHasValuesChanged : PropTypes.func.isRequired,
    //Since activeStateDetails could be null
}

const mapStateToProps = (state) => ({
    hasValuesChanged : state.values.hasValuesChanged,
    activeStateDetails : state.activeState.details
});

export default connect(mapStateToProps, {
    updateHasValuesChanged
})(NodeValueChanger)
