import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    updateShowKeyboard
} from './../../../../redux/actions/values';
import AudioProperties from './AudioProperties';
import Keyboard from './Keyboard';

const ResponsiveTransform = ({
    anm,
    showKeyboard,
    updateShowKeyboard
}) => {

    const handleShowKeyboardButtonClick = (e) => {
        updateShowKeyboard(true);
    }

    return (
        <Fragment>
            {
                showKeyboard ? 
                    (
                        <Fragment>
                            <Keyboard anm={anm}/>
                        </Fragment>
                    ) :
                    (
                        <Fragment>
                            <button onClick={(e) => handleShowKeyboardButtonClick(e)}> Show Keyboard </button>
                            <AudioProperties/>
                        </Fragment>
                    )
            }
            ResponsiveTransform
        </Fragment>
    )
}

ResponsiveTransform.propTypes = {
    anm : PropTypes.object.isRequired,
    showKeyboard : PropTypes.bool.isRequired,
    updateShowKeyboard : PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    showKeyboard : state.values.showKeyboard,
})

export default connect(mapStateToProps, {
    updateShowKeyboard
})(ResponsiveTransform)
