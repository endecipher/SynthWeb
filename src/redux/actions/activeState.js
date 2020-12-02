import { CHANGE_ACTIVE_STATE, REMOVE_ACTIVE_STATE } from '../types'

export const changeActiveStateDetailsAction = (newDetails) => dispatch => {
    dispatch({
        type: CHANGE_ACTIVE_STATE,
        payload: {
            details : newDetails
        }
    });
};

export const removeActiveStateDetailsAction = () => dispatch => {
    dispatch({
        type: REMOVE_ACTIVE_STATE,
        payload : null
    });
};
