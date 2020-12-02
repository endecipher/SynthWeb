import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const InputCutOff = ({
    anm,
    showKeyboard
}) => {

    useEffect(() => {
        if(!showKeyboard){
            anm.current.stopAll();
        }
    }, [anm, showKeyboard])

    return (
        <Fragment>

        </Fragment>
    )
}

InputCutOff.propTypes = {
    anm : PropTypes.object.isRequired,
    showKeyboard : PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    showKeyboard : state.values.showKeyboard,
});

export default connect(mapStateToProps, {})(InputCutOff)
