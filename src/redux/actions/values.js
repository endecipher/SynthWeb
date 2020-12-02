import { 
    SET_HAS_COLD_STARTED_FALSE,
    SET_HAS_COLD_STARTED_TRUE,
    SET_HAS_COMPILED_FALSE,
    SET_HAS_COMPILED_TRUE,
    SET_HAS_VALUES_CHANGED_FALSE,
    SET_HAS_VALUES_CHANGED_TRUE,
    SET_SHOW_KEYBOARD_FALSE,
    SET_SHOW_KEYBOARD_TRUE
} from '../types';
import {
    ThrowInvalidBooleanForDispatchException
} from './../../static/Errors';

/**
 * Dispatches state.values.hasColdStarted to the desired boolean value
 * @param {boolean} value 
 */
export const updateHasColdStarted = (value) => dispatch => {
    switch(value){
        case true:
            dispatch({
                type: SET_HAS_COLD_STARTED_TRUE,
                payload : null
            });
            break;
        case false:
            dispatch({
                type: SET_HAS_COLD_STARTED_FALSE,
                payload : null
            });
            break;
        default:
            ThrowInvalidBooleanForDispatchException();
    }
};

/**
 * Dispatches state.values.hasCompiled to the desired boolean value
 * @param {boolean} value 
 */
export const updateHasCompiled = (value) => dispatch => {
    switch(value){
        case true:
            dispatch({
                type: SET_HAS_COMPILED_TRUE,
                payload : null
            });
            break;
        case false:
            dispatch({
                type: SET_HAS_COMPILED_FALSE,
                payload : null
            });
            break;
        default:
            ThrowInvalidBooleanForDispatchException();
    }
};

/**
 * Dispatches state.values.hasValuesChanged to the desired boolean value
 * @param {boolean} value 
 */
export const updateHasValuesChanged = (value) => dispatch => {
    switch(value){
        case true:
            dispatch({
                type: SET_HAS_VALUES_CHANGED_TRUE,
                payload : null
            });
            break;
        case false:
            dispatch({
                type: SET_HAS_VALUES_CHANGED_FALSE,
                payload : null
            });
            break;
        default:
            ThrowInvalidBooleanForDispatchException();
    }
};

/**
 * Dispatches state.values.showKeyboard to the desired boolean value
 * @param {boolean} value 
 */
export const updateShowKeyboard = (value) => dispatch => {
    switch(value){
        case true:
            dispatch({
                type: SET_SHOW_KEYBOARD_TRUE,
                payload : null
            });
            break;
        case false:
            dispatch({
                type: SET_SHOW_KEYBOARD_FALSE,
                payload : null
            });
            break;
        default:
            ThrowInvalidBooleanForDispatchException();

    }
};